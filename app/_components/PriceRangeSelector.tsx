"use client";

import { useState, useCallback, useRef } from "react";

interface PriceRangeSelectorProps {
  minPrice?: number;
  maxPrice?: number;
  step?: number;
  currency?: string;
  onPriceChange?: (range: [number, number]) => void;
  className?: string;
  debounceMs?: number;
}

export default function PriceRangeSelector({
  minPrice = 0,
  maxPrice = 0,
  step = 0,
  currency = "$",
  onPriceChange,
  className = "",
  debounceMs = 300,
}: PriceRangeSelectorProps) {
  const [range, setRange] = useState<[number, number]>([minPrice, maxPrice]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedPriceChange = useCallback((newRange: [number, number]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onPriceChange?.(newRange);
    }, debounceMs);
  }, [onPriceChange, debounceMs]);

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and empty string
    const value = e.target.value;

    // If empty, set to minPrice
    if (value === "") {
      const newRange: [number, number] = [minPrice, range[1]];
      setRange(newRange);
      debouncedPriceChange(newRange);
      return;
    }

    // Only proceed if value contains only numbers
    if (/^\d+$/.test(value)) {
      const numValue = Math.min(Number(value), range[1] - step);
      const newRange: [number, number] = [numValue, range[1]];
      setRange(newRange);
      debouncedPriceChange(newRange);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and empty string
    const value = e.target.value;

    // If empty, set to maxPrice
    if (value === "") {
      const newRange: [number, number] = [range[0], Number(value)];
      setRange(newRange);
      debouncedPriceChange(newRange);
      return;
    }

    // Only proceed if value contains only numbers
    if (/^\d+$/.test(value)) {
      const numValue = Math.max(Number(value), range[0] + step);
      const newRange: [number, number] = [range[0], numValue];
      setRange(newRange);
      debouncedPriceChange(newRange);
    }
  };

  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="space-y-2 mb-4">
        <h3 className="text-lg font-semibold">Annual Revenue</h3>
        <p className="text-sm text-muted-foreground">
          Set your preferred revenue range
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
              inputMode="numeric"
              pattern="[0-9]*"
              value={range[0]}
              onChange={handleMinInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              inputMode="numeric"
              pattern="[0-9]*"
              value={range[1]}
              onChange={handleMaxInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}