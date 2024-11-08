Đây là cách hướng dẫn chạy BE với mongodb local (Không sử dụng Atlas nữa)

1. Cập nhật env mới nhất từ src: https://docs.google.com/document/d/1nPbNgvmLIMlf6LFD_7AFMeHf61eepPauRtf8Y-9Cbc4/edit?usp=sharing
2. Pull code backend mới nhất
3.1 Ở BE, mở Terminal & Gõ lệnh: docker compose down -v
3.2 Sau đó: docker compose up -d --build
4. Clone dự án này về
5. Mở Terminal & Gõ các lệnh:
5.1 npm i
5.2 node index.js
6. Quay về dự án BE và gõ: docker compose up -d

7. MongoDB Compass thì sử dụng string này để kết nối nhé: mongodb://nerd:123@localhost:27018/

Chúc các bạn thành công <3 Tôi yêu các bạn!