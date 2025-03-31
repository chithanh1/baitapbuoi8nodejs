const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", verifyToken, checkRole(["mod"]), getAllUsers);
router.get("/:id", verifyToken, checkRole(["mod"]), getUserById);
router.post("/", verifyToken, checkRole(["admin"]), createUser);
router.put("/:id", verifyToken, checkRole(["admin"]), updateUser);
router.delete("/:id", verifyToken, checkRole(["admin"]), deleteUser);

module.exports = router;
