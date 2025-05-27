import { io } from "socket.io-client";

export const aboutSocket = io('http://localhost:4002', {
  autoConnect: true,
});
aboutSocket.on('connect', () => {
  console.log('Connected to ABOUT socket server ID:', aboutSocket.id);
});

aboutSocket.on('about-page-visit', (data) => {
  console.log('ABOUT page visit data received:', data);
});

aboutSocket.on('disconnect', (reason) => {
  console.log('ABOUT socket disconnected:', reason);
});

aboutSocket.on('connect_error', (error) => {
  console.error('ABOUT socket connection error:', error.message);
});