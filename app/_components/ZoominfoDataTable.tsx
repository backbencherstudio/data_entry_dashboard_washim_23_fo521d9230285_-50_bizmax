'use client'

import DynamicTable from "@/helper/DynamicTable"
import { PaginationPage } from "./PaginationPage"
import { useEffect, useState } from "react"
import { CookieHelper } from "@/helper/cookie.helper"

type dataType = {
    id: string;
    company_id: string;
    name: string;
    email: string;
    email_score: number;
    phone: string;
    work_phone: string;
    lead_location: string[];
    lead_divison: string;
    lead_titles: string;
    decision_making_power: string;
    seniority_level: string[];
    linkedin_url: string;
    company_name: string;
    company_size: string;
    company_website: string;
    company_location_text: string;
    company_type: string;
    company_function: string;
    company_sector: string;
    company_industry: string;
    company_founded_at: string;
    company_funding_range: string;
    revenue_range: string;
    ebitda_range: string;
    last_funding_stage: string;
    company_size_key: string;
};

type paginationType = {
    total: number;
    page: number;
    pages: number;
    limit: number;
}


type propType = {
    data: dataType[];
    pagination: paginationType;
    onPageChange: (page: number) => void;
}

export default function ZoominfoDataTable({ data, pagination, onPageChange }: propType) {
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        setLoading(false);
        const userToken = CookieHelper.get({ key: "access_token" });
        if (userToken) {
            setIsLogin(true);
        }
    }, [pagination])
    const columns = [
        {
            label: "Id",
            accessor: "id",
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
            label: "Company Id",
            accessor: "company_id",
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
            label: "Name",
            accessor: "name",
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
            label: "Email",
            accessor: "email",
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
            label: "Email Score",
            accessor: "email_score",
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
                    <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                </div>
            )
        },
        {
            label: "Work Phone",
            accessor: "work_phone",
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
            label: "Lead Location",
            accessor: "lead_location",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {"[" + accessor + "]"}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Lead Division",
            accessor: "lead_divison",
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
            label: "Lead Title",
            accessor: "lead_titles",
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
            label: "Decision Making Power",
            accessor: "decision_making_power",
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
            label: "Seniority Level",
            accessor: "seniority_level",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin ? <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {"[" + accessor + "]"}
                    </span>
                        :
                        <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Linkedin Url",
            accessor: "linkedin_url",
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
                    <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor?.split(',')?.[0]}
                    </span>
                    {accessor?.split(',')?.length > 1 && <span className="text-[10px] px-1 bg-gray-300 rounded-sm text-black font-medium">
                        +{accessor?.split(',')?.length}
                    </span>}
                </div>
            )
        },
        {
            label: "Company Size",
            accessor: "company_size",
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
            label: "Company Website",
            accessor: "company_website",
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
            label: "Company Location Text",
            accessor: "company_location_text",
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
            label: "Company Type",
            accessor: "company_type",
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
            label: "Company Function",
            accessor: "company_function",
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
            label: "Company Sector",
            accessor: "company_sector",
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
            label: "Company Industry",
            accessor: "company_industry",
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
            label: "Company Founded At",
            accessor: "company_founded_at",
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
            label: "Company Funding Range",
            accessor: "company_funding_range",
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
            label: "Revenue Range",
            accessor: "revenue_range",
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
            label: "Ebitda Range",
            accessor: "ebitda_range",
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
            label: "Last Funding stage",
            accessor: "last_funding_stage",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor?.split(',')?.[0]}
                    </span>
                    {accessor?.split(',')?.length > 1 && <span className="text-[10px] px-1 bg-gray-300 rounded-sm text-black font-medium">
                        +{accessor?.split(',')?.length}
                    </span>}
                </div>
            )
        },
        {
            label: "Company Size Key",
            accessor: "company_size_key",
            width: "160px",
            formatter: (accessor: string, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor?.split(',')?.[0]}
                    </span>
                    {accessor?.split(',')?.length > 1 && <span className="text-[10px] px-1 bg-gray-300 rounded-sm font-medium">
                        +{accessor?.split(',')?.length}
                    </span>}
                </div>
            )
        }
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
                <DynamicTable data={data} columns={columns} />
            </div>
            <div className="w-full">
                <PaginationPage totalItems={pagination?.total} itemsPerPage={pagination?.limit} onPageChange={(page) => { onPageChange(page) }} isLogin={isLogin} />
            </div>
        </div>
    )
}