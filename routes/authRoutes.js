const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { login, register, getMe, changePassword } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", verifyToken, getMe);
router.post("/change-password", verifyToken, changePassword);

module.exports = router;
