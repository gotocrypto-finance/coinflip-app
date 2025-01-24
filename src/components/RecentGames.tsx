import clsx from "clsx";

import useRecentGames from "@/hooks/useRecentGames";

import { CoinSide } from "@/types/coinSide";
import { NumberedGame } from "@/interfaces/game";

export default function RecentGames() {
  const { recentGames } = useRecentGames();

  return (
    <div className="flex flex-col w-full">
      <div className="text-xl">Recent Games:</div>

      <div className="grid grid-cols-1 w-full max-h-[50%] overflow-auto">
        {recentGames.map((game: NumberedGame) => (
          <div key={game.number} className="flex flex-col my-2">
            <div className="text-base font-bold">
              Game {(game as any).number}
            </div>

            <div className="grid grid-cols-4 text-xs">
              <div className="">Winning Flip:</div>
              <div className="col-span-3">
                <div
                  className={clsx(
                    "w-5 h-5 rounded-full shadow-inner-strong text-black inline-flex items-center justify-center",
                    {
                      "bg-yellow-300":
                        game.winningBet === BigInt(CoinSide.Heads),
                      "bg-gray-300": game.winningBet === BigInt(CoinSide.Tails),
                    }
                  )}
                >
                  {game.winningBet === BigInt(CoinSide.Heads) ? "H" : "T"}
                </div>
              </div>

              {game.winners.length ? (
                <>
                  <div className="">Winners:</div>
                  <div>{game.winners.join(", ")}</div>
                </>
              ) : (
                <></>
              )}

              {game.loosers.length ? (
                <>
                  <div className="">Losers:</div>
                  <div>{game.loosers.join(", ")}</div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
