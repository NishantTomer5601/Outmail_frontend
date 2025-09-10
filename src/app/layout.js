import { Geist, Geist_Mono } from 'next/font/google';
import { Syne } from 'next/font/google';
import './globals.css';
import SmoothScrollWrapper from '@/component/SmoothScrollWrapper';


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-syne',
});

export const metadata = {
  title: 'Outmail',
  description: 'Created by Outmail.in',
  icons: {
    icon: '/Logo_Outmail.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo_Outmail.png" type="image/png" />
        <link rel="shortcut icon" href="/Logo_Outmail.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Logo_Outmail.png" />
        <title>Outmail</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}>
        <SmoothScrollWrapper>
        <dot>
          {children}
          </dot>
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}
