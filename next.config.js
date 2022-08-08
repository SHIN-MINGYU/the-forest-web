const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", process.env.NEXT_PUBLIC_PRODUCTION_API_ENDPOINT],
  },
};

module.exports = nextConfig;
