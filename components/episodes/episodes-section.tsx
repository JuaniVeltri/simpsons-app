"use client";

import { useState } from "react";
import { useEpisodes } from "@/hooks";
import type { Episode } from "@/types/simpsons";
import { EpisodeCard } from "./episode-card";
import { SearchBar } from "@/components/shared/search-bar";
import { Pagination } from "@/components/shared/pagination";
import { LoadingGrid } from "@/components/shared/loading-grid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

export function EpisodesSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [seasonFilter, setSeasonFilter] = useState<string>("all");
  const { data, isLoading } = useEpisodes({
    page: currentPage,
    search: searchQuery || undefined,
    season: seasonFilter !== "all" ? parseInt(seasonFilter) : undefined,
  });

  const episodes = data?.data ?? [];
  const totalPages = data?.pages ?? 1;
  const totalCount = data?.count ?? 0;

  const handleClearFilters = () => {
    setSearchQuery("");
    setSeasonFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || seasonFilter !== "all";

  // Generate season options (assuming 35 seasons)
  const seasonOptions = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="space-y-8 min-h-[calc(100vh-300px)]">
      {/* Header with search and filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search episodes by title..."
          />

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-secondary/10 border-[3px] border-black rounded-lg">
              <Filter className="h-5 w-5" />
              <span className="text-sm font-bold">Filters</span>
            </div>

            <Select value={seasonFilter} onValueChange={setSeasonFilter}>
              <SelectTrigger className="h-12 w-full md:w-[180px] border-[3px] border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-semibold bg-white">
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent className="border-[3px] border-black max-h-[300px]">
                <SelectItem value="all">All Seasons</SelectItem>
                {seasonOptions.map((season) => (
                  <SelectItem key={season} value={season.toString()}>
                    Season {season}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="destructive"
                size="icon"
                onClick={handleClearFilters}
                className="h-12 w-12 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0 rounded-xl"
                title="Clear all filters"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Active filters indicator */}
        {hasActiveFilters && (
          <div className="flex items-center gap-3 flex-wrap p-4 bg-muted/50 border-[3px] border-black rounded-xl">
            <span className="text-sm font-bold text-foreground">Active:</span>
            {searchQuery && (
              <Badge variant="secondary" className="border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold px-3 py-1">
                🔍 {searchQuery}
              </Badge>
            )}
            {seasonFilter !== "all" && (
              <Badge variant="secondary" className="border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-semibold px-3 py-1">
                📺 Season {seasonFilter}
              </Badge>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          Showing {episodes.length} of {totalCount} episode{totalCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Episodes grid */}
      {isLoading ? (
        <LoadingGrid count={20} message="Loading episodes from Springfield..." />
      ) : episodes.length === 0 ? (
        <div className="flex items-center justify-center text-center py-12 flex-1">
          <div>
            <p className="text-xl font-medium text-muted-foreground">
              No episodes found
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your filters or search query
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-max">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && episodes.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

    </div>
  );
}
