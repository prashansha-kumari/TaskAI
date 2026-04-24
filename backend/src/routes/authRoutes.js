const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;



// Postman and Thunder Client are used to test backend APIs by sending HTTP requests like POST, PUT, DELETE with data.