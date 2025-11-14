// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export for GitHub Pages
  basePath: '/advisor-calculator', // Required for GitHub Pages (matches repo name)
  trailingSlash: false, // Changed to false - this is key!
  images: {
    unoptimized: true, // Required for static export
  },
  // Note: redirects() is not supported with static export
  // Use client-side redirects or configure them in your hosting provider

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