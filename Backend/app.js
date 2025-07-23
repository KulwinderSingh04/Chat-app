const {createServer} = require("http");
const express = require("express");
const cors = require("cors");
const {Server} = require("socket.io");



const app = express();

const server = createServer(app);

const users = {};
const io = new Server(server, {
    cors : {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}});

io.on("connection", (socket) => {
    console.log("connection established");

    socket.on("joined", ({user}) => {
        users[socket.id] = user;
        console.log(`${user} has joined`);
        socket.broadcast.emit("user joined", {user: "Admin", message: `${users[socket.id]} has joined`});
        socket.emit("welcome", {user: "Admin", message: "Welcome to the chat"});
    });
    
    socket.on("message", ({message, id}) => {
        io.emit("sendMessage", {user : users[id], message, id});
    });
    
    socket.on("userLeft", () => {
        socket.broadcast.emit('leave', { user: 'Admin', message: `${users[socket.id]} left`, id: socket.id });
        console.log(`${users[socket.id]} left`);
        delete users[socket.id];
    });


});

const port = 8080;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("hello");
})
server.listen(port, () => {
    console.log("server is listening");
});