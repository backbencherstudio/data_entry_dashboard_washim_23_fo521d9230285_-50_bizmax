'use client'

import EmailFilter from "./EmailFilter"
import Filters from "@/app/_components/Filters"
import keywordData from "@/public/KeywordData.json";
import { VscSymbolKeyword } from "react-icons/vsc";
import jobTitleData from '@/public/Data.json'
import { GiArcheryTarget } from "react-icons/gi";
import industryData from '@/public/IndustryData.json'
import { LiaIndustrySolid } from "react-icons/lia";
import technologyData from "@/public/TechnologyData.json";
import { GrTechnology } from "react-icons/gr";
import { useState, useEffect } from "react"
import websiteData from '@/public/websiteData.json'
import { CgWebsite } from "react-icons/cg";
import domainData from '@/public/domainData.json';
import { GrDomain } from "react-icons/gr";
import companyLinkedinUrlData from '@/public/companyLinkedinUrl.json'
import { CiLinkedin } from "react-icons/ci";
import countryData from '@/public/countryData.json';
import { TbWorld } from "react-icons/tb";
import cityData from '@/public/cityData.json';
import { GiModernCity } from "react-icons/gi";
import stateData from '@/public/stateData.json';
import { BsBank } from "react-icons/bs";
import PriceRangeSelector from "@/app/_components/PriceRangeSelector";
import { GiProfit } from "react-icons/gi";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import LogoutConfirmationPopup from "@/app/_components/LogoutConfirmationPopup";

