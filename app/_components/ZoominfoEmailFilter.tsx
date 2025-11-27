'use client'

import { MdOutlineEmail } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useState, useEffect } from "react";

type propType = {
    selectedEmail: string[],
    onUpDate: (data: string[]) => void;
}

export default function ZoominfoEmailFilter({ selectedEmail, onUpDate }: propType) {
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<string[]>(selectedEmail);

    // // Sync local state with props
    useEffect(() => {
        setSelectedData(selectedEmail);
    }, [selectedEmail]);

    const handleEmail = (checked: boolean, type: string) => {
        let updatedData: string[];
        
        if (checked) {
            // Add the type if checked
            updatedData = [...selectedData, type];
        } else {
            // Remove the type if unchecked
            updatedData = selectedData.filter(item => item !== type);
        }
        
        setSelectedData(updatedData);
        onUpDate(updatedData);
    }

    return (
        <div className={`${open ? "border border-gray-300" : "border-b border-gray-300"} w-full duration-200`}>
            <button type="button" className={`flex cursor-pointer px-4 pt-4 justify-between items-center w-full outline-none ${open ? "text-blue-300" : "text-gray-500"}`} onClick={() => setOpen(prev => !prev)}>
                <div className="flex items-center gap-2">
                    <MdOutlineEmail />
                    <span>Email</span>
                </div>
                {open ? <FaCaretUp /> : <FaCaretDown />}
            </button>
            <div className={`${open ? "h-fit p-4" : "h-0"} duration-200 overflow-hidden space-y-4`}>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="verified"
                        className="w-4 h-4 cursor-pointer outline-none"
                        checked={selectedData.includes('verified')}
                        onChange={(e) => handleEmail(e.target.checked, 'verified')}
                    />
                    <label htmlFor="verified" className="text-[#333] text-sm">Available</label>
                </div>
                {/* <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="unverified" 
                        className="w-4 h-4 cursor-pointer outline-none" 
                        checked={selectedData.includes('unverified')}
                        onChange={(e) => handleEmail(e.target.checked, 'unverified')}
                    />
                    <label htmlFor="unverified" className="text-[#333] text-sm">Unverified</label>
                </div> */}
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="notAvailable" 
                        className="w-4 h-4 cursor-pointer outline-none" 
                        checked={selectedData.includes('notAvailable')}
                        onChange={(e) => handleEmail(e.target.checked, 'notAvailable')}
                    />
                    <label htmlFor="notAvailable" className="text-[#333] text-sm">Not available</label>
                </div>
            </div>
        </div>
    )
}