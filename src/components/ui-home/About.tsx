"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Target, Users, Award, CheckCircle } from "lucide-react";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4 mt-12">
            <div className="p-2 bg-[#C40503]/10 rounded-lg">
              <Info className="h-6 w-6 text-[#C40503]" />
            </div>
            <h2 className="text-4xl font-bold text-[#C40503]">
              Tentang Kami
            </h2>
          </div>
        </motion.div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-24 max-w-[1600px] mx-auto px-8">
          <motion.div
            className="md:w-1/2 max-w-3xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 bg-[#C40001]/20 rounded-lg blur-xl"
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
              <Image
                src="/pichome/hero-section.jpg"
                alt="Students Learning"
                width={650}
                height={480}
                className="rounded-lg shadow-2xl relative z-10 hover:scale-[1.02] transition-transform duration-300 object-cover max-w-full h-auto mx-auto"
                style={{
                  aspectRatio: "4/3",
                  objectFit: "cover",
                  borderRadius: "28px",
                  boxShadow:
                    "0 20px 30px -8px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.2)",
                }}
              />
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.h3
              className="text-2xl font-semibold mb-4 text-[#C40503]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Shine Education
            </motion.h3>
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Shine Education adalah lembaga pendidikan di Tabanan yang
              mengutamakan kursus dan bimbingan belajar dalam semua jenjang
              pendidikan. Dengan pengajar yang berkualitas dan metode
              pembelajaran yang efektif, kami membantu siswa untuk:
            </motion.p>
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {listItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                  }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className="p-1 bg-[#C40001] rounded-full mr-3"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <CheckCircle className="h-3 w-3 text-white" />
                  </motion.div>
                  <span className="text-gray-600">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
