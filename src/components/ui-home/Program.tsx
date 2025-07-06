"use client";

import { motion, AnimatePresence } from "framer-motion";
import { programItems } from "@/data/ui-home/program";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { FloatingEmoji } from "@/types/animation";
import { StaggeredReveal, AnimatedCard } from "@/components/animations/ScrollAnimations";
import { GlitchText, MarqueeText, FloatingGlassCard } from "@/components/animations/MicroAnimations";

const Program = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("program-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setShowAnimation(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="program-section" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <GlitchText 
            text="Program Kami" 
            className="text-3xl md:text-4xl font-bold mb-4 text-[#C40503]"
            intensity="light"
            speed="slow"
          />
          <MarqueeText
            className="py-3 mb-6 bg-slate-50 rounded-full text-gray-500 font-medium text-lg max-w-2xl mx-auto overflow-hidden"
            speed={20}
          >
            <span className="mx-4">⭐ Matematika </span>
            <span className="mx-4">⭐ Calistung </span>
            <span className="mx-4">⭐ Coding </span>
            <span className="mx-4">⭐ Bahasa Inggris </span>
          </MarqueeText>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami menawarkan berbagai program pendidikan yang dirancang untuk
            memenuhi kebutuhan belajar Anda
          </p>
        </motion.div>

        {/* Using StaggeredReveal for program cards */}
        {/* Modern Glass Card Display */}
        <StaggeredReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.15}
          threshold={0.1}
        >
          {programItems.map((program) => (
            <FloatingGlassCard
              key={program.id}
              className="group h-[358px] p-5 transition-all duration-300"
              glassOpacity={0.15}
              borderOpacity={0.2}
              shadowOpacity={0.05}
              floatIntensity={5}
            >
              <div className="relative w-full h-full flex flex-col justify-between">
                {/* Program image at the top */}
                <div className="relative w-full h-[180px] mb-4">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-[#C40503]">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {program.description}
                  </p>
                  <div className="text-sm font-medium bg-gradient-to-r from-red-500/20 to-orange-500/20 text-gray-700 inline-block px-4 py-2 rounded-full text-center">
                    {program.level}
                  </div>
                </div>
                
                {/* Subtle animated accent */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#C40503] to-orange-500 rounded-full"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </FloatingGlassCard>
          ))}
        </StaggeredReveal>
      </div>
    </section>
  );
};

export default Program;
