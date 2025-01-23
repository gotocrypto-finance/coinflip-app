import { Address } from "viem";

export interface Player {
  addr: Address;
  seed: bigint;
  bet: bigint;
  stake: bigint;
}
