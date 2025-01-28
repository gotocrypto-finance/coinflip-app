import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { Address, http } from "viem";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, arbitrum, sepolia, baseSepolia } from "wagmi/chains";

// Get projectId from <https://cloud.reown.com>
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;
export const CONTRACT_ADDRESS =
  "0x5354875cC19ED13335bac3cF5B723989D9908AA0" as Address;

if (!PROJECT_ID) throw new Error("Project ID is not defined");

const metadata = {
  name: "AppKit example",
  description: "AppKit Example",
  url: "",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
export const chains = [baseSepolia] as const;

export const transports = {
  [baseSepolia.id]: http(`https://sepolia.base.org`),
};

export const config = defaultWagmiConfig({
  chains,
  projectId: PROJECT_ID,
  metadata,
  auth: {
    showWallets: true,
    walletFeatures: true,
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  pollingInterval: 1000,
});
