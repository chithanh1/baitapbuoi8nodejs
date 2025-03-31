const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getAllCategories); // Không yêu cầu đăng nhập
router.post("/", verifyToken, checkRole(["mod"]), createCategory);
router.put("/:id", verifyToken, checkRole(["mod"]), updateCategory);
router.delete("/:id", verifyToken, checkRole(["admin"]), deleteCategory);

module.exports = router;
