import type { Metadata } from 'next';
import TopNavbar from '@/components/TopNavbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEXT VOTE',
  description: 'CEOS 투표 사이트 입니다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="flex min-h-screen flex-col">
        <TopNavbar />
        <div className="flex flex-1 items-center justify-center">{children}</div>
      </body>
    </html>
  );
}

// min-h-[calc(100vh-4rem)]
