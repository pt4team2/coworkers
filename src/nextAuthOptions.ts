import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { publicAxiosInstance } from '@/app/api/auth/axiosInstance';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';

export const getOptions = (req?: Request): NextAuthOptions => ({
  debug: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const result = await publicAxiosInstance.post('/auth/signIn', {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = result.data;

          if (user) {
            return {
              ...user,
              accessTokenExpires: Date.now() + 60 * 60 * 3 * 1000, // 3시간
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: {
        params: {
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3000/api/auth/callback/kakao',
          response_type: 'code',
          scope: 'profile_nickname, profile_image',
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: 'http://localhost:3000/api/auth/callback/google',
          response_type: 'code',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 3,
    updateAge: 60 * 60 * 3,
  },
  jwt: {
    maxAge: 60 * 60 * 3,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn(params) {
      console.log('params', params);

      if (params.account?.provider === 'google') {
        if (!req?.url) {
          console.error('req.url is not defined');
          return false;
        }

        const parseUrl = new URL(req.url);
        const searchParams = new URLSearchParams(parseUrl.search);
        const state = searchParams.get('state');

        console.log('@@@결과');
        console.log('@@@state', state);
        console.log('@@@id_token', params?.account?.id_token);

        const idToken = params.account?.id_token;
        console.log('@@@idToken', idToken);

        const signInResponse = await publicAxiosInstance.post(
          '/auth/signIn/GOOGLE',
          {
            state,
            redirectUri: 'http://localhost:3000/api/auth/callback/google',
            token: idToken,
          },
        );
        return signInResponse.data;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // 최초 로그인
      if (user) {
        token = { ...token, ...user };

        // 불필요한 속성 제거
        delete token.name;
        delete token.email;
        delete token.picture;
        delete token.sub;

        console.log('token', token);
        return token;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      let accessTokenExpired = Math.floor(token.accessTokenExpires / 1000);
      const timeRemaining = accessTokenExpired - 60 * 10 - currentTime;

      console.log('@@@currentTime', currentTime);
      console.log('@@@accessTokenExpired', accessTokenExpired);
      console.log('@@@timeRemaining', timeRemaining);

      if (timeRemaining > 1) {
        // 유효기간 내에는 토큰 그대로 반환
        return token;
      } else {
        // accessToken이 만료된 경우 갱신
        try {
          console.log('api 호출 시도중');

          const response = await publicAxiosInstance.post(
            '/auth/refresh-token',
            {
              refreshToken: token.refreshToken,
            },
          );
          const newTokens = response.data;
          token.accessToken = newTokens.accessToken;
          token.accessTokenExpires = Date.now() + 60 * 60 * 3 * 1000;

          console.log('토큰 갱신 성공', token);

          return token;
        } catch (error) {
          console.log('토큰 갱신 실패: ', error);
          return {
            ...token,
            error: 'RefreshAccessTokenError',
          };
        }
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // if (token) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as any;
      session.error = token.error as any;
      session.accessTokenExpires = token.accessTokenExpires as any;

      return session;
    },
  },
});
