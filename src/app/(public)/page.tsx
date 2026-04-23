"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">
      
      {/* Hero Section */}
      <HeroGeometric 
        badge="Tempus Optimizer"
        title1="We create valuable"
        title2="campus connections."
        description="Our range of intelligent scheduling tools cover a portfolio of campus services that engage thousands of students each month."
      >
        <Link 
          href="/login" 
          className="inline-block border border-white/20 hover:border-white/60 hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 backdrop-blur-md"
        >
          Find Out More
        </Link>
      </HeroGeometric>

      {/* About Us Section */}
      <section id="about-us" className="relative z-10 py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-transparent to-[#0f0f13]/80">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white tracking-tight">
              About <span className="text-[#2b91db]">Tempus</span>
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              <p>
                Tempus is a smart queue management platform designed for educational institutions. 
                We aim to streamline campus operations by replacing traditional waiting lines with an efficient digital system.
              </p>
              <p>
                By enabling students to book slots, track queues, and manage their time effectively, 
                Tempus enhances productivity, reduces crowds, and creates a more organized campus experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
