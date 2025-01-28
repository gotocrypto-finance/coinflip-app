"use client";

import { CoinSide } from "@/types/coinSide";
import { createContext, ReactNode, useContext, useState } from "react";

interface GameState {
  isBet: boolean;
  setIsBet: (isBet: boolean) => void;
  isFlipping: boolean;
  setIsFlipping: (isFlipping: boolean) => void;
  isGameInProgress: boolean;
  setIsGameInProgress: (isGameInProgress: boolean) => void;
  playerBet: CoinSide | null;
  setPlayerBet: (playerBet: CoinSide | null) => void;
}

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [isBet, setIsBet] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [isGameInProgress, setIsGameInProgress] = useState<boolean>(false);
  const [playerBet, setPlayerBet] = useState<CoinSide | null>(null);

  return (
    <GameStateContext.Provider
      value={{
        isBet,
        setIsBet,
        isFlipping,
        setIsFlipping,
        isGameInProgress,
        setIsGameInProgress,
        playerBet,
        setPlayerBet,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);

  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }

  return context;
};
