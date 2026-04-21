import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create  express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
    cors: {

        origin:process.env.CLIENT_URL,
        credentials: true
    }
})

// Store the online users 
export const userSocketMap = {}; // { userId: set of socketId's }

// Socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);

    if (userId) userSocketMap[userId] = socket.id;

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

// Create middlewares
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Routes setup
app.use("/api/auth", userRouter)
app.use('/api/status', (req, res) => { 
    res.json({ 
        status: "Server is Live!",
        mongoDBConnected: require("mongoose").connection.readyState === 1
    });
});
app.use('/api/messages', messageRouter);

// Connect to mongoDB
console.log("🚀 Starting server...");
await connectDB();

const PORT = process.env.PORT || 5000

// Start the server
server.listen(PORT, () => { 
    console.log(`✅ Server is running on port ${PORT}`);
});