import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope, Cedarville_Cursive } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const cedarvilleCursive = Cedarville_Cursive({
  variable: "--font-cedarville",
  subsets: ["latin"],
  weight: "400",
});

const bigShoulders = localFont({
  src: "../public/fonts/BigShoulders-Variable.woff2",
  variable: "--font-big-shoulders",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magesh K | SDE - Flutter & iOS Developer",
  description: "Portfolio of Magesh K, a Software Development Engineer specializing in Flutter, iOS, Kotlin Multiplatform, and FinTech solutions. Currently building banking features at NPST.",
  keywords: ["Magesh K", "Flutter Developer", "SDE", "iOS Developer", "Kotlin", "Firebase", "FinTech", "UPI", "Mobile App Developer", "Portfolio"],
  authors: [{ name: "Magesh K" }],
  openGraph: {
    title: "Magesh K | SDE - Flutter & iOS Developer",
    description: "Portfolio of Magesh K, a Software Development Engineer specializing in Flutter, iOS, Kotlin Multiplatform, and FinTech solutions.",
    url: "https://magesh_kanna.dev",
    siteName: "Magesh K Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magesh K | SDE - Flutter & iOS Developer",
    description: "Portfolio of Magesh K, a Software Development Engineer specializing in Flutter, iOS, Kotlin Multiplatform, and FinTech solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} ${cedarvilleCursive.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
