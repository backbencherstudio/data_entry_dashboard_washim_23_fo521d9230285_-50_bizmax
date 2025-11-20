import { UserService } from "@/userservice/user.service";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function DeleteModal({ isOpen, onClose, onDelete }: { isOpen: boolean, onClose: () => void; onDelete: () => void }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const pathname = usePathname();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [dataType, setDataType] = useState<string>();

    const handleDeleteClick = () => {
        if (!startDate || !endDate) {
            alert('Please select both start and end dates');
            return;
        }
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await UserService?.deleteData({
                data: {
                    type: dataType === "dashboard" ? "APOLLO" : dataType === "sells" ? "SALES_NAVIGATOR" : "ZOOMINFO",
                    startDate,
                    endDate
                }
            })
            if (res?.data?.success) {
                toast?.success("Data deleted successfully")
                setTimeout(() => {
                    setStartDate('');
                    setEndDate('');
                    onClose();
                    setShowConfirmation(false)
                    onDelete()
                }, 2000);
            }

        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelConfirm = () => {
        setShowConfirmation(false);
    };

    const handleClose = () => {
        setStartDate('');
        setEndDate('');
        setShowConfirmation(false);
        onClose();
    };

    useEffect(() => {
        const segments = pathname?.split('?')?.[0]?.split('/').filter(Boolean);
        setDataType(segments?.[segments?.length - 1] || '');
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center bg-[#0000002f] backdrop-blur-xs justify-center z-999" onClick={handleClose}>
                <Toaster position="top-right" />
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Delete Data</h2>
                        <p className="text-sm text-gray-600 mt-1">Select date range to delete records</p>
                    </div>

                    <div className="px-6 py-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 mt-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Delete Summary</h3>
                                <p className="text-sm text-gray-600">
                                    Ready to delete records from {startDate || '___'} to {endDate || '___'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    This action cannot be undone
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleClose}
                                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                disabled={!startDate || !endDate}
                                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Delete Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <>
                    {/* <div className="fixed inset-0  bg-opacity-50 z-9999" onClick={handleCancelConfirm} /> */}
                    <div className="fixed inset-0 bg-[#0000002f] flex items-center justify-center z-9999" onClick={handleCancelConfirm}>
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
                            <div className="px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Confirm Deletion</h3>
                                <p className="text-sm text-gray-600">
                                    Are you sure you want to delete all records from <strong>{startDate}</strong> to <strong>{endDate}</strong>? This action cannot be undone.
                                </p>
                            </div>
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={handleCancelConfirm}
                                        disabled={isDeleting}
                                        className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmDelete}
                                        disabled={isDeleting}
                                        className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex items-center"
                                    >
                                        {isDeleting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Deleting...
                                            </>
                                        ) : (
                                            'Confirm Delete'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}