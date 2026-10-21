import { Chain } from "viem";
import { hardhat as viemHardhat } from "viem/chains";

const DEFAULT_HARDHAT_RPC_URL = "http://127.0.0.1:8545";

/**
 * RPC URL of the local hardhat node. Defaults to http://127.0.0.1:8545.
 * Set NEXT_PUBLIC_HARDHAT_RPC_URL to override it, e.g. when the browser can't reach the node directly.
 * A path such as "/api/rpc" is resolved against the page origin in the browser and falls back to
 * HARDHAT_RPC_PROXY_TARGET (or the default URL) on the server.
 */
const getHardhatRpcUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_HARDHAT_RPC_URL;
  if (!configuredUrl) return DEFAULT_HARDHAT_RPC_URL;
  if (!configuredUrl.startsWith("/")) return configuredUrl;
  return typeof window !== "undefined"
    ? `${window.location.origin}${configuredUrl}`
    : process.env.HARDHAT_RPC_PROXY_TARGET || DEFAULT_HARDHAT_RPC_URL;
};

export const hardhatRpcUrl = getHardhatRpcUrl();

export const hardhatWsUrl = hardhatRpcUrl.replace(/^http/, "ws");

export const hardhat = {
  ...viemHardhat,
  rpcUrls: { default: { http: [hardhatRpcUrl] } },
} as const satisfies Chain;
