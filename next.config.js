/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['fastly.4sqi.net'],
  },
}

module.exports = nextConfig
