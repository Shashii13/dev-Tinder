# 💻 DevTinder

A full-stack developer networking platform inspired by Tinder — built using the MERN stack.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 👤 Profile Management
- 🔎 Developer Feed
- ❤️ Send Connection Requests
- 🔄 Accept / Reject Requests (coming soon)

---

## 🛠️ Tech Stack

### Frontend
- React
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd devtinder
---

## 📡 API Endpoints

### 🔐 Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

---

### 👤 Profile

- `GET /api/profile/view`
- `PUT /api/profile/edit`

---

### 🤝 Connections

- `POST /api/connection/send/interested/:toUserId`
- `POST /api/connection/review/accepted/:requestId`
- `POST /api/connection/review/rejected/:requestId`

---

### 🧑‍💻 Feed

- `GET /api/feed`

---