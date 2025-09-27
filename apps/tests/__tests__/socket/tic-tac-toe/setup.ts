import { TicTacToeUser } from "./tic-tac-toe.user.ts";
import crypto from "crypto";

// export const numberOfUsers = 2;
export const numberOfUsers = crypto.randomInt(2, 10);
export const users: TicTacToeUser[] = Array.from(
  { length: numberOfUsers },
  () => new TicTacToeUser()
);

export const connectAllUsers = async () => {
  await Promise.all(
    users.map((user) => {
      return new Promise<void>((resolve, reject) => {
        user.connectSocket();
        user.socket.once("connect", () => resolve());
        user.socket.once("connect_error", reject);
      });
    })
  );
};

export const disconnectAllUsers = () => {
  users.forEach((user) => {
    if (user.socket.connected) user.socket.disconnect();
  });
};
