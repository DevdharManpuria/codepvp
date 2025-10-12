import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./sockets/index.js";
import 'dotenv/config';

const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Optional: REST routes can be added here
app.get("/api/rooms", (req, res) => res.json(require("./store/rooms.js").rooms));

setupSocket(io);

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
