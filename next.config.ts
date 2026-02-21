import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  distDir: '.next_dev',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
