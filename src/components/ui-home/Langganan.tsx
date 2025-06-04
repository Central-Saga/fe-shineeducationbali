"use client";

import { motion, AnimatePresence } from "framer-motion";
import { subscriptionPlans, facilities } from "@/data/ui-home/subscription";
import { useState, useEffect } from "react";
import type { FloatingEmoji } from "@/types/animation";

const Langganan = () => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const educationEmojis = ["💰", "💎", "🎯", "🎓", "✨", "💫"];
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

  return (
    <section className="py-16 relative overflow-hidden">
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
            className="absolute pointer-events-none text-4xl filter drop-shadow-lg"
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
            Biaya Langganan & Fasilitas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan paket langganan yang tepat untuk mendukung tujuan belajar
            Anda!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
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
                  className="absolute inset-0 bg-gradient-to-br from-[#C40503]/5 to-[#DAA625]/5 rounded-xl"
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
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.2 + idx * 0.1,
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
                    className="w-full bg-gradient-to-r from-[#C40503] to-[#DAA625] text-white py-3 px-6 rounded-full transition-all duration-300 font-semibold shadow-md"
                  >
                    Pilih Paket
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Facilities Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Fasilitas yang Anda Dapatkan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05 }}
                className="text-center relative"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#C40503]/20 to-[#DAA625]/20 rounded-full blur-xl"
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
                  <div className="relative bg-gradient-to-r from-[#C40503]/10 to-[#DAA625]/10 rounded-full flex items-center justify-center w-full h-full">
                    <svg
                      className="w-8 h-8 text-[#C40503]"
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
                  </div>
                </motion.div>
                <h4 className="font-semibold mb-2 bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
                  {facility.title}
                </h4>
                <p className="text-sm text-gray-600">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Langganan;
