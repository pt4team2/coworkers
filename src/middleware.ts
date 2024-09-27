import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

// 로그인 상태에서만 볼 수 있는 페이지
export const config = {
  matcher: [
    '/teampage/:id*',
    '/addteam/:path*',
    '/{teamid}/:path*',
    '/mypage/:path*',
    '/addboard/:path*',
  ],
};

export async function middleware(req: NextRequest) {
  // next-auth에서 JWT 토큰을 가져옴
  const token = await getToken({ req });
  console.log('JWT Token:', token);

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  } else {
    return NextResponse.next();
  }
}
