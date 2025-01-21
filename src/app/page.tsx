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
    <>
      <header className="w-full py-4 flex justify-between items-center flex-col">
        <h1 className="text-5xl font-bold text-yellow-400">Coin Flip!</h1>
      </header>

      <main className="flex grow flex-col justify-end items-center pb-4 px-6">
        <div className="flex grow justify-center items-center border-solid border-white border-2 rounded-xl mb-4 w-full">
          <RecentGames />
        </div>

        <div className="flex items-center">
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

      <footer className="flex justify-center py-4">
        Copyright &copy; 2025 GoToCrypto
      </footer>
    </>
  );
}
