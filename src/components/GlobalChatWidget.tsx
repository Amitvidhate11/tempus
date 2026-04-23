"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FloatingChatWidget } from "@/components/ui/floating-chat-widget";

export default function GlobalChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const pathname = usePathname();

  // Exclude from login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <>
      {/* AI Customer Support Executive */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 -right-48 md:-right-32 lg:-right-24 z-30 pointer-events-none"
      >
        <div 
          className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300 pointer-events-auto"
          onClick={() => setIsChatOpen(true)}
        >
          <Image 
            src="/ai-support-final.png" 
            alt="AI Customer Support" 
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </motion.div>

      <FloatingChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
