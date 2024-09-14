import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { publicAxiosInstance } from '@/app/api/auth/axiosInstance';

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
        console.log('authorize 함수 실행 중', credentials);
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
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session = token as any;
      }
      return session;
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
