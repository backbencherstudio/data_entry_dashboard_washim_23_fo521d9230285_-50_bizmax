'use client'

import DynamicTable from "@/helper/DynamicTable"
import tableData from '@/public/tableData.json'
import { PaginationPage } from "./PaginationPage"
import Loader from "./Loader"
import { useEffect, useState } from "react"

export default function DataTable() {
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
            label: "Title",
            accessor: "title",
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
            label: "Company Name",
            accessor: "company_name",
            width: "160px",
            formatter: (company_name: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    <span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {company_name}
                    </span>
                </div>
            )
        },
        {
            label: "Company Name for Emails",
            accessor: "company_name_for_emails",
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
            label: "Email Status",
            accessor: "email_status",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Primary Email Source",
            accessor: "primary_email_source",
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
            label: "Primary Email Verification Source",
            accessor: "primary_email_verification_source",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Email Confidence",
            accessor: "email_confidence",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Primary Email Catch-all Status",
            accessor: "primary_email_catchall_status",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Primary Email Last Verified At",
            accessor: "primary_email_last_verified_at",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Seniority",
            accessor: "seniority",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Departments",
            accessor: "departments",
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
            label: "Contact Owner",
            accessor: "contact_owner",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Work Direct Phone",
            accessor: "work_direct_phone",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Home Phone",
            accessor: "home_phone",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Mobile Phone",
            accessor: "mobile_phone",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Corporate Phone",
            accessor: "corporate_phone",
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
            label: "Other Phone",
            accessor: "other_phone",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Stage",
            accessor: "stage",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Lists",
            accessor: "lists",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Last Contacted",
            accessor: "last_contacted",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Account Owner",
            accessor: "account_owner",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Employees",
            accessor: "employees",
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
            label: "Industry",
            accessor: "industry",
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
            label: "Keywords",
            accessor: "keywords",
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
        },
        {
            label: "Person Linkedin Url",
            accessor: "person_linkedin_url",
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
            label: "Website",
            accessor: "website",
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
            label: "Company Linkedin Url",
            accessor: "company_linkedin_url",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Facebook Url",
            accessor: "facebook_url",
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
            label: "Twitter Url",
            accessor: "twitter_url",
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
            label: "City",
            accessor: "city",
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
            label: "State",
            accessor: "state",
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
            label: "Country",
            accessor: "country",
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
            label: "Company Address",
            accessor: "company_address",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Company city",
            accessor: "company_city",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Company state",
            accessor: "company_state",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Company country",
            accessor: "company_country",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
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
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Technologies",
            accessor: "technologies",
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
            label: "Annual Revenue",
            accessor: "annual_revenue",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Total Funding",
            accessor: "total_funding",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Latest Funding",
            accessor: "latest_funding",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Latest Funding Amount",
            accessor: "latest_funding_amount",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Last Raised At",
            accessor: "last_raised_at",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                   {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Subsidiary of",
            accessor: "subsidiary_of",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Email Sent",
            accessor: "email_sent",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Email Open",
            accessor: "email_open",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Email Bounced",
            accessor: "email_bounced",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Replied",
            accessor: "replied",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Demoed",
            accessor: "demoed",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Number of Retail Locations",
            accessor: "number_of_retail_locations",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Apollo Contact Id",
            accessor: "apollo_contact_id",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Apollo Account Id",
            accessor: "apollo_account_id",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Secondary Email",
            accessor: "secondary_email",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Secondary Email Source",
            accessor: "secondary_email_source",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Secondary Email Status",
            accessor: "secondary_email_status",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Secondary Email Verification Source",
            accessor: "secondary_email_verification_source",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Tertiary Email",
            accessor: "tertiary_email",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Tertiary Email Source",
            accessor: "tertiary_email_ource",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Tertiary Email Status",
            accessor: "tertiary_email_status",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
                    </span>
                    :
                    <span className="w-full h-full bg-[#cebcbc] blur-xs">-</span>}
                </div>
            )
        },
        {
            label: "Tertiary Email Verification Source",
            accessor: "tertiary_email_verification_source",
            width: "160px",
            formatter: (accessor: any, row: any) => (
                <div className='flex items-center gap-2 p-4'>
                    {isLogin?<span className='text-[#111827] text-nowrap font-normal text-[12px] leading-[24px]'>
                        {accessor}
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
            {isLogin && <div className="w-full">
                <PaginationPage totalItems={1000} itemsPerPage={20} onPageChange={(page) => { console.log("Page changed : ", page) }} />
            </div>}
        </div>
    )
}