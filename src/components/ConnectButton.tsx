"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import Button, { ButtonStyle } from "./Button";

export default function ConnectButton() {
  const { open } = useWeb3Modal();

  const { isConnected } = useAccount();

  const { disconnect } = useDisconnect();

  return isConnected ? (
    <Button
      label="Disconnect"
      style={ButtonStyle.Secondary}
      onClick={() => disconnect()}
    />
  ) : (
    <Button
      label="Connect Wallet"
      style={ButtonStyle.Primary}
      onClick={() => open()}
    />
  );
}
