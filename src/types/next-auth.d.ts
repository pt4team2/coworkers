import NextAuth from 'next-auth';

// 공통 타입 정의
interface CommonUser {
  id: number;
  nickname: string;
  email?: string;
  image: string | null;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export declare module 'next-auth' {
  interface Session {
    user: CommonUser;
    accessToken: string;
    refreshToken: string | undefined;
    accessTokenExpires: number;
    error?: string;
  }

  interface User extends CommonUser {
    accessToken: string;
    refreshToken: string | undefined;
    accessTokenExpires: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: CommonUser;
    accessToken: string;
    refreshToken: string | undefined;
    accessTokenExpires: number;
    error?: string;
  }
}
