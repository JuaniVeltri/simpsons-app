"use client";

import { useQuery } from "@tanstack/react-query";
import { simpsonsApi } from "@/lib/api-client";
import type { CharacterFilters } from "@/types/simpsons";

export function useCharacters(filters?: CharacterFilters) {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: () => simpsonsApi.getCharacters(filters),
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
  });
}

export function useCharacter(id: number) {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => simpsonsApi.getCharacter(id),
    enabled: !!id,
  });
}

export function useAllCharacters() {
  return useQuery({
    queryKey: ["characters", "all"],
    queryFn: () => simpsonsApi.getAllCharacters(),
    staleTime: 10 * 60 * 1000, // 10 minutes - this data rarely changes
  });
}
