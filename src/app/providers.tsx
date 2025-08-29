"use client";

import { useMemo } from "react";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import { Web3ModalProvider } from "@/context/web3modal";
import { GameStateProvider } from "@/context/gameState";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Compute wagmi initial state on the client from document.cookie
  const initialState = useMemo(
    () =>
      cookieToInitialState(
        config,
        typeof document !== "undefined" ? document.cookie : ""
      ),
    []
  );

  return (
    <Web3ModalProvider initialState={initialState}>
      <GameStateProvider>{children}</GameStateProvider>
    </Web3ModalProvider>
  );
}
