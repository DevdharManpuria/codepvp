export function chatHandlers(io, socket) {
  // in-memory stores (or import from central store)
  const roomChats = {};  // in production move to redis/db
  const teamChats = {};

  socket.on('joinChat', ({ roomId, teamId, username }) => {
    if (!roomId) return;
    socket.join(`chat-${roomId}`);
    if (teamId) socket.join(`chat-${roomId}-team-${teamId}`);

    socket.emit('chatHistory', { scope: 'room', roomId, messages: roomChats[roomId] || [] });
    if (teamId) {
      socket.emit('chatHistory', { scope: 'team', roomId, teamId, messages: teamChats[`${roomId}-team-${teamId}`] || [] });
    }
  });

  socket.on('chatMessage', ({ roomId, teamId, username, text }) => {
    if (!roomId || !text) return;
    const msg = { username, text, ts: Date.now() };

    roomChats[roomId] = roomChats[roomId] || [];
    roomChats[roomId].push(msg);
    if (roomChats[roomId].length > 500) roomChats[roomId].shift();
    io.to(`chat-${roomId}`).emit('chatMessage', { scope: 'room', roomId, message: msg });

    if (teamId) {
      const key = `${roomId}-team-${teamId}`;
      teamChats[key] = teamChats[key] || [];
      teamChats[key].push(msg);
      if (teamChats[key].length > 500) teamChats[key].shift();
      io.to(`chat-${roomId}-team-${teamId}`).emit('chatMessage', { scope: 'team', roomId, teamId, message: msg });
    }
  });
}