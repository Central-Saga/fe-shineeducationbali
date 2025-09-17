"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  subscriptionPlans,
  facilities,
  educationLevels,
} from "@/data/ui-home/subscription";
import { useState, useEffect } from "react";
import type { FloatingEmoji } from "@/types/animation";
import Confetti from "./Confetti";

const Langganan = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("langganan-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setShowConfetti(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="langganan-section" className="py-16 relative overflow-hidden">
      {showConfetti && <Confetti />}
      <div className="container mx-auto px-4 relative z-10">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {" "}
          <h2 className="text-3xl font-bold mb-4 text-[#C40503]">
            Biaya Langganan & Fasilitas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan paket langganan yang tepat untuk mendukung tujuan belajar
            Anda!
          </p>
        </motion.div>
        {/* Paket Langganan Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                },
              }}
              className="bg-white/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:border-[#DAA625]/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="p-8 flex flex-col h-full relative">
                {/* Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-[#C40001]/5 rounded-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-center mb-4 text-[#C40503]">
                    {plan.name}
                  </h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-[#C40503]">
                      Rp {plan.price}
                    </span>
                    <span className="text-gray-600">/{plan.duration}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{
                          delay: 0.3 + idx * 0.1,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className="flex items-center text-gray-600"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <svg
                            className="w-5 h-5 text-[#DAA625] mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 20px rgba(196, 5, 3, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#C40001] text-white py-3 px-6 rounded-full transition-all duration-300 font-semibold shadow-md"
                  >
                    Pilih Paket
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Biaya Per-jenjang Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold mb-4 text-[#C40503]">
              Biaya Per-jenjang
            </h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {educationLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-100 hover:border-[#DAA625]/30 transition-all duration-300"
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-[#C40001]/20 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                    <div className="relative bg-[#C40001]/10 rounded-full flex items-center justify-center w-full h-full">
                      <span className="text-2xl">{level.emoji}</span>
                    </div>
                  </motion.div>
                  <h4 className="font-semibold text-xl mb-2 text-[#C40001]">
                    {level.level}
                  </h4>
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <span className="font-bold text-lg">{level.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    *Biaya Pendaftaran IDR 35.000 include Material & Bag
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Facilities Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-[#C40001]">
            Fasilitas yang Anda Dapatkan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Group of facilities in a card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-100 hover:border-[#DAA625]/30 transition-all duration-300"
            >
              <div className="grid grid-cols-1 gap-6">
                {facilities.slice(0, 4).map((facility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-[#C40001]/10"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg
                          className="w-6 h-6 text-[#C40503]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={facility.icon}
                          />
                        </svg>
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-[#C40001]">
                        {facility.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {facility.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Second group of facilities in a card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
              className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg border border-gray-100 hover:border-[#DAA625]/30 transition-all duration-300"
            >
              <div className="grid grid-cols-1 gap-6">
                {facilities.slice(4).map((facility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-[#C40001]/10"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg
                          className="w-6 h-6 text-[#C40503]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={facility.icon}
                          />
                        </svg>
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-[#C40001]">
                        {facility.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {facility.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Langganan;