export default function Sidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLogoutModalOpen,setIsLogoutModalOpen] = useState(false);

    // Initialize state from URL params
    const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>(
        searchParams.get('email')?.split(',') || []
    )
    const [selectedEmail, setSelectedEmail] = useState<string[]>(
        searchParams.get('jobTitles')?.split(',') || []
    )
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
        searchParams.get('industries')?.split(',') || []
    )
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
        searchParams.get('keywords')?.split(',') || []
    )
    const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
        searchParams.get('technologies')?.split(',') || []
    )
    const [selectedWebsites, setSelectedWebsites] = useState<string[]>(
        searchParams.get('websites')?.split(',') || []
    );
    const [selectedDomains, setSelectedDomains] = useState<string[]>(
        searchParams.get('domains')?.split(',') || []
    );
    const [selectedCompanyLinkedin, setSelectedCompanyLinkedin] = useState<string[]>(
        searchParams.get('companyLinkedin')?.split(',') || []
    );
    const [selectedCountries, setSelectedCountries] = useState<string[]>(
        searchParams.get('countries')?.split(',') || []
    );
    const [selectedCities, setSelectedCities] = useState<string[]>(
        searchParams.get('cities')?.split(',') || []
    );
    const [selectedStates, setSelectedStates] = useState<string[]>(
        searchParams.get('states')?.split(',') || []
    );
    const [minAnnualRevenue, setMinAnnualRevenue] = useState<number>(
        Number(searchParams.get('min_annual_revenue')) || 0
    );
    const [maxAnnualRevenue, setMaxAnnualRevenue] = useState<number>(
        Number(searchParams.get('max_annual_revenue')) || 1000
    );
    const [openRevenue, setOpenRevenue] = useState(false);

    // Update URL when any filter changes
    useEffect(() => {
        const params = new URLSearchParams();

        // Add all filters to URL params
        if (selectedEmail.length > 0) params.set('email', selectedEmail.join(','));
        if (selectedJobTitles.length > 0) params.set('jobTitles', selectedJobTitles.join(','));
        if (selectedIndustries.length > 0) params.set('industries', selectedIndustries.join(','));
        if (selectedKeywords.length > 0) params.set('keywords', selectedKeywords.join(','));
        if (selectedTechnologies.length > 0) params.set('technologies', selectedTechnologies.join(','));
        if (selectedWebsites.length > 0) params.set('websites', selectedWebsites.join(','));
        if (selectedDomains.length > 0) params.set('domains', selectedDomains.join(','));
        if (selectedCompanyLinkedin.length > 0) params.set('companyLinkedin', selectedCompanyLinkedin.join(','));
        if (selectedCountries.length > 0) params.set('countries', selectedCountries.join(','));
        if (selectedCities.length > 0) params.set('cities', selectedCities.join(','));
        if (selectedStates.length > 0) params.set('states', selectedStates.join(','));
        if (minAnnualRevenue > 0) params.set('min_annual_revenue', minAnnualRevenue.toString());
        if (maxAnnualRevenue > 0) params.set('max_annual_revenue', maxAnnualRevenue.toString());

        // Update URL without page refresh
        const newUrl = params.toString() ? `?${params.toString()}` : '';
        router.push(newUrl, { scroll: false });

    }, [
        selectedJobTitles,
        selectedIndustries,
        selectedKeywords,
        selectedTechnologies,
        selectedWebsites,
        selectedDomains,
        selectedCompanyLinkedin,
        selectedCountries,
        selectedCities,
        selectedStates,
        router,
        selectedEmail,
        maxAnnualRevenue,
        minAnnualRevenue
    ]);

    const resetFilters = () => {
        setSelectedJobTitles([]);
        setSelectedIndustries([]);
        setSelectedKeywords([]),
            setSelectedTechnologies([]),
            setSelectedWebsites([]),
            setSelectedDomains([]),
            setSelectedCompanyLinkedin([]),
            setSelectedCountries([]),
            setSelectedCities([]),
            setSelectedStates([]),
            setSelectedEmail([]),
            setMaxAnnualRevenue(0),
            setMinAnnualRevenue(0)
    }

    const handleLogoutModal=()=>{
        setIsLogoutModalOpen(true);
    }

    const handleLogout=()=>{
        localStorage.setItem('islogin','false');
        setIsLogoutModalOpen(false);
        router.replace('/login');
    }

    return (
        <div className="w-[240px] h-screen overflow-hidden">
            <div className="bg-[#ECF3FE] text-gray-900 px-4 py-[13px] text-xl font-semibold">
                Total: <span className="font-medium">102.1M</span>
            </div>
            <button type="button" onClick={resetFilters} className="w-full border cursor-pointer py-2 text-sm font-medium text-white bg-gray-700">Reset filters</button>
            <div className="overflow-y-auto space-y-2 pb-2 text-nowrap" style={{ height: 'calc(100vh - 160px)' }}>
                <EmailFilter selectedEmail={selectedEmail} onUpDate={(data: string[]) => setSelectedEmail(data)} />
                <Filters
                    data={jobTitleData}
                    title="Job title"
                    subTitle="Job titles"
                    Icon={<GiArcheryTarget />}
                    selectedData={selectedJobTitles}
                    onUpDate={(data) => setSelectedJobTitles(data)}
                />
                <Filters
                    data={industryData}
                    title="Industry"
                    subTitle="Industries"
                    Icon={<LiaIndustrySolid />}
                    selectedData={selectedIndustries}
                    onUpDate={(data: string[]) => setSelectedIndustries(data)}
                />
                <Filters
                    data={keywordData}
                    title="Keyword"
                    subTitle="Keywords"
                    Icon={<VscSymbolKeyword />}
                    selectedData={selectedKeywords}
                    onUpDate={(data: string[]) => setSelectedKeywords(data)}
                />
                <Filters
                    data={technologyData}
                    title="Technology"
                    subTitle="Technologies"
                    Icon={<GrTechnology />}
                    selectedData={selectedTechnologies}
                    onUpDate={(data: string[]) => setSelectedTechnologies(data)}
                />
                <Filters
                    data={websiteData}
                    title="Website"
                    subTitle="Websites"
                    Icon={<CgWebsite />}
                    selectedData={selectedWebsites}
                    onUpDate={(data: string[]) => setSelectedWebsites(data)}
                />
                <Filters
                    data={domainData}
                    title="Domain"
                    subTitle="Domains"
                    Icon={<GrDomain />}
                    selectedData={selectedDomains}
                    onUpDate={(data: string[]) => setSelectedDomains(data)}
                />
                <Filters
                    data={companyLinkedinUrlData}
                    title="Company linkedin url"
                    subTitle="Company urls"
                    Icon={<CiLinkedin />}
                    selectedData={selectedCompanyLinkedin}
                    onUpDate={(data: string[]) => setSelectedCompanyLinkedin(data)}
                />
                <Filters
                    data={countryData}
                    title="Country"
                    subTitle="Countries"
                    Icon={<TbWorld />}
                    selectedData={selectedCountries}
                    onUpDate={(data: string[]) => setSelectedCountries(data)}
                />
                <Filters
                    data={cityData}
                    title="City"
                    subTitle="Cities"
                    Icon={<GiModernCity />}
                    selectedData={selectedCities}
                    onUpDate={(data: string[]) => setSelectedCities(data)}
                />
                <Filters
                    data={stateData}
                    title="State"
                    subTitle="States"
                    Icon={<BsBank />}
                    selectedData={selectedStates}
                    onUpDate={(data: string[]) => setSelectedStates(data)}
                />
                <div className={`${openRevenue ? "border border-gray-300" : "border-b border-gray-300"} w-full duration-200`}>
                    <button
                        type="button"
                        className={`flex cursor-pointer px-4 pt-4 justify-between items-center w-full outline-none ${openRevenue ? "text-blue-300" : "text-gray-500"}`}
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
                            minPrice={minAnnualRevenue}
                            maxPrice={maxAnnualRevenue}
                            onPriceChange={(data: number[]) => {
                                setMinAnnualRevenue(data[0])
                                setMaxAnnualRevenue(data[1])
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="px-4 mt-4">
                <button type="button" onClick={handleLogoutModal} className="cursor-pointer flex items-center gap-4 px-4 py-2 border w-full border-gray-300 rounded-lg justify-center">
                    <MdOutlineLogout />
                    <span>Logout</span>
                </button>
            </div>
            <LogoutConfirmationPopup isOpen={isLogoutModalOpen}
                onClose={()=>setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    )
}