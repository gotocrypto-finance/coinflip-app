"use client";

import { useAccount } from "wagmi";
import { useState } from "react";

import Button, { ButtonStyle } from "@/components/Button";
import ConnectButton from "@/components/ConnectButton";
import GameControls from "@/components/GameControls";
import RecentGames from "@/components/RecentGames";

export default function Home() {
  const { isConnected } = useAccount();
  const [isFlipping, setIsFlipping] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full py-4 flex justify-between items-center flex-col">
        <h1 className="text-5xl font-bold text-yellow-400">Coin Flip!</h1>
      </header>

      <main className="flex grow flex-col justify-start items-center pb-4 px-6">
        <div className="flex grow border-solid border-white border-2 rounded-xl overflow-y-auto">
          <div className="block h-0 p-2">
            <RecentGames />
          </div>
        </div>

        <div className="flex items-center mt-8">
          {isConnected ? (
            isFlipping ? (
              <GameControls />
            ) : (
              <Button
                onClick={() => setIsFlipping(true)}
                style={ButtonStyle.Tertiary}
                label="Flip!"
              />
            )
          ) : (
            <ConnectButton />
          )}
        </div>
      </main>

      <footer className="w-full py-4 flex justify-center">
        Copyright &copy; 2025 GoToCrypto
      </footer>
    </div>
  );
}
