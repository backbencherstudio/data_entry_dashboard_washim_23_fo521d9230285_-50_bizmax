'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your total data (modify this according to your needs)

type salesFilterType = {
  email: string[];
  job_title: string[];
  company_domain: string[];
  urls: string[];
  city: string[];
  email_first: string[];
  email_second: string[];
};

type zoominfoFilterType = {
  email: string[];
  lead_titles: string[];
  company_website: string[];
  company_industry: string[];
  company_size: string[];
  revenue_range: string[];
  company_location_text: string[];
  keyword: string[];
};

type apolloFilterType = {
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
  annual_revenue: string[];
};

interface TotalDataContextType {
  totalData: number;
  salesFilters: salesFilterType;
  zoominfoFilters: zoominfoFilterType;
  apolloFilters: apolloFilterType;
  updateTotalData: (newData: number) => void;
  resetTotalData: () => void;
  updateFilters: (fl: string, data: any) => void;
  searchText: string;
  updateSearch: (search:string)=> void;
}

// Default values
const defaultTotalData = 0;

const TotalDataContext = createContext<TotalDataContextType | undefined>(undefined);

// Provider component
export function TotalDataProvider({ children }: { children: ReactNode }) {
  const [totalData, setTotalData] = useState<number>(defaultTotalData);
  const [searchText,setSearchText] = useState<string>('')
  const [salesFilters, setSalesFilters] = useState<salesFilterType>({
    email: [],
    job_title: [],
    company_domain: [],
    urls: [],
    email_first: [],
    email_second: [],
    city: [],
  });
  const [zoominfoFilters, setZoominfoFilters] = useState<zoominfoFilterType>({
    email: [],
    lead_titles: [],
    company_website: [],
    company_industry: [],
    company_size: [],
    revenue_range: [],
    company_location_text: [],
    keyword: []
  })
  const [apolloFilters, setApolloFilters] = useState<apolloFilterType>({
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
    annual_revenue: []
  })

  const updateTotalData = (newData: number) => {
    setTotalData(newData);
  };

  const updateFilters = (filterType: string, filters: any) => {
    if (filterType === "sales") {
      setSalesFilters(filters);
    }
    if (filterType === "zoominfo") {
      setZoominfoFilters(filters);
    }
    if (filterType === "apollo") {
      setApolloFilters(filters);
    }
  }

  const resetTotalData = () => {
    setTotalData(defaultTotalData);
  };

  const updateSearch= (search:string)=>{
    setSearchText(search);
  }

  return (
    <TotalDataContext.Provider value={{ totalData, updateTotalData, resetTotalData, updateFilters, salesFilters,zoominfoFilters,apolloFilters,searchText,updateSearch }}>
      {children}
    </TotalDataContext.Provider>
  );
}

// Custom hook to use the context
export function useTotalData() {
  const context = useContext(TotalDataContext);
  if (context === undefined) {
    throw new Error('useTotalData must be used within a TotalDataProvider');
  }
  return context;
}