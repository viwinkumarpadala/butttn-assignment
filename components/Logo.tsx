import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-3xl bg-gradient-to-r from-pink-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      Butttn App
    </Link>
  );
}

export default Logo;
