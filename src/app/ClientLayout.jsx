"use client";

import { usePathname } from "next/navigation";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const excludeLayoutPaths = ["/my-blogs", "/admin"];

  const hideLayout = excludeLayoutPaths.some(path => pathname.startsWith(path));

  return (
    <>
      {hideLayout ? <div /> : <Header />}
      <main className="bg-white">{children}</main>
      {hideLayout ? <div /> : <Footer />}
    </>
  );
}
