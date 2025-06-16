'use client'; // Required in App Router for client-side logic

import React, { useEffect, useState } from "react";
import Link from "next/link";

const Back = ({ title }) => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname.split("/")[1]);
    }
  }, []);

  return (
    <section className="w-full min-h-[200px] md:min-h-[300px] flex flex-col items-center">
      <Link
        href="/"
        className="text-white text-lg md:text-3xl lg:text-4xl font-semibold left-0"
      >
        Home {pathname && `/ ${pathname}`}
      </Link>
      <h1 className="text-white text-xl md:text-4xl lg:text-5xl font-bold mt-2">
        {title}
      </h1>
    </section>
  );
};

export default Back;
