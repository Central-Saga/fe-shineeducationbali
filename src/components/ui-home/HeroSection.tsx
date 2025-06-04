"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { FloatingEmoji } from "@/types/animation";

const HeroSection = () => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [isShining, setIsShining] = useState(false);

  useEffect(() => {
    const educationEmojis = ["🎓", "📚", "🌟", "💫", "✨", "💡"];
    const newEmojis: FloatingEmoji[] = Array(6)
      .fill(null)
      .map((_, i) => ({
        id: i,
        emoji: educationEmojis[i],
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        duration: 3 + Math.random() * 2,
      }));
    setFloatingEmojis(newEmojis);
  }, []);

  const handleShine = () => {
    setIsShining(true);
    setTimeout(() => setIsShining(false), 1500);
  };

  return (
    <section className="min-h-[90vh] relative overflow-hidden flex items-center">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#C40503_1px,transparent_1px)] [background-size:40px_40px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#DAA625_1px,transparent_1px)] [background-size:30px_30px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Floating Emojis */}
      <AnimatePresence>
        {floatingEmojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            className="absolute pointer-events-none text-3xl filter drop-shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [emoji.scale, emoji.scale * 1.2, emoji.scale],
              rotate: [0, emoji.rotation, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: emoji.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: emoji.id * 0.2,
            }}
            style={{
              left: `${emoji.x}%`,
              top: `${emoji.y}%`,
            }}
          >
            {emoji.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h2 className="text-xl font-semibold text-[#C40503] mb-4">
              #1 Bimbel di Tabanan
            </h2>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {" "}
              <span className="text-[#C40503]">Shine Education</span>
              <br />
              <span className="text-[#DAA625]">Bimbingan Belajar Terbaik</span>
            </motion.h1>

            <motion.p
              className="text-gray-600 text-lg mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Raih prestasi akademik terbaikmu bersama kami. Dengan pengajar
              berpengalaman dan metode pembelajaran yang efektif.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r bg-[#DAA625] text-white px-8 py-6 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:shadow-[#C40503]/20">
                  Mulai Belajar
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="px-8 py-6 rounded-full text-lg font-semibold border-2 border-[#C40503] text-[#C40503] hover:bg-[#C40503] hover:text-white transition-all duration-300"
                >
                  Pelajari Selengkapnya
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            onClick={handleShine}
            whileHover={{
              filter: "drop-shadow(0 0 20px rgba(196, 5, 3, 0.3))",
              transition: { duration: 0.3 },
            }}
          >
            {/* Shine Effect Container */}
            <div className="relative overflow-hidden rounded-2xl">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#C40503]/20 to-[#DAA625]/20 rounded-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Shine Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 -translate-x-full"
                animate={
                  isShining
                    ? {
                        translateX: ["100%", "-100%"],
                        opacity: [0, 0.9, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />{" "}
              {/* Main Image */}
              <div className="relative w-full max-w-[600px] mx-auto">
                <Image
                  src="/pichome/hero-section.svg"
                  alt="Students Learning"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl relative z-10"
                  priority
                />
              </div>
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-[#DAA625]/10 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#C40503]/10 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
