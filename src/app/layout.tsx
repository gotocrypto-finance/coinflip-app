import "@/styles/globals.scss";

import type { Metadata } from "next";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import Web3ModalProvider from "@/context";

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
      <body className="bg-grey-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 flex flex-col w-screen h-screen">
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
