import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Turbopack のワークスペース root を明示する。
  // ホームディレクトリに別の lockfile があると親フォルダが root と推定され、
  // 日本語を含むパスでビルドが落ちるため。
  turbopack: {
    root: path.resolve(process.cwd()),
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
