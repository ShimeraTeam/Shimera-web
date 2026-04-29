import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/Shimera-web",
  assetPrefix: "/Shimera-web/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;