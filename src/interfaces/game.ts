import { Address } from "viem";

import { Player } from "./player";

export interface Game {
  seedHash: bigint;
  firstGameBlock: bigint;
  resultBlock: bigint;
  feePercentage: bigint;
  allowedValues: Array<bigint>;
  winningBet: bigint;
  players: Array<Player>;
  winners: Array<Address>;
  loosers: Array<Address>;
}

export interface NumberedGame extends Game {
  number: number;
}
