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
const cookieParser = require("cookie-parser");
const config = require("./config");

const dbConnection = require("./database/connection/dbConnection");
const authRoutes = require('./routes/authUser');
const chatRoutes = require('./routes/chatRout');
const groupRoutes = require('./routes/groupChatRoute');
// Connect to mongo db
dbConnection();

app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyparser.json());

// Set the static files location
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/group', groupRoutes);

// Pages
app.get('/', (req, res) => res.render('index'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));


app.listen(config.PORT, ()=>{
    console.log(`Node chat app running on http://localhost:${config.PORT}`);
});