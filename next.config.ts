import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // For Azure deployment
  images: {
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
