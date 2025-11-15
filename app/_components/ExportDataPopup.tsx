import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Download, Database, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTotalData } from '@/hooks/TotalDataContext';
import { UserService } from '@/userservice/user.service';
import { saveAs } from 'file-saver';

interface ExportDataPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onExport: (exportSize: number) => void;
    maxRecords?: number;
    availableRecords?: number;
    exportType?: 'csv' | 'json' | 'excel';
}

const convertToCSV = (data: sellsHeaders[]): string => {
    if (!data.length) return '';

    // Define headers
    const headers = Object.keys(data[0]);

    // Create CSV content
    const csvRows = [];

    // Add headers
    csvRows.push(headers.join(','));

    // Add data rows
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header as keyof sellsHeaders];
            // Handle values that might contain commas or quotes
            const escapedValue = String(value ?? '').replace(/"/g, '""');
            return `"${escapedValue}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
};

// Function to download CSV
const downloadCSV = (csvContent: string, filename: string): void => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
};

export default function ExportDataPopup({
    isOpen,
    onClose,
    onExport,
    maxRecords = 10000,
    availableRecords = 5000,
    exportType = 'csv'
}: ExportDataPopupProps) {
    const pathname = usePathname();
    const { totalData, salesFilters, zoominfoFilters, apolloFilters } = useTotalData();
    const [exportSize, setExportSize] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<'custom' | 'all'>('custom');
    const [isExporting, setIsExporting] = useState(false);
    const [activePage, setActivePage] = useState('');

    const handleSizeChange = (value: number) => {
        const safeMax = Math.min(maxRecords, availableRecords);
        const validatedValue = Math.min(Math.max(1, value), safeMax);
        setExportSize(validatedValue);
    };

    const handleOptionChange = (option: 'custom' | 'all') => {
        setSelectedOption(option);
        if (option === 'all') {
            setExportSize(Math.min(maxRecords, availableRecords));
        }
    };

    const getExportData = async (page: number, limit: number, filterType: string, filters: salesFilterState | apolloFilterState | zoominfoFilterState) => {
        try {
            const res = await UserService?.getExportData(page, limit, filterType, filters);
            if (res?.data?.success && res?.data?.data.length > 0) {
                console.log("Exporting.... ")
                // Convert data to CSV
                const csvContent = convertToCSV(res?.data?.data);

                // Create and download the file
                downloadCSV(csvContent, `exported-${Number(new Date())}.csv`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleExport = async () => {
        setIsExporting(true);
        try {
            if (activePage === 'sells') {
                console.log("Sales data : ", salesFilters);
                getExportData(1, selectedOption === 'all' ? Math.min(maxRecords, availableRecords) : exportSize, 'sells', salesFilters);
            }
            if (activePage === 'zoominfo') {
                console.log("Zoominfo data : ", zoominfoFilters)
                getExportData(1, Math.min(selectedOption === 'all' ? Math.min(maxRecords, availableRecords) : exportSize, totalData), 'zoominfo', zoominfoFilters)
            }
            if (activePage === 'dashboard') {
                console.log("Apollo data : ", apolloFilters);
                getExportData(1, Math.min(selectedOption === 'all' ? Math.min(maxRecords, availableRecords) : exportSize, totalData), 'apollo', apolloFilters);
            }
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleClose = () => {
        setExportSize(100);
        setSelectedOption('custom');
        setIsExporting(false);
        onClose();
    };

    useEffect(() => {
        const paths = pathname?.split('/')
        setActivePage(pathname?.split('/')?.[paths?.length - 1]);
    }, [isOpen])

    const getFileTypeInfo = () => {
        switch (exportType) {
            case 'csv':
                return { name: 'CSV', description: 'Comma-separated values file' };
            case 'json':
                return { name: 'JSON', description: 'JavaScript Object Notation file' };
            case 'excel':
                return { name: 'Excel', description: 'Microsoft Excel spreadsheet' };
            default:
                return { name: 'CSV', description: 'Comma-separated values file' };
        }
    };

    const fileType = getFileTypeInfo();
    const actualMaxRecords = Math.min(maxRecords, availableRecords);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000027] backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-999" onClick={handleClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Download className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Export Data</h2>
                            <p className="text-sm text-gray-600">Select data size to export</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                        disabled={isExporting}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Data Size Selection */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Select Data Size</h3>

                        {/* Option: All Available Data */}
                        <div className='grid grid-cols-2  gap-6'>
                            <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors h-fit">
                                <input
                                    type="radio"
                                    name="exportOption"
                                    checked={selectedOption === 'all'}
                                    onChange={() => handleOptionChange('all')}
                                    className="mt-1 text-blue-600 focus:ring-blue-500"
                                    disabled={isExporting}
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">All Available Data</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Export all {availableRecords.toLocaleString()} records
                                    </p>
                                    {availableRecords > maxRecords && (
                                        <div className="flex items-center gap-2 mt-2 text-amber-600 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            Limited to {maxRecords.toLocaleString()} records maximum
                                        </div>
                                    )}
                                </div>
                            </label>

                            {/* Option: Custom Size */}
                            <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="radio"
                                    name="exportOption"
                                    checked={selectedOption === 'custom'}
                                    onChange={() => handleOptionChange('custom')}
                                    className="mt-1 text-blue-600 focus:ring-blue-500"
                                    disabled={isExporting}
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Custom Size</p>
                                    <p className="text-sm text-gray-600 mt-1">Select specific number of records</p>

                                    {selectedOption === 'custom' && (
                                        <div className="mt-4 space-y-4">{/* Custom Input */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">
                                                    Custom number of records
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max={actualMaxRecords}
                                                        value={exportSize}
                                                        onChange={(e) => handleSizeChange(parseInt(e.target.value) || 1)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        disabled={isExporting}
                                                    />
                                                    <span className="text-sm text-gray-500 whitespace-nowrap">
                                                        / {actualMaxRecords.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Database className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-blue-900">Export Summary</span>
                            </div>
                            <span className="text-lg font-bold text-blue-900">
                                {selectedOption === 'all'
                                    ? Math.min(availableRecords, maxRecords).toLocaleString()
                                    : exportSize.toLocaleString()
                                } records
                            </span>
                        </div>
                        <p className="text-sm text-blue-700 mt-2">
                            Ready to export {selectedOption === 'all' ? 'all available' : exportSize.toLocaleString()} records as {fileType.name}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors border hover:border-gray-300 rounded-lg cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={isExporting || exportSize < 1}
                        className="flex items-center cursor-pointer gap-2 px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isExporting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Exporting...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                Export Data
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

type salesFilterState = {
    email: string[];
    job_title: string[];
    company_domain: string[];
    urls: string[];
    city: string[];
    email_first: string[];
    email_second: string[];
};

type zoominfoFilterState = {
    email: string[];
    lead_titles: string[];
    company_website: string[];
    company_industry: string[];
    company_size: string[];
    revenue_range: string[];
    company_location_text: string[];
    keyword: string[];
};
type apolloFilterState = {
    email: string[];
    job_titles: string[];
    industry: string[];
    keyword: string[];
    technologies: string[];
    website: string[];
    company_domain: string[];
    company_linkedin: string[];
    country: string[];
    city: string[];
    state: string[];
    annual_revenue: string[];
};

type sellsHeaders = {
    first_name: string;
    last_name: string;
    job_title: string;
    email_first: string;
    email_second: string;
    phone: string;
    company_phone: string;
    url: string;
    company_name: string;
    company_id: string;
    company_domain: string;
    location: string;
    linkedin_id: string;
    created_at: string;
}

