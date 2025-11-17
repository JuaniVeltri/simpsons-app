"use client";

import { EpisodesSection } from "@/components/episodes/episodes-section";
import { motion } from "framer-motion";

export default function EpisodesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-[calc(100vh-400px)]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <EpisodesSection />
      </motion.div>
    </div>
  );
}
