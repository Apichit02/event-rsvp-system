import { Geist, Geist_Mono } from "next/font/google";
import { Kanit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata = {
  title: "Event RSVP System | บริการจัดการกิจกรรม",
  description: "ระบบจัดการกิจกรรมและลงทะเบียนออนไลน์ที่ใช้งานง่าย",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
