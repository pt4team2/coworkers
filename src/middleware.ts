import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { authAxiosInstance } from '@/app/api/auth/axiosInstance'; // axios instance for API requests

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
  // JWT 토큰 가져오기
  const token = await getToken({ req });
  console.log('JWT Token:', token);

  // 사용자가 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 요청 경로에서 groupId 추출 (e.g., teampage/{groupId})
  const url = req.nextUrl.clone();
  const groupId = url.pathname.split('/')[2]; // teampage/{groupId}에서 groupId 추출
  console.log('Extracted groupId:', groupId);

  try {
    // 사용자의 소속된 그룹 데이터 가져오기 (토큰을 사용해 API 호출)
    const response = await authAxiosInstance.get('/user', {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    const memberships = response.data.memberships;
    console.log('User memberships:', memberships);

    // 사용자가 소속된 그룹 중에 해당 groupId가 있는지 확인
    const isGroupMember = memberships.some(
      (membership: any) => membership.group.id === Number(groupId),
    );

    // 사용자가 소속되지 않은 그룹에 접근하면 '/no-access'로 리다이렉트
    if (!isGroupMember) {
      return NextResponse.redirect(new URL('/no-access', req.url));
    }
  } catch (error) {
    console.error('Error fetching user memberships:', error);
    // 오류 발생 시 '/no-access'로 리다이렉트
    return NextResponse.redirect(new URL('/no-access', req.url));
  }

  // 사용자가 소속된 팀이라면 요청을 계속 처리
  return NextResponse.next();
}
