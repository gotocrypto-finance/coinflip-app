import clsx from "clsx";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useChainId, useReadContract, useWriteContract } from "wagmi";

import abi from "@/abi/coinflip.abi.json";
import { CONTRACT_ADDRESS } from "@/config";
import { CoinSide } from "@/types/coinSide";
import { generateSeed } from "@/utils/generateSeed";

import Button, { ButtonSize, ButtonStyle } from "./Button";
import Loading from "./Loading";

export default function GameControls() {
  const chainId = useChainId();

  const { data: hash, isPending, writeContract } = useWriteContract();

  const { data: allowedValues } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getAllowedValues",
  });

  const { data: balance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getBalance",
  });

  const [betAmount, setBetAmount] = useState(parseEther("0"));

  const enterGame = async (bet: CoinSide) => {
    const args = [generateSeed(), bet];
    const functionName = "enter";

    console.log(
      `Entering game by calling '${functionName}' on '${CONTRACT_ADDRESS}' with args: [${args}] and value: ${parseEther(
        formatEther(betAmount)
      )} (${formatEther(betAmount)})`
    );

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
        },
      }
    );
  };

  useEffect(() => {
    hash && console.log("Transaction Hash:", hash);
  }, [hash]);

  useEffect(() => {
    balance && console.log("Balance:", balance);
  }, [balance]);

  useEffect(() => {
    allowedValues && console.log("Allowed Values:", allowedValues);
  }, [allowedValues]);

  useEffect(() => {
    chainId && console.log("Chain ID:", chainId);
  }, [chainId]);

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

      <div
        className={clsx(
          {
            "opacity-100": betAmount > 0,
            "opacity-25": betAmount === parseEther("0"),
          },
          "grid grid-cols-2 gap-4 transition-all"
        )}
      >
        {isPending ? (
          <div className="col-span-2 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <Button
              label="Heads"
              style={ButtonStyle.Tertiary}
              onClick={() => enterGame(CoinSide.Heads)}
            />

            <Button
              label="Tails"
              style={ButtonStyle.Neutral}
              onClick={() => enterGame(CoinSide.Tails)}
            />
          </>
        )}
      </div>
    </div>
  );
}
