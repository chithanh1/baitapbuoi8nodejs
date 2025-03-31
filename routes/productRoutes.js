const express = require("express");
const router = express.Router();
const productController = require("../controllers/productcontroller");
const authMiddleware = require("../middlewares/authMiddleware");

// Lấy danh sách sản phẩm (không yêu cầu đăng nhập)
router.get("/", productController.getAllProducts);

// Tạo sản phẩm (yêu cầu `mod`)
router.post("/", authMiddleware.verifyToken, productController.createProduct);

// Cập nhật sản phẩm (yêu cầu `mod`)
router.put("/:id", authMiddleware.verifyToken, productController.updateProduct);

// Xóa sản phẩm (yêu cầu `admin`)
router.delete("/:id", authMiddleware.verifyToken, productController.deleteProduct);

module.exports = router;
