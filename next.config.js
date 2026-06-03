/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'msexcursion.com', pathname: '/wp-content/**' },
      { protocol: 'https', hostname: 'static.wixstatic.com', pathname: '/media/**' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  // Allow all images from /public without optimization issues
  experimental: {},
};

module.exports = nextConfig;
