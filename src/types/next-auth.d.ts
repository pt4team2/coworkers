import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      nickname: string;
      email?: string;
      image: string;
      teamId: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string | undefined;
    expires: string;
  }
}
