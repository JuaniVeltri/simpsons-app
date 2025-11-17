"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href: string;
}

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let currentPath = "";
  paths.forEach((path, index) => {
    currentPath += `/${path}`;

    // Check if it's a numeric ID (detail page)
    if (!isNaN(Number(path))) {
      // This is a detail page - use the parent name with "Detail"
      const parentName = paths[index - 1] || "";
      breadcrumbs.push({
        label: `${capitalize(parentName.slice(0, -1))} #${path}`,
        href: currentPath,
      });
    } else {
      breadcrumbs.push({
        label: capitalize(path),
        href: currentPath,
      });
    }
  });

  return breadcrumbs;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on home page
  if (pathname === "/") {
    return null;
  }

  const breadcrumbs = getBreadcrumbs(pathname);

  // Don't show if only home
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-[3px] border-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-sm font-medium">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isHome = index === 0;

            return (
              <motion.div
                key={crumb.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2"
              >
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                )}

                {isLast ? (
                  <span className="font-display font-black text-black px-3 py-1.5 bg-white border-[3px] border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {isHome ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      crumb.label
                    )}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white transition-colors border-2 border-transparent hover:border-black cursor-pointer"
                  >
                    {isHome && <Home className="h-4 w-4" />}
                    <span className="font-bold text-gray-600 group-hover:text-black transition-colors">
                      {!isHome && crumb.label}
                    </span>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
}
