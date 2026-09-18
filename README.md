# 🏆 Kéo Co Sinh Học 12: Gregor Mendel vs Thomas Hunt Morgan

Trò chơi trắc nghiệm đối kháng Kéo Co Sinh Học lớp 12 giữa kì 1 với 2 nhà khoa học di truyền vĩ đại.

---

## 🚀 Hướng Dẫn Deploy Lên GitHub Pages (2 Cách Dễ Dàng)

Dự án đã được thiết lập sẵn `base: './'` trong cấu hình Vite và tự động tạo thư mục tĩnh `/docs` chứa toàn bộ file HTML, CSS, JS sẵn sàng chạy trên bất kỳ môi trường nào.

### Cách 1: Sử dụng thư mục `/docs` (Đơn giản nhất, không cần lệnh build)
1. Đẩy (push) toàn bộ mã nguồn lên repository GitHub của bạn:
   ```bash
   git add .
   git commit -m "Deploy Tug of War Biology game"
   git push origin main
   ```
2. Trên GitHub, vào repository của bạn -> chọn thẻ **Settings** (Cài đặt).
3. Chọn mục **Pages** ở thanh menu bên trái.
4. Tại mục **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`
   - **Branch**: Chọn nhánh `main` (hoặc `master`), thư mục chọn `/docs`
   - Nhấn **Save**.
5. Sau 1 - 2 phút, GitHub sẽ hiển thị đường link website trực tiếp của bạn (ví dụ: `https://<ten-user>.github.io/<ten-repo>/`)!

---

### Cách 2: Tự động hóa bằng GitHub Actions (Tự động cập nhật mỗi khi push)
Dự án đã có sẵn file cấu hình `.github/workflows/deploy.yml`.
1. Trên GitHub, vào repository -> **Settings** -> **Pages**.
2. Tại mục **Source**, chọn **GitHub Actions**.
3. Mỗi khi bạn push mã nguồn lên nhánh `main`, GitHub sẽ tự động biên dịch và triển khai phiên bản mới nhất lên GitHub Pages!

---

## 💻 Chạy Thử Trên Máy Cá Nhân (Local Development)

Nếu bạn muốn chạy thử và chỉnh sửa mã nguồn trên máy tính:
1. Cài đặt dependencies:
   ```bash
   npm install
   ```
2. Chạy môi trường dev:
   ```bash
   npm run dev
   ```
3. Mở trình duyệt tại: `http://localhost:3000`
4. Lệnh đóng gói xuất bản HTML/CSS/JS (tự động cập nhật cả `dist/` và `docs/`):
   ```bash
   npm run build
   ```

---

## 📁 Cấu Trúc Các Tệp Đóng Gói Triển Khai
- `docs/index.html`: Tệp HTML tĩnh chạy trực tiếp.
- `docs/assets/*.css`: Tệp stylesheet CSS tối ưu hóa Tailwind.
- `docs/assets/*.js`: Toàn bộ logic trò chơi, hoạt họa SVG Mendel & Morgan, hiệu ứng kéo co, Web Audio sound effects, và ngân hàng câu hỏi.
- `.github/workflows/deploy.yml`: Workflow tự động build & deploy trên GitHub.
