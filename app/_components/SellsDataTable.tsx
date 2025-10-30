'use client'

import DynamicTable from "@/helper/DynamicTable"
import tableData from '@/public/sellsData.json'
import { PaginationPage } from "./PaginationPage"
import Loader from "./Loader"
import { useEffect, useState } from "react"

type dataType={
    id: string;
    first_name: string;
    last_name: string;
    job_title: string;
    email_first: string;
    email_second: string;
    phone: string;
    company_phone: string;
    url: string;//linkedurl
    company_name: string;
    company_id: string;
    company_domain: string;
    location: string;
    linkedin_id: string;
    created_at: string;
}

export default function SellsDataTable() {
    const [loading, setLoading] = useState(true);
    const isLogin = localStorage?.getItem('islogin') === 'true';
    useEffect(() => {
        setLoading(false);
    }, [])
    const columns = [
        {
            label: "First Name",
            accessor: "first_name",
            width: "160px",
            formatter: (first_name: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {first_name}
                    </span>
                </div>
            )
        },
        {
            label: "Last Name",
            accessor: "last_name",
            width: "160px",
            formatter: (last_name: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {last_name}
                    </span>
                </div>
            )
        },
        {
            label: "Job Title",
            accessor: "job_title",
            width: "160px",
            formatter: (title: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {title}
                    </span>
                </div>
            )
        },
        {
            label: "Email First",
            accessor: "email_first",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                </div>
            )
        },
        {
            label: "Email Second",
            accessor: "email_second",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Phone",
            accessor: "phone",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Company Phone",
            accessor: "company_phone",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Linkedin Url",
            accessor: "url",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Company Name",
            accessor: "company_name",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Company Domain",
            accessor: "company_domain",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Company Id",
            accessor: "company_id",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Location",
            accessor: "city",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Linkedin Id",
            accessor: "linkedin_id",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Created Date",
            accessor: "created_at",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor?.split('T')?.[0]}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
    ]

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2B2926]"></div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 pb-8">
            <div className="flex-1">
                <DynamicTable data={tableData} columns={columns} />
            </div>
            <div className="w-full">
                <PaginationPage totalItems={isLogin ? 1000 : 20} itemsPerPage={20} onPageChange={(page) => { console.log("Page changed : ", page) }} isLogin={isLogin} />
            </div>
        </div>
    )
}