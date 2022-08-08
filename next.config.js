const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "the-forest-api.herokuapp.com"],
  },
};

module.exports = nextConfig;
