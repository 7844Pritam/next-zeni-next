import React from "react";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow p-6 bg-gray-100">
        {children}
      </main>

      <Footer />
    </div>
  );
}
