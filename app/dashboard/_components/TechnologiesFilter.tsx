'use client'

import { useState, useMemo, useRef, useEffect } from "react";
import { GrTechnology } from "react-icons/gr";
import { FaCaretUp, FaCaretDown, FaCheck } from "react-icons/fa";
import data from "@/public/TechnologyData.json";

interface Industry {
  id: string;
  name: string;
}

export default function TechnologiesFilter() {
  const [open, setOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

  const industryOptions = useMemo(() => data, [data]);

  // Toggle dropdown open/close when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

  // Handle selecting/deselecting an option
  const toggleSelect = (id: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedLabels = industryOptions
    .filter((i) => selectedIndustries.includes(i.id))
    .map((i) => i.name);

  return (
    <div
      className={`${
        open ? "border border-blue-300" : "border-b border-gray-300"
      } w-full duration-200 bg-white relative`}
    >
      {/* Dropdown Header */}
      <button
        type="button"
        className={`flex cursor-pointer px-4 pt-4 justify-between items-center w-full outline-none ${
          open ? "text-blue-400" : "text-gray-600"
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <GrTechnology />
          <span>Technology</span>
        </div>
        {open ? <FaCaretUp /> : <FaCaretDown />}
      </button>

      {/* Dropdown Content */}
      <div
        className={`${
          open ? " p-4 border-t border-gray-200" : "max-h-0"
        } duration-300 overflow-hidden`}
      >
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((name) => (
              <span
                key={name}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm"
              >
                {name}
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No technolory selected</p>
          )}
        </div>

        <ul className="max-h-60 overflow-y-auto space-y-1">
          {industryOptions.map((item) => (
            <li
              key={item.id}
              onClick={() => toggleSelect(item.id)}
              className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer hover:bg-blue-50 ${
                selectedIndustries.includes(item.id)
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600"
              }`}
            >
              <span>{item.name}</span>
              {selectedIndustries.includes(item.id) && (
                <FaCheck className="text-blue-500 text-sm" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
