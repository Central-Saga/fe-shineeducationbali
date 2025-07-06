"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ParallaxImage, ScrollSection, StaggeredReveal } from "@/components/animations/ScrollAnimations";
import { TiltCard } from "@/components/animations/MicroAnimations";

const About = () => {
  const listItems = [
    "Meningkatkan prestasi akademik",
    "Mengembangkan potensi diri",
    "Mempersiapkan untuk ujian",
    "Meningkatkan kemampuan bahasa",
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollSection direction="up" delay={0.1}>
          <h2 className="text-4xl font-bold mb-4 mt-12 text-[#C40503] text-center">
            Tentang Kami
          </h2>
        </ScrollSection>

        <div className="flex flex-col md:flex-row items-center justify-center gap-24 max-w-[1600px] mx-auto px-8 mt-16">
          <ScrollSection
            className="md:w-1/2 max-w-3xl"
            direction="left"
            delay={0.3}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#C40503]/20 to-[#DAA625]/20 rounded-lg blur-xl"
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
              <TiltCard className="w-full" intensity={5}>
                <ParallaxImage
                  src="/pichome/hero-section.jpg"
                  alt="Students Learning"
                  className="rounded-lg shadow-2xl relative z-10 transition-transform duration-300"
                  speed={0.15}
                  imgClassName="rounded-[28px] object-cover w-full h-auto aspect-[4/3] shadow-[0_20px_30px_-8px_rgba(0,0,0,0.25),0_10px_20px_-5px_rgba(0,0,0,0.2)]"
                />
              </TiltCard>
            </div>
          </ScrollSection>

          <ScrollSection
            className="md:w-1/2"
            direction="right"
            delay={0.3}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#C40503]">
              Shine Education
            </h3>
            <p className="text-gray-600 mb-6">
              Shine Education adalah lembaga pendidikan di Tabanan yang
              mengutamakan kursus dan bimbingan belajar dalam semua jenjang
              pendidikan. Dengan pengajar yang berkualitas dan metode
              pembelajaran yang efektif, kami membantu siswa untuk:
            </p>

            <StaggeredReveal
              className="space-y-3 text-gray-600"
              staggerDelay={0.1}
              threshold={0.2}
            >
              {listItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <motion.span
                    className="w-2 h-2 bg-gradient-to-r from-[#C40503] to-[#DAA625] rounded-full mr-2"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </StaggeredReveal>
          </ScrollSection>
        </div>
      </div>
    </section>
  );
};

export default About;
