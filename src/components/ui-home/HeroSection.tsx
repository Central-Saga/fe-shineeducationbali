"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HeroSection = () => {
  const [isShining, setIsShining] = useState(false);

  const handleShine = () => {
    setIsShining(true);
    setTimeout(() => setIsShining(false), 1500);
  };

  return (
    <section className="min-h-[90vh] relative overflow-hidden flex items-center">
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
            className="lg:w-1/2 relative perspective-1000"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              filter: "drop-shadow(0 0 20px rgba(196, 5, 3, 0.3))",
              transition: { duration: 0.3 },
            }}
            onClick={handleShine}
          >
            {/* Shine Effect Container */}
            <div className="relative overflow-hidden rounded-2xl">
              {" "}
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
              />
              {/* Main Image */}
              <div className="relative w-full max-w-[600px] mx-auto">
                <Image
                  src="/pichome/hero-section3.svg"
                  alt="Students Learning"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl relative z-10"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
