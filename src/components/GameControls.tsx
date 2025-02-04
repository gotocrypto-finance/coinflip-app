import clsx from "clsx";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useReadContract } from "wagmi";

import abi from "@/abi/coinflip.abi.json";
import { CONTRACT_ADDRESS } from "@/config";
import { CoinSide } from "@/types/coinSide";

import Button, { ButtonSize, ButtonStyle } from "./Button";

export interface GameControlsProps {
  enterGame: (bet: CoinSide, betAmount: bigint) => void;
}

export default function GameControls({ enterGame }: GameControlsProps) {
  const [betAmount, setBetAmount] = useState(parseEther("0"));

  const { data: allowedValues } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getAllowedValues",
  });

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-4 mb-8">
        {(allowedValues as Array<bigint>)?.map(
          (value: bigint, index: number) => (
            <Button
              key={index}
              label={`${formatEther(value)} ETH`}
              size={ButtonSize.Small}
              style={
                betAmount === value
                  ? ButtonStyle.Secondary
                  : ButtonStyle.Primary
              }
              onClick={() => setBetAmount(value)}
            />
          )
        )}

        <Button
          label="Clear"
          size={ButtonSize.Small}
          fullWidth
          style={ButtonStyle.Primary}
          onClick={() => setBetAmount(parseEther("0"))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 transition-all">
        <Button
          label="Heads"
          style={ButtonStyle.Tertiary}
          disabled={betAmount === parseEther("0")}
          onClick={() => enterGame(CoinSide.Heads, betAmount)}
        />

        <Button
          label="Tails"
          style={ButtonStyle.Neutral}
          disabled={betAmount === parseEther("0")}
          onClick={() => enterGame(CoinSide.Tails, betAmount)}
        />
      </div>
    </div>
  );
}
