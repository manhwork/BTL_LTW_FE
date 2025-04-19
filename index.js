const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./src/modelData/models");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
// Lấy danh sách tất cả users
app.get("/api/users", (req, res) => {
    res.json(models.userListModel());
});

// Lấy thông tin chi tiết của một user
app.get("/api/users/:userId", (req, res) => {
    const user = models.userModel(req.params.userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

// Lấy danh sách ảnh của một user
app.get("/api/photos/:userId", (req, res) => {
    res.json(models.photoOfUserModel(req.params.userId));
});

// Lấy thông tin schema
app.get("/api/schema", (req, res) => {
    res.json(models.schemaInfo());
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
