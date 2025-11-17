"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Tv, MapPin, BarChart3, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { CharactersSection } from "@/components/characters/characters-section";
import { EpisodesSection } from "@/components/episodes/episodes-section";
import { LocationsSection } from "@/components/locations/locations-section";
import { StatsSection } from "@/components/dashboard/stats-section";

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("characters");

  const tabs = [
    { value: "characters", icon: Users, label: "Characters", color: "#FFDE00", gradient: "from-yellow-400 to-yellow-500" },
    { value: "episodes", icon: Tv, label: "Episodes", color: "#70D1FE", gradient: "from-blue-400 to-blue-500" },
    { value: "locations", icon: MapPin, label: "Locations", color: "#F14E28", gradient: "from-orange-500 to-red-500" },
    { value: "stats", icon: BarChart3, label: "Stats", color: "#9B59B6", gradient: "from-purple-500 to-purple-600" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b-2 border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-1 bg-gradient-to-r from-[#FFDE00] via-[#70D1FE] via-[#F14E28] to-[#9B59B6]" />

          <div className="flex items-center justify-center py-5">
            <TabsList className="inline-flex h-14 md:h-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-2 gap-2 shadow-inner border border-gray-300/50 min-w-full md:min-w-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.value;

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className="relative rounded-xl px-4 md:px-8 py-2 md:py-3 text-sm md:text-base font-medium transition-all data-[state=active]:text-black data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 flex-1 md:flex-initial"
                    asChild
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabBackground"
                          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tab.gradient} shadow-md`}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          style={{ backgroundColor: tab.color }}
                          initial={{ opacity: 0.3, scale: 0.8 }}
                          animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.8, 1.1, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      <div className="relative flex items-center justify-center gap-2 md:gap-3 z-10">
                        <Icon className={`h-5 w-5 md:h-6 md:w-6 ${isActive ? 'text-black' : 'text-gray-600'} transition-colors`} />
                        <span className="font-display font-bold text-sm md:text-base">
                          {tab.label}
                        </span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <Sparkles className="h-4 w-4 text-black hidden md:block" />
                          </motion.div>
                        )}
                      </div>

                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-white/60"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>
      </div>

      {/* Content with Smooth Transitions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-[calc(100vh-400px)]">
        <AnimatePresence mode="wait">
          {activeTab === "characters" && (
            <TabsContent key="characters-content" value="characters" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <CharactersSection />
              </motion.div>
            </TabsContent>
          )}

          {activeTab === "episodes" && (
            <TabsContent key="episodes-content" value="episodes" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <EpisodesSection />
              </motion.div>
            </TabsContent>
          )}

          {activeTab === "locations" && (
            <TabsContent key="locations-content" value="locations" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <LocationsSection />
              </motion.div>
            </TabsContent>
          )}

          {activeTab === "stats" && (
            <TabsContent key="stats-content" value="stats" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <StatsSection />
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </div>
    </Tabs>
  );
}
