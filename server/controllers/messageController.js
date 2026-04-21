import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { io, userSocketMap } from "../server.js";


// Get all users except logged in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

        // Count no. of unseen messages
        const unseenMessages = {};
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({ senderId: user._id, receiverId: userId, seen: false });
            if (messages.length > 0) {
                // Object with Key-Value pair
                unseenMessages[user._id] = messages.length;
            }
        });
        await Promise.all(promises);
        res.json({ success: true, users: filteredUsers, unseenMsgs: unseenMessages })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get all messages of selected user
export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:
                [
                    { senderId: selectedUserId, receiverId: myId },
                    { senderId: myId, receiverId: selectedUserId }
                ],
        });
        await Message.updateMany({ senderId: selectedUserId, receiverId: myId, seen: false }, { seen: true })
        res.json({ success: true, messages })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Mark the messages as seen 
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id, { seen: true })
        res.json({ success: true })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Send message to selected User
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;
        let imageURL;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            image: imageURL,
            text
        })

        // Emit the new message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.json({ success: true, newMessage })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}