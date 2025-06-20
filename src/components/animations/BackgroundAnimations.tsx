"use client";

import { motion, useAnimation, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export const WaveEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    controls.start({
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 197, 253, 0.15) 0%, transparent 50%)`,
    });
  }, [mousePosition, controls]);

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      animate={controls}
      transition={{ type: "spring", damping: 15 }}
    />
  );
};

export const FloatingBubbles = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [bubbles, setBubbles] = useState<
    Array<{
      size: number;
      initialPosition: { x: number; y: number };
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 8 }).map((_, i) => ({
      size: Math.random() * 100 + 50,
      initialPosition: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 2,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {" "}
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.initialPosition.x}%`,
            top: `${bubble.initialPosition.y}%`,
          }}
          animate={{
            y: ["0%", "-20%", "0%"],
            x: [
              `${bubble.initialPosition.x}%`,
              `${bubble.initialPosition.x + 5}%`,
              `${bubble.initialPosition.x}%`,
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, 
                ${
                  i % 2 === 0
                    ? "rgba(167, 139, 250, 0.1)"
                    : "rgba(147, 197, 253, 0.1)"
                } 0%,
                ${
                  i % 2 === 0
                    ? "rgba(139, 92, 246, 0.05)"
                    : "rgba(59, 130, 246, 0.05)"
                } 100%)`,
              backdropFilter: "blur(3px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </motion.div>
      ))}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/50 via-blue-500/50 to-violet-500/50"
        style={{ scaleX }}
      />
    </div>
  );
};

export const DynamicBackground = () => {
  return (
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
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
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
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.02) 100%)",
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
  );
};
