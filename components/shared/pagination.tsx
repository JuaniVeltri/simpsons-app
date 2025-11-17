"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages - 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Page info */}
      <div className="text-sm font-medium text-muted-foreground">
        Page <span className="font-black text-foreground">{currentPage}</span> of{" "}
        <span className="font-black text-foreground">{totalPages}</span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* First page button */}
        <motion.div whileHover={{ scale: canGoPrevious ? 1.05 : 1 }} whileTap={{ scale: canGoPrevious ? 0.95 : 1 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={!canGoPrevious}
            className="h-11 w-11 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 bg-white cursor-pointer disabled:cursor-not-allowed"
            title="First page"
          >
            <ChevronsLeft className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Previous button */}
        <motion.div whileHover={{ scale: canGoPrevious ? 1.05 : 1 }} whileTap={{ scale: canGoPrevious ? 0.95 : 1 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canGoPrevious}
            className="h-11 w-11 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 bg-white cursor-pointer disabled:cursor-not-allowed"
            title="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Page numbers */}
        <div className="flex gap-2">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="flex items-center justify-center px-3 py-2 text-muted-foreground font-black text-lg"
              >
                ...
              </span>
            ) : (
              <motion.div
                key={page}
                whileHover={{ scale: currentPage !== page ? 1.05 : 1 }}
                whileTap={{ scale: currentPage !== page ? 0.95 : 1 }}
              >
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => onPageChange(page as number)}
                  className={
                    currentPage === page
                      ? "h-11 min-w-[44px] px-4 border-[3px] border-black bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-base cursor-pointer"
                      : "h-11 min-w-[44px] px-4 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-white font-bold cursor-pointer"
                  }
                >
                  {page}
                </Button>
              </motion.div>
            )
          )}
        </div>

        {/* Next button */}
        <motion.div whileHover={{ scale: canGoNext ? 1.05 : 1 }} whileTap={{ scale: canGoNext ? 0.95 : 1 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canGoNext}
            className="h-11 w-11 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 bg-white cursor-pointer disabled:cursor-not-allowed"
            title="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Last page button */}
        <motion.div whileHover={{ scale: canGoNext ? 1.05 : 1 }} whileTap={{ scale: canGoNext ? 0.95 : 1 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            disabled={!canGoNext}
            className="h-11 w-11 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 bg-white cursor-pointer disabled:cursor-not-allowed"
            title="Last page"
          >
            <ChevronsRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
