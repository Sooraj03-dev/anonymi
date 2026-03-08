import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',        // generates static files
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
