import "@/styles/globals.scss";

import type { Metadata } from "next";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import { Web3ModalProvider } from "@/context/web3modal";
import { GameStateProvider } from "@/context/gameState";

export const metadata: Metadata = {
  title: "GoToCrypto CoinFlip",
  description: "GoToCrypto CoinFlip is a decentralized coin flip game.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    (await headers()).get("cookie")
  );

  return (
    <html lang="en">
      <body className="bg-gray-800 text-gray-100 flex flex-col w-screen h-screen">
        <Web3ModalProvider initialState={initialState}>
          <GameStateProvider>{children}</GameStateProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
