const express = require("express");
const { signIn, signUp, getUsers } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/jwTokenMiddleware");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/users", authenticateToken, getUsers);

module.exports = router;