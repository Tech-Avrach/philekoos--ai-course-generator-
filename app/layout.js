import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { Toaster } from 'react-hot-toast';
import { UserTokenProvider } from "./_context/UserTokenContext";


const inter = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Philekoos",
  description: "AI course generator",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <UserTokenProvider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Toaster position="bottom-right" />
            {/* <GoogleOneTap /> Uncomment this if you need to use it */}
          </body>
        </html>
      </UserTokenProvider>
    </ClerkProvider>
  );
}