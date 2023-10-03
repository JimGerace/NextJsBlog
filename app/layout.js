"use client";
import "./globals.css";
// import { Inter } from "next/font/google";
import MenuHeader from "@/components/Header/index";
import Image from "next/image";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "JimGerace Blog JS",
//   description: "个人博客记录点滴~",
// };

export default function RootLayout({ children }) {
  const [showBackTop, setShowBackTop] = useState(false);

  // 是否显示backTop
  const changeBackTop = (val) => {
    setShowBackTop(val);
  };

  // 回到顶部
  const comeBackTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster />
        <MenuHeader changeBackTop={changeBackTop} />
        <div className="relative w-full h-screen">{children}</div>

        <div
          onClick={comeBackTop}
          className={
            (showBackTop ? "block" : "hidden") +
            " z-50 fixed bottom-4 right-4 w-12 h-12 flex items-center justify-center rounded-50% cursor-pointer bg-white shadow-sm-base border-1 hover:bg-f2f6fc"
          }
        >
          <Image src="/images/icon_backTop.png" width={25} height={25} alt="" />
        </div>
      </body>
    </html>
  );
}
