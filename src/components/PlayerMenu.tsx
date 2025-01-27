import { useState } from "react";
import { Address, formatEther } from "viem";
import {
  useAccount,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from "wagmi";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import abi from "@/abi/coinflip.abi.json";

import { formatAddress } from "@/utils/formatAddress";
import { CONTRACT_ADDRESS } from "@/config";

import Button, { ButtonSize, ButtonStyle } from "./Button";
import { claim } from "@/utils/claim";

export default function PlayerMenu() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { data: balance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getBalance",
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative w-12 h-12">
      <div
        className="absolute right-0 top-0 cursor-pointer w-full h-full"
        onClick={() => toggleMenu()}
      >
        <AccountCircle
          style={{ width: "100%", height: "100%", color: "rgb(250 204 21)" }}
        />
      </div>

      {menuOpen ? (
        <div className="p-4 absolute right-0 top-0 w-64 rounded-lg bg-gray-700">
          <div
            className="absolute top-4 right-5 text-2xl cursor-pointer"
            onClick={() => toggleMenu()}
          >
            &#x2715;
          </div>

          {isConnected ? (
            <div className="flex flex-col max-w-48">
              <Button
                label="Disconnect"
                style={ButtonStyle.Secondary}
                size={ButtonSize.Small}
                onClick={() => {
                  toggleMenu();
                  disconnect();
                }}
              />

              <div className="text-xs flex mt-4">
                <div className="flex mr-4">Connected User:</div>
                <div className="flex grow justify-end">
                  {formatAddress(address as Address)}
                </div>
              </div>

              {(balance as bigint) > 0 ? (
                <>
                  <div className="text-xs flex mt-4">
                    <div className="flex mr-4">Ballance:</div>

                    <div className="flex grow justify-end">
                      {formatEther(balance as bigint)}
                    </div>
                  </div>

                  <div className="text-xs flex mt-4 justify-end">
                    <Button
                      label="Claim"
                      style={ButtonStyle.Primary}
                      size={ButtonSize.Small}
                      onClick={() => {
                        toggleMenu();
                        claim(writeContract, () => {});
                      }}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <Button
              label="Connect Wallet"
              style={ButtonStyle.Primary}
              size={ButtonSize.Small}
              onClick={() => {
                toggleMenu();
                open();
              }}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
