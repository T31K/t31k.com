const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
      },
    ],
  },
};

module.exports = withContentlayer(nextConfig);
