'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo, ReactElement } from "react";
import EmailFilter from "./EmailFilter"
import Filters from "@/app/_components/Filters"
import PriceRangeSelector from "@/app/_components/PriceRangeSelector";
import { VscSymbolKeyword } from "react-icons/vsc";
import { GiArcheryTarget, GiModernCity, GiProfit } from "react-icons/gi";
import { LiaIndustrySolid } from "react-icons/lia";
import { GrTechnology, GrDomain } from "react-icons/gr";
import { CgWebsite } from "react-icons/cg";
import { CiLinkedin } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { BsBank } from "react-icons/bs";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

// Import JSON data
import keywordData from "@/public/KeywordData.json";
import jobTitleData from '@/public/Data.json'
import industryData from '@/public/IndustryData.json'
import technologyData from "@/public/TechnologyData.json";
import websiteData from '@/public/websiteData.json'
import domainData from '@/public/domainData.json';
import companyLinkedinUrlData from '@/public/companyLinkedinUrl.json'
import countryData from '@/public/countryData.json';
import cityData from '@/public/cityData.json';
import stateData from '@/public/stateData.json';
import { UserService } from "@/userservice/user.service";

// Types for better type safety
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
  annual_revenue:string[];
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
  annual_revenue: [],
};

type filterType = {
  id: string;
  name: string;
}

// Define proper types for filter configurations
interface BaseFilterConfig {
  key: string;
}

interface EmailFilterConfig extends BaseFilterConfig {
  type: 'email';
  props: {
    selectedEmail: string[];
    onUpDate: (data: string[]) => void;
  };
}

interface RegularFilterConfig extends BaseFilterConfig {
  type: 'regular';
  props: {
    data: any[];
    title: string;
    subTitle: string;
    Icon: ReactElement;
    selectedData: string[];
    onUpDate: (data: string[]) => void;
  };
}

type FilterConfig = EmailFilterConfig | RegularFilterConfig;

