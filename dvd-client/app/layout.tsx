import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import DisplayNavigationBar from "../components/navbarComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DvD Escape",
  description: "An oldschool dvd browsing website",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#0b0b0b]">
 <main className="pt-25 min-h-screen bg-white">
     
        {/* create a nav bar displaying all the categories*/}
             
       
       
           {children}
          </main>
       
        
        
   


      </body>
    </html>
  );
}
