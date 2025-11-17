"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingGridProps {
  count?: number;
  message?: string;
}

export function LoadingGrid({ count = 20, message }: LoadingGridProps) {
  return (
    <div className="space-y-8">
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 p-4 bg-primary/10 border-2 border-black rounded-xl"
        >
          <Loader2 className="h-5 w-5 animate-spin" />
          <p className="text-base font-medium">{message}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-max">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Card className="h-[440px] p-4 space-y-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Skeleton className="w-full h-48 rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
