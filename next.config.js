// next.config.js
const fs = require("fs");

let localConfig = {};
if (fs.existsSync("./next.config.local.js")) {
  localConfig = require("./next.config.local.js");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...localConfig, // override anything locally
};

module.exports = nextConfig;
