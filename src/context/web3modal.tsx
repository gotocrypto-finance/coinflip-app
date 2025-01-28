"use client";

import React, { ReactNode } from "react";
import { config, PROJECT_ID } from "@/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

if (!PROJECT_ID) throw new Error("Project ID is not defined");

createWeb3Modal({
  wagmiConfig: config,
  projectId: PROJECT_ID,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: "light",
});

export const Web3ModalProvider = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) => (
  <WagmiProvider config={config} initialState={initialState}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WagmiProvider>
);
