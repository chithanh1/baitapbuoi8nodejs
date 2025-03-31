const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const { getAllRoles, createRole, updateRole, deleteRole } = require("../controllers/roleController");

const router = express.Router();

router.get("/", getAllRoles); // Không yêu cầu đăng nhập
router.post("/", verifyToken, checkRole(["admin"]), createRole);
router.put("/:id", verifyToken, checkRole(["admin"]), updateRole);
router.delete("/:id", verifyToken, checkRole(["admin"]), deleteRole);

module.exports = router;
