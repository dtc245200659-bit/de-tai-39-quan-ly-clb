require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});
const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "quanlyclb"
});

app.get("/", (req, res) => {
    res.send("He thong quan ly cau lac bo dang hoat dong!");
});

app.get("/api/thanhvien", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM thanhvien");
        res.json(rows);
    } catch (error) {
        console.error("Loi MySQL:", error);
        res.status(500).json({ error: "Loi truy van database" });
    }
});
app.post("/api/thanhvien", async (req, res) => {
    try {
        const { hoten, email, sodienthoai } = req.body;

        if (!hoten || !email || !sodienthoai) {
            return res.status(400).json({
                error: "Vui lòng nhập đầy đủ thông tin"
            });
        }

        const [result] = await db.execute(
            "INSERT INTO thanhvien (hoten, email, sodienthoai, ngaythamgia) VALUES (?, ?, ?, CURDATE())",
            [hoten, email, sodienthoai]
        );

        res.json({
            message: "Thêm thành viên thành công",
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi thêm thành viên" });
    }
});

app.put("/api/thanhvien/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { hoten, email, sodienthoai } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: "ID không hợp lệ" });
        }
        if (![hoten, email, sodienthoai].every(value => typeof value === "string" && value.trim())) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
        }

        const [result] = await db.execute(
            "UPDATE thanhvien SET hoten = ?, email = ?, sodienthoai = ? WHERE id = ?",
            [hoten.trim(), email.trim(), sodienthoai.trim(), id]
        );

        if (result.affectedRows === 0) {
            const [rows] = await db.execute("SELECT id FROM thanhvien WHERE id = ?", [id]);
            if (rows.length === 0) {
                return res.status(404).json({ error: "Không tìm thấy thành viên" });
            }
        }

        res.json({ message: "Cập nhật thành viên thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi cập nhật thành viên" });
    }
});

app.delete("/api/thanhvien/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: "ID không hợp lệ" });
        }

        const [result] = await db.execute("DELETE FROM thanhvien WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy thành viên" });
        }

        res.json({ message: "Xóa thành viên thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi xóa thành viên" });
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server dang chay tai cong 3000");
});