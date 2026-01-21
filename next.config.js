/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        // destination: "https://api.byteapp.tech/api/v1/:path*",
        destination: "http://localhost:2707/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
