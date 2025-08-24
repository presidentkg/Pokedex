import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "pokeapi.com" },
    ],
  },
};

export default nextConfig;
