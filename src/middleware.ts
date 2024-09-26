import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

// 로그인 상태에서만 볼 수 있는 페이지
export const config = {
  matcher: [
    '/teampage/:path*',
    '/addteam/:path*',
    '/{teamid}/:path*',
    '/mypage/:path*',
    '/addboard/:path*',
  ],
};

export async function middleware(req: NextRequest) {
  // next-auth에서 JWT 토큰을 가져옴
  const token = await getToken({ req });

  // 세션이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 세션이 있으면 요청 통과
  return NextResponse.next();
}
