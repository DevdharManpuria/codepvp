import { rooms, userToRoom } from "../store/rooms.js";

export function roomHandlers(io, socket) {
    socket.on("joinRoom", ({ roomId, username, SLOT_COUNT }) => {
        socket.username = username;
        socket.roomId = roomId;

        const existing = userToRoom[username];
        if (existing && existing.roomId !== roomId) {
            const oldRoom = rooms[existing.roomId];
            if (oldRoom) {
                oldRoom.teamA = oldRoom.teamA.map(p => (p?.pid === username ? null : p));
                oldRoom.teamB = oldRoom.teamB.map(p => (p?.pid === username ? null : p));
                io.to(existing.roomId).emit("roomUpdate", oldRoom);
            }
            socket.leave(existing.roomId);
        }

        if (!rooms[roomId]) {
            rooms[roomId] = { owner: username, teamA: Array(SLOT_COUNT).fill(null), teamB: Array(SLOT_COUNT).fill(null) };
        }

        userToRoom[username] = { roomId };
        socket.join(roomId);

        console.log(socket.username, "Joined room:", socket.roomId)

        io.to(roomId).emit("roomUpdate", rooms[roomId]);
    });

    socket.on("joinSlot", ({ roomId, team, slotIndex, username, SLOT_COUNT }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = { owner: username, teamA: Array(SLOT_COUNT).fill(null), teamB: Array(SLOT_COUNT).fill(null) };
        }
        const room = rooms[roomId];

        room.teamA = room.teamA.map(p => (p?.pid === username ? null : p));
        room.teamB = room.teamB.map(p => (p?.pid === username ? null : p));

        const targetTeam = team === "A" ? room.teamA : room.teamB;
        if (!targetTeam[slotIndex]) targetTeam[slotIndex] = { pid: username, ready: false };

        socket.join(roomId);
        userToRoom[username] = { roomId, username };

        io.to(roomId).emit("roomUpdate", room);
    });

    socket.on("toggleReady", ({ roomId, team, slotIndex, username }) => {
        const room = rooms[roomId];
        if (!room) return;
        const slot = room[`team${team}`][slotIndex];
        if (slot?.pid === username) {
            slot.ready = !slot.ready;
            io.to(roomId).emit("roomUpdate", room);
        }
    });
}