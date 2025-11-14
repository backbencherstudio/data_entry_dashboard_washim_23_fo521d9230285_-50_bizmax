'use client'

import { useEffect, useState } from "react";
import Navbar from "../dashboard/_components/Navbar";
import Sidebar from "../dashboard/_components/Sidebar";
import { TotalDataProvider } from "@/hooks/TotalDataContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [])

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2B2926]"></div>
            </div>
        )
    }
    return (
        <TotalDataProvider>
            <div className="flex w-full max-w-[1920px] h-screen overflow-hidden">
                <Sidebar />
                <div className="flex-1">
                    <Navbar />
                    {children}
                </div>
            </div>
        </TotalDataProvider>
    )
}