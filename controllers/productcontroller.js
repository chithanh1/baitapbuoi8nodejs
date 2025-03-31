const path = require("path");
const Product = require(path.join(__dirname, "..", "models", "productModel"));

// Lấy danh sách sản phẩm (không yêu cầu đăng nhập)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

// Tạo sản phẩm (Chỉ cho phép `mod`)
exports.createProduct = async (req, res) => {
    if (req.user.role !== "mod") {
        return res.status(403).json({ message: "Bạn không có quyền tạo sản phẩm" });
    }

    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: "Lỗi khi tạo sản phẩm", error: err.message });
    }
};

// Cập nhật sản phẩm (Chỉ `mod`)
exports.updateProduct = async (req, res) => {
    if (req.user.role !== "mod") {
        return res.status(403).json({ message: "Bạn không có quyền cập nhật sản phẩm" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: "Lỗi khi cập nhật sản phẩm", error: err.message });
    }
};

// Xóa sản phẩm (Chỉ `admin`)
exports.deleteProduct = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Bạn không có quyền xóa sản phẩm" });
    }

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Sản phẩm đã bị xóa" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error: err.message });
    }
};
