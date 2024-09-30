import NextAuth from 'next-auth';

export declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      nickname: string;
      email?: string;
      image: string | null;
      teamId: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string | undefined;
    accessTokenExpires: number;
    error?: string;
  }

  interface User {
    id: number;
    nickname: string;
    email?: string;
    image: string | null;
    teamId: string;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
    refreshToken: string | undefined;
    accessTokenExpires: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: number;
      nickname: string;
      email?: string;
      image: string | null;
      teamId: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string | undefined;
    accessTokenExpires: number;
    error?: string;
  }
}
