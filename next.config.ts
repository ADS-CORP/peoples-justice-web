import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Temporarily ignore ESLint errors during builds
    // TODO: Fix all ESLint errors in prototype code
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep TypeScript strict for production safety
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
