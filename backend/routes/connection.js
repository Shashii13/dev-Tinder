const express = require("express");
const auth = require("../middleware/auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/User");

const router = express.Router();


// ✅ Send Connection Request
router.post("/send/:status/:toUserId", auth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const { toUserId, status } = req.params;

    // only allow "interested"
    if (status !== "interested") {
      return res.status(400).json({ error: "Invalid status" });
    }

    // check user exists
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // check existing request
    const existing = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existing) {
      return res.status(400).json({ error: "Request already exists" });
    }

    const request = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await request.save();

    res.json({ message: "Connection request sent" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ✅ Review Request (accept/reject)
router.post("/review/:status/:requestId", auth, async (req, res) => {
  try {
    const { status, requestId } = req.params;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const request = await ConnectionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // only receiver can accept/reject
    if (!request.toUserId.equals(req.user._id)) {
      return res.status(403).json({ error: "Not authorized" });
    }

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;