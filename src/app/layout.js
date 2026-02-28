import { Geist, Geist_Mono, Satisfy } from 'next/font/google';
import { Syne } from 'next/font/google';
import './globals.css';
import SmoothScrollWrapper from '@/component/SmoothScrollWrapper';
import { AuthProvider } from '@/context/AuthContext';


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

const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-satisfy',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet" />
        <title>Outmail</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${satisfy.variable} antialiased`}>
        <AuthProvider>
          <SmoothScrollWrapper>
            <div>
              {children}
            </div>
          </SmoothScrollWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
