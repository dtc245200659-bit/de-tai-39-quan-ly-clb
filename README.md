ĐỀ TÀI 39 – QUẢN LÝ CÂU LẠC BỘ

1. Giới thiệu

Dự án xây dựng và triển khai website quản lý câu lạc bộ.

Môn học: Triển khai và Quản trị Hệ thống Phần mềm.

2. Công nghệ sử dụng

* HTML, CSS, JavaScript
* Node.js
* MySQL
* Docker và Docker Compose
* Nginx
* Prometheus
* Grafana
* Git và GitHub

3. Chức năng

* Xây dựng giao diện website quản lý câu lạc bộ.
* Kết nối ứng dụng với cơ sở dữ liệu MySQL.
* Triển khai các dịch vụ bằng Docker.
* Cấu hình Nginx làm reverse proxy.
* Giám sát hệ thống bằng Prometheus và Grafana.

4. Hướng dẫn chạy dự án

Yêu cầu: Máy đã cài Docker Desktop.

Mở Terminal tại thư mục dự án và chạy:

docker compose up -d --build

Kiểm tra các container:

docker compose ps

5. Cấu trúc dự án

de-tai-39-quan-ly-clb/
├── backend/
├── nginx/
├── prometheus/
├── docker-compose.yml
├── index.html
├── script.js
├── .gitignore
└── README.md

6. Quản lý mã nguồn

Mã nguồn được quản lý bằng Git và lưu trữ trên GitHub.

Repository: https://github.com/dtc245200659-bit/de-tai-39-quan-ly-clb