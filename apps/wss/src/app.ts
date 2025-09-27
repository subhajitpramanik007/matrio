import cors from "cors";
import http from "http";
import express from "express";

import WebSocketServer from "./socket";
import { router } from "./routes";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const httpServer = http.createServer(app);
const wsServer = WebSocketServer.init(httpServer);
const io = wsServer.io;

import "./gateway/tic-tac-toe.gateway";

app.use("/", router);

export { app, io, httpServer };
