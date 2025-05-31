import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
    },
});

//Store All Users
export const UserSocketMap = {} 

// Socket.io Conection Handler
io.on("connection", (socket) => {
    const UserId = socket.handshake.query.UserId;
    console.log("Socket Connected", UserId);
    if (UserId) {
        UserSocketMap[UserId] = socket.id;
    }
    //Emit Online users to all Connected Client
    io.emit("online-users", Object.keys(UserSocketMap));

    socket.on("disconnect", () => {
        console.log("Socket Disconnected", UserId);
        delete UserSocketMap[UserId];
        io.emit("online-users", Object.keys(UserSocketMap));
    });
})


server.listen(PORT, () => {
    console.log(`server is listen on PORT Number ${PORT}`)
})