export default function ApolloFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [openRevenue, setOpenRevenue] = useState(false);
  const [searchItem, setSearchItem] = useState<{ key: string, value: string }>({
    key: '',
    value: ''
  });


  const [jobTitles, setJobTitles] = useState<filterType[]>([])
  const [companyDomain, setCompanyDomain] = useState<filterType[]>([])
  const [linkedInUrl, setLinkedInUrl] = useState<filterType[]>([])
  const [country, setCountry] = useState<filterType[]>([])
  const [city, setCity] = useState<filterType[]>([])
  const [keyword, setKeyword] = useState<filterType[]>([])
  const [industry, setIndustry] = useState<filterType[]>([])
  const [technology, setTechnology] = useState<filterType[]>([])
  const [website, setWebsite] = useState<filterType[]>([])
  const [states, setStates] = useState<filterType[]>([])
  const [annualRevenue, setAnnualRevenue] = useState<filterType[]>([])


    const getFilters = async (search: string) => {
      try {
        const res = await UserService?.getFilters({ filter: searchItem?.key || search, search: searchItem?.value });
        if (res?.data?.success) {
          if (searchItem?.key === "jobTitles" || search === "jobTitles") {
            setJobTitles(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.job_title })));
          }
          if (searchItem?.key === "company_domain" || search === "company_domain") {
            setCompanyDomain(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.website })));
          }
          if (searchItem?.key === "countries" || search === "countries") {
            setCountry(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.country })));
          }
          if (searchItem?.key === "emailFirst" || search === "emailFirst") {
            setCity(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.email_first })));
          }
          if (searchItem?.key === "industries" || search === "industries") {
            setIndustry(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.industry })));
          }
          if (searchItem?.key === "keyword" || search === "keyword") {
            setKeyword(res?.data?.data?.map((item: any) => ({ id: item?.keywords, name: item?.keywords })));
          }
          if (searchItem?.key === "technologies" || search === "technologies") {
            setTechnology(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.technologies })));
          }
          // if (searchItem?.key === "technologies" || search === "technologies") {
          //   setWebsite(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.technologies })));
          // }
          if (searchItem?.key === "websites" || search === "websites") {
            setWebsite(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.website })));
          }
          if (searchItem?.key === "companyLinkedin" || search === "companyLinkedin") {
            setLinkedInUrl(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.company_uinkedin_url })));
          }
          if (searchItem?.key === "cities" || search === "cities") {
            setCity(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.city })));
          }
          if (searchItem?.key === "states" || search === "states") {
            setStates(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.state })));
          }
          if (searchItem?.key === "annual_revenue" || search === "annual_revenue") {
            setAnnualRevenue(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.annual_revenue })));
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  
  
    useEffect(() => {
      getFilters('')
    }, [searchItem])
  
  
    useEffect(() => {
      getFilters('jobTitles');
      getFilters('company_domain');
      getFilters('personalLinkedin');
      getFilters('industries');
      getFilters('keyword');
      getFilters('technologies');
      getFilters('websites');
      getFilters('companyLinkedin');
      getFilters('countries');
      getFilters('cities');
      getFilters('states');
      getFilters('annual_revenue');
    }, [])


    

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: FilterState = { ...INITIAL_FILTER_STATE };

    // Helper function to parse comma-separated params
    const parseParam = (param: string | null,separator?:string): string[] =>
      param ? param.split(separator || ',').filter(Boolean) : [];

    initialFilters.email = parseParam(searchParams.get('email'));
    initialFilters.job_titles = parseParam(searchParams.get('jobTitles'));
    initialFilters.industry = parseParam(searchParams.get('industries'));
    initialFilters.keyword = parseParam(searchParams.get('keywords'),"|");
    initialFilters.technologies = parseParam(searchParams.get('technologies'));
    initialFilters.website = parseParam(searchParams.get('websites'));
    initialFilters.company_domain = parseParam(searchParams.get('domains'));
    initialFilters.company_linkedin = parseParam(searchParams.get('companyLinkedin'));
    initialFilters.country = parseParam(searchParams.get('countries'));
    initialFilters.city = parseParam(searchParams.get('cities'));
    initialFilters.state = parseParam(searchParams.get('states'));
    initialFilters.annual_revenue = parseParam(searchParams.get('annual_revenue'));

    setFilters(initialFilters);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Add all filters to URL params only if they have values
    if (filters.email.length > 0) params.set('email', filters.email.join(','));
    if (filters.job_titles.length > 0) params.set('jobTitles', filters.job_titles.join(','));
    if (filters.industry.length > 0) params.set('industries', filters.industry.join(','));
    if (filters.keyword.length > 0) params.set('keywords', filters.keyword.join('|'));
    if (filters.technologies.length > 0) params.set('technologies', filters.technologies.join(','));
    if (filters.website.length > 0) params.set('websites', filters.website.join(','));
    if (filters.company_domain.length > 0) params.set('domains', filters.company_domain.join(','));
    if (filters.company_linkedin.length > 0) params.set('companyLinkedin', filters.company_linkedin.join(','));
    if (filters.country.length > 0) params.set('countries', filters.country.join(','));
    if (filters.city.length > 0) params.set('cities', filters.city.join(','));
    if (filters.state.length > 0) params.set('states', filters.state.join(','));
    if (filters.annual_revenue.length > 0) params.set('annual_revenue', filters.annual_revenue.join(','));

    // Update URL without page refresh - use replace instead of push to avoid adding to history
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [filters]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, []);

  // Update individual filter
  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Memoized filter configurations to prevent unnecessary re-renders
  const filterConfigs = useMemo((): FilterConfig[] => [
    {
      type: 'email',
      key: 'email',
      props: {
        selectedEmail: filters.email,
        onUpDate: (data: string[]) => updateFilter('email', data)
      }
    },
    {
      type: 'regular',
      key: 'jobTitles',
      props: {
        data: jobTitles,
        title: "Job title",
        subTitle: "Job titles",
        Icon: <GiArcheryTarget />,
        selectedData: filters.job_titles,
        onUpDate: (data: string[]) => updateFilter('job_titles', data)
      }
    },
    {
      type: 'regular',
      key: 'industries',
      props: {
        data: industry,
        title: "Industry",
        subTitle: "Industries",
        Icon: <LiaIndustrySolid />,
        selectedData: filters.industry,
        onUpDate: (data: string[]) => updateFilter('industry', data)
      }
    },
    {
      type: 'regular',
      key: 'keyword',
      props: {
        data: keyword,
        title: "Keyword",
        subTitle: "Keywords",
        Icon: <VscSymbolKeyword />,
        selectedData: filters.keyword,
        onUpDate: (data: string[]) => updateFilter('keyword', data)
      }
    },
    {
      type: 'regular',
      key: 'technologies',
      props: {
        data: technology,
        title: "Technology",
        subTitle: "Technologies",
        Icon: <GrTechnology />,
        selectedData: filters.technologies,
        onUpDate: (data: string[]) => updateFilter('technologies', data)
      }
    },
    {
      type: 'regular',
      key: 'websites',
      props: {
        data: website,
        title: "Website",
        subTitle: "Websites",
        Icon: <CgWebsite />,
        selectedData: filters.website,
        onUpDate: (data: string[]) => updateFilter('website', data)
      }
    },
    // {
    //   type: 'regular',
    //   key: 'company_domain',
    //   props: {
    //     data: companyDomain,
    //     title: "Domain",
    //     subTitle: "Domains",
    //     Icon: <GrDomain />,
    //     selectedData: filters.company_domain,
    //     onUpDate: (data: string[]) => updateFilter('company_domain', data)
    //   }
    // },
    {
      type: 'regular',
      key: 'companyLinkedin',
      props: {
        data: linkedInUrl,
        title: "Company linkedin url",
        subTitle: "Company urls",
        Icon: <CiLinkedin />,
        selectedData: filters.company_linkedin,
        onUpDate: (data: string[]) => updateFilter('company_linkedin', data)
      }
    },
    {
      type: 'regular',
      key: 'countries',
      props: {
        data: country,
        title: "Country",
        subTitle: "Countries",
        Icon: <TbWorld />,
        selectedData: filters.country,
        onUpDate: (data: string[]) => updateFilter('country', data)
      }
    },
    {
      type: 'regular',
      key: 'cities',
      props: {
        data: city,
        title: "City",
        subTitle: "Cities",
        Icon: <GiModernCity />,
        selectedData: filters.city,
        onUpDate: (data: string[]) => updateFilter('city', data)
      }
    },
    {
      type: 'regular',
      key: 'states',
      props: {
        data: states,
        title: "State",
        subTitle: "States",
        Icon: <BsBank />,
        selectedData: filters.state,
        onUpDate: (data: string[]) => updateFilter('state', data)
      }
    },
    {
      type: 'regular',
      key: 'annual_revenue',
      props: {
        data: annualRevenue,
        title: "Annual revenue",
        subTitle: "Revenue",
        Icon: <BsBank />,
        selectedData: filters.annual_revenue,
        onUpDate: (data: string[]) => updateFilter('annual_revenue', data)
      }
    }
  ], [filters, updateFilter,jobTitles,industry,keyword,technology,website,companyDomain,linkedInUrl,country,city,states,annualRevenue]);

  // Render the appropriate component based on filter type
  const renderFilterComponent = (config: FilterConfig) => {
    switch (config.type) {
      case 'email':
        return <EmailFilter key={config.key} {...config.props} />;
      case 'regular':
        return <Filters key={config.key} {...config.props} onSearch={(val) => setSearchItem({ key: config?.key, value: val })} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={resetFilters}
        className="w-full border cursor-pointer py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        Reset filters
      </button>

      <div
        className="overflow-y-auto space-y-2 pb-2 text-nowrap"
      >
        {/* Render all filters dynamically */}
        {filterConfigs.map(renderFilterComponent)}

        {/* Annual Revenue Filter */}
        {/* <div className={`${openRevenue ? "border border-gray-300" : "border-b border-gray-300"} w-full duration-200`}>
          <button
            type="button"
            className={`flex cursor-pointer px-4 pt-4 justify-between items-center w-full outline-none ${openRevenue ? "text-blue-300" : "text-gray-500"
              } hover:text-blue-200 transition-colors`}
            onClick={() => setOpenRevenue(prev => !prev)}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <GiProfit />
              <span>Annual revenue</span>
            </div>
            {openRevenue ? <FaCaretUp /> : <FaCaretDown />}
          </button>
          <div className={`${openRevenue ? "h-fit p-4" : "h-0"} duration-200 overflow-hidden`}>
            <PriceRangeSelector
              minPrice={filters.minAnnualRevenue}
              maxPrice={filters.maxAnnualRevenue}
              onPriceChange={(data: number[]) => {
                updateFilter('minAnnualRevenue', data[0]);
                updateFilter('maxAnnualRevenue', data[1]);
              }}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}