import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";

const interFont = Inter({
  subsets: ["latin"],
  preload: false
});

export const metadata = {
  title: "Frontend Mentor | Rest Countries Api",
  description: "rest-countries-api-with-color-theme-switcher-master",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={interFont.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
