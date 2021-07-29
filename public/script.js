// const io = require("socket.io-client");
// const socket = io('http://localhost:3000');
const socket = io();
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
console.log('TEST')
const userName = prompt('What is your name?');
appendMessage('You Joined Chat');
socket.emit('new-user', userName)

// socket.auth = { username: 'Bob' }

socket.on('chat-message', data => {
  appendMessage(`${data.userName}: ${data.message}`);
});

socket.on('user-connected', userName => {
  appendMessage(`${userName} connected`);
});

socket.on('user-disconnected', userName => {
  appendMessage(`${userName} disconnected`);
});

messageForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message);
  messageInput.value = '';
})

const appendMessage = (message) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}