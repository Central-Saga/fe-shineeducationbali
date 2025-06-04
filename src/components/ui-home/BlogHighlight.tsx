"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { blogPosts } from "@/data/ui-home/blog";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const BlogHighlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({
    container: containerRef,
  });

  // Floating emoji animation
  const [floatingEmojis, setFloatingEmojis] = useState<
    Array<{
      id: number;
      emoji: string;
      x: number;
      y: number;
      scale: number;
      rotation: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    const educationEmojis = ["📚", "✏️", "📖", "🎯", "💡", "🌟"];
    const newEmojis = Array(6)
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
        className="absolute inset-0 bg-[radial-gradient(#ff9b9b_1px,transparent_1px)] [background-size:40px_40px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#ffdb99_1px,transparent_1px)] [background-size:30px_30px]"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#C40503]">
            Blog & Artikel Terbaru
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan artikel menarik dan tips bermanfaat untuk meningkatkan
            kemampuan akademik Anda
          </p>
        </motion.div>

        <motion.div
          className="relative bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            ref={containerRef}
            className="flex overflow-x-scroll gap-6 pb-8 cursor-grab"
            whileTap={{ cursor: "grabbing" }}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="flex-shrink-0 w-[300px] md:w-[350px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  },
                }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full border border-gray-100 hover:border-pink-200 transition-colors duration-300">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="object-cover transition-transform duration-500 hover:scale-110"
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-all duration-300" />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-4 left-4"
                    >
                      <span className="px-3 py-1 bg-gradient-to-r from-[#ff6b6b] to-[#ffa06b] text-white text-sm rounded-full shadow-lg">
                        {post.category}
                      </span>
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent hover:from-[#ff6b6b] hover:to-[#ffa06b] transition-all duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500">
                        {post.author}
                      </span>
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                          x: 5,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[#ff6b6b] font-semibold hover:text-[#ffa06b] transition-colors duration-300 flex items-center gap-1"
                      >
                        Baca Selengkapnya
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
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Custom Scroll Indicator */}
          <div className="mt-6 mx-auto max-w-md h-1 bg-gray-200/50 backdrop-blur-sm rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#ffa06b] rounded-full"
              style={{
                scaleX: useTransform(
                  scrollX,
                  [
                    0,
                    (containerRef.current?.scrollWidth || 0) -
                      (containerRef.current?.clientWidth || 0),
                  ],
                  [0, 1]
                ),
                transformOrigin: "left",
              }}
            />
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .overflow-x-scroll::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default BlogHighlight;
