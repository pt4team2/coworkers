import NextAuth from 'next-auth';
import { getOptions } from '@/nextAuthOptions';
import { NextRequest } from 'next/server';

const handler = async (req: NextRequest, context: any) => {
  return await NextAuth(req, context, getOptions(req.clone()));
};

export { handler as GET, handler as POST };
