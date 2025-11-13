'use client'


import { useEffect, useState } from "react";
import ApolloDataTable from "../_components/ApolloDataTable"
import { UserService } from "@/userservice/user.service";


type dataType= {
  first_name: string;
  last_name: string;
  title: string;
  company_name: string;
  company_name_for_emails: string;
  email: string;
  email_status: string;
  primary_email_source: string;
  primary_email_verification_source: string;
  email_confidence: string;
  primary_email_catchall_status: string;
  primary_email_last_verified_at: string;
  seniority: string;
  departments: string;
  contact_owner: string;
  work_direct_phone: string;
  home_phone: string;
  mobile_phone: string;
  corporate_phone: string;
  other_phone: string;
  stage: string;
  lists: string;
  last_contacted: string;
  account_owner: string;
  employees: string;
  industry: string;
  keywords: string;
  person_linkedin_url: string;
  website: string;
  company_linkedin_url: string;
  facebook_url: string;
  twitter_url: string;
  city: string;
  state: string;
  country: string;
  company_address: string;
  company_city: string;
  company_state: string;
  company_country: string;
  company_phone: string;
  technologies: string;
  annual_revenue: string;
  total_funding: string;
  latest_funding: string;
  latest_funding_amount: string;
  last_raised_at: string;
  subsidiary_of: string;
  email_sent: string;
  email_open: string;
  email_bounced: string;
  replied: string;
  demoed: string;
  number_of_retail_locations: string;
  apollo_contact_id: string;
  apollo_account_id: string;
  secondary_email: string;
  secondary_email_source: string;
  secondary_email_status: string;
  secondary_email_verification_source: string;
  tertiary_email: string;
  tertiary_email_ource: string;
  tertiary_email_status: string;
  tertiary_email_verification_source: string;
}

type paginationType={
    total: number;
    page: number;
    pages: number;
    limit: number;
}


export default function sells() {
    const [data,setData] = useState<dataType[]>([])
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
            const res = await UserService?.getFilteredApolloData({
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
        getSalesData({page:currentPage});
    },[currentPage])
    return(
        <div className="w-full bg-gray-100 overflow-hidden" style={{height: 'calc(100vh - 56px)'}}>
            <ApolloDataTable data={data} pagination={pagination} onPageChange={(page)=>setCurrentPage(page)}/>
        </div>
    )
}