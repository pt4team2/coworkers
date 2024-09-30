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

          const user = result.data;

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
    maxAge: 60,
    // updateAge: 60 * 60 * 3,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn(params) {
      console.log('---params---', params);

      if (params.account?.provider === 'google') {
        const idToken = params.account?.id_token;
        console.log('---idToken---', idToken);

        const state = '임시';

        if (idToken && state) {
          try {
            const response = await publicAxiosInstance.post(
              '/auth/signIn/GOOGLE',
              {
                state: state,
                redirectUri: 'http://localhost:3000/api/auth/callback/google',
                token: idToken,
              },
            );

            console.log('API response:', response.data);
            return true;
          } catch (error) {
            console.error('OAuth API error:', error);
            return false;
          }
        } else {
          console.log('Missing id_token or state');
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log('---account---', account);
      console.log('---token---', token);
      console.log('---user---', user);

      // 초기 로그인 시에만 user가 존재
      const currentTime = Math.floor(Date.now() / 1000);
      if (user) {
        token.user = user.user;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        return token;
      } else if (currentTime < token.exp) {
        console.log('---currentTime---', currentTime);
        console.log('---token.exp---', token.exp);
        return token;
      } else {
        try {
          console.log('---token.refreshToken---', token.refreshToken);
          const response = publicAxiosInstance.post('/auth/refresh-token', {
            refreshToken: token.refreshToken,
          });

          const newTokens = await (await response).data;
          console.log('---newTokens---', newTokens);

          return {
            ...token,
            // accessToken: newTokens.accessToken,
            // expiresAt: Math.floor(Date.now() / 1000 + newTokens.expires),
            // refreshToken: newTokens.refreshToken || token.refreshToken,
          };
        } catch (error) {
          console.error('Error refreshing access token', error);
          return { ...token, error: 'refreshAccessTokenError' as const };
        }
      }
    },
    async session({ session, token }) {
      session = token as any;

      return session;
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
