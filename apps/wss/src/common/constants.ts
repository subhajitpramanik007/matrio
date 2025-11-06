import { logger } from "./logger";

export const TicTacToeWinningLines = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

const ENV_VARIABLES = ["ROOM_CLEANUP_CHECK_INTERVAL", "ROOM_CLEANUP_TIMEOUT"];

export function checkEnv() {
  for (const variable of ENV_VARIABLES) {
    logger.debug(variable, process.env[variable]);
    if (!process.env[variable]) {
      console.error(`Missing environment variable: ${variable}`);
      throw new Error(`Missing environment variable: ${variable}`);
    }
  }
}

export const TIC_TAC_TOE_ROOM_CLEANUP_CHECK_INTERVAL = Number(
  process.env.ROOM_CLEANUP_CHECK_INTERVAL
);
console.log(
  "TIC_TAC_TOE_ROOM_CLEANUP_CHECK_INTERVAL",
  TIC_TAC_TOE_ROOM_CLEANUP_CHECK_INTERVAL
);

export const TIC_TAC_TOE_ROOM_CLEANUP_TIMEOUT = Number(
  process.env.ROOM_CLEANUP_TIMEOUT
);
