import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { publicAxiosInstance } from '@/app/api/auth/axiosInstance';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
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

          const user = await result.data;

          if (user) {
            return user;
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
    // updateAge: 60 * 60 * 3,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn() {
      return true;
    },
    async jwt({ token, user, account }) {
      const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (Unix 타임스탬프)

      // 만료 시간이 없을 경우 설정
      if (!token.expires) {
        const expirationTimeUnix = currentTime + 60 * 60 * 3; // 3시간 후 만료 시간 설정
        token.expires = expirationTimeUnix;
      }

      // token.expires를 ISO 8601 형식으로 변환
      const expirationTimeISO = new Date(token.expires * 1000).toISOString();
      console.log('expirationTimeISO:', expirationTimeISO);

      // 새로운 사용자 정보가 있다면 추가
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;

      session.expires = new Date(token.expires * 1000).toISOString(); // token.expires 값으로 세션 만료 시간 설정
      console.log('session.expires:', session.expires); // 디버깅을 위한 출력

      return session;
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
