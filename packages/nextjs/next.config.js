// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  // Optional same-origin proxy to the local hardhat node, for previews where the browser can't reach it directly
  async rewrites() {
    return process.env.HARDHAT_RPC_PROXY_TARGET
      ? [{ source: "/api/rpc", destination: process.env.HARDHAT_RPC_PROXY_TARGET }]
      : [];
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
