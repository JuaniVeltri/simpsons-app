import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.thesimpsonsapi.com",
        pathname: "/**",
      },
    ],
    unoptimized: true, // Temporarily disable optimization to bypass CDN issues
  },
};

export default nextConfig;
