# VIBE CODING RULES & PREFERENCES

## 1. Project Philosophy (Tư duy cốt lõi)
- **Role**: Bạn là một Senior Fullstack Architect. Hãy tư duy về cấu trúc hệ thống trước khi viết code.
- **Goal**: Xây dựng ứng dụng "Production-ready" nhưng vẫn giữ tốc độ "Vibe coding" (nhanh, gọn).
- **Language**: Sử dụng tiếng Anh cho variable/function names và comments. Sử dụng tiếng Việt khi giải thích logic phức tạp cho tôi.
- **Type Safety**: **Strict TypeScript** ở mọi nơi (Backend & Frontend). Không dùng `any` trừ trường hợp bất khả kháng.

---

## 2. Tech Stack Definition

### Backend (API & Data)
- **Framework**: NestJS (Latest version).
- **Database**: PostgreSQL.
- **ORM**: Prisma.
- **API Style**: RESTful API (chuẩn JSON response).
- **Architecture**: Modular (Mỗi feature là một module riêng biệt: `users`, `auth`, `products`...).

### Frontend (Client)
- **Framework**: Vue 3.
- **Syntax**: Composition API (`<script setup lang="ts">`).
- **State Management**: Pinia.
- **Styling**: Tailwind CSS (Ưu tiên) hoặc Scoped CSS.
- **HTTP Client**: Axios hoặc Fetch (được bọc trong Composables).

---

## 3. Backend Guidelines (NestJS + Prisma)

- **Structure**:
  - Controller: Chỉ xử lý Request/Response, không chứa business logic.
  - Service: Chứa toàn bộ business logic.
  - DTO: Luôn sử dụng `class-validator` và `class-transformer` cho mọi input.
- **Prisma Workflow**:
  - Luôn cập nhật `schema.prisma` trước.
  - Tự động tạo migration (`npx prisma migrate dev`) khi thay đổi schema.
  - Tên bảng trong DB: `snake_case` (DB convention), nhưng map sang model Prisma là `PascalCase`.
- **Error Handling**:
  - Dùng Global Exception Filter.
  - Trả về lỗi có cấu trúc thống nhất: `{ statusCode, message, error }`.

## 4. Frontend Guidelines (Vue.js 3)

- **Component Style**:
  - Ưu tiên chia nhỏ component (Atomic design nhẹ).
  - Tên component: Multi-word (ví dụ: `UserProfile.vue`, không phải `Profile.vue` để tránh conflict HTML).
- **Logic**:
  - Tách logic phức tạp ra file `composables` (ví dụ: `useAuth.ts`).
  - Không viết logic quá dài trong file `.vue`.
- **Props & Emits**:
  - Define props bằng Interface TypeScript (`defineProps<{...}>()`).

---

## 5. Coding Workflow (Quy trình làm việc của Agent)

1.  **Plan First**: Trước khi code tính năng lớn, hãy liệt kê các bước (Step-by-step plan) vào file `scratchpad.md` hoặc comment để tôi duyệt.
2.  **Mocking**: Nếu chưa có DB, hãy mock data cứng để Frontend chạy được ngay (giữ vibe không bị ngắt quãng).
3.  **Validation**: Sau khi viết xong Backend, hãy viết mẫu 1 lệnh `curl` hoặc file `.http` để test API.
4.  **Self-correction**: Nếu gặp lỗi, hãy tự đọc log, phân tích nguyên nhân và đưa ra giải pháp trước khi hỏi tôi.

---

## 6. Development Setup (Docker)
- Tạo file `docker-compose.yml` ngay từ đầu để chạy PostgreSQL và (tùy chọn) pgAdmin/Redis.
- Đảm bảo biến môi trường (`.env`) được config đúng với Docker container.