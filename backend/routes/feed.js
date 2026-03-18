const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const ConnectionRequest = require("../models/ConnectionRequest");

const router = express.Router();

// ✅ Get Feed Users
router.get("/", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // 1. find all requests (sent + received)
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id },
      ],
    });

    // 2. extract user ids to ignore
    const hideUsers = new Set();

    connections.forEach((conn) => {
      hideUsers.add(conn.fromUserId.toString());
      hideUsers.add(conn.toUserId.toString());
    });

    // also hide self
    hideUsers.add(loggedInUser._id.toString());

    // 3. fetch remaining users
    const users = await User.find({
      _id: { $nin: Array.from(hideUsers) },
    }).select("firstName lastName bio skills");

    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;