//=============================================================================================================//
//  The entry point of the application, configuring the server and set up the middleware                       //
//=============================================================================================================//

// Import the required packages 
const express = require("express");
const http = require('http');
const path = require("path");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const bodyparser = require("body-parser");
const config = require("./config");

const dbConnection = require("./database/connection/dbConnection");
const authRoutes = require('./routes/authUser');
const chatRoutes = require('./routes/chatRout');
const groupRoutes = require('./routes/groupChatRoute');
// Connect to mongo db
dbConnection();
// Set up the view page
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './template/views'));
app.use(express.static("template"));
app.use('/css', express.static(__dirname + '../../../template/css'));

// Middleware
app.use(express.json({ extended: false }));

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyparser.json())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/group', groupRoutes);

// Pages
app.get('/', (req, res) => res.render('index'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/chat', (req, res) => res.render('chat'));


// Socket.io
io.on('connection', socket => {
  console.log('New client connected');

  socket.on('joinRoom', ({ groupId }) => {
    socket.join(groupId);
    console.log(`User joined group: ${groupId}`);
  });

  socket.on('chatMessage', ({ groupId, message }) => {
    io.to(groupId).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


app.listen(config.PORT, ()=>{
    console.log(`Node chat app running on http://localhost:${config.PORT}`);
})