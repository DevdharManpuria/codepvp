import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./sockets/index.js";
import 'dotenv/config';
import cors from "cors";
import { rooms } from "./store/rooms.js";

const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Optional: REST routes can be added here
app.get("/api/rooms", (req, res) => res.json(rooms));

setupSocket(io);

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
