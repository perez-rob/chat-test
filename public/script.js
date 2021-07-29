const socket = io();
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");
console.log("TEST");

const appendMessage = (message, color) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.style.color = color;
  messageContainer.append(messageElement);
  messageElement.scrollIntoView(true);
};
const userName = prompt("What is your name?");
appendMessage("You Joined Chat", "green");
socket.emit("new-user", userName);

// socket.auth = { username: 'Bob' }

socket.on("chat-message", (data) => {
  appendMessage(`${data.userName}: ${data.message}`, "black");
});

socket.on("user-connected", (userName) => {
  appendMessage(`${userName} connected`, "green");
});

socket.on("user-disconnected", (userName) => {
  appendMessage(`${userName} disconnected`, "red");
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`, "blue");
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});
