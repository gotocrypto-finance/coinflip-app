import { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";

import abi from "@/abi/coinflip.abi.json";
import useRecentGames from "@/hooks/useRecentGames";
import { CoinSide } from "@/types/coinSide";

import Loading from "./Loading";
import Modal from "./Modal";
import clsx from "clsx";
import { NumberedGame } from "@/interfaces/game";
import Button, { ButtonSize, ButtonStyle } from "./Button";
import { CONTRACT_ADDRESS } from "@/config";

export interface GameProgressProps {
  playerBet: CoinSide;
  setIsGameInProgress: (isGameInProgress: boolean) => void;
}

export default function GameProgress({
  playerBet,
  setIsGameInProgress,
}: GameProgressProps) {
  const [finishedGame, setFinishedGame] = useState<NumberedGame>();
  const [lastRecentGamesCount, setLastRecentGamesCount] = useState(0);

  const { recentGames } = useRecentGames();

  const { data: hash, isPending, writeContract } = useWriteContract();

  useEffect(() => {
    if (recentGames.length > 0) {
      if (lastRecentGamesCount > 0) {
        setFinishedGame(recentGames[0]);
      } else {
        setLastRecentGamesCount(recentGames.length);
      }
    }
  }, [recentGames]);

  const claimPrize = () => {
    const functionName = "claim";
    console.log(
      `Claiming prize by calling '${functionName}' on '${CONTRACT_ADDRESS}'`
    );

    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi,
        functionName,
      },
      {
        onSuccess: () => {
          console.log("Transaction successful!");
        },
        onSettled: () => {
          console.log("Transaction settled!");

          setIsGameInProgress(false);
        },
        onError: (error) => {
          console.warn("Transaction error!", error);
        },
      }
    );
  };

  return (
    <Modal>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="text-2xl">
          {finishedGame ? <>Game Finished!</> : <>Game In Progress...</>}
        </div>

        <div className="flex mt-4">
          <div className="flex flex-col items-center mx-6">
            <div className="text-lg my-4">You bet on:</div>
            <div
              className={clsx(
                "w-12 h-12 flex items-center justify-center rounded-full p-8 text-4xl shadow-inner-strong",
                {
                  "bg-yellow-300": playerBet === CoinSide.Heads,
                  "bg-gray-300": playerBet === CoinSide.Tails,
                }
              )}
            >
              {playerBet === CoinSide.Heads ? "H" : "T"}
            </div>
          </div>

          <div className="flex flex-col items-center mx-6">
            <div className="text-lg my-4">Winning Bet:</div>

            {finishedGame ? (
              <div
                className={clsx(
                  "w-12 h-12 flex items-center justify-center rounded-full p-8 text-4xl shadow-inner-strong",
                  {
                    "bg-yellow-300":
                      finishedGame.winningBet === BigInt(CoinSide.Heads),
                    "bg-gray-300":
                      finishedGame.winningBet === BigInt(CoinSide.Tails),
                  }
                )}
              >
                {finishedGame.winningBet === BigInt(CoinSide.Heads) ? "H" : "T"}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>

        {finishedGame ? (
          <div className="text-4xl mt-6">
            <div className="flex flex-col items-center">
              {finishedGame.winningBet === BigInt(playerBet) ? (
                <>
                  <div className="mb-4">You Won!</div>

                  <Button
                    style={ButtonStyle.Tertiary}
                    size={ButtonSize.Medium}
                    label="Claim Prize!"
                    onClick={() => claimPrize()}
                  />
                </>
              ) : (
                <>
                  <div className="mb-4">You Lost!</div>

                  <Button
                    style={ButtonStyle.Tertiary}
                    size={ButtonSize.Medium}
                    label="Try Again!"
                    onClick={() => setIsGameInProgress(false)}
                  />
                </>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}
