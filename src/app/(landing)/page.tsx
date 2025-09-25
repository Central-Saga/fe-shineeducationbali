"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "@/components/ui-home/Navbar";
import HeroSection from "@/components/ui-home/HeroSection";
import About from "@/components/ui-home/About";
import Program from "@/components/ui-home/Program";
import Langganan from "@/components/ui-home/Langganan";
import Footer from "@/components/ui-home/Footer";
import {
  WaveEffect,
  FloatingBubbles,
  DynamicBackground,
} from "@/components/animations/BackgroundAnimations";

interface FloatingItemProps {
  width: number;
  height: number;
  left: string;
  top: string;
  color1: string;
  color2: string;
  shape: "book" | "pencil" | "graduation" | "lightbulb";
}

// Removed WaveEffect and EnhancedParticles as they are now imported from BackgroundAnimations

const InteractiveBackground = () => {
  return (
    <>
      <FloatingBubbles />
      <div className="fixed inset-0 -z-10">
        <svg className="w-full h-full opacity-20">
          <pattern
            id="pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 0L40 20L20 40L0 20Z"
              fill="none"
              stroke="rgba(147, 197, 253, 0.2)"
              strokeWidth="1"
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
      <WaveEffect />
      <DynamicBackground />
    </>
  );
};

const ParticlesSection = () => {
  const sizes = [1.5, 2, 1.8, 2.2, 1.7];
  const leftPositions = [5, 15, 25, 35, 20];
  const topPositions = [5, 10, 15, 8, 12];
  const durations = [3, 4, 3.5, 4.5, 3.8];

  return (
    <motion.div className="absolute right-10 top-[180vh]">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: `${sizes[i]}rem`,
            height: `${sizes[i]}rem`,
            left: `${leftPositions[i]}rem`,
            top: `${topPositions[i]}rem`,
          }}
          animate={{
            y: [-10, 10],
            x: [-5, 5],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: durations[i],
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        >
          <div
            className={`w-full h-full rounded-full ${
              i % 3 === 0
                ? "bg-[#C40001]/20"
                : i % 3 === 1
                ? "bg-[#DAA625]/20"
                : "bg-[#DAA521]/20"
            }`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function Home() {
  const [items, setItems] = useState<FloatingItemProps[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const shapes: FloatingItemProps["shape"][] = [
      "book",
      "pencil",
      "graduation",
      "lightbulb",
    ];
    const colors1 = ["#C40001", "#DAA625", "#DAA521", "#fecaca"];
    const colors2 = ["#C40001", "#DAA625", "#DAA521", "#fca5a5"];
    const positions = [20, 40, 60, 80];
    const newItems = Array(4)
      .fill(null)
      .map((_, index) => ({
        width: 8,
        height: 8,
        left: `${positions[index]}%`,
        top: `${(100 / 4) * (index + 1)}vh`,
        color1: colors1[index % colors1.length],
        color2: colors2[index % colors2.length],
        shape: shapes[index % shapes.length],
      }));

    setItems(newItems);
  }, []);

  return (
    <main className="relative overflow-hidden">
      <div className="relative">
        <InteractiveBackground />
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {mounted &&
            items.map((item, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  width: `${item.width}rem`,
                  height: `${item.height}rem`,
                  left: item.left,
                  top: item.top,
                  clipPath:
                    item.shape === "book"
                      ? "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
                      : item.shape === "pencil"
                      ? "polygon(20% 0%, 80% 0%, 100% 90%, 50% 100%, 0% 90%)"
                      : item.shape === "graduation"
                      ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                      : "circle(50% at 50% 50%)", // lightbulb default
                  background: item.color1,
                  boxShadow: `0 0 20px ${item.color1}33`,
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                }}
                animate={{
                  y: [-20, 20],
                  x: [-10, 10],
                  rotate: [-5, 5],
                  scale: [0.95, 1.05],
                  filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  delay: index * 0.3,
                }}
              />
            ))}
        </div>
        {/* Program Section Animation - Simple Stars */}
        <motion.div
          className="absolute left-20 top-[120vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <motion.div
              className="absolute w-3 h-3 bg-yellow-300/40 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-2 h-2 bg-red-300/40 rounded-full left-8 top-2"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>
        </motion.div>
        {/* Fun Interactive Particles */}
        <ParticlesSection />
        {/* Kid-Friendly Decorative Elements */}
        {/* Floating Balloon */}
        <motion.div
          className="absolute left-10 top-[150vh] w-20 h-24"
          animate={{
            y: [-20, 20],
            x: [-5, 5],
            rotate: [-5, 5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        >
          <div className="w-full h-[80%] bg-[#C40001]/40 rounded-full" />
          <div className="w-[2px] h-[20%] mx-auto bg-[#C40001]/40" />
        </motion.div>
        {/* Dynamic Background Animation */}
        <motion.div
          className="fixed inset-0 -z-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: "60px",
                  height: "60px",
                  left: `${(i % 5) * 25}%`,
                  top: `${Math.floor(i / 5) * 25}%`,
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(2px)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, i % 2 ? 1.2 : 0.8, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 10 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Floating Lines */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[2px] w-[200px]"
                style={{
                  left: `${i * 10}%`,
                  top: `${50 + (i % 2) * 10}%`,
                  background: "rgba(255,255,255,0.2)",
                  transform: `rotate(${i * 36}deg)`,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.5, 1],
                  x: [-100, 100, -100],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Interactive Wave Effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(0,0,0,0.02)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
      <Navbar />{" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
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
        <Langganan />
      </motion.div>
      <Footer />
    </main>
  );
}
