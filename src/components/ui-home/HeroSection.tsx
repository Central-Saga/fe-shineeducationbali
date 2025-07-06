"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LearningBackground from "../animations/LearningBackground";
import { ParallaxImage, ScrollingTextReveal } from "@/components/animations/ScrollAnimations";
import { MagneticButton, LiquidButton } from "@/components/animations/MicroAnimations";

const HeroSection = () => {
  const [isWaving, setIsWaving] = useState(false);

  const handleWave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1000);
  };

  return (
    <section
      id="hero-section"
      className="min-h-[90vh] relative overflow-hidden flex items-center bg-gradient-to-b from-white to-blue-50/30"
    >
      <LearningBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content with ScrollingTextReveal for titles */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              className="inline-block"
              animate={
                isWaving
                  ? {
                      rotate: [0, 15, -15, 15, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
              onHoverStart={handleWave}
            >
              <h2 className="text-xl font-semibold text-[#C40503] mb-4 inline-flex items-center gap-2">
                #1 Bimbel di Tabanan
                <span className="text-2xl cursor-pointer">👋</span>{" "}
              </h2>
            </motion.div>

            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <div>
                <ScrollingTextReveal
                  text="Shine Education"
                  className="text-[#C40503] inline-block"
                  threshold={0.5}
                  staggerChildren={0.03}
                  duration={0.5}
                />
              </div>
              <div className="text-[#DAA625] relative inline-block mt-2">
                <ScrollingTextReveal
                  text="Bimbingan Belajar"
                  threshold={0.5}
                  staggerChildren={0.02}
                  duration={0.5}
                  delay={0.5}
                />
                <motion.span
                  className="absolute -top-6 -right-6 text-3xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 20, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✨
                </motion.span>
              </div>
            </div>

            <motion.p
              className="text-gray-600 text-lg mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Belajar jadi lebih seru! 🚀 Bergabung dengan teman-teman hebat dan
              guru yang keren. Raih mimpimu dengan cara yang menyenangkan! ✨
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <MagneticButton>
                <LiquidButton
                  color="#DAA625"
                  hoverColor="#C40503"
                  size="lg"
                  className="text-white text-lg font-semibold flex items-center gap-2"
                >
                  Mulai Belajar <span className="text-xl">🎓</span>
                </LiquidButton>
              </MagneticButton>
              
              <MagneticButton className="mt-4 lg:mt-0">
                <LiquidButton
                  color="#ffffff"
                  hoverColor="#C40503"
                  size="lg"
                  className="border-2 border-[#C40503] text-[#C40503] hover:text-white text-lg font-semibold flex items-center gap-2"
                >
                  Pelajari Selengkapnya <span className="text-xl">📚</span>
                </LiquidButton>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Hero Image with Parallax effect */}
          <div className="lg:w-1/2 relative">
            <div className="w-full max-w-[600px] mx-auto">
              <ParallaxImage
                src="/pichome/hero-section3.svg"
                alt="Students Learning"
                className="w-full h-auto"
                speed={0.1}
                imgClassName="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
