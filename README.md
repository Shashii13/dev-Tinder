# 💻 DevTinder

A full-stack developer networking platform inspired by Tinder — built using the MERN stack (MongoDB, Express, React, Node.js). Connect, match, and network with fellow developers!

---

## 🚀 Features

- **🔐 User Authentication**: Secure login and registration utilizing JWT and HTTP-only cookies.
- **👤 Profile Management**: Seamlessly view and edit your developer profile.
- **🔎 Developer Feed**: Browse through curated profiles of other developers.
- **❤️ Connection Requests**: Send 'interested' (swipe right) or 'ignored' (swipe left) signals.
- **🔄 Review Requests**: Accept or reject incoming connection requests from other developers.
- **🤝 Matching System**: Establish meaningful connections upon mutual interest.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Bootstrapped with Vite)
- **React Router v7** for declarative rendering and routing
- **Axios** for handling secure API requests

### Backend
- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose** ODMs
- **Authentication**: `jsonwebtoken`, `bcrypt` for password hashing, and `cookie-parser`
- **Data Validation**: `validator`

---

## 📦 Installation & Local Setup

Follow these steps to set up the project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Shashii13/dev-Tinder.git
cd dev-Tinder
```

### 2. Backend Setup
Open a new terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory and add the following environment variables:
```env
PORT=3000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
```

Start the backend development server:
```bash
npm run dev
```
*The backend should now be running on `http://localhost:3000`.*

### 3. Frontend Setup
Open another terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the Vite development frontend server:
```bash
npm run dev
```
*The frontend will typically be accessible at `http://localhost:5173`.*

---

## 📡 Core API Endpoints

### 🔐 Auth
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate user and issue JWT token

### 👤 Profile
- `GET /api/profile/view` - View logged-in user's profile
- `PUT /api/profile/edit` - Edit logged-in user's profile

### 🤝 Connections
- `POST /api/connection/send/interested/:toUserId` - Express interest in a profile
- `POST /api/connection/send/ignored/:toUserId` - Ignore a profile
- `POST /api/connection/review/accepted/:requestId` - Accept a pending connection request
- `POST /api/connection/review/rejected/:requestId` - Reject a pending connection request

### 🧑‍💻 Feed
- `GET /api/feed` - Fetch the developer feed

---

## 🚧 Future Improvements

- 💬 Real-time chat functionality using Socket.io
- 🔔 Real-time push notifications system
- 📸 Secure profile image uploads using Cloudinary
- 🔍 Advanced developer filtering by skills, tech stack, and location

---

## 🙌 Author

Built with ❤️ by **Shashi Kumar**