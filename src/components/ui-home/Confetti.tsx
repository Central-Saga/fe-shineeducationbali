"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const Confetti = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "#FF9999",
      "#FFB366",
      "#FFFF99",
      "#99FF99",
      "#99FFFF",
      "#9999FF",
    ];
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: particle.id % 2 === 0 ? "50%" : "0%", // Menggunakan ID untuk konsistensi
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{
            scale: 0,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [particle.rotation, particle.rotation + 180],
            opacity: [0, 1, 0],
            y: [0, 100],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
