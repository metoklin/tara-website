import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '達拉 TARA｜達拉度母佛堂',
    template: '%s｜達拉 TARA',
  },
  description: '認識達拉 TARA，瀏覽佛堂介紹、結緣品、法會活動與交通資訊。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
