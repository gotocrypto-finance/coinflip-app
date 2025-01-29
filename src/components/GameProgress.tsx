import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

import useRecentGames from "@/hooks/useRecentGames";
import { NumberedGame } from "@/interfaces/game";
import { CoinSide } from "@/types/coinSide";
import { claim } from "@/utils/claim";

import Button, { ButtonSize, ButtonStyle } from "./Button";
import Loading from "./Loading";
import Modal from "./Modal";

export interface GameProgressProps {
  playerBet: CoinSide;
  exitGame: () => void;
}

export default function GameProgress({
  playerBet,
  exitGame,
}: GameProgressProps) {
  const [finishedGame, setFinishedGame] = useState<NumberedGame>();
  const [lastGameNumber, setLastGameNumber] = useState(0);

  const { recentGames } = useRecentGames();
  const { writeContract } = useWriteContract();
  const { address } = useAccount();

  useEffect(() => {
    if (recentGames.length > 0) {
      if (lastGameNumber > 0 && recentGames[0].number > lastGameNumber) {
        console.log("Game Finished: ", recentGames[0]);

        setFinishedGame(recentGames[0]);
      } else {
        console.log("Updating Last Game:", recentGames[0].number);

        setLastGameNumber(recentGames[0].number);
      }
    }
  }, [recentGames]);

  return (
    <Modal>
      <div className="flex flex-col items-center justify-center w-full h-full relative">
        <div
          className="absolute top-0 right-2 text-2xl cursor-pointer"
          onClick={() => exitGame()}
        >
          &#x2715;
        </div>

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
              {finishedGame.winners.find((a) => a === address) &&
              !finishedGame.loosers.find((a) => a === address) ? (
                <>
                  <div className="mb-4">You Won!</div>

                  <Button
                    style={ButtonStyle.Tertiary}
                    size={ButtonSize.Medium}
                    label="Claim Prize!"
                    onClick={() => claim(writeContract, () => exitGame())}
                  />
                </>
              ) : (
                <>
                  <div className="mb-4">You Lost!</div>

                  <Button
                    style={ButtonStyle.Tertiary}
                    size={ButtonSize.Medium}
                    label="Try Again!"
                    onClick={() => exitGame()}
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
