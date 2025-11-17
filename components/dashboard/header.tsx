"use client";

import { Heart, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/use-favorites";

export function DashboardHeader() {
  const { count } = useFavorites();

  return (
    <div className="relative w-full border-b-4 border-black overflow-hidden bg-gradient-to-br from-[#70D1FE] via-[#87CEEB] to-[#FFD700]">
      {/* Decorative Elements */}
      <div className="absolute top-4 left-8 text-6xl opacity-20">☁️</div>
      <div className="absolute top-12 right-16 text-5xl opacity-15">☁️</div>
      <div className="absolute bottom-8 left-1/4 text-4xl opacity-10">☁️</div>

      {/* Sun */}
      <div className="absolute top-6 right-8 md:right-16">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FFE97F] border-4 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.5)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            {/* Epic Title Card */}
            <div className="bg-white/95 backdrop-blur-sm border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-8 py-6 inline-block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFDE00] to-[#F14E28] rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <span className="text-2xl">🍩</span>
                </div>
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-black leading-none bg-gradient-to-r from-[#FFDE00] via-[#F14E28] to-[#70D1FE] bg-clip-text text-transparent">
                    The Simpsons
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 text-[#FFD700] fill-current" />
                    <p className="text-sm md:text-base font-display font-black text-gray-700">
                      Ultimate Explorer
                    </p>
                    <Star className="h-4 w-4 text-[#FFD700] fill-current" />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-2 mt-4 justify-center md:justify-start">
                <Badge className="bg-[#FFDE00] text-black border-2 border-black font-black text-xs px-3 py-1">
                  1182+ Characters
                </Badge>
                <Badge className="bg-[#70D1FE] text-black border-2 border-black font-black text-xs px-3 py-1">
                  768+ Episodes
                </Badge>
                <Badge className="bg-[#F14E28] text-white border-2 border-black font-black text-xs px-3 py-1">
                  477+ Locations
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Favorites Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-white/95 backdrop-blur-sm border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all px-6 py-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#E91E63] to-[#F14E28] rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <Heart className="h-7 w-7 text-white fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
                  My Favorites
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-display text-3xl font-black text-[#F14E28]">
                    {count}
                  </span>
                  <TrendingUp className="h-5 w-5 text-[#F14E28]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decoration stripe */}
      <div className="h-2 bg-gradient-to-r from-[#FFDE00] via-[#70D1FE] via-[#F14E28] via-[#E91E63] to-[#9B59B6]" />
    </div>
  );
}
