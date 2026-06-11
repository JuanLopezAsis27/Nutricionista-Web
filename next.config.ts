import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a minimal standalone server for small Docker images.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;