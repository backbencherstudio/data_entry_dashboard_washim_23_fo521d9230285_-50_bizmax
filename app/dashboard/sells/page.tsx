'use client'

import SellsDataTable from "@/app/_components/SellsDataTable"
import { UserService } from "@/userservice/user.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTotalData } from "@/hooks/TotalDataContext";


type dataType = {
    id: string;
    first_name: string;
    last_name: string;
    job_title: string;
    email_first: string;
    email_second: string;
    phone: string;
    company_phone: string;
    url: string;
    company_name: string;
    company_id: string;
    company_domain: string;
    location: string;
    linkedin_id: string;
    created_at: string;
}

type paginationType = {
    total: number;
    page: number;
    pages: number;
    limit: number;
}

type FilterState = {
    email: string[];
    job_title: string[];
    company_domain: string[];
    urls: string[];
    city: string[];
    email_first: string[];
    email_second: string[];
};

const INITIAL_FILTER_STATE: FilterState = {
    email: [],
    job_title: [],
    company_domain: [],
    urls: [],
    email_first: [],
    email_second: [],
    city: [],
};


export default function sells() {
    const [data, setData] = useState<dataType[]>([]);
    const search = useSearchParams();
    const { totalData, updateTotalData, resetTotalData } = useTotalData();
    const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
    const [pagination, setPagination] = useState<paginationType>({
        total: 1,
        page: 1,
        pages: 1,
        limit: 20
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const getSalesData = async ({ page = 1, limit = 20 }: { page?: number, limit?: number }) => {
        setLoading(true);
        try {
            const res = await UserService?.getFilteredSalesData({
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
        const parseParam = (param: string | null,separator?:string): string[] =>
            param ? param.split(separator||',').filter(Boolean) : [];

        initialFilters.email = parseParam(search.get('email'));
        initialFilters.job_title = parseParam(search.get('jobTitles'));
        initialFilters.company_domain = parseParam(search.get('domains'));
        initialFilters.urls = parseParam(search.get('personalLinkedinUrl'));
        initialFilters.city = parseParam(search.get('location'),'|');
        initialFilters.email_first = parseParam(search.get('email_first'));
        initialFilters.email_second = parseParam(search.get('email_second'));
        setCurrentPage(1)
        setFilters(initialFilters);

    }, [search]);


    return (
        <div className="w-full bg-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
            <SellsDataTable data={data} pagination={pagination} onPageChange={(page) => setCurrentPage(page)} />
        </div>
    )
}