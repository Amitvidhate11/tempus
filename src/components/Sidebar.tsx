"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, User, BarChart3, Clock, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("tempus_role"));
  }, []);

  const navLinks = [
    { name: "Student Portal", href: "/dashboard", icon: User, allowed: ["student"] },
    { name: "My Queue", href: "/my-queue", icon: Clock, allowed: ["student"] },
    { name: "Staff Dashboard", href: "/staff-dashboard", icon: LayoutDashboard, allowed: ["admin"] },
    { name: "Admin Analytics", href: "/admin-analytics", icon: BarChart3, allowed: ["admin"] },
  ];

  const visibleLinks = navLinks.filter(link => role ? link.allowed.includes(role) : link.allowed.includes("student"));

  return (
    <aside className="fixed inset-y-0 left-0 w-[240px] bg-[#0f0f13] border-r border-[#222] z-50 flex flex-col">
      <div className="p-6 border-b border-[#222]">
        <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
          <img src="/new-logo.png" alt="Tempus Logo" className="w-8 h-8 object-contain rounded-full bg-white" />
          TEMPUS
        </h1>
        <p className="text-xs text-gray-400 mt-2">AI Campus Flow Optimizer</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {visibleLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#2b91db]/10 text-[#2b91db] border border-[#2b91db]/20"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a20]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#222] flex flex-col gap-2">
        <Link href="/profile" className="bg-[#1a1a20] hover:bg-[#25252d] transition-colors rounded-xl p-4 flex items-center gap-3 border border-[#222] hover:border-[#333]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2b91db] to-blue-400 flex items-center justify-center text-white font-medium shrink-0">
            {role === "admin" ? "AD" : "AJ"}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{role === "admin" ? "Admin User" : "Arjun J."}</p>
            <p className="text-xs text-gray-400 truncate">{role === "admin" ? "Staff" : "Student"}</p>
          </div>
        </Link>
        <button 
          onClick={() => {
            localStorage.removeItem('tempus_role');
            router.push('/login');
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
