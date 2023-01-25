const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

io.on("connection", (socket) => {
    //console.log("socket connection: success");
    socket.on('chatroom', (chat) => {
        console.log(chat.user+" joined room, " +chat.room);
        socket.join(chat.room);
    });

    socket.on('send', (room, data) => {
        let sendData = {date: data.date, user: data.user, message: data.message};
        socket.to(room).emit("receive_message", sendData);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected!');
    });
});

server.listen(3000, ()=> {
    console.log("listening on port: " +port);
});