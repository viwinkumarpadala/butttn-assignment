// import Logo from "@/components/Logo";
// import ThemeSwitcher from "@/components/ThemeSwitcher";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <ThemeSwitcher />
      </nav> */}
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
