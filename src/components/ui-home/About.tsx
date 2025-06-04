"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const About = () => {
  const listItems = [
    "Meningkatkan prestasi akademik",
    "Mengembangkan potensi diri",
    "Mempersiapkan untuk ujian",
    "Meningkatkan kemampuan bahasa",
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {" "}
          <h2 className="text-3xl font-bold mb-4 text-[#C40503]">
            Tentang Kami
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="relative">
              {" "}
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
              <Image
                src="/pichome/logo.jpg"
                alt="Students Learning"
                width={500}
                height={400}
                className="rounded-lg shadow-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
          >
            <motion.h3
              className="text-2xl font-semibold mb-4 text-[#C40503]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Shine Education
            </motion.h3>
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Shine Education adalah lembaga pendidikan di Tabanan yang
              mengutamakan kursus dan bimbingan belajar dalam semua jenjang
              pendidikan. Dengan pengajar yang berkualitas dan metode
              pembelajaran yang efektif, kami membantu siswa untuk:
            </motion.p>
            <motion.ul
              className="space-y-3 text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {listItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                  }}
                  whileHover={{ x: 10 }}
                >
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
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
