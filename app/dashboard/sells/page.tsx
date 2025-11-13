'use client'

import SellsDataTable from "@/app/_components/SellsDataTable"
import { UserService } from "@/userservice/user.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


type dataType={
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

type paginationType={
    total: number;
    page: number;
    pages: number;
    limit: number;
}


export default function sells() {
    const [data,setData] = useState<dataType[]>([]);
    const search = useSearchParams();
    const [pagination,setPagination] = useState<paginationType>({
        total: 1,
        page: 1,
        pages: 1,
        limit: 20
    })
    const [currentPage,setCurrentPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const getSalesData= async({page=1,limit=20}:{page?:number,limit?:number})=>{
        setLoading(true);
        try{
            const res = await UserService?.getFilteredSalesData({
                page: page,
                limit: limit
            });
            console.log(res)
            if(res?.data?.success){
                setData(res?.data?.data);
                setPagination(res?.data?.meta)
            }
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        console.log("Pathname : ",search)
        getSalesData({page:currentPage});
    },[currentPage,search])

    return (
        <div className="w-full bg-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
            <SellsDataTable data={data} pagination={pagination} onPageChange={(page)=>setCurrentPage(page)}/>
        </div>
    )
}