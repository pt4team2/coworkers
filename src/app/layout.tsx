import React from 'react';
import '../styles/globals.css';
import Header from '@/components/header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  );
}
