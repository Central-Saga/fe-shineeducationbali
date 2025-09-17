"use client";

import { motion, AnimatePresence } from "framer-motion";
import { programItems } from "@/data/ui-home/program";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Award, Users } from "lucide-react";
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-[#C40503]/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-[#C40503]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#C40503]">
              Program Kami
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami menawarkan berbagai program pendidikan yang dirancang untuk
            memenuhi kebutuhan belajar Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programItems.map((program) => (
            <Card
              key={program.id}
              className="group relative overflow-hidden hover:shadow-lg h-[358px] transition-all duration-300"
            >
              <div className="relative w-full h-full">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="transform translate-y-[60%] group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <h3 className="text-2xl font-bold mb-3 text-shadow-sm">
                    {program.title}
                  </h3>
                  <p className="text-sm mb-4 transition-opacity duration-300 delay-75 line-clamp-2">
                    {program.description}
                  </p>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    {program.level}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;
