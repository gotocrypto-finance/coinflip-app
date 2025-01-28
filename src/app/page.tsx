"use client";

import { useAccount, useWriteContract } from "wagmi";
import { useEffect } from "react";

import abi from "@/abi/coinflip.abi.json";

import { CoinSide } from "@/types/coinSide";

import { CONTRACT_ADDRESS } from "@/config";
import { useGameState } from "@/context/gameState";

import Button, { ButtonStyle } from "@/components/Button";
import ConnectButton from "@/components/ConnectButton";
import GameControls from "@/components/GameControls";
import RecentGames from "@/components/RecentGames";
import { generateSeed } from "@/utils/generateSeed";
import { formatEther, parseEther } from "viem";
import GameProgress from "@/components/GameProgress";
import PlayerMenu from "@/components/PlayerMenu";

export default function Home() {
  const { isConnected } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();

  const {
    isBet,
    setIsBet,
    isFlipping,
    setIsFlipping,
    isGameInProgress,
    setIsGameInProgress,
    playerBet,
    setPlayerBet,
  } = useGameState();

  useEffect(() => {
    if (!isGameInProgress) {
      setIsBet(false);
    }
  }, [isGameInProgress]);

  const enterGame = (bet: CoinSide | null, betAmount: bigint) => {
    const functionName = "enter";

    const args = [generateSeed(), bet];

    setPlayerBet(bet);
    setIsGameInProgress(true);

    console.log(
      `Entering game by calling '${functionName}' on '${CONTRACT_ADDRESS}' with args: [${args}] and value: ${parseEther(
        formatEther(betAmount)
      )} (${formatEther(betAmount)})`
    );

    (window as any).gameOn = true;

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
        },
        onSettled: () => {
          console.log("Transaction settled!");
        },
        onError: (error) => {
          console.warn("Transaction error!", error);

          if ((window as any).gameOn)
            setTimeout(() => {
              if ((window as any).gameOn) enterGame(bet, betAmount);
            }, 1000);
        },
      }
    );
  };

  const exitGame = () => {
    (window as any).gameOn = false;

    setIsGameInProgress(false);
    setPlayerBet(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full px-6 py-4 flex justify-between items-center max-w-lg mx-auto">
        <h1 className="text-5xl font-bold text-yellow-400 flex">Coin Flip!</h1>

        <div className="flex">
          <PlayerMenu />
        </div>
      </header>

      <main className="flex grow flex-col justify-start items-center pb-4 px-6 max-w-lg mx-auto">
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
                  exitGame={exitGame}
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
