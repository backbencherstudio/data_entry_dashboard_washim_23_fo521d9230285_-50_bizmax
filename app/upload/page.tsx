"use client";
import React, { useEffect, useState } from 'react';
import CSVUploader from '../dashboard/_components/CSVUploader';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UserService } from '@/userservice/user.service';
import toast,{Toaster} from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { CookieHelper } from '@/helper/cookie.helper';
import Loader from '../_components/Loader';

interface CSVValidationResult {
    isValid: boolean;
    errors: string[];
    headers: string[];
    data?: string[][];
}

const Filetypes = [
    "SALES_NAVIGATOR",
    "APOLLO",
    "ZOOMINFO"
] as const;

type FileType = typeof Filetypes[number];

const fileHeaders: Record<FileType, string[]> = {
    SALES_NAVIGATOR: [
        'first_name',
        'last_name',
        'job_title',
        'email_first',
        'email_second',
        'phone',
        'company_phone',
        'url',
        'company_name',
        'company_domain',
        'company_id',
        'location',
        'linkedin_id',
        'created_date'
    ],
    APOLLO: [
        'first_name',
        'last_name',
        'title',
        'company_name',
        'company_name_for_emails',
        'email',
        'email_status',
        'primary_email_source',
        'primary_email_verification_source',
        'email_confidence',
        'primary_email_catch_all_status',
        'primary_email_last_verified_at',
        'seniority',
        'departments',
        'contact_owner',
        'work_direct_phone',
        'home_phone',
        'mobile_phone',
        'corporate_phone',
        'other_phone',
        'stage',
        'lists',
        'last_contacted',
        'account_owner',
        'employees',
        'industry',
        'keywords',
        'person_linkedin_url',
        'website',
        'company_uinkedin_url',
        'facebook_url',
        'twitter_url',
        'city',
        'state',
        'country',
        'company_address',
        'company_city',
        'company_state',
        'company_country',
        'company_phone',
        'technologies',
        'annual_revenue',
        'total_funding',
        'latest_funding',
        'latest_funding_amount',
        'last_raised_at',
        'subsidiary_of',
        'email_sent',
        'email_open',
        'email_bounced',
        'replied',
        'demoed',
        'number_of_retail_locations',
        'apollo_contact_id',
        'apollo_account_id',
        'secondary_email',
        'secondary_email_source',
        'secondary_email_status',
        'secondary_email_verification_source',
        'tertiary_email',
        'tertiary_email_source',
        'tertiary_email_status',
        'tertiary_email_verification_source'
    ],
    ZOOMINFO: [
        'company_id',
        'name',
        'email',
        'email_score',
        'phone',
        'work_phone',
        'lead_location',
        'lead_divison',
        'lead_titles',
        'seniority_level',
        'decision_making_power',
        'skills',
        'past_companies',
        'company_phone_numbers',
        'company_function',
        'company_name',
        'company_size',
        'company_location_text',
        'company_type',
        'company_industry',
        'company_sector',
        'company_funding_range',
        'revenue_range',
        'ebitda_range',
        'latest_funding_stage',
        'company_size_key',
        'linkedin_url',
        'company_facebook_page',
        'company_twitter_page',
        'company_linkedin_page',
        'company_sic_code',
        'company_naics_code',
        'company_founded_at',
        'company_website'
    ]
};

const UploadPage: React.FC = () => {
    const [isValid, setIsValid] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState<FileType>('APOLLO');
    const [validationData, setValidationData] = useState<CSVValidationResult | null>(null);
    const [uploading,setUploading] = useState(false);
    const [isImported,setIsImported] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    const router = useRouter();
    const optionalHeaders = [''];

    const handleValidationResult = (result: CSVValidationResult) => {
        setValidationData(result);
        if (result.isValid) {
            setIsValid(true);
        } else {
            setIsValid(false);
            console.error('Validation errors:', result.errors);
        }
    };

    const handleUploadData = async () => {
        if (validationData?.isValid && validationData.data) {
            setUploading(true);
            try {
                // Get the original file from CSVUploader or recreate CSV
                const csvContent = convertArrayToCSV(validationData.data, validationData.headers);
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const file = new File([blob], 'uploaded-data.csv', { type: 'text/csv' });

                const fd = new FormData();
                fd.append("file", file);
                fd.append("type", selectedType);

                const res = await UserService.importCSVdata(fd);
                if(res?.data?.success){
                    toast?.success("Data uploaded successfully.");
                    setIsImported(true);
                    setIsValid(false);
                }

            } catch (err) {
                console.log('Upload error:', err);
            }finally{
                setUploading(false);
            }
        }
    };

    const convertArrayToCSV = (data: string[][], headers: string[]): string => {
        const csvRows = [];

        // Add headers
        csvRows.push(headers.join(','));

        // Add data rows
        data.forEach(row => {
            const escapedRow = row.map(field => {
                // Escape fields that contain commas, quotes, or newlines
                if (field.includes(',') || field.includes('"') || field.includes('\n')) {
                    return `"${field.replace(/"/g, '""')}"`;
                }
                return field;
            });
            csvRows.push(escapedRow.join(','));
        });

        return csvRows.join('\n');
    };

    useEffect(()=>{
        const userToken = CookieHelper.get({ key: "access_token" });
        if(!userToken){
            router?.replace('/dashboard')
        }else{
            setIsAdmin(true);
        }
    },[])

    if(!isAdmin){
        return(
            <div>
                <Loader />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 overflow-y-auto">
            <Toaster position='top-right'/>
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        CSV File Validator
                    </h1>
                    <p className="text-gray-600">
                        Upload your CSV file to validate headers and structure
                    </p>
                </div>
                <div>
                    <div className="max-w-2xl mx-auto px-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Data Type
                                </label>
                                <Select
                                    value={selectedType}
                                    onValueChange={(value: FileType) => {
                                        setSelectedType(value);
                                        setIsValid(false); // Reset validation when type changes
                                        setValidationData(null);
                                    }}
                                >
                                    <SelectTrigger className="w-[250px]">
                                        <SelectValue placeholder="Select a data type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Filetypes.map(item =>
                                            <SelectItem className="capitalize" key={item} value={item}>
                                                {item.split('_').join(' ')}
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            {isValid && (
                                <div className='flex items-center justify-end'>
                                    <button
                                        type="button"
                                        onClick={handleUploadData}
                                        disabled={uploading}
                                        className={`bg-green-500 px-5 py-2 rounded-lg ${uploading?"cursor-progress opacity-50":"cursor-pointer"} text-white font-medium hover:bg-green-600 transition-colors`}
                                    >
                                        {uploading?"Uploading...":"Upload Data"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <CSVUploader
                        requiredHeaders={fileHeaders[selectedType]}
                        optionalHeaders={optionalHeaders}
                        onValidationResult={handleValidationResult}
                        maxFileSize={5120 * 1024 * 1024}
                        uploading={uploading}
                        isImported={isImported}
                    />
                </div>
            </div>
        </div>
    );
};

export default UploadPage;