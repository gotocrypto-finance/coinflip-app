import { WriteContractMutate } from "wagmi/query";

import { CONTRACT_ADDRESS } from "@/config";

import abi from "@/abi/coinflip.abi.json";

export const claim = (
  writeContract: WriteContractMutate<any, any>,
  onSettled: () => void
) => {
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

        onSettled();
      },
      onError: (error: Error) => {
        console.warn("Transaction error!", error);
      },
    }
  );
};
