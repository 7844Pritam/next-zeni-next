"use client";

import { usePathname } from "next/navigation";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import ReduxProvider from "./ReduxProvider";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const excludeLayoutPaths = ["/my-blogs", "/admin", "/auth"];

  const hideLayout = excludeLayoutPaths.some(path => pathname.startsWith(path));

  return (
    <ReduxProvider>
      {hideLayout ? <div /> : <Header />}
      <main className="bg-white">{children}</main>
      {hideLayout ? <div /> : <Footer />}
    </ReduxProvider>
  );
}
