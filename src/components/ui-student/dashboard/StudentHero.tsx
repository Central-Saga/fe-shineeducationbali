"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Award, Clock } from "lucide-react";

interface StudentHeroProps {
  studentName: string;
  learningStreak: number;
}

export function StudentHero({ studentName, learningStreak }: StudentHeroProps) {
  return (
    <div className="relative bg-[#C40001]/5 rounded-3xl p-8 mb-6 overflow-hidden shadow-lg">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className="w-12 h-12 rounded-full bg-[#DAA625] opacity-20 blur-xl" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <motion.h1 
            className="text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hai, <span className="text-[#C40503]">{studentName}</span>! 👋
          </motion.h1>
          <motion.p 
            className="text-gray-600 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Semangat belajar hari ini! Mari kita capai cita-citamu bersama.
          </motion.p>
          <div className="flex flex-wrap gap-3">
            <motion.div 
              className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-5 w-5 text-[#DAA625]" />
              <span className="text-sm font-medium">
                {learningStreak} Hari Streak Belajar!
              </span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Award className="h-5 w-5 text-[#C40503]" />
              <span className="text-sm font-medium">
                Level: Pembelajar Aktif
              </span>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-[#C40503]" />
            </div>
            <h3 className="font-semibold text-gray-700">Jadwal Terdekat</h3>
            <p className="text-sm text-gray-600">Matematika - 14:00</p>
            <div className="mt-2">
              <span className="inline-block px-3 py-1 text-xs bg-[#C40503]/10 text-[#C40503] rounded-full">
                Dalam 2 jam lagi
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
