'use client';

import useRefreshToken from '@/hooks/useRefreshToken';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  session: any;
}
function Providers({ children, session }: Props) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      <RefreshTokenWrapper>{children}</RefreshTokenWrapper>
    </SessionProvider>
  );
}

// token 갱신
const RefreshTokenWrapper = ({ children }: { children: ReactNode }) => {
  useRefreshToken();

  return <>{children}</>;
};

export default Providers;
