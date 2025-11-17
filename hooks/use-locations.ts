"use client";

import { useQuery } from "@tanstack/react-query";
import { simpsonsApi } from "@/lib/api-client";
import type { LocationFilters } from "@/types/simpsons";

export function useLocations(filters?: LocationFilters) {
  return useQuery({
    queryKey: ["locations", filters],
    queryFn: () => simpsonsApi.getLocations(filters),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
  });
}

export function useLocation(id: number) {
  return useQuery({
    queryKey: ["location", id],
    queryFn: () => simpsonsApi.getLocation(id),
    enabled: !!id,
  });
}

export function useAllLocations() {
  return useQuery({
    queryKey: ["locations", "all"],
    queryFn: () => simpsonsApi.getAllLocations(),
    staleTime: 10 * 60 * 1000, // 10 minutes - this data rarely changes
  });
}
