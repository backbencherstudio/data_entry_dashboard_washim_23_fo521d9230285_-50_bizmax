'use client'

import FileUploadPopup from "@/app/_components/FileUploadPopup";
import ExportDataPopup from "@/app/_components/ExportDataPopup";
import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { usePathname } from "next/navigation";

import { IoSearch } from "react-icons/io5";
import { AlertCircle, CheckCircle2, Download } from "lucide-react";
import Link from "next/link";
import LogoutConfirmationPopup from "@/app/_components/LogoutConfirmationPopup";

export default function Navbar() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const pathname = usePathname();
    const handleFileUpload = (file: File) => {
        console.log('File uploaded:', file);
        // Handle the file upload logic here
        // You can process the CSV file, send it to an API, etc.
        setIsPopupOpen(false);

        // Example: Read the file content
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            console.log('File content:', content);
        };
        reader.readAsText(file);
    };
    const [currentPage, setCurrentPage] = useState<string>('');
    const [isExportPopupOpen, setIsExportPopupOpen] = useState(false);
    const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleExport = async (exportSize: number) => {
        try {
            console.log(`Exporting ${exportSize} records...`);

            // Simulate API call for export
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Your actual export logic here
            // This could be:
            // - Generating a CSV file
            // - Calling an API endpoint
            // - Downloading data from your backend

            setExportStatus('success');

            // Close popup after success
            setTimeout(() => {
                setIsExportPopupOpen(false);
                setExportStatus('idle');
            }, 1500);

        } catch (error) {
            console.error('Export failed:', error);
            setExportStatus('error');
        }
    };

    useEffect(() => {
        const login = localStorage.getItem('islogin');
        setIsLogin(login === "true");
    }, [])

    useEffect(() => {
        const segments = pathname?.split('?')?.[0]?.split('/').filter(Boolean);
        setCurrentPage(segments?.[segments?.length - 1] || '');
        console.log("Path : ",segments)
    }, [pathname]);

    return (
        <div className="border-b border-gray-200 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2 border border-gray-300 w-fit px-2 py-1 text-sm rounded-md">
                <button type="button" className="cursor-pointer">
                    <IoSearch className="text-gray-500" />
                </button>
                <input
                    type="text"
                    className="outline-none"
                    placeholder="Search people"
                />
            </div>
            <div className="flex items-center text-gray-800 font-medium">
                <Link href="/dashboard" className={`flex justify-center py-3 ${currentPage.includes("dashboard") ? "bg-gray-200" : "hover:bg-gray-100"} w-[110px] duration-300`}>Apollo</Link>
                <Link href="/dashboard/zoominfo" className={`flex justify-center py-3 ${currentPage.includes("zoominfo") ? "bg-gray-200" : "hover:bg-gray-100"} w-[110px] duration-300`}>Zoominfo</Link>
                <Link href="/dashboard/sells" className={`flex justify-center py-3 ${currentPage.includes("sells") ? "bg-gray-200" : "hover:bg-gray-100"} w-[110px] duration-300`}>Sells</Link>
            </div>
            {isLogin ?
                <div className="flex gap-4">
                    <button type="button" onClick={() => setIsPopupOpen(true)} className="px-4 flex items-center gap-1 py-1 text-sm rounded-md text-white bg-green-500 border border-green-500 cursor-pointer hover:bg-transparent hover:text-green-600 duration-300">
                        <FaFileUpload className="text-xs" />
                        <span>Import</span>
                    </button>
                    <button type="button" onClick={() => setIsExportPopupOpen(true)} className="px-4 flex items-center gap-1 py-1 text-sm rounded-md text-white bg-green-500 border border-green-500 cursor-pointer hover:bg-transparent hover:text-green-600 duration-300">
                        <FaDownload />
                        <span>Export</span>
                    </button>
                </div>
                :
                <Link href="/login" className="px-4 flex loginbtn items-center gap-1 py-1 text-sm rounded-md text-white bg-green-500 border border-green-500 cursor-pointer hover:bg-transparent hover:text-green-600 duration-300">
                    <span>Login</span>
                    <AiOutlineDoubleRight className="animateArrow" />
                </Link>}
            <FileUploadPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onFileUpload={handleFileUpload}
                maxSize={500} // 10MB max size
            />
            <ExportDataPopup
                isOpen={isExportPopupOpen}
                onClose={() => {
                    setIsExportPopupOpen(false);
                    setExportStatus('idle');
                }}
                onExport={handleExport}
                maxRecords={100000}
                availableRecords={50000}
                exportType="csv"
            />
        </div>
    )
}