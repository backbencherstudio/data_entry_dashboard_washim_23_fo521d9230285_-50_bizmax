'use client'
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import LogoutConfirmationPopup from "@/app/_components/LogoutConfirmationPopup";
import ApolloFilters from "./ApolloFilters";
import ZoominfoFilters from "./ZoominfoFilters";
import SellsFilters from "./SellsFilters";
import { usePathname } from "next/navigation";
import { CookieHelper } from "@/helper/cookie.helper";
import { useTotalData } from "@/hooks/TotalDataContext";

export default function Sidebar() {
    const router = useRouter();
    const path = usePathname();
    const { totalData,isLogin } = useTotalData();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [pathName, setPathName] = useState<string>('');
    const handleLogoutModal = () => {
        setIsLogoutModalOpen(true);
    }

    const handleLogout = () => {
        CookieHelper?.destroy({key:'access_token'})
        setIsLogoutModalOpen(false);
        router.replace('/login');
    }

    useEffect(() => {
        const pathnames = path.split('/');
        setPathName(pathnames?.[pathnames?.length - 1])
    }, [path])

    return (
        <div className={`w-[240px] h-screen overflow-hidden grid ${isLogin?"grid-rows-[48px_1fr_70px]":"grid-rows-[48px_1fr_150px]"}`}>
            <div className="bg-[#ECF3FE] text-gray-900 px-4 py-[13px] text-xl font-semibold">
                Total: <span className="font-medium">{totalData}</span>
            </div>
            <div className="flex-1 overflow-y-auto">
                {pathName === "dashboard" && <ApolloFilters />}
            {pathName === "zoominfo" && <ZoominfoFilters />}
            {pathName === "sells" && <SellsFilters />}
            </div>
            {isLogin ? <div className="px-4 mt-4">
                <button type="button" onClick={handleLogoutModal} className="cursor-pointer flex items-center gap-4 px-4 py-2 border w-full border-gray-300 rounded-lg justify-center">
                    <MdOutlineLogout />
                    <span>Logout</span>
                </button>
            </div>
                :
                <div className="py-4 px-2 text-sm">
                    <h3 className="text-base font-medium">Contact infomation</h3>
                    <h2><span className="font-medium">Owner:</span> Tony Chowdhury</h2>
                    <h2><span className="font-medium">WhatsApp:</span> +8801762720867</h2>
                    <h2><span className="font-medium">Email:</span> tonychowdhury1994@gmail.com</h2>
                </div>
            }
            <LogoutConfirmationPopup isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    )
}