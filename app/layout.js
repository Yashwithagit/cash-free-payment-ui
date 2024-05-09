import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import StoreProvider from '@/provider/StoreProvider'

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Store Fusion",
  description: "Online Shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={inter.className}>  
    <StoreProvider>
      <Navbar/>{children}
      </StoreProvider>
      </body>
    </html>
  );
}
