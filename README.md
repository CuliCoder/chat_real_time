# 💬 Chat Real-Time

Ứng dụng nhắn tin thời gian thực xây dựng với **Node.js**, **Express** và **Socket.io**. Kiến trúc client-server tách biệt, hỗ trợ nhiều người dùng nhắn tin đồng thời qua kết nối WebSocket.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socket.io&logoColor=white)](https://socket.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## ✨ Tính năng

- **Real-time messaging** — Nhắn tin tức thì qua WebSocket (Socket.io), không cần reload trang
- **Đa người dùng** — Nhiều client có thể kết nối và nhắn tin cùng lúc
- **Phòng chat** — Quản lý và tham gia các phòng chat riêng biệt
- **Trạng thái online** — Hiển thị người dùng đang kết nối
- **Giao diện responsive** — Tạo kiểu bằng SCSS, hiển thị tốt trên nhiều thiết bị

---

## 🛠️ Tech Stack

| Phần | Công nghệ |
|------|-----------|
| **Backend** | Node.js, Express, Socket.io |
| **Frontend** | JavaScript (ES6+), SCSS, EJS, HTML |
| **Giao tiếp** | WebSocket (Socket.io) |
| **Template engine** | EJS |

---

## 📁 Cấu trúc thư mục

```
chat_real_time/
├── be-chat-real-time/      # Backend — Node.js + Express + Socket.io
│   ├── src/
│   │   ├── app.js          # Entry point, khởi tạo Express & Socket.io
│   │   ├── routes/         # REST endpoints
│   │   └── socket/         # Xử lý sự kiện Socket.io
│   ├── package.json
│   └── .env.example
│
└── fe-chat-real-time/      # Frontend — JS + SCSS + EJS
    ├── public/
│   │   ├── js/             # Logic phía client, kết nối socket
│   │   └── scss/           # Stylesheet
    ├── views/              # EJS templates
    └── package.json
```

---

## 🚀 Chạy dự án

### Yêu cầu

- Node.js >= 16
- npm >= 8

### 1. Clone repo

```bash
git clone https://github.com/CuliCoder/chat_real_time.git
cd chat_real_time
```

### 2. Chạy Backend

```bash
cd be-chat-real-time
npm install
```

Tạo file `.env` từ mẫu:

```bash
cp .env.example .env
```

Cấu hình `.env`:

```env
PORT=5000
```

Khởi động server:

```bash
# Development (với nodemon)
npm run dev

# Production
npm start
```

Backend sẽ chạy tại: `http://localhost:5000`

### 3. Chạy Frontend

Mở terminal mới:

```bash
cd fe-chat-real-time
npm install
npm start
```

Frontend sẽ chạy tại: `http://localhost:3000`

---

## 🔌 Socket Events

### Client → Server

| Event | Payload | Mô tả |
|-------|---------|-------|
| `join_room` | `{ username, room }` | Tham gia phòng chat |
| `send_message` | `{ message, room }` | Gửi tin nhắn vào phòng |
| `leave_room` | `{ room }` | Rời khỏi phòng |

### Server → Client

| Event | Payload | Mô tả |
|-------|---------|-------|
| `receive_message` | `{ username, message, time }` | Nhận tin nhắn mới |
| `user_joined` | `{ username, users }` | Thông báo có người vào phòng |
| `user_left` | `{ username, users }` | Thông báo có người rời phòng |
| `room_users` | `{ room, users }` | Danh sách user trong phòng |

---

## 📐 Kiến trúc

```
Client A ──┐
           ├──[WebSocket]──► Socket.io Server ──► Broadcast ──► Client B
Client B ──┘                  (Node.js/Express)               └──► Client C
```

Khi một client gửi sự kiện `send_message`, server nhận và phát lại (`emit`) sự kiện `receive_message` đến tất cả các client trong cùng phòng, đảm bảo tin nhắn xuất hiện tức thì mà không cần polling.

---

## 🖼️ Demo

> Mở `http://localhost:3000`, nhập tên và tên phòng để bắt đầu chat.  
> Mở thêm tab/trình duyệt khác với cùng tên phòng để thử nhắn tin real-time.

---

## 📝 TODO / Hướng phát triển

- [ ] Xác thực người dùng (JWT / session)
- [ ] Lưu lịch sử tin nhắn vào database (MongoDB)
- [ ] Gửi hình ảnh / file đính kèm
- [ ] Typing indicator ("Đang nhập...")
- [ ] Private message (nhắn tin 1-1)
- [ ] Deploy lên cloud (Railway / Render)

---

## 👤 Tác giả

**Nguyễn Công Trung**

- GitHub: [@CuliCoder](https://github.com/CuliCoder)
- LinkedIn: [nguyen-cong-trung-9965a0363](https://www.linkedin.com/in/nguyen-cong-trung-9965a0363)

---

## 📄 License

MIT License — thoải mái sử dụng và chỉnh sửa cho mục đích học tập.
