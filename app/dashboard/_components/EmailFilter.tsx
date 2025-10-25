'use client'

import { MdOutlineEmail } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useState } from "react";

export default function EmailFilter() {
    const [open, setOpen] = useState(false);
    return (
        <div className={`${open?"border border-blue-300":"border-b border-gray-300"} w-full duration-200`}>
            <button type="button" className={`flex cursor-pointer px-4 pt-4 justify-between items-center w-full outline-none ${open?"text-blue-300":"text-gray-500"}`} onClick={()=>setOpen(prev=> !prev)}>
                <div className="flex items-center gap-2">
                    <MdOutlineEmail />
                    <span>Email</span>
                </div>
                {open ? <FaCaretUp /> : <FaCaretDown />}
            </button>
            <div className={`${open?"h-fit p-4":"h-0"} duration-200 overflow-hidden space-y-4`}>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="verified" className="w-4 h-4 cursor-pointer outline-none"/>
                    <label htmlFor="verified" className="text-[#333] text-sm">Verified</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="unverified" className="w-4 h-4 cursor-pointer outline-none"/>
                    <label htmlFor="unverified" className="text-[#333] text-sm">Unverified</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="notAvailable" className="w-4 h-4 cursor-pointer outline-none"/>
                    <label htmlFor="notAvailable" className="text-[#333] text-sm">Not available</label>
                </div>
            </div>
        </div>
    )
}