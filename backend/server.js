const feedRoutes = require("./routes/feed");
const profileRoutes = require("./routes/profile");
const connectionRoutes = require("./routes/connection");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth");
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("DevTinder API is running 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/connection", connectionRoutes);
app.use("/api/feed", feedRoutes);
const auth = require("./middleware/auth");

app.get("/api/profile", auth, (req, res) => {
  res.json({ user: req.user });
});


const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("Database connected...");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });