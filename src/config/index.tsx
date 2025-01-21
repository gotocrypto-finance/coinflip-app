import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { Address } from "viem";
import { cookieStorage, createStorage } from "wagmi";
import { mainnet, arbitrum, sepolia } from "wagmi/chains";

console.log("env:", process.env);

// Get projectId from <https://cloud.reown.com>
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;
export const CONTRACT_ADDRESS = "0xb1" as Address;

if (!PROJECT_ID) throw new Error("Project ID is not defined");

const metadata = {
  name: "AppKit example",
  description: "AppKit Example",
  url: "",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, arbitrum, sepolia] as const;
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
});
