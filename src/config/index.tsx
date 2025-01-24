import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { Address, createClient, http } from "viem";
import { cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, arbitrum, sepolia, baseSepolia } from "wagmi/chains";

// Get projectId from <https://cloud.reown.com>
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;
export const CONTRACT_ADDRESS =
  "0x1BeF97107fBCa21638C591207C323f76C7Bf0676" as Address;

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
  [baseSepolia.id]: http(
    `https://base-sepolia.g.alchemy.com/v2/uzc0hAMMGxoGwQrid_sQCwgRcYswDrN2`
  ),
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
  transports,
});
