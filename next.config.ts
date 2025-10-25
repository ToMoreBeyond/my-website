import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@heroicons/react'],
  },
};

export default nextConfig;
