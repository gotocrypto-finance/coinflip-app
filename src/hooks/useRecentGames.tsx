import { useEffect, useState } from "react";

import { readContract } from "viem/actions";
import { createClient } from "viem";
import { baseSepolia } from "viem/chains";

import { useReadContract } from "wagmi";

import abi from "@/abi/coinflip.abi.json";
import { transports, CONTRACT_ADDRESS } from "@/config";
import { Game, NumberedGame } from "@/interfaces/game";

export const MAX_GAMES = 7;

export default function useRecentGames() {
  const [recentGames, setRecentGames] = useState<Array<NumberedGame>>([]);

  const { data: completedGamesCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getCompletedGameCount",
  });

  useEffect(() => {
    if ((completedGamesCount as number) > 0) {
      const client = createClient({ transport: transports[baseSepolia.id] });

      const readContracts = [];

      for (let i = 0; i < (completedGamesCount as number); i++) {
        readContracts.push(
          readContract(client, {
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "getCompletedGame",
            args: [i],
          })
        );
      }

      Promise.all(readContracts).then((games) =>
        setRecentGames(
          (games as Array<Game>)
            .sort((a, b) => (a.resultBlock > b.resultBlock ? 1 : -1))
            .map((game: Game, index) => ({
              ...game,
              number: index,
            }))
            .slice(
              games.length < MAX_GAMES
                ? games.length
                : games.length - MAX_GAMES,
              games.length
            )
        )
      );
    }
  }, [completedGamesCount]);

  return { recentGames };
}
