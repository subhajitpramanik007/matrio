const socketIo = require("socket.io-client");
const { io } = socketIo;

const BASE_URL = "http://localhost:8000/api/v1";

export function getAccessToken() {
  return fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailOrUsername: "test@test.com",
      password: "password",
    }),
  })
    .then((res) => res.json())
    .then((data) => data.data.accessToken as string);
}

export const getNewSocket = (token: string) =>
  io("http://localhost:8001", {
    auth: { token },
    transports: ["websocket"], // ✅ force websocket for faster tests
  });

export const connectSocket = async (token: string) => {
  const socket = await getNewSocket(token);

  socket.connect();

  return socket;
};
