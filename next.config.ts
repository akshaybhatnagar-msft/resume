import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static export for Cloudflare Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // Trailing slashes for cleaner URLs on static hosts
  trailingSlash: true,
};

export default nextConfig;
