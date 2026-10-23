let hoatDong = [
    {
        id: 1,
        ten: "Sinh hoat cau lac bo",
        ngay: "2026-11-01"
    },
    {
        id: 2,
        ten: "Giao luu thanh vien",
        ngay: "2026-11-05"
    }
];

function xemHoatDong() {
    let danhSach = "DANH SACH HOAT DONG\n";

    hoatDong.forEach(hd => {
        danhSach += `${hd.id} - ${hd.ten} - ${hd.ngay}\n`;
    });

    alert(danhSach);
}
function themHoatDong() {
    let ten = prompt("Nhap ten hoat dong:");

    if (!ten || !ten.trim()) {
        alert("Vui long nhap ten hoat dong!");
        return;
    }

    let ngay = prompt("Nhap ngay (YYYY-MM-DD):");

    if (!ngay || !/^\d{4}-\d{2}-\d{2}$/.test(ngay)) {
        alert("Ngay khong hop le!");
        return;
    }

    let id = hoatDong.length > 0
        ? Math.max(...hoatDong.map(hd => hd.id)) + 1
        : 1;

    hoatDong.push({
        id: id,
        ten: ten.trim(),
        ngay: ngay
    });

    alert("Them hoat dong thanh cong!");
}
function xoaHoatDong() {
    let id = prompt("Nhập ID hoạt động cần xóa:");

    if (id === null) return;

    let ma = Number(id);

    if (!Number.isInteger(ma) || ma <= 0) {
        alert("ID không hợp lệ!");
        return;
    }

    let viTri = hoatDong.findIndex(hd => hd.id === ma);

    if (viTri === -1) {
        alert("Không tìm thấy hoạt động!");
        return;
    }

    if (confirm("Bạn có chắc muốn xóa hoạt động này?")) {
        hoatDong.splice(viTri, 1);
        alert("Xóa hoạt động thành công!");
    }
}
let suKien = [
    { id: 1, ten: "Chao tan sinh vien", ngay: "2026-11-10" },
    { id: 2, ten: "Giao luu cau lac bo", ngay: "2026-11-15" }
];

function xemSuKien() {
    let danhSach = "DANH SACH SU KIEN\n";

    suKien.forEach(sk => {
        danhSach += `${sk.id} - ${sk.ten} - ${sk.ngay}\n`;
    });

    alert(danhSach);
}

function themSuKien() {
    let ten = prompt("Nhap ten su kien:");
    if (!ten || !ten.trim()) return;

    let ngay = prompt("Nhap ngay (YYYY-MM-DD):");
    if (!ngay || !/^\d{4}-\d{2}-\d{2}$/.test(ngay)) {
        alert("Ngay khong hop le!");
        return;
    }

    let id = suKien.length
        ? Math.max(...suKien.map(sk => sk.id)) + 1
        : 1;

    suKien.push({ id, ten: ten.trim(), ngay });

    alert("Them su kien thanh cong!");
}

function xoaSuKien() {
    let id = prompt("Nhap ID su kien can xoa:");
    if (id === null) return;

    let ma = Number(id);
    if (!Number.isInteger(ma) || ma <= 0) {
        alert("ID khong hop le!");
        return;
    }

    let viTri = suKien.findIndex(sk => sk.id === ma);

    if (viTri === -1) {
        alert("Khong tim thay su kien!");
        return;
    }

    if (confirm("Ban co chac muon xoa su kien?")) {
        suKien.splice(viTri, 1);
        alert("Xoa su kien thanh cong!");
    }
}
async function xemThanhVien() {
    try {
        const response = await fetch("http://localhost:3000/api/thanhvien");

        if (!response.ok) {
            throw new Error("Không tải được dữ liệu");
        }

        const danhSach = await response.json();
        const khuVuc = document.getElementById("danhSachThanhVien");

        khuVuc.replaceChildren();

        danhSach.forEach(tv => {
            const dong = document.createElement("p");
            dong.textContent = `${tv.id} - ${tv.hoten} - ${tv.email} - ${tv.sodienthoai || tv.sdt || ""}`;
            khuVuc.appendChild(dong);
        });
    } catch (error) {
        alert("Lỗi kết nối MySQL: " + error.message);
    }
}
async function themThanhVien() {
    const hoten = prompt("Nhập họ tên:");
    if (!hoten) return;

    const email = prompt("Nhập email:");
    if (!email) return;

    const sodienthoai = prompt("Nhập số điện thoại:");
    if (!sodienthoai) return;

    try {
        const response = await fetch("http://localhost:3000/api/thanhvien", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ hoten, email, sodienthoai })
        });

        if (!response.ok) throw new Error("Không thêm được thành viên");

        alert("Thêm thành viên thành công!");
        xemThanhVien();
    } catch (error) {
        alert("Lỗi: " + error.message);
    }
}
async function xoaThanhVien() {
    const id = prompt("Nhập ID thành viên cần xóa:");
    if (!id || !/^[1-9]\d*$/.test(id.trim())) {
        alert("ID không hợp lệ");
        return;
    }

    if (!confirm("Bạn chắc chắn muốn xóa?")) return;

    try {
        const response = await fetch(
            `http://localhost:3000/api/thanhvien/${id.trim()}`,
            { method: "DELETE" }
        );

        if (!response.ok) throw new Error("Không xóa được");

        alert("Xóa thành viên thành công!");
        xemThanhVien();
    } catch (error) {
        alert("Lỗi: " + error.message);
    }
}

async function suaThanhVien() {
    const nhapId = prompt("Nhập ID thành viên cần sửa:");
    if (nhapId === null) return;

    const id = nhapId.trim();
    if (!/^[1-9]\d*$/.test(id)) {
        alert("ID không hợp lệ");
        return;
    }

    const hoten = prompt("Nhập họ tên mới:");
    if (hoten === null) return;

    const email = prompt("Nhập email mới:");
    if (email === null) return;

    const sodienthoai = prompt("Nhập số điện thoại mới:");
    if (sodienthoai === null) return;

    if (![hoten, email, sodienthoai].every(value => value.trim())) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/thanhvien/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                hoten: hoten.trim(),
                email: email.trim(),
                sodienthoai: sodienthoai.trim()
            })
        });

        if (!response.ok) throw new Error("Không cập nhật được thành viên");

        alert("Cập nhật thành viên thành công!");
        await xemThanhVien();
    } catch (error) {
        alert("Lỗi: " + error.message);
    }
}