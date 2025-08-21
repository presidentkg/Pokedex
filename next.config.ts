import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "placeholder.pics" },
      { hostname: "cdn.dummyjson.com" },
      { hostname: "futuramaapi.com" },
    ],
  },
};

export default nextConfig;
