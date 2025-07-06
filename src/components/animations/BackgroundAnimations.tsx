"use client";

import React from "react";
import {
  motion,
  useAnimation,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useState, useRef, useMemo } from "react";

// Enhanced WaveEffect with scroll influence
export const WaveEffect = ({ scrollInfluence = 0.3 }: { scrollInfluence?: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0.05]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const scrollOffset = value * scrollInfluence * 100;
      controls.start({
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y + scrollOffset}px, rgba(147, 197, 253, ${opacity.get()}) 0%, transparent 50%)`,
      });
    });

    return () => unsubscribe();
  }, [mousePosition, controls, scrollYProgress, opacity, scrollInfluence]);

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      animate={controls}
      transition={{ type: "spring", damping: 15 }}
    />
  );
};

// Enhanced Floating Bubbles with scroll-based parallax
export const FloatingBubbles = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<
    Array<{
      size: number;
      initialPosition: { x: number; y: number };
      parallaxStrength: number;
      duration: number;
      delay: number;
      transformIndex: number; // Added field to track which transform to use
    }>
  >([]);

  // Pre-create a limited set of parallax transforms to use
  const transform1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const transform2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const transform3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const transform4 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const transform5 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  
  // Array of available transforms for easy reference
  const transforms = [transform1, transform2, transform3, transform4, transform5];

  useEffect(() => {
    const newBubbles = Array.from({ length: 8 }).map((_, i) => {
      const parallaxStrength = Math.random() * 0.5 + 0.1;
      // Determine which transform to use based on parallax strength
      const transformIndex = Math.min(
        4, // Max index is 4 (for transform5)
        Math.floor(parallaxStrength * 10)
      );
      
      return {
        size: Math.random() * 100 + 50,
        initialPosition: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
        parallaxStrength,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 2,
        transformIndex,
      };
    });
    setBubbles(newBubbles);
  }, []);

  return (
    <div ref={bubbleRef} className="absolute inset-0 overflow-hidden">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.initialPosition.x}%`,
            top: `${bubble.initialPosition.y}%`,
            y: transforms[bubble.transformIndex], // Use the pre-created transform
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [
              0,
              bubble.initialPosition.x > 50 ? -20 : 20,
              0,
            ],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, 
                ${
                  i % 2 === 0
                    ? "rgba(167, 139, 250, 0.1)"
                    : "rgba(147, 197, 253, 0.1)"
                } 0%,
                ${
                  i % 2 === 0
                    ? "rgba(139, 92, 246, 0.05)"
                    : "rgba(59, 130, 246, 0.05)"
                } 100%)`,
              backdropFilter: "blur(3px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
        </motion.div>
      ))}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/50 via-blue-500/50 to-violet-500/50"
        style={{ scaleX }}
      />
    </div>
  );
};

// Scroll-based Storytelling Background with fade-in/out sections
export const ScrollytellingBackground = ({ sections = 4 }: { sections?: number }) => {
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);

  // Create section visibility controls based on scroll position - avoid hooks in loops
  const sectionVisibility = Array.from({ length: sections }).map((_, i) => {
    const start = i / sections;
    const end = (i + 1) / sections;
    return useTransform(
      scrollYProgress,
      [start - 0.1, start, end, end + 0.1],
      [0, 1, 1, 0]
    );
  });

  // Section colors
  const sectionColors = [
    { background: "rgba(224, 242, 254, 0.05)", accent: "rgba(56, 189, 248, 0.2)" },
    { background: "rgba(255, 237, 213, 0.05)", accent: "rgba(251, 146, 60, 0.2)" },
    { background: "rgba(245, 243, 255, 0.05)", accent: "rgba(139, 92, 246, 0.2)" },
    { background: "rgba(240, 253, 244, 0.05)", accent: "rgba(52, 211, 153, 0.2)" },
  ];

  return (
    <div ref={ref} className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {sectionVisibility.map((opacity, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ opacity }}
        >
          {/* Scrollytelling section background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: sectionColors[i % sectionColors.length].background,
              backdropFilter: "blur(40px)",
            }}
          />

          {/* Scrollytelling decorative elements */}
          <motion.div
            className="absolute w-[40vw] h-[40vw] rounded-full"
            style={{
              left: i % 2 === 0 ? "-10vw" : "auto",
              right: i % 2 === 1 ? "-10vw" : "auto",
              top: `${20 + (i * 15) % 40}vh`,
              background: `radial-gradient(circle at center, ${sectionColors[i % sectionColors.length].accent} 0%, transparent 70%)`,
              opacity: 0.4,
            }}
            animate={{
              scale: [1, 1.1, 1],
              x: i % 2 === 0 ? [0, 20, 0] : [0, -20, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Scrollytelling accent lines */}
          {[...Array(3)].map((_, j) => (
            <motion.div
              key={`line-${i}-${j}`}
              className="absolute h-[1px]"
              style={{
                width: `${20 + j * 10}vw`,
                left: i % 2 === 0 ? `${10 + j * 5}vw` : "auto",
                right: i % 2 === 1 ? `${10 + j * 5}vw` : "auto",
                top: `${30 + j * 15 + (i * 10) % 30}vh`,
                background: `linear-gradient(${i % 2 === 0 ? "90deg" : "-90deg"}, transparent, ${sectionColors[i % sectionColors.length].accent}, transparent)`,
                transform: `rotate(${(j - 1) * 10}deg)`,
              }}
              animate={{
                scaleX: [0.7, 1.3, 0.7],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + j * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: j * 0.5,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced DynamicBackground with scroll interactions
export const DynamicBackground = () => {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const patternRotation = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const patternScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <motion.div
      className="fixed inset-0 -z-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ opacity: backgroundOpacity }}
      transition={{ duration: 1 }}
    >
      {/* Scroll-responsive Background Pattern */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotate: patternRotation,
          scale: patternScale,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: "60px",
              height: "60px",
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 25}%`,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(2px)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, i % 2 ? 1.2 : 0.8, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Parallax Floating Lines */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => {
          const lineY = useTransform(
            scrollYProgress,
            [0, 1],
            [0, -100 * (i % 3 + 1)]
          );

          return (
            <motion.div
              key={i}
              className="absolute h-[2px] w-[200px]"
              style={{
                left: `${i * 10}%`,
                top: `${50 + (i % 2) * 10}%`,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transform: `rotate(${i * 36}deg)`,
                y: lineY,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1, 1.5, 1],
                x: [-100, 100, -100],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          );
        })}
      </div>

      {/* Interactive Wave Effect with scroll influence */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.02) 100%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

