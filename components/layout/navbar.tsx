"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Tv, MapPin, Heart, BarChart3, Home } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  {
    href: "/",
    icon: Home,
    label: "Home",
    gradient: "from-yellow-400 to-yellow-500"
  },
  {
    href: "/characters",
    icon: Users,
    label: "Characters",
    gradient: "from-yellow-400 to-yellow-500"
  },
  {
    href: "/episodes",
    icon: Tv,
    label: "Episodes",
    gradient: "from-blue-400 to-blue-500"
  },
  {
    href: "/locations",
    icon: MapPin,
    label: "Locations",
    gradient: "from-orange-500 to-red-500"
  },
  {
    href: "/favorites",
    icon: Heart,
    label: "Favorites",
    gradient: "from-pink-500 to-red-500"
  },
  {
    href: "/stats",
    icon: BarChart3,
    label: "Stats",
    gradient: "from-purple-500 to-purple-600"
  },
];

// Helper function to check if a route is active (including sub-routes)
function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 bg-white border-b-[4px] border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
      {/* Decorative top stripe */}
      <div className="h-2 bg-gradient-to-r from-[#FFDE00] via-[#70D1FE] via-[#F14E28] via-[#E91E63] to-[#9B59B6]" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo / Brand */}
          <Link href="/" className="cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#FFDE00] to-[#F14E28] rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center">
                <span className="text-2xl md:text-3xl">🍩</span>
              </div>
              <div className="hidden md:block">
                <h1 className="font-display text-2xl font-black leading-none bg-gradient-to-r from-[#FFDE00] via-[#F14E28] to-[#70D1FE] bg-clip-text text-transparent">
                  The Simpsons
                </h1>
                <p className="text-xs font-bold text-gray-600">
                  Ultimate Explorer
                </p>
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isRouteActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="cursor-pointer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-xl px-3 md:px-5 py-2.5 md:py-3 font-bold transition-all cursor-pointer border-[3px] border-black ${
                      isActive
                        ? `bg-gradient-to-br ${item.gradient} text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`
                        : "bg-white text-gray-700 hover:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Icon className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                      <span className="font-display font-black text-xs md:text-sm whitespace-nowrap hidden sm:inline">
                        {item.label}
                      </span>
                    </div>
                  </motion.button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
