import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    // @ts-expect-error Next.js 15 experimental type variations
    reactCompiler: true,
    turbopack: {
      rules: {
        '*.css': {
          loaders: ['@tailwindcss/turbopack'],
          as: '*.css',
        },
      },
    },
  },
};

export default nextConfig;