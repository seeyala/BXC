Install Tailwind CSS with Next.js
____________________________________
https://tailwindcss.com/docs/guides/nextjs
____________________________________

Extension for Tailwind CSS in VS code
____________________________________
-Tailwind CSS IntelliSense
-PostCSS Language Support
__________________________________

Bootstrap Docs 
_____________________________________
https://getbootstrap.com/docs/5.3/getting-started/introduction/
____________________________________
.env.development.local: dành cho môi trường phát triển.
.env.production.local: dành cho môi trường sản xuất.
bash

# .env.development.local
NEXT_PUBLIC_API_URL=http://localhost:3000

# .env.production.local
NEXT_PUBLIC_API_URL=https://your-api-production.azurewebsites.net

Khi bạn chạy next dev (phát triển), Next.js sẽ sử dụng biến môi trường trong .env.development.local. Khi bạn build ứng dụng với next build, nó sẽ sử dụng .env.production.local cho môi trường sản xuất.


npm run dev: Chạy ứng dụng Next.js ở chế độ phát triển với tính năng hot-reload.


npm run build: Build ứng dụng cho môi trường sản xuất.


npm start: Chạy ứng dụng với mã đã build trong môi trường sản xuất.
_______________________________________
