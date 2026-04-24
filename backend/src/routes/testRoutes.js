const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/create-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Test User",
      email: "test@gmail.com",
      password: "123456"
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;