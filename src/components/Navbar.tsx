"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-6">
      <div className="flex items-center gap-2 text-white">
        <img src="/new-logo.png" alt="Tempus Logo" className="w-8 h-8 object-contain rounded-full bg-white" />
        <span className="text-2xl font-light tracking-widest">TEMPUS</span>
      </div>
      
      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-white/80">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="#about-us" className="hover:text-white transition-colors">About Us</Link>
        <Link href="#" className="hover:text-white transition-colors">What We Do</Link>
        <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
      </div>

      <div>
        <Link 
          href="/login" 
          className="bg-[#2b91db] hover:bg-[#207bbd] text-white px-6 py-2.5 rounded-full font-medium transition-colors text-sm"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
