import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import Navbar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Providers from "../components/providers";

const noto_sans = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "TikTok Shop",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex flex-col overflow-x-hidden">
        {/* 
            Need to fix: 
            - Kalo di scroll ampe bawah, navbar sama seachbarnya collide (bnr bnr hrs infinite scroll?) 
            - Searchbarnya ketumpuk sama tulisan tulisan dari PageFeed
        */}
        <Providers>
          <SearchBar />
          <div className="flex flex-row mt-16 ml-60">
            <Toaster />
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
