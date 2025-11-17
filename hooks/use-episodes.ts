"use client";

import { useQuery } from "@tanstack/react-query";
import { simpsonsApi } from "@/lib/api-client";
import type { EpisodeFilters } from "@/types/simpsons";

export function useEpisodes(filters?: EpisodeFilters) {
  return useQuery({
    queryKey: ["episodes", filters],
    queryFn: () => simpsonsApi.getEpisodes(filters),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
  });
}

export function useEpisode(id: number) {
  return useQuery({
    queryKey: ["episode", id],
    queryFn: () => simpsonsApi.getEpisode(id),
    enabled: !!id,
  });
}

export function useAllEpisodes() {
  return useQuery({
    queryKey: ["episodes", "all"],
    queryFn: () => simpsonsApi.getAllEpisodes(),
    staleTime: 10 * 60 * 1000, // 10 minutes - this data rarely changes
  });
}
