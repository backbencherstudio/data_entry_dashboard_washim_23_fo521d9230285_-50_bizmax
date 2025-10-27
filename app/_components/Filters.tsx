'use client'

import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { ReactElement, ReactNode, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type propType={
    data:any[];
    title: string;
    Icon: ReactNode;
    subTitle: string;
    selectedData: string[],
    onUpDate: (data:string[])=> void;
}

export default function Filters({
    data,
    title,
    Icon,
    subTitle,
    selectedData,
    onUpDate
}:propType) {
  const [open, setOpen] = useState(false);
  // const [selectedData, onUpDate] = useState<string[]>([]);

  const handleSelect = (jobId: string) => {
    onUpDate(
      selectedData.includes(jobId) 
        ? selectedData.filter(id => id !== jobId)
        : [...selectedData, jobId]
    );
  };

  const removeJob = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpDate(selectedData.filter(id => id !== jobId));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpDate([]);
  };

  const getSelectedJobTitles = () => {
    return selectedData.map(jobId => 
      data.find(item => item.id === jobId)?.name
    ).filter(Boolean) as string[];
  };

  const selectedTitles = getSelectedJobTitles();

  return (
    <div className={`${open ? "border border-gray-300" : "border-b border-gray-300"} w-full duration-200`}>
      <button 
        type="button" 
        className={`flex cursor-pointer px-4 pt-4 justify-between items-center w-full outline-none ${open ? "text-blue-300" : "text-gray-500"}`} 
        onClick={() => setOpen(prev => !prev)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {Icon}
          <span>{title}</span>
          {/* {selectedData.length > 0 && (
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <span className="text-xs text-gray-500 truncate">
                ({selectedData.length} selected)
              </span>
              <Badge 
                variant="secondary" 
                className="h-5 px-1 hover:bg-transparent"
                onClick={clearAll}
              >
                <X className="h-3 w-3" />
              </Badge>
            </div>
          )} */}
        </div>
        {open ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <div className={`${open ? "h-fit p-4" : "h-0"} duration-200 overflow-hidden`}>
        {/* Selected badges */}
        {selectedTitles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedTitles.map((title, index) => (
              <Badge key={selectedData[index]} variant="secondary" className="pl-2 pr-1 py-1" title={title}>
                {title?.slice(0,25)}{title?.length > 25?"...":""}
                <button
                  onClick={(e) => removeJob(selectedData[index], e)}
                  className="ml-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {selectedData.length > 0 
                ? `${selectedData.length} ${subTitle} selected`
                : `Select ${subTitle}...`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder={`Search ${subTitle}...`} />
              <CommandList>
                <CommandEmpty>No {title} found.</CommandEmpty>
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.name}
                      onSelect={() => handleSelect(item.id)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedData.includes(item.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}