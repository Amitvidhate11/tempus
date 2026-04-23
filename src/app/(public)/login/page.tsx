"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User, ShieldCheck, ArrowRight } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState<"student" | "admin">("student");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("tempus_role", role);
    if (role === "admin") {
      router.push("/staff-dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#0f1524]/80 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2b91db] to-transparent opacity-50"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Please log in to your account</p>
        </div>

        <div className="flex bg-[#1e293b]/50 p-1 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              role === "student" ? "bg-[#2b91db] text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4" /> Student
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              role === "admin" ? "bg-[#2b91db] text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
              {role === "admin" ? "Staff ID" : "Student ID"}
            </label>
            <input 
              type="text" 
              required
              className="w-full bg-[#1e293b]/50 border border-[#334155] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#2b91db] focus:ring-1 focus:ring-[#2b91db] transition-all"
              placeholder={role === "admin" ? "STAFF-XXX" : "STU-XXX"}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-[#1e293b]/50 border border-[#334155] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#2b91db] focus:ring-1 focus:ring-[#2b91db] transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <div className="pt-2">
            <button 
              type="submit"
              className="w-full bg-[#2b91db] hover:bg-[#207bbd] text-white py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 group"
            >
              Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
