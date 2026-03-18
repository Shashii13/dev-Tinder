const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

//  View Profile
router.get("/view", auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//update
router.put("/edit", auth, async (req, res) => {
  try {
    const updates = req.body;

    Object.keys(updates).forEach((key) => {
      req.user[key] = updates[key];
    });

    await req.user.save();

    res.json({ message: "Profile updated successfully", user: req.user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;