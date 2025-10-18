import { rooms } from '../store/rooms.js';

export function chatHandlers(io, socket) {

  socket.on('joinChat', ({ roomId, teamId, username }) => {
    if (!roomId) return;
    socket.join(`chat-${roomId}`);
    if (teamId) socket.join(`chat-${roomId}-team-${teamId}`);

    const room = rooms[roomId] || {};
    // ensure arrays exist on the room object
    const roomMessages = room.chats || [];
    socket.emit('chatHistory', { scope: 'room', roomId, messages: roomMessages });

    if (teamId) {
      const teamMessages = (room.teamChats && room.teamChats[teamId]) || [];
      socket.emit('chatHistory', { scope: 'team', roomId, teamId, messages: teamMessages });
    }
  });

  socket.on('chatMessage', ({ roomId, teamId, username, text }) => {
    if (!roomId || !text) return;
    const msg = { username, text, ts: Date.now() };

    // ensure room exists in shared store
    rooms[roomId] = rooms[roomId] || {};
    const room = rooms[roomId];

    // store room-level chats
    room.chats = room.chats || [];
    room.chats.push(msg);
    if (room.chats.length > 500) room.chats.shift();
    io.to(`chat-${roomId}`).emit('chatMessage', { scope: 'room', roomId, message: msg });

    // store team-level chats under room.teamChats[teamId]
    if (teamId) {
      room.teamChats = room.teamChats || {};
      room.teamChats[teamId] = room.teamChats[teamId] || [];
      room.teamChats[teamId].push(msg);
      if (room.teamChats[teamId].length > 500) room.teamChats[teamId].shift();
      io.to(`chat-${roomId}-team-${teamId}`).emit('chatMessage', { scope: 'team', roomId, teamId, message: msg });
    }
  });
}