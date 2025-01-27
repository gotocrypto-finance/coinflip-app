"use client";

import { useAccount, useWriteContract } from "wagmi";
import { useEffect, useState } from "react";

import abi from "@/abi/coinflip.abi.json";

import { CoinSide } from "@/types/coinSide";

import { CONTRACT_ADDRESS } from "@/config";

import Button, { ButtonStyle } from "@/components/Button";
import ConnectButton from "@/components/ConnectButton";
import GameControls from "@/components/GameControls";
import RecentGames from "@/components/RecentGames";
import { generateSeed } from "@/utils/generateSeed";
import { formatEther, parseEther } from "viem";
import GameProgress from "@/components/GameProgress";

export default function Home() {
  const { isConnected } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();

  const [isBet, setIsBet] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  const [playerBet, setPlayerBet] = useState<CoinSide | null>(null);

  useEffect(() => {
    if (!isGameInProgress) {
      setIsBet(false);
    }
  }, [isGameInProgress]);

  const enterGame = async (bet: CoinSide, betAmount: bigint) => {
    const args = [generateSeed(), bet];
    const functionName = "enter";

    console.log(
      `Entering game by calling '${functionName}' on '${CONTRACT_ADDRESS}' with args: [${args}] and value: ${parseEther(
        formatEther(betAmount)
      )} (${formatEther(betAmount)})`
    );

    setIsGameInProgress(true);
    setPlayerBet(bet);

    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi,
        functionName,
        args,
        value: parseEther(formatEther(betAmount)),
      },
      {
        onSuccess: () => {
          console.log("Transaction successful!");

          setIsBet(true);
        },
        onSettled: () => {
          console.log("Transaction settled!");
        },
        onError: (error) => {
          console.warn("Transaction error!", error);

          setTimeout(() => enterGame(bet, betAmount), 1000);
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full py-4 flex justify-between items-center flex-col">
        <h1 className="text-5xl font-bold text-yellow-400">Coin Flip!</h1>
      </header>

      <main className="flex grow flex-col justify-start items-center pb-4 px-6">
        <div className="flex grow border-solid border-white border-2 rounded-xl overflow-y-auto w-full">
          <div className="block h-0 p-2">
            <RecentGames />
          </div>
        </div>

        <div className="flex items-center mt-8">
          {isConnected ? (
            isFlipping ? (
              isGameInProgress && playerBet !== null ? (
                <GameProgress
                  playerBet={playerBet}
                  isBet={isBet}
                  setIsGameInProgress={setIsGameInProgress}
                />
              ) : (
                <GameControls enterGame={enterGame} />
              )
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
