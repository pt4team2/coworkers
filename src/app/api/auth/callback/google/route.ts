import { publicAxiosInstance } from '@/app/api/auth/axiosInstance';
import { NextResponse, NextRequest } from 'next/server';
import { encode } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET as string;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  console.log('code---', code); // 43자, 4%2F0AQlEd8wx2idCoIQbqraO8ZZkOqYN7ZlSLiybG4EvsFl7n07iYwgpycArZjMbuNP_sH0hWQ
  console.log('state---', state);

  console.log('GET 함수 호출됨'); // 함수 진입 확인 로그

  // 쿠키 내용 로그 출력
  console.log('모든 쿠키 내용:', request.cookies.getAll()); // 모든 쿠키 내용 출력

  // 토큰 받아 오기
  let response;

  // Google PKCE 흐름을 위해 쿠키에서 code_verifier 가져오기
  const codeVerifier = request.cookies.get(
    'next-auth.pkce.code_verifier',
  )?.value;

  console.log('codeVerifier', codeVerifier);

  if (!codeVerifier) {
    return NextResponse.json(
      { success: false, error: 'Code Verifier is missing' },
      { status: 400 },
    );
  }

  try {
    // 구글 ID 토큰(JWT) 요청
    const googleTokenResponse = await publicAxiosInstance.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: 'http://localhost:3000/api/auth/callback/google',
        code_verifier: codeVerifier,
        grant_type: 'authorization_code',
      },
    );

    // 구글 응답에서 ID Token 추출
    const { id_token } = googleTokenResponse.data;
    console.log('googleTokenResponse.data--', googleTokenResponse.data);
    console.log('id_token--', id_token);

    if (!id_token) {
      throw new Error('Google ID token을 받지 못했습니다.');
    }

    // 구글 로그인 처리
    response = await publicAxiosInstance.post('/auth/signIn/GOOGLE', {
      state: state,
      redirectUri: 'http://localhost:3000/api/auth/callback/google',
      token: id_token,
    });
  } catch (error) {
    console.error('Google login 처리 중 오류 발생:', error);
    return NextResponse.json(
      { success: false, error: 'Google login failed' },
      { status: 500 },
    );
  }

  if (response) {
    try {
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
