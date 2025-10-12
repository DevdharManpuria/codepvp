import { roomHandlers } from "./roomHandlers.js";
import { gameHandlers } from "./gameHandlers.js";
import { editorHandlers } from "./editorHandlers.js";
import { rooms, userToRoom } from "../store/rooms.js";

export function setupSocket(io) {
  io.on("connection", (socket) => {

    roomHandlers(io, socket);
    gameHandlers(io, socket);
    editorHandlers(io, socket);

    socket.on("disconnect", () => {
      const username = socket.username;
      if (!username) return;

      const data = userToRoom[username];
      if (!data) return;
      const { roomId } = data;

      const room = rooms[roomId];
      if (!room) return;

      room.teamA = room.teamA.map(p => (p?.pid === username ? null : p));
      room.teamB = room.teamB.map(p => (p?.pid === username ? null : p));

      delete userToRoom[username];
      io.to(roomId).emit("roomUpdate", room);

      console.log(`❌ ${username} disconnected`);
    });
  });
}
