"use client";

import { useAccount, useWriteContract } from "wagmi";
import { simulateContract } from "@wagmi/core";

import abi from "@/abi/coinflip.abi.json";

import { CoinSide } from "@/types/coinSide";

import { config, CONTRACT_ADDRESS } from "@/config";
import { useGameState } from "@/context/gameState";

import Button, { ButtonStyle } from "@/components/Button";
import ConnectButton from "@/components/ConnectButton";
import GameControls from "@/components/GameControls";
import RecentGames from "@/components/RecentGames";
import { generateSeed } from "@/utils/generateSeed";
import { formatEther, parseEther } from "viem";
import GameProgress from "@/components/GameProgress";
import PlayerMenu from "@/components/PlayerMenu";
import { useEffect } from "react";

export default function Home() {
  const { isConnected } = useAccount();

  const { writeContract } = useWriteContract();

  const {
    isFlipping,
    setIsFlipping,
    isGameInProgress,
    setIsGameInProgress,
    playerBet,
    setPlayerBet,
  } = useGameState();

  const enterGame = async (bet: CoinSide | null, betAmount: bigint) => {
    const functionName = "enter";

    const args = [generateSeed(), bet];

    const enterContractAttributes = {
      address: CONTRACT_ADDRESS,
      abi,
      functionName,
      args,
      value: parseEther(formatEther(betAmount)),
    };

    console.log("Simulating contract:", enterContractAttributes);

    try {
      const { result } = await simulateContract(
        config,
        enterContractAttributes
      );

      console.log("Simulate result:", result);

      setPlayerBet(bet);
      setIsGameInProgress(true);

      writeContract(enterContractAttributes, {
        onSuccess: () => {
          console.log("Transaction successful!");
        },
        onSettled: () => {
          console.log("Transaction settled!");
        },
        onError: (error) => {
          console.warn("Transaction error!", error);
        },
      });
    } catch (error) {
      console.warn("Error simulating contract:", error);
    }
  };

  const exitGame = () => {
    setIsGameInProgress(false);
    setPlayerBet(null);
  };

  useEffect(() => {
    console.info("Smart Contract Address:", CONTRACT_ADDRESS);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full px-6 py-4 flex justify-between items-center max-w-lg mx-auto">
        <h1 className="text-5xl font-bold text-yellow-400 flex">Coin Flip!</h1>

        <div className="flex">
          <PlayerMenu />
        </div>
      </header>

      <main className="flex grow flex-col justify-start items-center pb-4 px-6 w-[32rem] mx-auto">
        <div className="flex grow border-solid border-white border-2 rounded-xl overflow-y-auto w-full">
          <div className="block h-0 p-2">
            <RecentGames />
          </div>
        </div>

        <div className="flex items-center mt-8">
          {isConnected ? (
            isFlipping ? (
              isGameInProgress && playerBet !== null ? (
                <GameProgress playerBet={playerBet} exitGame={exitGame} />
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
        Copyright &copy; 2025 &nbsp;<a href="https://gtc.finance">GoToCrypto</a>
      </footer>
    </div>
  );
}
