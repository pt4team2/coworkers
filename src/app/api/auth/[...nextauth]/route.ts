import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { publicAxiosInstance } from '@/app/api/auth/axiosInstance';
import KakaoProvider from 'next-auth/providers/kakao';

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
          // API 호출
          const result = await publicAxiosInstance.post('/auth/signIn', {
            email: credentials?.email,
            password: credentials?.password,
          });

          // 응답 데이터 처리
          const user = await result.data;

          // 사용자 인증 성공 처리
          if (user) {
            console.log('-----------');
            console.log(user);
            return user;
          } else {
            console.log('-----------');
            console.log(null);
            return null;
          }
        } catch (error) {
          // 오류 처리
          console.log('-----------');
          console.error('Error during login:', error);
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 세션 만료 시간: 24시간
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    async jwt({ token, user, account }) {
      // OAuth 로그인인 경우
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires = account.expires_at;
      }

      if (user) {
        return { ...token, ...user };
      }
      console.log('----------');
      console.log('토큰', token);
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        // 카카오 로그인인 경우
        session = {
          user: {
            id: Number(token.sub),
            nickname: token.name as string,
            createdAt: new Date(Number(token.iat) * 1000).toISOString(),
            updatedAt: new Date(Number(token.exp) * 1000).toISOString(),
            image: token.image as string,
            teamId: '7-2',
          },
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
          expires: new Date(Number(token.expires) * 1000).toISOString(),
        };
      } else {
        // 자체 로그인인 경우
        session = token as any;
      }
      console.log('----------');
      console.log('세션', session);
      return session;
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
