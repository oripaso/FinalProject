const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const initChat = require('./public/js/chat'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Initialize Chat
initChat(io);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sign-in.html'));
});

app.post('/submit-your-form', (req, res) => {
  res.redirect('/chat');
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

