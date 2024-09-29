import { publicAxiosInstance } from '@/app/api/auth/axiosInstance';
import { NextResponse, NextRequest } from 'next/server';
import { encode } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET as string;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  console.log('code---', code); // 4%2F0AQlEd8wx2idCoIQbqraO8ZZkOqYN7ZlSLiybG4EvsFl7n07iYwgpycArZjMbuNP_sH0hWQ
  console.log('state---', state);

  console.log('GET 함수 호출됨'); // 함수 진입 확인 로그

  if (code) {
    try {
      const response = await publicAxiosInstance.post('/auth/signIn/KAKAO', {
        state: state,
        redirectUri: 'http://localhost:3000/api/auth/callback/kakao',
        token: code,
      });

      const userData = response.data;
      console.log('userData: ', userData);

      // 쿠키에 JWT 토큰 존재여부 확인
      const existingCookie = request.cookies.get('next-auth.session-token');

      if (existingCookie) {
        console.log('기존 쿠키가 이미 존재합니다.');
        return NextResponse.redirect(new URL('/', request.url));
      } else {
        const token = {
          user: userData.user,
          accessToken: userData.accessToken,
          refreshToken: userData.refreshToken,
        };

        // JWT 토큰 암호화
        const encodedToken = await encode({ token, secret });
        console.log('새 JWT 토큰: ', encodedToken);

        // 리다이렉트 응답 생성
        const nextResponse = NextResponse.redirect(new URL('/', request.url));

        // 생성된 JWT 토큰을 쿠키에 저장
        nextResponse.cookies.set('next-auth.session-token', encodedToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          path: '/',
        });
        return nextResponse;
      }
    } catch (error) {
      console.error('API 호출 실패', error);
      return NextResponse.json(
        { success: false, error: 'API 호출 실패' },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json(
      { success: false, error: 'code가 제공되지 않았습니다.' },
      { status: 400 },
    );
  }
}
