// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out for development - enables dynamic routes
  trailingSlash: false, // Changed to false - this is key!
  images: {
    unoptimized: false, // Enable Next.js image optimization
  },
  async redirects() {
    return [
      {
        source: '/old-path', // Example of a redirect for SEO
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
  
  // Fix for webpack issues with fs/module in client-side code
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

module.exports = withNextIntl(nextConfig);