import type { NextConfig } from 'next';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    // Ignore linting during production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TS checks during production build
    ignoreBuildErrors: true,
  },
} as unknown as NextConfig;

export default nextConfig;