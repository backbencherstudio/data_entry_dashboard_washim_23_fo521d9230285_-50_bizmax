'use client'
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import LogoutConfirmationPopup from "@/app/_components/LogoutConfirmationPopup";
import ApolloFilters from "./ApolloFilters";
import ZoominfoFilters from "./ZoominfoFilters";
import SellsFilters from "./SellsFilters";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const router = useRouter();
    const path = usePathname();
    const [isLogoutModalOpen,setIsLogoutModalOpen] = useState(false);
    const [pathName,setPathName] = useState<string>('');

    const handleLogoutModal=()=>{
        setIsLogoutModalOpen(true);
    }

    const handleLogout=()=>{
        localStorage.setItem('islogin','false');
        setIsLogoutModalOpen(false);
        router.replace('/login');
    }

    useEffect(()=>{
        const pathnames = path.split('/');
        setPathName(pathnames?.[pathnames?.length - 1])
        console.log("Path name : ",path);
    },[path])

    return (
        <div className="w-[240px] h-screen overflow-hidden">
            <div className="bg-[#ECF3FE] text-gray-900 px-4 py-[13px] text-xl font-semibold">
                Total: <span className="font-medium">102.1M</span>
            </div>
            {pathName === "dashboard"&&<ApolloFilters />}
            {pathName === "zoominfo"&&<ZoominfoFilters />}
            {pathName === "sells"&&<SellsFilters />}
            <div className="px-4 mt-4">
                <button type="button" onClick={handleLogoutModal} className="cursor-pointer flex items-center gap-4 px-4 py-2 border w-full border-gray-300 rounded-lg justify-center">
                    <MdOutlineLogout />
                    <span>Logout</span>
                </button>
            </div>
            <LogoutConfirmationPopup isOpen={isLogoutModalOpen}
                onClose={()=>setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    )
}