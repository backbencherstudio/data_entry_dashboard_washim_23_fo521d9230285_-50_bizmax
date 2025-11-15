'use client'

import ZoominfoDataTable from "@/app/_components/ZoominfoDataTable"
import { UserService } from "@/userservice/user.service";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTotalData } from "@/hooks/TotalDataContext";
import Loader from "@/app/_components/Loader";

type FilterState = {
    email: string[];
    lead_titles: string[];
    company_website: string[];
    company_industry: string[];
    company_size: string[];
    revenue_range: string[];
    company_location_text: string[];
    keyword: string[];
};

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

const INITIAL_FILTER_STATE: FilterState = {
    email: [],
    lead_titles: [],
    company_website: [],
    company_industry: [],
    company_size: [],
    revenue_range: [],
    company_location_text: [],
    keyword: []
};

type paginationType = {
    total: number;
    page: number;
    pages: number;
    limit: number;
}


export default function sells() {
    const [data, setData] = useState<dataType[]>([])
    const { totalData, updateTotalData, resetTotalData, updateFilters } = useTotalData();
    const [pagination, setPagination] = useState<paginationType>({
        total: 1,
        page: 1,
        pages: 1,
        limit: 20
    })
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
    const getSalesData = async ({ page = 1, limit = 20 }: { page?: number, limit?: number }) => {
        setLoading(true);
        try {
            const res = await UserService?.getFilteredZoominfoData({
                page: page,
                limit: limit,
                filters
            });
            console.log(res)
            if (res?.data?.success) {
                setData(res?.data?.data);
                setPagination(res?.data?.meta)
                updateTotalData(res?.data?.meta?.total)
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSalesData({ page: currentPage });
    }, [currentPage, filters])

    useEffect(() => {
        const initialFilters: FilterState = { ...INITIAL_FILTER_STATE };

        // Helper function to parse comma-separated params
        const parseParam = (param: string | null, separator?: string): string[] =>
            param ? param.split(separator || ',').filter(Boolean) : [];

        initialFilters.email = parseParam(searchParams.get('email'));
        initialFilters.lead_titles = parseParam(searchParams.get('lead_title'));
        initialFilters.company_website = parseParam(searchParams.get('company_website'));
        initialFilters.company_industry = parseParam(searchParams.get('industry'));
        initialFilters.keyword = parseParam(searchParams.get('keywords'));
        initialFilters.company_size = parseParam(searchParams.get('employee_size'), '|');
        initialFilters.revenue_range = parseParam(searchParams.get('company_revenue'));
        initialFilters.company_location_text = parseParam(searchParams.get('location'), "|");
        setCurrentPage(1)
        setFilters(initialFilters);
        updateFilters('zoominfo', initialFilters)
    }, [searchParams]);

    if (loading) {
        return <Loader />
    }

    return (
        <div className="w-full bg-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
            <ZoominfoDataTable data={data} pagination={pagination} onPageChange={(page) => setCurrentPage(page)} />
        </div>
    )
}