const { withContentlayer } = require('next-contentlayer2');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // No Vercel image optimizer on Cloudflare
    unoptimized: true,
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

if (process.env.NODE_ENV === 'development') {
  require('@opennextjs/cloudflare').initOpenNextCloudflareForDev();
}
