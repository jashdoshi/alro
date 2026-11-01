import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old URLs from the previous site → new sitemap
  async redirects() {
    return [
      { source: "/digital-experiences", destination: "/websites", permanent: true },
      { source: "/intelligent-systems", destination: "/company-brain", permanent: true },
      { source: "/company-intelligence", destination: "/company-brain", permanent: true },
      { source: "/studio", destination: "/about", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
