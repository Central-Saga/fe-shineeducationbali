"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface StudentHeroProps {
  studentName: string;
  learningStreak: number;
}

export function StudentHero({ studentName, learningStreak }: StudentHeroProps) {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mb-8 overflow-hidden">
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
            <div className="w-12 h-12 rounded-full bg-yellow-200 opacity-20 blur-xl" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Hai, {studentName}! 👋
          </h1>
          <p className="text-gray-600 max-w-md">
            Semangat belajar hari ini! Mari kita capai cita-citamu bersama.
          </p>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full w-fit">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium">
              {learningStreak} hari berturut-turut belajar!
            </span>
          </div>
        </div>

        {/* Decorative image */}
        <div className="hidden md:block relative w-48 h-48">
          <Image
            src="/icons/graduation.svg"
            alt="Student Learning"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
