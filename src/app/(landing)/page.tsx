"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui-home/Navbar";
import HeroSection from "@/components/ui-home/HeroSection";
import About from "@/components/ui-home/About";
import Program from "@/components/ui-home/Program";
import Langganan from "@/components/ui-home/Langganan";
import Footer from "@/components/ui-home/Footer";
import BlogHighlight from "@/components/ui-home/BlogHighlight";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Content */}{" "}
      <div className="relative">
        {" "}
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Animated shapes */}{" "}
          <motion.div
            className="absolute -left-20 top-1/4 w-96 h-96 bg-gradient-to-br from-[#C40503] to-transparent rounded-full mix-blend-multiply opacity-30"
            animate={{
              x: [0, 150, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -right-20 top-1/3 w-[30rem] h-[30rem] bg-gradient-to-bl from-[#DAA625] to-transparent rounded-full mix-blend-multiply opacity-30"
            animate={{
              x: [0, -150, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute left-1/3 -bottom-20 w-[28rem] h-[28rem] bg-gradient-to-tr from-[#C40503] to-transparent rounded-full mix-blend-multiply opacity-30"
            animate={{
              x: [0, 80, 0],
              y: [0, -150, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-[#DAA625] to-transparent rounded-full mix-blend-multiply opacity-30"
            animate={{
              x: [-50, 50, -50],
              y: [-50, 50, -50],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Program />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <About />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <BlogHighlight />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Langganan />
        </motion.div>
        <Footer />
      </div>
    </main>
  );
}
