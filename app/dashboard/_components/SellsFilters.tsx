'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo, ReactElement } from "react";
import EmailFilter from "./EmailFilter"
import Filters from "@/app/_components/Filters"
import { GiArcheryTarget } from "react-icons/gi";
import { GrDomain } from "react-icons/gr";

import jobTitleData from '@/public/Data.json'
import domainData from '@/public/domainData.json';
import personalLinkedin from '@/public/personalLinkedinUrl.json';
import { CiLinkedin } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import locationData from '@/public/demoLocationdata.json'
import emailData from '@/public/demoEmailData.json'
import { UserService } from "@/userservice/user.service";

// Types for better type safety
type FilterState = {
  email: string[];
  jobTitles: string[];
  domains: string[];
  personalLinkedinUrls: string[];
  location: string[];
  emailFirst: string[];
  emailSecond: string[];
};

const INITIAL_FILTER_STATE: FilterState = {
  email: [],
  jobTitles: [],
  domains: [],
  personalLinkedinUrls: [],
  emailFirst: [],
  emailSecond: [],
  location: [],
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

export default function SellsFilters() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const [searchItem, setSearchItem] = useState<{ key: string; value: string }>({
    key: "",
    value: ""
  });
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [openRevenue, setOpenRevenue] = useState(false);

  //filter states

  const [jobTitles, setJobTitles] = useState<filterType[]>([])
  const [companyDomain, setCompanyDomain] = useState<filterType[]>([])
  const [linkedInUrl, setLinkedInUrl] = useState<filterType[]>([])
  const [location, setLocation] = useState<filterType[]>([])
  const [emailFirst, setEmailFirst] = useState<filterType[]>([])
  const [emailSecond, setEmailSecond] = useState<filterType[]>([])




  const getFilters = async (search: string) => {
    try {
      const res = await UserService?.getFilters({ filter: searchItem?.key || search, search: searchItem?.value });
      if (res?.data?.success) {
        if (searchItem?.key === "jobTitles" || search === "jobTitles") {
          setJobTitles(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.job_title })));
        }
        if (searchItem?.key === "domains" || search === "domains") {
          setCompanyDomain(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.company_domain })));
        }
        if (searchItem?.key === "personalLinkedin" || search === "personalLinkedin") {
          setLinkedInUrl(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.url })));
        }
        if (searchItem?.key === "location" || search === "location") {
          setLocation(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.location })));
        }
        if (searchItem?.key === "emailFirst" || search === "emailFirst") {
          setEmailFirst(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.email_first })));
        }
        if (searchItem?.key === "emailSecond" || search === "emailSecond") {
          setEmailSecond(res?.data?.data?.map((item: any) => ({ id: item?.id, name: item?.email_second })));
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
    getFilters('domains');
    getFilters('personalLinkedin');
    getFilters('location');
    getFilters('emailFirst');
    getFilters('emailSecond');
  }, [])





  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: FilterState = { ...INITIAL_FILTER_STATE };

    // Helper function to parse comma-separated params
    const parseParam = (param: string | null): string[] =>
      param ? param.split(',').filter(Boolean) : [];

    initialFilters.email = parseParam(searchParams.get('email'));
    initialFilters.jobTitles = parseParam(searchParams.get('jobTitles'));
    initialFilters.domains = parseParam(searchParams.get('domains'));
    initialFilters.personalLinkedinUrls = parseParam(searchParams.get('personalLinkedinUrl'));
    initialFilters.location = parseParam(searchParams.get('location'));
    initialFilters.emailFirst = parseParam(searchParams.get('email_first'));
    initialFilters.emailSecond = parseParam(searchParams.get('email_second'));
    setFilters(initialFilters);
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Add all filters to URL params only if they have values
    if (filters.email.length > 0) params.set('email', filters.email.join(','));
    if (filters.jobTitles.length > 0) params.set('jobTitles', filters.jobTitles.join(','));
    if (filters?.personalLinkedinUrls?.length > 0) params.set('personalLinkedinUrl', filters?.personalLinkedinUrls.join(','));
    if (filters?.location?.length > 0) params.set('location', filters?.location.join('|'));
    if (filters?.domains?.length > 0) params.set('domains', filters?.domains.join(','));
    if (filters?.emailFirst?.length > 0) params.set('email_first', filters?.emailFirst.join(','));
    if (filters?.emailSecond?.length > 0) params.set('email_second', filters?.emailSecond.join(','));

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
      type: 'regular',
      key: 'jobTitle',
      props: {
        data: jobTitles,
        title: "Job title",
        subTitle: "Job titles",
        Icon: <GiArcheryTarget />,
        selectedData: filters.jobTitles,
        onUpDate: (data: string[]) => updateFilter('jobTitles', data)
      }
    },
    {
      type: 'regular',
      key: 'domains',
      props: {
        data: companyDomain,
        title: "Company Domain",
        subTitle: "Domains",
        Icon: <GrDomain />,
        selectedData: filters.domains,
        onUpDate: (data: string[]) => updateFilter('domains', data)
      }
    },
    {
      type: 'regular',
      key: 'personalLinkedin',
      props: {
        data: linkedInUrl,
        title: "Personal Linkedin Url",
        subTitle: "Linkedin urls",
        Icon: <CiLinkedin />,
        selectedData: filters?.personalLinkedinUrls,
        onUpDate: (data: string[]) => updateFilter('personalLinkedinUrls', data)
      }
    },
    {
      type: 'regular',
      key: 'location',
      props: {
        data: location,
        title: "Location",
        subTitle: "Locations",
        Icon: <IoLocationOutline />,
        selectedData: filters?.location,
        onUpDate: (data: string[]) => updateFilter('location', data)
      }
    },
    {
      type: 'regular',
      key: 'emailFirst',
      props: {
        data: emailFirst,
        title: "Email First",
        subTitle: "Email first",
        Icon: <MdOutlineEmail />,
        selectedData: filters?.emailFirst,
        onUpDate: (data: string[]) => updateFilter('emailFirst', data)
      }
    },
    {
      type: 'regular',
      key: 'emailSecond',
      props: {
        data: emailSecond,
        title: "Email Second",
        subTitle: "Email second",
        Icon: <MdOutlineEmail />,
        selectedData: filters?.emailSecond,
        onUpDate: (data: string[]) => updateFilter('emailSecond', data)
      }
    }
  ], [filters, updateFilter, jobTitles, companyDomain, location, linkedInUrl, emailFirst, emailSecond]);


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
      </div>
    </div>
  );
}