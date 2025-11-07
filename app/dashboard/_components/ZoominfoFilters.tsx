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
import { FaUsersRays } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

import jobTitleData from '@/public/Data.json'
import industryData from '@/public/IndustryData.json'
import websiteData from '@/public/websiteData.json'
import revenue from '@/public/demoRevenue.json'
import employeeSize from '@/public/employeeSize.json'
import locationData from '@/public/demoLocationdata.json'
import emailData from '@/public/demoEmailData.json'
import keywordData from "@/public/KeywordData.json";

// Types for better type safety
type FilterState = {
  email: string[];
  leadTitle: string[];
  companyWebsite: string[];
  industry: string[];
  employeeSize: string[];
  companyRevenue: string[];
  location: string[];
  keywords: string[];
};

const INITIAL_FILTER_STATE: FilterState = {
  email: [],
  leadTitle: [],
  companyWebsite: [],
  industry: [],
  employeeSize: [],
  companyRevenue: [],
  location: [],
  keywords: []
};

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

export default function ZoominfoFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [openRevenue, setOpenRevenue] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: FilterState = { ...INITIAL_FILTER_STATE };

    // Helper function to parse comma-separated params
    const parseParam = (param: string | null): string[] =>
      param ? param.split(',').filter(Boolean) : [];

    initialFilters.email = parseParam(searchParams.get('email'));
    initialFilters.leadTitle = parseParam(searchParams.get('lead_title'));
    initialFilters.companyWebsite = parseParam(searchParams.get('company_website'));
    initialFilters.industry = parseParam(searchParams.get('industry'));
    initialFilters.keywords = parseParam(searchParams.get('keywords'));
    initialFilters.employeeSize = parseParam(searchParams.get('employee_size'));
    initialFilters.companyRevenue = parseParam(searchParams.get('company_revenue'));
    initialFilters.location = parseParam(searchParams.get('location'));
    setFilters(initialFilters);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Add all filters to URL params only if they have values
    if (filters.email.length > 0) params.set('email', filters.email.join(','));
    if (filters.leadTitle.length > 0) params.set('lead_title', filters.leadTitle.join(','));
    if (filters.companyWebsite.length > 0) params.set('company_website', filters.companyWebsite.join(','));
    if (filters.companyRevenue.length > 0) params.set('company_revenue', filters.companyRevenue.join(','));
    if (filters.industry.length > 0) params.set('industry', filters.industry.join(','));
    if (filters.keywords.length > 0) params.set('keywords', filters.keywords.join(','));
    if (filters.employeeSize.length > 0) params.set('employee_size', filters.employeeSize.join(','));
    if (filters.location.length > 0) params.set('location', filters.location.join(','));

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
      key: 'lead_titles',
      props: {
        data: jobTitleData,
        title: "Lead title",
        subTitle: "Lead titles",
        Icon: <GiArcheryTarget />,
        selectedData: filters.leadTitle,
        onUpDate: (data: string[]) => updateFilter('leadTitle', data)
      }
    },
    {
      type: 'regular',
      key: 'industry',
      props: {
        data: industryData,
        title: "Industry",
        subTitle: "Industries",
        Icon: <LiaIndustrySolid />,
        selectedData: filters.industry,
        onUpDate: (data: string[]) => updateFilter('industry', data)
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
      key: 'company_website',
      props: {
        data: websiteData,
        title: "Company Website",
        subTitle: "Company Websities",
        Icon: <CgWebsite />,
        selectedData: filters.companyWebsite,
        onUpDate: (data: string[]) => updateFilter('companyWebsite', data)
      }
    },
    {
      type: 'regular',
      key: 'companyRevenue',
      props: {
        data: revenue,
        title: "Company Revenue",
        subTitle: "Company revenue",
        Icon: <GiProfit />,
        selectedData: filters.companyRevenue,
        onUpDate: (data: string[]) => updateFilter('companyRevenue', data)
      }
    },
    {
      type: 'regular',
      key: 'employeeSize',
      props: {
        data: employeeSize,
        title: "Emloyee Size",
        subTitle: "Employee size",
        Icon: <FaUsersRays />,
        selectedData: filters.employeeSize,
        onUpDate: (data: string[]) => updateFilter('employeeSize', data)
      }
    },
    {
      type: 'regular',
      key: 'location',
      props: {
        data: locationData,
        title: "Location",
        subTitle: "Locations",
        Icon: <IoLocationOutline />,
        selectedData: filters.location,
        onUpDate: (data: string[]) => updateFilter('location', data)
      }
    }
  ], [filters, updateFilter]);

  // Render the appropriate component based on filter type
  const renderFilterComponent = (config: FilterConfig) => {
    switch (config.type) {
      case 'email':
        return <EmailFilter key={config.key} {...config.props} />;
      case 'regular':
        return <Filters key={config.key} {...config.props} />;
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
      </div>
    </div>
  );
}