"use client";

import { useAccount } from "wagmi";

import StatusBar from "@/components/StatusBar";
import ThemeSelector from "@/components/ThemeSelector";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      <header className="w-full py-4 flex justify-between items-center flex-col">
        <StatusBar />

        <menu>
          <ThemeSelector />
        </menu>
      </header>

      <main className="flex grow flex-col justify-center items-center sm:items-start">
        <div className="flex items-center">
          {isConnected ? (
            <div className="bg-red-600 rounded-full px-12 py-1">Bet!</div>
          ) : (
            <w3m-button />
          )}
        </div>
      </main>

      <footer className="flex justify-center py-4">
        Copyright &copy; 2025 GoToCrypto
      </footer>
    </>
  );
}
