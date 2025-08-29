import "@/styles/globals.scss";
import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "GoToCrypto CoinFlip",
  description: "GoToCrypto CoinFlip is a decentralized coin flip game.",
};

// keep this sync; no next/headers here
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-800 text-gray-100 flex flex-col w-screen h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
