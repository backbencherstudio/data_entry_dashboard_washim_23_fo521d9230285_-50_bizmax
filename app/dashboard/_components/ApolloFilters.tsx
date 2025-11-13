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

// Types for better type safety
type FilterState = {
  email: string[];
  jobTitles: string[];
  industries: string[];
  keywords: string[];
  technologies: string[];
  websites: string[];
  domains: string[];
  companyLinkedin: string[];
  countries: string[];
  cities: string[];
  states: string[];
  minAnnualRevenue: number;
  maxAnnualRevenue: number;
};

const INITIAL_FILTER_STATE: FilterState = {
  email: [],
  jobTitles: [],
  industries: [],
  keywords: [],
  technologies: [],
  websites: [],
  domains: [],
  companyLinkedin: [],
  countries: [],
  cities: [],
  states: [],
  minAnnualRevenue: 0,
  maxAnnualRevenue: 1000
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
  const [searchItem,setSearchItem] = useState<{key:string,value:string}>({
    key:'',
    value:''
  });

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: FilterState = { ...INITIAL_FILTER_STATE };
    
    // Helper function to parse comma-separated params
    const parseParam = (param: string | null): string[] => 
      param ? param.split(',').filter(Boolean) : [];

    initialFilters.email = parseParam(searchParams.get('email'));
    initialFilters.jobTitles = parseParam(searchParams.get('jobTitles'));
    initialFilters.industries = parseParam(searchParams.get('industries'));
    initialFilters.keywords = parseParam(searchParams.get('keywords'));
    initialFilters.technologies = parseParam(searchParams.get('technologies'));
    initialFilters.websites = parseParam(searchParams.get('websites'));
    initialFilters.domains = parseParam(searchParams.get('domains'));
    initialFilters.companyLinkedin = parseParam(searchParams.get('companyLinkedin'));
    initialFilters.countries = parseParam(searchParams.get('countries'));
    initialFilters.cities = parseParam(searchParams.get('cities'));
    initialFilters.states = parseParam(searchParams.get('states'));
    initialFilters.minAnnualRevenue = Number(searchParams.get('min_annual_revenue')) || 0;
    initialFilters.maxAnnualRevenue = Number(searchParams.get('max_annual_revenue')) || 1000;

    setFilters(initialFilters);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Add all filters to URL params only if they have values
    if (filters.email.length > 0) params.set('email', filters.email.join(','));
    if (filters.jobTitles.length > 0) params.set('jobTitles', filters.jobTitles.join(','));
    if (filters.industries.length > 0) params.set('industries', filters.industries.join(','));
    if (filters.keywords.length > 0) params.set('keywords', filters.keywords.join(','));
    if (filters.technologies.length > 0) params.set('technologies', filters.technologies.join(','));
    if (filters.websites.length > 0) params.set('websites', filters.websites.join(','));
    if (filters.domains.length > 0) params.set('domains', filters.domains.join(','));
    if (filters.companyLinkedin.length > 0) params.set('companyLinkedin', filters.companyLinkedin.join(','));
    if (filters.countries.length > 0) params.set('countries', filters.countries.join(','));
    if (filters.cities.length > 0) params.set('cities', filters.cities.join(','));
    if (filters.states.length > 0) params.set('states', filters.states.join(','));
    if (filters.minAnnualRevenue > 0) params.set('min_annual_revenue', filters.minAnnualRevenue.toString());
    if (filters.maxAnnualRevenue > 0 && filters.maxAnnualRevenue !== 1000) params.set('max_annual_revenue', filters.maxAnnualRevenue.toString());

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
        data: jobTitleData,
        title: "Job title",
        subTitle: "Job titles",
        Icon: <GiArcheryTarget />,
        selectedData: filters.jobTitles,
        onUpDate: (data: string[]) => updateFilter('jobTitles', data)
      }
    },
    {
      type: 'regular',
      key: 'industries',
      props: {
        data: industryData,
        title: "Industry",
        subTitle: "Industries",
        Icon: <LiaIndustrySolid />,
        selectedData: filters.industries,
        onUpDate: (data: string[]) => updateFilter('industries', data)
      }
    },
    {
      type: 'regular',
      key: 'keywords',
      props: {
        data: keywordData,
        title: "Keyword",
        subTitle: "Keywords",
        Icon: <VscSymbolKeyword />,
        selectedData: filters.keywords,
        onUpDate: (data: string[]) => updateFilter('keywords', data)
      }
    },
    {
      type: 'regular',
      key: 'technologies',
      props: {
        data: technologyData,
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
        data: websiteData,
        title: "Website",
        subTitle: "Websites",
        Icon: <CgWebsite />,
        selectedData: filters.websites,
        onUpDate: (data: string[]) => updateFilter('websites', data)
      }
    },
    {
      type: 'regular',
      key: 'domains',
      props: {
        data: domainData,
        title: "Domain",
        subTitle: "Domains",
        Icon: <GrDomain />,
        selectedData: filters.domains,
        onUpDate: (data: string[]) => updateFilter('domains', data)
      }
    },
    {
      type: 'regular',
      key: 'companyLinkedin',
      props: {
        data: companyLinkedinUrlData,
        title: "Company linkedin url",
        subTitle: "Company urls",
        Icon: <CiLinkedin />,
        selectedData: filters.companyLinkedin,
        onUpDate: (data: string[]) => updateFilter('companyLinkedin', data)
      }
    },
    {
      type: 'regular',
      key: 'countries',
      props: {
        data: countryData,
        title: "Country",
        subTitle: "Countries",
        Icon: <TbWorld />,
        selectedData: filters.countries,
        onUpDate: (data: string[]) => updateFilter('countries', data)
      }
    },
    {
      type: 'regular',
      key: 'cities',
      props: {
        data: cityData,
        title: "City",
        subTitle: "Cities",
        Icon: <GiModernCity />,
        selectedData: filters.cities,
        onUpDate: (data: string[]) => updateFilter('cities', data)
      }
    },
    {
      type: 'regular',
      key: 'states',
      props: {
        data: stateData,
        title: "State",
        subTitle: "States",
        Icon: <BsBank />,
        selectedData: filters.states,
        onUpDate: (data: string[]) => updateFilter('states', data)
      }
    }
  ], [filters, updateFilter]);

  // Render the appropriate component based on filter type
  const renderFilterComponent = (config: FilterConfig) => {
    switch (config.type) {
      case 'email':
        return <EmailFilter key={config.key} {...config.props} />;
      case 'regular':
        return <Filters key={config.key} {...config.props} onSearch={(val) => setSearchItem({ key: config?.key, value: val })}/>;
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
        style={{ height: 'calc(100vh - 160px)' }}
      >
        {/* Render all filters dynamically */}
        {filterConfigs.map(renderFilterComponent)}

        {/* Annual Revenue Filter */}
        <div className={`${openRevenue ? "border border-gray-300" : "border-b border-gray-300"} w-full duration-200`}>
          <button
            type="button"
            className={`flex cursor-pointer px-4 pt-4 justify-between items-center w-full outline-none ${
              openRevenue ? "text-blue-300" : "text-gray-500"
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
        </div>
      </div>
    </div>
  );
}