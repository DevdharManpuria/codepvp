import { rooms } from '../store/rooms.js';

export function chatHandlers(io, socket) {

  socket.on('joinChat', ({ roomId, teamId, username }) => {
    if (!roomId) return;
    socket.join(`chat-${roomId}`);
    if (teamId) socket.join(`chat-${roomId}-team-${teamId}`);

    const room = rooms[roomId] || {};
    // if this is a team chat, emit only team history
    if (teamId) {
      const teamMessages = (room.teamChats && room.teamChats[teamId]) || [];
      socket.emit('chatHistory', { scope: 'team', roomId, teamId, messages: teamMessages });
      return;
    }

    // otherwise, emit room history
    const roomMessages = room.chats || [];
    socket.emit('chatHistory', { scope: 'room', roomId, messages: roomMessages });
  });

  socket.on('chatMessage', ({ roomId, teamId, username, text }) => {
    if (!roomId || !text) return;
    const msg = { username, text, ts: Date.now() };

    // ensure room exists in shared store
    rooms[roomId] = rooms[roomId] || {};
    const room = rooms[roomId];

    // if this is a team message, store only in teamChats
    if (teamId) {
      room.teamChats = room.teamChats || {};
      room.teamChats[teamId] = room.teamChats[teamId] || [];
      room.teamChats[teamId].push(msg);
      if (room.teamChats[teamId].length > 500) room.teamChats[teamId].shift();
      io.to(`chat-${roomId}-team-${teamId}`).emit('chatMessage', { scope: 'team', roomId, teamId, message: msg });
      return;
    }

    // otherwise store room-level chats
    room.chats = room.chats || [];
    room.chats.push(msg);
    if (room.chats.length > 500) room.chats.shift();
    io.to(`chat-${roomId}`).emit('chatMessage', { scope: 'room', roomId, message: msg });
  });
}