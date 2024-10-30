// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('accessToken'); // Lấy token từ cookie

  console.log('Current Path:', url.pathname);
  console.log('Access Token:', token);

  // Nếu không có token và không phải là trang đăng nhập
  if (!token && url.pathname !== '/login') {
    console.log('Redirecting to /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Cấu hình matcher
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)', // Bỏ qua trang login và các file tĩnh
  ],
};
