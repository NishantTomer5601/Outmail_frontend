import { Geist, Geist_Mono, Satisfy, Syne } from "next/font/google";
import "./globals.css";
import SmoothScrollWrapper from "@/component/SmoothScrollWrapper";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-syne",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
});

export const metadata = {
  metadataBase: new URL("https://outmail.in"),
  title: "Outmail",
  description: "Personalized Cold Outreach at Scale. Created by Outmail.in",
  icons: {
    icon: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Outmail",
    description: "Personalized Cold Outreach at Scale",
    url: "https://outmail.in",
    siteName: "Outmail",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Outmail - Personalized Cold Outreach at Scale",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outmail",
    description: "Personalized Cold Outreach at Scale",
    images: ["/image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon-32.png"
          type="image/png"
          sizes="32x32"
        />
        <link rel="shortcut icon" href="/favicon-32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics */}
        {process.env.NODE_ENV === "production" && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-EEWX3GK1NK"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EEWX3GK1NK');
            `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${satisfy.variable} antialiased`}
      >
        <AuthProvider>
          <SmoothScrollWrapper>
            <div>{children}</div>
          </SmoothScrollWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
