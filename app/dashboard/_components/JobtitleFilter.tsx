'use client'

import { GiArcheryTarget } from "react-icons/gi";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import data from '@/public/Data.json'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function JobtitleFilter() {
    const [open, setOpen] = useState(false);
    return (
        <div className={`${open ? "border border-blue-300" : "border-b border-gray-300"} w-full duration-200`}>
            <button type="button" className={`flex cursor-pointer px-4 pt-4 justify-between items-center w-full outline-none ${open ? "text-blue-300" : "text-gray-500"}`} onClick={() => setOpen(prev => !prev)}>
                <div className="flex items-center gap-2">
                    <GiArcheryTarget />
                    <span>Job title</span>
                </div>
                {open ? <FaCaretUp /> : <FaCaretDown />}
            </button>
            <div className={`${open ? "h-fit p-4" : "h-0"} duration-200 overflow-hidden space-y-4`}>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select job title" />
                    </SelectTrigger>
                    <SelectContent>
                        {data?.map(item =>
                            <SelectItem value={item?.id}>{item?.title}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}