'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your total data (modify this according to your needs)


interface TotalDataContextType {
  totalData: number;
  updateTotalData: (newData: number ) => void;
  resetTotalData: () => void;
}

// Default values
const defaultTotalData = 0;

const TotalDataContext = createContext<TotalDataContextType | undefined>(undefined);

// Provider component
export function TotalDataProvider({ children }: { children: ReactNode }) {
  const [totalData, setTotalData] = useState<number>(defaultTotalData);

  const updateTotalData = (newData:number) => {
    setTotalData(newData);
  };

  const resetTotalData = () => {
    setTotalData(defaultTotalData);
  };

  return (
    <TotalDataContext.Provider value={{ totalData, updateTotalData, resetTotalData }}>
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