// A completely refactored parallax particle field without Hook issues
export const ParallaxParticleField = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Define particle type to avoid errors
  type Particle = {
    id: number;
    size: number;
    x: number;
    y: number;
    parallaxFactor: number;
    color: string;
    duration: number;
    delay: number;
    transformGroup: number; // Use a group number instead of direct transform reference
  };
  
  // Create a fixed set of transforms outside of any loops or useMemo
  const transform1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const transform2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const transform3 = useTransform(scrollY, [0, 1000], [0, -300]);
  const transform4 = useTransform(scrollY, [0, 1000], [0, -400]);
  const transform5 = useTransform(scrollY, [0, 1000], [0, -500]);
  
  // Store transforms in an array for easy reference
  const transforms = [transform1, transform2, transform3, transform4, transform5];
  
  // Pre-generate particles with deterministic properties
  const particles = useMemo<Particle[]>(() => {
    const particleCount = 30;
    const colorSchemes = [
      "rgba(59, 130, 246, 0.2)", // Blue
      "rgba(139, 92, 246, 0.2)", // Purple
      "rgba(16, 185, 129, 0.2)", // Green
      "rgba(245, 158, 11, 0.2)", // Amber
      "rgba(147, 197, 253, 0.15)", // Light Blue
      "rgba(167, 139, 250, 0.15)", // Light Purple
      "rgba(110, 231, 183, 0.15)", // Light Green
      "rgba(252, 211, 77, 0.15)" // Light Amber
    ];
    
    return Array.from({ length: particleCount }).map((_, i) => {
      // Use index-based "randomness" for deterministic values
      const seedX = (i * 13) % 100; 
      const seedY = (i * 17) % 100;
      const seedSize = (i % 5) + 2;
      const parallaxFactor = (0.5 + (i * 7) % 20 / 10) * -1; // Negative for correct parallax direction
      const colorIndex = i % colorSchemes.length;
      
      // Choose a transform group (0-4) based on parallax factor
      const factor = Math.abs(parallaxFactor);
      let transformGroup = 0;
      if (factor <= 0.3) transformGroup = 0;
      else if (factor <= 0.6) transformGroup = 1;
      else if (factor <= 0.9) transformGroup = 2;
      else if (factor <= 1.2) transformGroup = 3;
      else transformGroup = 4;
      
      return {
        id: i,
        size: seedSize,
        x: seedX,
        y: seedY,
        parallaxFactor,
        color: colorSchemes[colorIndex],
        duration: 3 + (i % 3),
        delay: (i * 0.1) % 2,
        transformGroup
      };
    });
  }, []);
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            boxShadow: `0 0 8px ${particle.color}`,
            y: transforms[particle.transformGroup] // Use the pre-selected transform
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

// Scroll-triggered fade-in sections for storytelling
export const ScrollFadeSection = ({
  children,
  className = "",
  startFade = 0.2,
  endFade = 0.8,
}: {
  children: React.ReactNode;
  className?: string;
  startFade?: number;
  endFade?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [startFade, (startFade + endFade) / 2, endFade],
    [0, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [startFade, (startFade + endFade) / 2, endFade],
    [50, 0, -50]
  );

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        opacity,
        y,
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger-reveal elements based on scroll position
export const StaggerScrollReveal = ({
  children,
  className = "",
  childClassName = "",
  delayBetween = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  delayBetween?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Pre-create transforms for each child, up to a reasonable maximum (e.g., 20)
  const MAX_CHILDREN = 20;
  // Create transforms outside useMemo to avoid hooks in loops
  const delayTransforms = Array.from({ length: MAX_CHILDREN }).map((_, i) => {
    const delayValue = useTransform(
      scrollYProgress,
      [0, 1],
      [0, 1 - i * delayBetween]
    );
    
    // Also pre-create the Y transform for each delay value
    const yTransform = useTransform(delayValue, [0, 1], [50, 0]);
    
    return { opacity: delayValue, y: yTransform };
  });

  const childCount = React.Children.count(children);

  return (
    <motion.div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => {
        // Use pre-created transforms, but only up to MAX_CHILDREN
        const transforms = i < MAX_CHILDREN ? delayTransforms[i] : delayTransforms[0];

        return (
          <motion.div
            className={childClassName}
            style={{
              opacity: transforms.opacity,
              y: transforms.y,
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
