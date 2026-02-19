"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2, MapPin } from "lucide-react";
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
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "@/hooks/useLocation";

export interface LocationValue {
  address: string;
  lat: number;
  lng: number;
}

interface LocationSearchProps {
  placeholder?: string;
  onLocationSelect: (location: LocationValue) => void;
  className?: string;
  defaultValue?: string;
}

export function LocationSearch({
  placeholder = "Search address...",
  onLocationSelect,
  className,
  defaultValue = "",
}: LocationSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState(defaultValue);
  const debouncedQuery = useDebounce(query, 700);
  const locationBound = useLocation();

  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ["locations", debouncedQuery],
    queryFn: async () => {
      const boundingBox: Record<string, number | string> = {};
      if (locationBound) {
        boundingBox.lon = locationBound.lon;
        boundingBox.lat = locationBound.lat;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const queryParams: Record<string, any> = {
        q: encodeURIComponent(debouncedQuery),
        limit: 10,
      };

      if (locationBound?.lat && locationBound?.lon) {
        queryParams.lat = locationBound.lat;
        queryParams.lon = locationBound.lon;
        queryParams.location_bias_scale = 0.5;
      }
      const res = await axios.get("https://photon.komoot.io/api/", {
        params: queryParams,
      });
      const data = res.data.features || [];
      return data;
    },
    enabled: debouncedQuery.length > 3,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between font-normal", className)}
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 shrink-0 opacity-50" />
            <span className="truncate">{query || placeholder}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          {" "}
          {/* Disable internal filtering since we use API search */}
          <CommandInput
            placeholder="Type to search..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {isFetching && (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}
            {!isFetching && suggestions.length === 0 && query.length >= 3 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            <CommandGroup>
              {suggestions.map((item, index) => {
                const { name, street, city, state, country } = item.properties;
                const fullAddress = [name, street, city, state, country]
                  .filter(Boolean)
                  .join(", ");

                return (
                  <CommandItem
                    key={index}
                    value={fullAddress}
                    onSelect={() => {
                      setQuery(fullAddress);
                      onLocationSelect({
                        address: fullAddress,
                        lng: item.geometry.coordinates[0],
                        lat: item.geometry.coordinates[1],
                      });
                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{name}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {fullAddress}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
