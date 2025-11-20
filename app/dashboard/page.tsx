'use client'


import { useEffect, useState } from "react";
import ApolloDataTable from "../_components/ApolloDataTable"
import { UserService } from "@/userservice/user.service";
import { useSearchParams } from "next/navigation";
import { useTotalData } from "@/hooks/TotalDataContext";
import Loader from "../_components/Loader";


type dataType = {
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

type paginationType = {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

type FilterState = {
  email: string[];
  job_titles: string[];
  industry: string[];
  keyword: string[];
  technologies: string[];
  website: string[];
  company_domain: string[];
  company_linkedin: string[];
  country: string[];
  city: string[];
  state: string[];
  min_annual_revenue: string;
  max_annual_revenue: string;
  min_employee: string;
  max_employee: string;
};

const INITIAL_FILTER_STATE: FilterState = {
  email: [],
  job_titles: [],
  industry: [],
  keyword: [],
  technologies: [],
  website: [],
  company_domain: [],
  company_linkedin: [],
  country: [],
  city: [],
  state: [],
  min_annual_revenue: '',
  max_annual_revenue: '',
  min_employee: '',
  max_employee: ''
};


export default function page() {
  const [data, setData] = useState<dataType[]>([]);
  const { searchText, totalData, updateTotalData, resetTotalData, updateFilters } = useTotalData();
  const [pagination, setPagination] = useState<paginationType>({
    total: 1,
    page: 1,
    pages: 1,
    limit: 20
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const getSalesData = async ({ page = 1, limit = 20, search }: { page?: number, limit?: number, search?: string }) => {
    setLoading(true);
    try {
      const res = await UserService?.getFilteredApolloData({
        page: page,
        limit: limit,
        filters,
        search
      });
      if (res?.data?.success) {
        setData(res?.data?.data);
        setPagination(res?.data?.meta);
        updateTotalData(res?.data?.meta?.total)
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      updateTotalData(0)
      setLoading(false);
    }
  }

  useEffect(() => {
    getSalesData({ page: currentPage, search: searchText });
  }, [currentPage, filters, searchText])


  useEffect(() => {
    const initialFilters: FilterState = { ...INITIAL_FILTER_STATE };
    const parseParam = (param: string | null, separator?: string): string[] =>
      param ? param.split(separator || ',').filter(Boolean) : [];

    initialFilters.email = parseParam(searchParams.get('email'));
    initialFilters.job_titles = parseParam(searchParams.get('jobTitles'));
    initialFilters.industry = parseParam(searchParams.get('industries'));
    initialFilters.keyword = parseParam(searchParams.get('keywords'), "|");
    initialFilters.technologies = parseParam(searchParams.get('technologies'));
    initialFilters.website = parseParam(searchParams.get('websites'));
    initialFilters.company_domain = parseParam(searchParams.get('domains'));
    initialFilters.company_linkedin = parseParam(searchParams.get('companyLinkedin'));
    initialFilters.country = parseParam(searchParams.get('countries'));
    initialFilters.city = parseParam(searchParams.get('cities'));
    initialFilters.state = parseParam(searchParams.get('states'));
    initialFilters.min_annual_revenue = searchParams.get('min_annual_revenue') || '0';
    initialFilters.max_annual_revenue = searchParams.get('max_annual_revenue') || '0';
    initialFilters.min_employee = searchParams.get('min_employee') || '0';
    initialFilters.max_employee = searchParams.get('max_employee') || '0';
    setCurrentPage(1)
    setFilters(initialFilters);
  }, [searchParams]);

  return (
    <div className="w-full bg-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
      {loading ?
        <Loader />
        :
        <ApolloDataTable data={data} pagination={pagination} onPageChange={(page) => setCurrentPage(page)} />
      }
    </div>
  )
}