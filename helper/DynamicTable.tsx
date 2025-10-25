"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineSelector,
} from "react-icons/hi";

interface ColumnConfig {
  label: React.ReactNode;
  width: any;
  accessor: string;
  sortable?: boolean;
  formatter?: (value: any, row: any) => React.ReactNode;
}

interface SortConfig {
  key: string;
  direction: "ascending" | "descending";
}

interface DynamicTableProps {
  columns: ColumnConfig[];
  data: any[];
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onView?: (row: any) => void;
  onDelete?: (id: any) => void;
  noDataMessage?: string;
  sortConfig?: SortConfig | null;
  onSort?: (key: string) => void;
  header?: {
    bg?: string;
    padding?: string;
    text?: string;
    rounded?: string;
  },
  tableMinWidth?: string;
  tableMaxWidth?: string;
}

export default function DynamicTable({
  columns,
  data,
  currentPage = 0,
  itemsPerPage,
  onPageChange = () => { },
  onView,
  onDelete,
  noDataMessage = "No data found.",
  sortConfig,
  onSort,
  header,
  tableMinWidth = "1000px",
  tableMaxWidth = '300px'
}: DynamicTableProps) {
  const totalPages = itemsPerPage ? Math.ceil(data.length / itemsPerPage) : 0;
  const paginatedData = itemsPerPage ? data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) : data;

  useEffect(()=>{
    console.log("Paginated shift data : ",paginatedData)
  },[paginatedData])

  const renderSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <HiOutlineSelector className="w-5 h-5 text-headerColor" />;
    }
    if (sortConfig.direction === "ascending") {
      return <HiOutlineChevronUp className="w-4 h-4" />;
    }
    return <HiOutlineChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="h-full">
      {/* Table Wrapper with Border & Radius */}
      <div className="overflow-hidden rounded-t-md h-full">
        <div className="overflow-x-auto h-full w-full max-w-['calc(100vw - 408px)']"
          style={{
            maxWidth: 'calc(100vw - var(--sidebar-width))'
          }}
        >
          <table className="w-full text-left">
            <thead className="">
              <tr style={{borderRadius: '100%'}}>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    style={{ width: col.width || "auto" }}
                    className="text-[#687588]  py-3 whitespace-nowrap text-base font-medium capitalize  text-descriptionColor border-b border-[#EDEDED]"
                  // onClick={() =>
                  //   col.sortable && onSort && onSort(col.accessor)
                  // }
                  >
                    <div
                      className={`flex items-center gap-1 ${col.sortable ? "cursor-pointer" : ""
                        }`}
                      style={{ background: header?.bg, padding: header?.padding,color: header?.text }}
                    >
                      {col.label}
                      {/* {col.sortable && renderSortIcon(col.accessor)} */}
                    </div>
                  </th>
                ))}
                {(onView || onDelete) && (
                  <th className="px-4 py-3 text-base font-medium text-[#4a4c56] border-b border-border">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData?.length > 0 ? (
                paginatedData.map((row, i) => (
                  <tr key={i} className="border-b border-[#EDEDED]">
                    {columns.map((col, idx) => (
                      <td
                        key={idx}
                        style={{ minWidth: col.width || "auto" }}
                        className=" text-[#4a4c56]"
                      >
                        {col.formatter
                          ? col.formatter(row[col.accessor], row)
                          : row[col.accessor]}
                      </td>
                    ))}
                    {(onView || onDelete) && (
                      <td className="px-4 py-3 flex gap-4 items-center">
                        {onView && (
                          <span
                            className="text-sm underline text-[#4a4c56]  cursor-pointer"
                            onClick={() => onView(row)}
                          >
                            View details
                          </span>
                        )}
                        {onDelete && (
                          <Image
                            onClick={() => onDelete(row.id)}
                            src="/dashboard/icon/delete.svg"
                            alt="delete"
                            width={16}
                            height={16}
                            className="cursor-pointer"
                          />
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-10 text-center text-[#4a4c56] text-sm"
                  >
                    {noDataMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm cursor-pointer rounded-sm text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm cursor-pointer rounded-sm text-gray-700 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}