"use client";

import { motion, AnimatePresence } from "framer-motion";
import { programItems } from "@/data/ui-home/program";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { FloatingEmoji } from "@/types/animation";

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {" "}
          <motion.h2
            className="text-3xl font-bold mb-4 text-[#C40503]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            Program Kami
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Temukan program belajar yang sesuai dengan kebutuhan Anda
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#DAA625]/30"
            >
              {" "}
              <motion.div
                className="w-16 h-16 mx-auto mb-4 relative"
                whileHover={{
                  scale: 1.1,
                  rotate: [0, 10, -10, 0],
                  transition: {
                    rotate: {
                      duration: 0.5,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="relative z-10"
                />
              </motion.div>{" "}
              <h3 className="text-xl font-semibold mb-3 text-center text-[#C40503]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">{item.description}</p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  x: 5,
                }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 text-[#C40503] font-semibold hover:text-[#DAA625] transition-colors duration-300 flex items-center gap-1 mx-auto"
              >
                Pelajari Lebih Lanjut
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;
