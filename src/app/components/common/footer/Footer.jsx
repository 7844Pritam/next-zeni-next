'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import img from '../../../../../public/footer.svg';

const CustomFooter = () => {
  return (
    <footer className="relative border rounded-2xl overflow-hidden text-white font-serif h-[60vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={img}
          alt="Footer background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Optional Overlay */}
      <div className="absolute inset-0 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-screen-xl -bottom-28 mx-auto px-4 flex flex-col justify-center items-center text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6   tracking-wide">
          NEXT ZENI
        </h1>

        <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium uppercase tracking-widest">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/courses" className="hover:underline">Course</Link>
          <Link href="/blogs" className="hover:underline">Blogs</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/resources" className="hover:underline">Resources</Link>
        </nav>

        <div className="mt-8 text-xs md:text-sm">
          © 2025 Next Zeni. Designed & Developed by Difmo Technologies
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
