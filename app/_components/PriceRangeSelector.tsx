"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface PriceRangeSelectorProps {
  minPrice?: string;
  maxPrice?: string;
  step?: number;
  currency?: string;
  onPriceChange: (range: [string, string]) => void;
  className?: string;
  debounceMs?: number;
  title: string;
}

export default function PriceRangeSelector({
  minPrice = '',
  maxPrice = '',
  step = 1,
  currency = "$",
  onPriceChange,
  className = "",
  debounceMs = 800,
  title = ''
}: PriceRangeSelectorProps) {
  const [minValue, setMinValue] = useState<string>(minPrice);
  const [maxValue, setMaxValue] = useState<string>(maxPrice);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleMinInputChange = (value: string) => {
    setMinValue(value);
    debouncedPriceChange([value, maxValue]);
  };

  const handleMaxInputChange = (value: string) => {
    setMaxValue(value);
    debouncedPriceChange([minValue, value]);
  };

  const debouncedPriceChange = useCallback((newRange: [string, string]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onPriceChange(newRange);
    }, debounceMs);
  }, [onPriceChange, debounceMs]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


  useEffect(()=>{
    if(minPrice){
      setMinValue(minPrice)
    }
    if(maxPrice){
      setMaxValue(maxPrice)
    }
  },[minPrice,maxPrice])

  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Set your preferred range
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="min-price" className="text-sm font-medium">
            Min
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {currency}
            </span>
            <input
              id="min-price"
              type="text"
              value={minValue}
              onChange={(e) => handleMinInputChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={minPrice}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="max-price" className="text-sm font-medium">
            Max
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {currency}
            </span>
            <input
              id="max-price"
              type="text"
              value={maxValue}
              onChange={(e) => handleMaxInputChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={maxPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}