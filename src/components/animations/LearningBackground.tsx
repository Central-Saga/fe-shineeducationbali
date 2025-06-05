"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingObject {
  id: number;
  type: "book" | "pencil" | "star" | "brain" | "lightbulb" | "rocket";
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color: string;
}

const LearningBackground = () => {
  const [objects, setObjects] = useState<FloatingObject[]>([]);

  useEffect(() => {
    const types: (
      | "book"
      | "pencil"
      | "star"
      | "brain"
      | "lightbulb"
      | "rocket"
    )[] = ["book", "pencil", "star", "brain", "lightbulb", "rocket"];

    const colors = ["#C40503", "#DAA625", "#4B5563", "#3B82F6"];
    // Mengurangi jumlah objek untuk performa lebih baik
    const newObjects = [...Array(8)].map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.2 + 0.8, // Membuat ukuran lebih konsisten
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setObjects(newObjects);
  }, []);

  const getEmoji = (type: string) => {
    switch (type) {
      case "book":
        return "📚";
      case "pencil":
        return "✏️";
      case "star":
        return "⭐";
      case "brain":
        return "🧠";
      case "lightbulb":
        return "💡";
      case "rocket":
        return "🚀";
      default:
        return "📚";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Objects */}
      {objects.map((obj) => (
        <motion.div
          key={obj.id}
          className="absolute text-2xl"
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            opacity: 0.35,
            filter: "blur(0.5px)",
          }}
          initial={{
            scale: 0,
            rotate: obj.rotation,
          }}
          animate={{
            scale: [
              obj.scale * 0.9,
              obj.scale * 1.1,
              obj.scale * 0.95,
              obj.scale * 1.05,
              obj.scale * 0.9,
            ],
            rotate: [
              obj.rotation,
              obj.rotation + 45,
              obj.rotation - 45,
              obj.rotation + 90,
              obj.rotation,
            ],
            x: [0, 15, -15, 10, 0],
            y: [0, -10, -20, -5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 10, // Random duration between 10-15s
            repeat: Infinity,
            ease: "easeInOut",
            delay: obj.id * 0.3,
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
        >
          {getEmoji(obj.type)}
        </motion.div>
      ))}
      {/* Subtle Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C40503]/10 via-[#DAA625]/10 to-transparent"
        animate={{
          opacity: [0.1, 0.3, 0.2, 0.25, 0.1],
          scale: [1, 1.02, 1.01, 1.03, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default LearningBackground;
