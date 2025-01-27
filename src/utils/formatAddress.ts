import { Address } from "viem";

export const formatAddress = (address: Address): string =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;
