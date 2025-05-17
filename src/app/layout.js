"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { mainStore } from "@/store";
import Navbar from "@/Components/Navbar";

const interFont = Inter({
  subsets: ["latin"],
  preload: false
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" title="Frontend Mentor | Rest Countries Api" aria-description="rest-countries-api-with-color-theme-switcher-master">
      <body className={`bg-slate-300 dark:bg-[#2a2a3a] ${interFont.className}`}>
        <Provider store={mainStore}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
