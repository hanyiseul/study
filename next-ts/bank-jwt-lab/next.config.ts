import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.trycloudflare.com'],
  experimental: {
    serverActions: {
      allowedOrigins: ['*.trycloudflare.com'],
    },
  },
  turbopack: {
    root: __dirname, // 👈 이거 추가
  },
};

export default nextConfig;