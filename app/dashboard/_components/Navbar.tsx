import { FaFileUpload } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

import { IoSearch } from "react-icons/io5";

export default function Navbar() {
    return (
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 border border-gray-300 w-fit px-2 py-1 text-sm rounded-md">
                <button type="button" className="cursor-pointer">
                    <IoSearch className="text-gray-500"/>
                </button>
                <input
                    type="text"
                    className="outline-none"
                    placeholder="Search people"
                />
            </div>
            <div className="flex gap-4">
                <button type="button" className="px-4 flex items-center gap-1 py-1 text-sm rounded-md text-white bg-green-500 border border-green-500 cursor-pointer hover:bg-transparent hover:text-green-600 duration-300">
                    <FaFileUpload className="text-xs" />
                    <span>Import</span>
                </button>
                <button type="button" className="px-4 flex items-center gap-1 py-1 text-sm rounded-md text-white bg-green-500 border border-green-500 cursor-pointer hover:bg-transparent hover:text-green-600 duration-300">
                    <FaDownload />
                    <span>Export</span>
                </button>
            </div>
        </div>
    )
}