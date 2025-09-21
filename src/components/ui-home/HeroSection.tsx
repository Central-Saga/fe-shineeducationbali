"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { GraduationCap, BookOpen, Star } from "lucide-react";
import LearningBackground from "../animations/LearningBackground";

const HeroSection = () => {
  const [isWaving, setIsWaving] = useState(false);

  const handleWave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1000);
  };

  return (
    <section
      id="hero-section"
      className="min-h-[90vh] relative overflow-hidden flex items-center bg-white"
    >
      <LearningBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content */}
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
              <Badge className="bg-[#C40503]/10 text-[#C40503] border-[#C40503]/20 mb-4 inline-flex items-center gap-2 text-lg px-4 py-2">
                <Star className="h-4 w-4" />
                #1 Bimbel di Tabanan
                <span className="text-2xl cursor-pointer">👋</span>
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div>
                <motion.span
                  className="text-[#C40503] inline-block"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(196, 5, 3, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shine Education
                </motion.span>
              </div>
              <div className="text-[#DAA625] relative inline-block mt-2">
                Bimbingan Belajar
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
            </motion.h1>
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-[#C40001] text-white px-8 py-6 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:shadow-[#C40001]/20 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Mulai Belajar
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="px-8 py-6 rounded-full text-lg font-semibold border-2 border-[#C40503] text-[#C40503] hover:bg-[#C40503] hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <BookOpen className="h-5 w-5" />
                  Pelajari Selengkapnya
                </Button>
              </motion.div>
            </motion.div>{" "}
          </motion.div>
          {/* Hero Image */}
          <div className="lg:w-1/2">
            <div className="w-full max-w-[600px] mx-auto">
              <Image
                src="/pichome/hero-section3.svg"
                alt="Students Learning"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
