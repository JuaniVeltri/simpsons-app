"use client";

import { StatsSection } from "@/components/dashboard/stats-section";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-[calc(100vh-400px)]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StatsSection />
      </motion.div>
    </div>
  );
}
