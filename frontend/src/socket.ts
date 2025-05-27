import { io } from 'socket.io-client';

export const socket = io('http://localhost:3001', {
  autoConnect: true,
});

socket.on('connect', () => {
  console.log('Socket.IO client connected to the server! ID:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Socket.IO client disconnected:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Socket.IO connection error:', error.message);
});



socket.on('reconnect', (attemptNumber) => {
  console.log(` Reconnected after ${attemptNumber} attempts.`);
});