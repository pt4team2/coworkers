import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { publicAxiosInstance } from '@/app/api/auth/axiosInstance';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';

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
});
