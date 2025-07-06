"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Wrapper to ensure component only renders on client-side
export const ClientOnly = ({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <>{fallback}</>;
  return <>{children}</>;
};

// Client-only floating elements with random properties
export const RandomFloatingElements = ({
  count = 6,
  className = "",
}: {
  count?: number;
  className?: string;
}) => {
  const elements = useRef(
    Array.from({ length: count }).map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.02 + 0.01,
      xMovement: Math.random() * 20 - 10,
      yMovement: Math.random() * 20 - 10,
      rotation: Math.random() * 30 - 15,
      scale: Math.random() * 0.1 + 0.95,
      duration: Math.random() * 15 + 20
    }))
  ).current;

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${element.width}rem`,
            height: `${element.height}rem`,
            left: `${element.left}%`,
            top: `${element.top}%`,
            background: `rgba(255, 255, 255, ${element.opacity})`,
            backdropFilter: "blur(1px)",
          }}
          animate={{
            x: [0, element.xMovement],
            y: [0, element.yMovement],
            rotate: [0, element.rotation],
            scale: [1, element.scale],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Client-only animated lines with random properties
export const RandomAnimatedLines = ({
  count = 4,
  className = "",
}: {
  count?: number;
  className?: string;
}) => {
  const lines = useRef(
    Array.from({ length: count }).map((_, i) => ({
      width: Math.random() * 200 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      rotation: Math.random() * 180,
      duration: Math.random() * 15 + 25,
      delay: i * 3
    }))
  ).current;

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            width: `${line.width}px`,
            left: `${line.left}%`,
            top: `${line.top}%`,
            background: `linear-gradient(90deg, transparent, rgba(200, 200, 200, 0.1), transparent)`,
            transform: `rotate(${line.rotation}deg)`,
          }}
          animate={{
            opacity: [0, 0.2, 0],
            scale: [0.7, 1, 0.7],
            x: [-30, 30, -30],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: line.delay,
          }}
        />
      ))}
    </div>
  );
};

// Client-only particles with random properties
export const RandomParticles = ({
  count = 20,
  className = "",
}: {
  count?: number;
  className?: string;
}) => {
  const particles = useRef(
    Array.from({ length: count }).map((_, i) => {
      // Use more deterministic "pseudo-random" values based on index
      const isBlue = i % 4 < 2; // Alternate between blue and amber tones
      const isPurple = i % 8 >= 4; // Some particles are purple-ish
      
      // Base colors with subtle variations
      const baseColor = isBlue 
        ? isPurple 
          ? [147, 197, 253] // Light blue
          : [96, 165, 250]  // Blue
        : isPurple
          ? [167, 139, 250] // Light purple 
          : [251, 146, 60]; // Amber
      
      // Create particle config with index-based positioning
      return {
        size: 0.6 + (i % 5) * 0.3, // 0.6 - 1.8rem
        left: 5 + (i * 13) % 80, // Spread across screen width
        top: 5 + (i * 17) % 80, // Spread across screen height
        duration: 4 + (i % 5) * 0.8, // 4-8 seconds
        delay: (i * 0.2) % 2, // Staggered animation
        color: `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${0.05 + (i % 4) * 0.02})`,
        glow: `0 0 ${8 + (i % 4) * 2}px rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.1)`,
        parallaxFactor: 0.3 + (i % 5) * 0.1, // Different parallax speeds
      };
    })
  ).current;

  // Track scroll position for parallax effect
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            transform: `translateY(${scrollY * particle.parallaxFactor}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <motion.div
            animate={{
              y: [-10, 10],
              x: [-5, 5],
              opacity: [0.5, 1, 0.5],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
            className="w-full h-full rounded-full blur-[1px]"
            style={{
              backgroundColor: particle.color,
              boxShadow: particle.glow,
            }}
          />
        </div>
      ))}
    </div>
  );
};
