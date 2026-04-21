# 💬 SwiftTalk

![SwiftTalk](https://img.shields.io/badge/SwiftTalk-Chat%20App-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

A fast, modern real-time chat application built with the MERN stack and Socket.io. SwiftTalk supports private messaging, live online/offline presence, image sharing, and full profile management — all in a clean, responsive interface.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Architecture](#-project-architecture)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🚦 Running the Project](#-running-the-project)
- [📡 API Endpoints](#-api-endpoints)
- [🏗️ Folder Structure](#️-folder-structure)
- [🔒 Security Features](#-security-features)
- [📄 License](#-license)

---

## ✨ Features

### ✅ Implemented

- 🔐 **JWT Authentication** — Secure signup/login with token-based sessions
- 💬 **Private Messaging** — One-on-one real-time conversations via Socket.io
- 🟢 **Online/Offline Status** — Live presence indicators for all users
- 🖼️ **File & Image Sharing** — Send images in chat, stored on Cloudinary
- 👤 **Profile Management** — Update display name, avatar, and personal info
- ☁️ **Cloud Media Storage** — All media handled via Cloudinary
- 🔄 **Real-Time Updates** — Instant message delivery with Socket.io events
- 🧹 **Centralized Error Handling** — Consistent error responses across all endpoints

### 🚧 Planned Features

- 👥 **Group Chats** — Multi-user chat rooms
- ✍️ **Typing Indicators** — See when someone is typing
- 🔔 **Push Notifications** — Browser notifications for new messages
- 🗑️ **Delete Messages** — Unsend or delete individual messages
- 🌙 **Dark / Light Mode** — Theme toggle
- 🧪 **Unit & Integration Tests** — Full test coverage
- 🐳 **Docker Support** — Containerized deployment

---

## 🛠️ Tech Stack

| Category       | Technology         | Purpose                             |
|----------------|--------------------|-------------------------------------|
| Frontend       | React 18           | UI library                          |
| Styling        | Tailwind CSS       | Utility-first CSS framework         |
| Backend        | Node.js + Express  | REST API & server                   |
| Real-Time      | Socket.io          | WebSocket-based live communication  |
| Database       | MongoDB + Mongoose | Data persistence & ODM              |
| Authentication | JWT                | Stateless token-based auth          |
| Media Storage  | Cloudinary         | Image & file uploads                |
| Dev Tools      | Nodemon, dotenv    | Development experience              |

---

## 📁 Project Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     SwiftTalk Architecture                   │
├──────────────────────────────────────────────────────────────┤
│  CLIENT (React)                                              │
│    └── Components → Pages → Socket.io Client → REST API     │
├──────────────────────────────────────────────────────────────┤
│  SERVER (Express + Node.js)                                  │
│    ├── Routes         → Define API endpoints                 │
│    ├── Controllers    → Handle request/response logic        │
│    ├── Middleware     → Auth, error handling, validation     │
│    └── Socket.io      → Real-time event management          │
├──────────────────────────────────────────────────────────────┤
│  DATA LAYER                                                  │
│    ├── MongoDB        → Users, Messages, Conversations       │
│    └── Cloudinary     → Profile pictures, shared images     │
└──────────────────────────────────────────────────────────────┘
```

**Real-Time Flow:**
```
User A sends message
    → Socket.io emit (client)
        → Socket.io server receives event
            → Save to MongoDB
                → Socket.io emit to User B
                    → User B's UI updates instantly
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js 20 or higher
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

### Step-by-Step Setup

**1. Clone the repository**
```bash
git clone https://github.com/Maryamf27/swifttalk.git
cd swifttalk
```

**2. Install dependencies for both frontend and backend**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

**3. Configure environment variables**
```bash
cd backend
cp .env.example .env
```

**4. Fill in your `.env` file**
```env
# Application
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/swifttalk
# or MongoDB Atlas:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/swifttalk

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

**5. Frontend environment variables**
```env
# frontend/.env
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

---

## 🚦 Running the Project

### Development Mode

```bash
# Run backend
cd backend
npm run dev

# Run frontend (in a new terminal)
cd frontend
npm run dev
```

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend (serves built frontend as static files)
cd backend
npm start
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint            | Description           | Auth Required |
|--------|---------------------|-----------------------|---------------|
| POST   | `/api/auth/signup`  | Register new user     | No            |
| POST   | `/api/auth/login`   | User login            | No            |
| POST   | `/api/auth/logout`  | User logout           | Yes           |
| GET    | `/api/auth/me`      | Get current user      | Yes           |

### Users

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | `/api/users`          | Get all users (sidebar)  | Yes           |
| GET    | `/api/users/:id`      | Get user by ID           | Yes           |
| PUT    | `/api/users/profile`  | Update profile info      | Yes           |
| PUT    | `/api/users/avatar`   | Update profile picture   | Yes           |

### Messages

| Method | Endpoint                      | Description                  | Auth Required |
|--------|-------------------------------|------------------------------|---------------|
| GET    | `/api/messages/:conversationId` | Get messages in a conversation | Yes         |
| POST   | `/api/messages/send/:receiverId` | Send a message               | Yes          |


---

### 🔌 Socket.io Events

| Event               | Direction         | Description                        |
|---------------------|-------------------|------------------------------------|
| `connection`        | Client → Server   | User connects                      |
| `disconnect`        | Client → Server   | User disconnects                   |
| `sendMessage`       | Client → Server   | Send a new message                 |
| `receiveMessage`    | Server → Client   | Deliver message to receiver        |
| `getOnlineUsers`    | Server → Client   | Broadcast list of online users     |

---

## 🏗️ Folder Structure

```
swifttalk/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static assets (icons, images)
│   │   ├── components/         # Reusable UI components
│   │   │   ├── chat/           # Chat window, message bubbles
│   │   │   ├── sidebar/        # User list, search
│   │   │   └── common/         # Buttons, inputs, loaders
│   │   ├── pages/              # Route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/            # React context (auth, socket)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/        # Request/response handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── message.controller.js
│   │   │   └── user.controller.js
│   │   ├── routes/             # API route definitions
│   │   │   ├── auth.routes.js
│   │   │   ├── message.routes.js
│   │   │   └── user.routes.js
│   │   ├── models/             # Mongoose schemas
│   │   │   ├── User.model.js
│   │   │   ├── Message.model.js
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── lib/                # External clients
│   │   │   ├── cloudinary.js
│   │   │   └── socket.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🔒 Security Features

- **JWT Authentication** — Stateless, expiring tokens for all protected routes
- **Password Hashing** — bcrypt with salt rounds for secure password storage
- **Protected Routes** — Middleware guards on all private API endpoints
- **CORS Policy** — Configured to allow only trusted client origins
- **Input Validation** — Server-side validation before database writes
- **Cloudinary Signed Uploads** — Secure, server-validated media uploads
- **Environment Variables** — All secrets kept out of source code

---

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2024 SwiftTalk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

> Built with Passion — SwiftTalk
