import type { NextConfig } from "next";
import path from "path"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
    path: '/e-cell/_next/image',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingRoot: path.join(__dirname),
 assetPrefix: process.env.NODE_ENV === 'production' ? '/e-cell/' : undefined,
};

export default nextConfig;