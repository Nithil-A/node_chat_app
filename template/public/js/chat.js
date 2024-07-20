const socket = io();

document.getElementById('message-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;
  socket.emit('chatMessage', { groupId: 'default', message });
  messageInput.value = '';
});

socket.on('message', function (message) {
  const messagesDiv = document.getElementById('messages');
  const newMessage = document.createElement('div');
  newMessage.textContent = message;
  messagesDiv.appendChild(newMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
