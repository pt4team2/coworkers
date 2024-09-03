import React from "react";
import "./styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav >내비게이션 바</nav>
        </header>
        <main>{children}</main>
        <footer>푸터</footer>
      </body>
    </html>
  );
}
