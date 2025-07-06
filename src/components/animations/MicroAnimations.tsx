"use client";

import React, { ReactNode, useEffect, useState, useRef, useMemo } from "react";
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// Subtle Gradient Blob
export const GradientBlob = ({ 
  className = "",
  colors = ["#f9fafb", "#eff6ff", "#f5f3ff"],
  size = "20rem",
  opacity = 0.3,
  duration = 15,
  delay = 0
}: {
  className?: string;
  colors?: string[];
  size?: string;
  opacity?: number;
  duration?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${colors.join(", ")})`,
        opacity: opacity,
      }}
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 10, 0],
        y: [0, -10, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

// Floating Element
export const FloatingElement = ({
  children,
  className = "",
  intensity = 1,
  duration = 4,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  duration?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-3 * intensity, 3 * intensity],
        x: [-1 * intensity, 1 * intensity],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Subtle Pulse Animation
export const PulseElement = ({
  children,
  className = "",
  intensity = 0.05,
  duration = 3,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  duration?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1 + intensity, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Clean Dot Grid 
export const DotGrid = ({ 
  columns = 10, 
  rows = 10, 
  gap = 30, 
  dotSize = 1, 
  className = "",
  dotClassName = "",
  color = "rgba(200, 200, 200, 0.2)"
}: {
  columns?: number;
  rows?: number;
  gap?: number;
  dotSize?: number;
  className?: string;
  dotClassName?: string;
  color?: string;
}) => {
  // Use memo to optimize large grids
  const dots = useMemo(() => {
    const dotCount = columns * rows;
    // Limit dot count for performance
    const maxDots = 200;
    const step = dotCount > maxDots ? Math.ceil(dotCount / maxDots) : 1;
    
    return Array.from({ length: Math.min(dotCount, maxDots) }).map((_, i) => {
      // Optimized animations with deterministic values
      const actualIndex = i * step;
      const row = Math.floor(actualIndex / columns);
      const col = actualIndex % columns;
      
      // Create variation based on position
      const delay = (row * 0.1 + col * 0.05) % 1;
      const duration = 3 + ((row + col) % 3);
      const maxOpacity = 0.3 + ((row + col) % 5) * 0.05;
      
      return (
        <motion.div
          key={i}
          className={`rounded-full ${dotClassName}`}
          style={{ 
            width: `${dotSize}px`, 
            height: `${dotSize}px`, 
            backgroundColor: color,
            gridRow: row + 1,
            gridColumn: col + 1,
          }}
          initial={{ opacity: 0.2 }}
          animate={{
            opacity: [0.2, maxOpacity, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      );
    });
  }, [columns, rows, dotSize, color, dotClassName]);
  
  return (
    <div 
      className={`absolute pointer-events-none ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {dots}
    </div>
  );
};

// Fade-in Animation
export const FadeIn = ({ 
  children, 
  className = "", 
  direction = "up", 
  duration = 0.6, 
  delay = 0,
  distance = 20
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  distance?: number;
}) => {
  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...directionMap[direction as keyof typeof directionMap] 
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

// Subtle Parallax on Scroll
export const ParallaxSection = ({ 
  children,
  className = "", 
  speed = 0.2, 
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) => {
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({ y: scrollY * speed });
  }, [scrollY, controls, speed]);

  return (
    <motion.div className={className} animate={controls}>
      {children}
    </motion.div>
  );
};

// Delicate Line Animation
export const AnimatedLine = ({ 
  className = "", 
  color = "rgba(200, 200, 200, 0.3)", 
  length = 100,
  thickness = 1,
  angle = 0,
  duration = 4,
}: {
  className?: string;
  color?: string;
  length?: number;
  thickness?: number;
  angle?: number;
  duration?: number;
}) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        style={{
          height: `${thickness}px`,
          width: `${length}px`,
          backgroundColor: color,
          transformOrigin: "left center",
          transform: `rotate(${angle}deg)`,
        }}
        animate={{
          scaleX: [0, 1, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Elegant Typing Animation
export const TypingAnimation = ({ 
  text, 
  className = "", 
  speed = 50, 
  delay = 0 
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        startTyping();
      }, delay * 1000);
      
      return () => clearTimeout(delayTimer);
    } else {
      startTyping();
    }
    
    function startTyping() {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, delay, speed, text]);

  return (
    <div className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </div>
  );
};

// Clean Hover Card Effect
export const CleanHoverCard = ({ 
  children, 
  className = "",
  hoverScale = 1.02,
  hoverLift = -4
}: {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverLift?: number;
}) => {
  return (
    <motion.div
      className={`${className}`}
      whileHover={{ 
        scale: hoverScale, 
        y: hoverLift,
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth Scroll Link
export const SmoothScrollLink = ({ 
  children, 
  to, 
  className = "",
  offset = 0,
  duration = 0.8
}: {
  children: ReactNode;
  to: string;
  className?: string;
  offset?: number;
  duration?: number;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const target = document.getElementById(to);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top;
      const startPosition = window.pageYOffset;
      const distance = targetPosition + startPosition - offset;
      
      window.scrollTo({
        top: distance,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.a
      href={`#${to}`}
      className={className}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
};

// Spotlight Effect
export const Spotlight = ({
  className = "",
  size = 300,
  opacity = 0.1
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isActive) setIsActive(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className={`fixed pointer-events-none rounded-full bg-white mix-blend-soft-light ${className}`}
          style={{
            width: size,
            height: size,
            opacity: opacity,
            top: mousePosition.y - size/2,
            left: mousePosition.x - size/2,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
};

// Scroll-triggered Reveal Animation
export const ScrollReveal = ({
  children,
  className = "",
  threshold = 0.1,
  transition = { duration: 0.8, ease: "easeOut" },
  variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  transition?: any;
  variants?: any;
}) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const isInView = useRef(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView.current) {
          isInView.current = true;
          controls.start("visible");
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref, threshold]);

  return (
    <motion.div
      ref={(el) => setRef(el)}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

// Staggered Scroll Reveal (for lists, grids, etc.)
export const StaggeredReveal = ({
  children,
  className = "",
  childClassName = "",
  staggerDelay = 0.1,
  threshold = 0.1,
  transition = { duration: 0.5 },
  variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * staggerDelay,
        ...transition 
      } 
    })
  }
}: {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  staggerDelay?: number;
  threshold?: number;
  transition?: any;
  variants?: any;
}) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref, threshold]);
  
  return (
    <motion.div
      ref={(el) => setRef(el)}
      className={className}
      initial="hidden"
      animate={controls}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div 
          className={childClassName}
          custom={i}
          variants={variants}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Parallax Image that moves as you scroll
export const ParallaxImage = ({
  src,
  alt = "",
  className = "",
  speed = 0.3,
  imgClassName = ""
}: {
  src: string;
  alt?: string;
  className?: string;
  speed?: number;
  imgClassName?: string;
}) => {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!ref) return;
    
    const setValues = () => {
      const rect = ref.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
      setClientHeight(window.innerHeight);
    };
    
    setValues();
    document.addEventListener("resize", setValues);
    document.addEventListener("scroll", setValues);
    
    return () => {
      document.removeEventListener("resize", setValues);
      document.removeEventListener("scroll", setValues);
    };
  }, [ref]);
  
  const transformValue = 
    elementTop === 0 || clientHeight === 0
      ? 0
      : (window.scrollY - elementTop) * speed;
  
  return (
    <div
      ref={(el) => setRef(el)}
      className={`overflow-hidden ${className}`}
    >
      <div
        style={{ 
          transform: `translateY(${transformValue}px)`,
          transition: "transform 0.1s cubic-bezier(0.17, 0.67, 0.83, 0.67)"
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover ${imgClassName}`} 
        />
      </div>
    </div>
  );
};

// Text animation that reveals character by character on scroll
export const ScrollingTextReveal = ({
  text,
  className = "",
  threshold = 0.5,
  duration = 1,
  delay = 0,
  staggerChildren = 0.02
}: {
  text: string;
  className?: string;
  threshold?: number;
  duration?: number;
  delay?: number;
  staggerChildren?: number;
}) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref, threshold]);
  
  return (
    <motion.div
      ref={(el) => setRef(el)}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay
          }
        }
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={childVariants}
          transition={{ duration }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Magnetic Button - creates a smooth magnetic effect on hover (igloo.inc style)
export const MagneticButton = ({ 
  children,
  className = "",
  strength = 30
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };
  
  const magneticX = isHovered ? position.x / strength : 0;
  const magneticY = isHovered ? position.y / strength : 0;

  return (
    <motion.div
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        x: magneticX, 
        y: magneticY,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 350, 
        damping: 15,
        mass: 0.1
      }}
    >
      {children}
    </motion.div>
  );
};

// Text Glitch Effect - subtle glitch effect for text (igloo.inc style)
export const GlitchText = ({ 
  text,
  className = "",
  intensity = "light", // "light", "medium", "heavy"
  speed = "slow", // "slow", "medium", "fast"
  color = "#000"
}: {
  text: string;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
  speed?: "slow" | "medium" | "fast";
  color?: string;
}) => {
  const intensityValues = {
    light: 1,
    medium: 2,
    heavy: 3
  };

  const speedValues = {
    slow: 3,
    medium: 2,
    fast: 1
  };

  const [glitching, setGlitching] = useState(false);
  
  useEffect(() => {
    const intervalTime = speedValues[speed] * 4000;
    const glitchDuration = speedValues[speed] * 200;
    
    const intervalId = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), glitchDuration);
    }, intervalTime);
    
    return () => clearInterval(intervalId);
  }, [speed]);
  
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      
      {glitching && (
        <>
          <motion.span 
            className="absolute top-0 left-0 z-0 text-[#ff3366] opacity-70"
            style={{ textShadow: `1px 0 ${intensityValues[intensity]}px rgba(255,51,102,0.5)` }}
            animate={{ 
              x: [0, -intensityValues[intensity], intensityValues[intensity] * 0.5, 0],
              opacity: [0.7, 0.4, 0.7, 0.4]
            }}
            transition={{ duration: speedValues[speed] * 0.1, ease: "easeInOut" }}
          >
            {text}
          </motion.span>
          
          <motion.span 
            className="absolute top-0 left-0 z-0 text-[#3366ff] opacity-70"
            style={{ textShadow: `1px 0 ${intensityValues[intensity]}px rgba(51,102,255,0.5)` }}
            animate={{ 
              x: [0, intensityValues[intensity], -intensityValues[intensity] * 0.5, 0],
              opacity: [0.7, 0.3, 0.6, 0.3]
            }}
            transition={{ duration: speedValues[speed] * 0.1, ease: "easeInOut" }}
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  );
};

// Marquee Text - smooth infinite scrolling text (igloo.inc style)
export const MarqueeText = ({ 
  children,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  className = ""
}: { 
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const marqueeVariants = {
    animate: {
      x: direction === "left" ? [0, -1000] : [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 1000 / speed,
          ease: "linear"
        }
      }
    },
    paused: {
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div 
      className={`overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHovering(true)}
      onMouseLeave={() => pauseOnHover && setIsHovering(false)}
    >
      <motion.div
        className="inline-block"
        variants={marqueeVariants}
        animate={pauseOnHover && isHovering ? "paused" : "animate"}
      >
        {children}
      </motion.div>
      <motion.div
        className="inline-block"
        variants={marqueeVariants}
        animate={pauseOnHover && isHovering ? "paused" : "animate"}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Liquid Button - soft morphing button (igloo.inc style)
export const LiquidButton = ({ 
  children,
  className = "",
  color = "#3498db",
  hoverColor = "#2980b9",
  size = "md"
}: { 
  children: ReactNode;
  className?: string;
  color?: string;
  hoverColor?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2",
    lg: "px-7 py-3 text-lg"
  };
  
  return (
    <motion.button
      className={`relative rounded-full overflow-hidden ${sizes[size]} ${className}`}
      style={{ backgroundColor: color }}
      whileHover={{
        backgroundColor: hoverColor,
        scale: 1.03
      }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 15
      }}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ 
          scale: 1.8, 
          opacity: 0.2,
          transition: { duration: 1.5 } 
        }}
        style={{
          background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)`,
        }}
      />
      {children}
    </motion.button>
  );
};

// Glass Card - with subtle hover effects (igloo.inc style)
export const GlassCard = ({ 
  children,
  className = "",
  depth = "medium", // "light", "medium", "heavy"
  color = "blue" // "blue", "purple", "amber", "emerald"
}: { 
  children: ReactNode;
  className?: string;
  depth?: "light" | "medium" | "heavy";
  color?: "blue" | "purple" | "amber" | "emerald";
}) => {
  const depthValues = {
    light: {
      shadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
      hover: "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.05)"
    },
    medium: {
      shadow: "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.05)",
      hover: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
    },
    heavy: {
      shadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      hover: "0 25px 50px -12px rgba(0,0,0,0.25)"
    }
  };
  
  const colorValues = {
    blue: {
      bg: "from-blue-50/30 to-blue-100/20",
      border: "border-blue-100/30"
    },
    purple: {
      bg: "from-purple-50/30 to-purple-100/20",
      border: "border-purple-100/30"
    },
    amber: {
      bg: "from-amber-50/30 to-amber-100/20",
      border: "border-amber-100/30"
    },
    emerald: {
      bg: "from-emerald-50/30 to-emerald-100/20",
      border: "border-emerald-100/30"
    }
  };

  return (
    <motion.div 
      className={`rounded-2xl border p-6 backdrop-blur-sm bg-gradient-to-br
        ${colorValues[color].bg} ${colorValues[color].border} ${className}`}
      style={{ 
        boxShadow: depthValues[depth].shadow,
      }}
      whileHover={{ 
        boxShadow: depthValues[depth].hover,
        y: -5,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
};

// 3D Tilt Card - smooth tilt effect on hover (igloo.inc style)
export const TiltCard = ({ 
  children,
  className = "",
  intensity = 10 // Rotation intensity in degrees
}: { 
  children: ReactNode;
  className?: string;
  intensity?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Convert mouse position to rotation angle
    // When mouse is at the edge, rotation will be at maximum intensity
    const rotateY = (mouseX / (rect.width / 2)) * intensity;
    const rotateX = -((mouseY / (rect.height / 2)) * intensity);
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        transformPerspective: 1000,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  );
};

// Deterministic Animated Glass Panel - prevents hydration errors
export const AnimatedGlassPanel = ({ 
  width,
  height,
  posX,
  posY,
  rotationRange = 10,
  rotationDuration = 20,
  delay = 0
}: {
  width: number;
  height: number;
  posX: string;
  posY: string;
  rotationRange?: number;
  rotationDuration?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-xl"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: posX,
        top: posY,
        background: "rgba(255, 255, 255, 0.01)",
        backdropFilter: "blur(1px)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.02)"
      }}
      animate={{
        rotate: [0, rotationRange, 0, -rotationRange, 0],
      }}
      transition={{
        duration: rotationDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

// Deterministic Grid of Glass Panels
export const AnimatedGlassPanelGrid = ({ 
  className = "",
  panelConfig = [
    // First row (top)
    { width: 36.5, height: 64.87, posX: "0%", posY: "0%", delay: 0, rotationRange: 10 },
    { width: 75.03, height: 40.49, posX: "25%", posY: "0%", delay: 2, rotationRange: 8 },
    { width: 68.32, height: 50.72, posX: "50%", posY: "0%", delay: 1, rotationRange: 12 },
    { width: 53.13, height: 57.69, posX: "75%", posY: "0%", delay: 3, rotationRange: 9 },
    // Second row (middle)
    { width: 32.83, height: 77.26, posX: "0%", posY: "50%", delay: 2.5, rotationRange: 11 },
    { width: 49.50, height: 60.51, posX: "25%", posY: "50%", delay: 1.5, rotationRange: 7 },
    { width: 35.48, height: 67.91, posX: "50%", posY: "50%", delay: 0.5, rotationRange: 10 },
    { width: 65.56, height: 48.25, posX: "75%", posY: "50%", delay: 2.2, rotationRange: 8 },
  ]
}: {
  className?: string;
  panelConfig?: Array<{
    width: number;
    height: number;
    posX: string;
    posY: string;
    delay?: number;
    rotationRange?: number;
    rotationDuration?: number;
  }>;
}) => {
  return (
    <div className={`relative ${className}`}>
      {panelConfig.map((panel, index) => (
        <AnimatedGlassPanel
          key={`glass-panel-${index}`}
          width={panel.width}
          height={panel.height}
          posX={panel.posX}
          posY={panel.posY}
          delay={panel.delay || 0}
          rotationRange={panel.rotationRange || 10}
          rotationDuration={panel.rotationDuration || 20}
        />
      ))}
    </div>
  );
};

// Modern Animated Blob with SVG morphing - Client-side only to avoid hydration errors
export const AnimatedBlob = ({
  className = "",
  color = "rgba(96, 165, 250, 0.2)",
  size = "15rem",
  duration = 20,
  delay = 0,
  pulseIntensity = 0.05,
  pulseSpeed = 3,
  animate = true,
  blobType = "smooth" // "smooth", "spiky", "wavy"
}: {
  className?: string;
  color?: string;
  size?: string;
  duration?: number;
  delay?: number;
  pulseIntensity?: number;
  pulseSpeed?: number;
  animate?: boolean;
  blobType?: "smooth" | "spiky" | "wavy";
}) => {
  // Use static predefined paths to prevent hydration errors
  // These are predefined blob paths that look good for each type
  const staticPaths = {
    smooth: [
      "M 50,92.5 C 66.5,92.5 86,87 95.5,75 C 105,63 105,43 95.5,25 C 86,7 66.5,4.5 50,4.5 C 33.5,4.5 14,7 4.5,25 C -5,43 -5,63 4.5,75 C 14,87 33.5,92.5 50,92.5 Z",
      "M 55,95 C 73,95 90,90 97,75 C 104,60 104,45 97,30 C 90,15 73,5 55,5 C 37,5 20,15 13,30 C 6,45 6,60 13,75 C 20,90 37,95 55,95 Z",
      "M 52.5,97.5 C 70,97.5 88.5,90 96,75 C 103.5,60 103.5,40 96,25 C 88.5,10 70,2.5 52.5,2.5 C 35,2.5 16.5,10 9,25 C 1.5,40 1.5,60 9,75 C 16.5,90 35,97.5 52.5,97.5 Z"
    ],
    spiky: [
      "M 50,95 C 65,95 75,85 85,80 C 95,75 105,70 95,55 C 85,40 95,25 85,15 C 75,5 65,5 50,5 C 35,5 25,5 15,15 C 5,25 15,40 5,55 C -5,70 5,75 15,80 C 25,85 35,95 50,95 Z",
      "M 50,95 C 68,95 78,85 88,75 C 98,65 108,55 98,45 C 88,35 98,25 88,15 C 78,5 68,5 50,5 C 32,5 22,5 12,15 C 2,25 12,35 2,45 C -8,55 2,65 12,75 C 22,85 32,95 50,95 Z",
      "M 50,95 C 62,95 72,90 82,80 C 92,70 102,60 92,50 C 82,40 92,30 82,20 C 72,10 62,5 50,5 C 38,5 28,10 18,20 C 8,30 18,40 8,50 C -2,60 8,70 18,80 C 28,90 38,95 50,95 Z"
    ],
    wavy: [
      "M 50,95 C 65,95 75,85 80,75 C 85,65 90,55 90,50 C 90,45 85,35 80,25 C 75,15 65,5 50,5 C 35,5 25,15 20,25 C 15,35 10,45 10,50 C 10,55 15,65 20,75 C 25,85 35,95 50,95 Z",
      "M 50,95 C 68,95 78,85 83,70 C 88,55 93,55 93,50 C 93,45 88,45 83,30 C 78,15 68,5 50,5 C 32,5 22,15 17,30 C 12,45 7,45 7,50 C 7,55 12,55 17,70 C 22,85 32,95 50,95 Z",
      "M 50,95 C 62,95 72,85 77,75 C 82,65 87,60 87,50 C 87,40 82,35 77,25 C 72,15 62,5 50,5 C 38,5 28,15 23,25 C 18,35 13,40 13,50 C 13,60 18,65 23,75 C 28,85 38,95 50,95 Z"
    ]
  };
  
  // Client-side only state
  const [isMounted, setIsMounted] = useState(false);
  
  // Only run on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Select path set based on blob type
  const paths = staticPaths[blobType];

  // Render nothing during SSR to avoid hydration errors
  if (!isMounted) {
    return (
      <div 
        className={`absolute ${className}`} 
        style={{ 
          width: size, 
          height: size 
        }}
      />
    );
  }
  
  // Enhanced client-side render with multiple layers for more visual interest
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
      }}
      animate={animate ? {
        scale: [1, 1 + pulseIntensity, 1],
      } : {}}
      transition={{
        duration: pulseSpeed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Main blob */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full absolute inset-0"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="glow"
            />
            <feBlend in="SourceGraphic" in2="glow" mode="normal" />
          </filter>
        </defs>
        <motion.path
          d={paths[0]}
          fill={color}
          filter="url(#glow)"
          animate={animate ? {
            d: [paths[0], paths[1], paths[2], paths[0]],
          } : {}}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
        />
      </svg>
      
      {/* Secondary blob with slight offset for depth */}
      <svg
        viewBox="0 0 100 100"
        className="w-[95%] h-[95%] absolute inset-[2.5%]"
        preserveAspectRatio="none"
      >
        <motion.path
          d={paths[1]}
          fill={color.replace(/[^,]+\)/, '0.5)')} // Make more transparent
          animate={animate ? {
            d: [paths[1], paths[2], paths[0], paths[1]],
          } : {}}
          transition={{
            duration: duration * 1.3, // Slightly different timing
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.5,
          }}
        />
      </svg>
    </motion.div>
  );
};

// Animated Icon Grid
export const AnimatedIconGrid = ({
  className = "",
  iconPaths = [
    "/icons/book.svg",
    "/icons/pencil.svg",
    "/icons/graduation.svg",
    "/icons/lightbulb.svg"
  ],
  columns = 2,
  gap = 4,
  iconSize = "3rem",
  baseDelay = 0.2,
}: {
  className?: string;
  iconPaths?: string[];
  columns?: number;
  gap?: number;
  iconSize?: string;
  baseDelay?: number;
}) => {
  return (
    <div 
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}rem`
      }}
    >
      {iconPaths.map((icon, i) => {
        // Calculate row and column for staggered animations
        const row = Math.floor(i / columns);
        const col = i % columns;
        const delay = (row + col) * baseDelay;
        
        return (
          <motion.div
            key={i}
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: "easeOut"
            }}
          >
            <motion.div
              className="relative"
              whileHover={{ 
                scale: 1.1,
                rotate: [-5, 5, 0],
                transition: { duration: 0.3 }
              }}
            >
              {/* Icon background glow */}
              <motion.div
                className="absolute inset-0 rounded-full blur-md"
                style={{
                  backgroundColor: `rgba(147, 197, 253, 0.2)`,
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
              
              {/* Icon */}
              <motion.img
                src={icon}
                alt="Education Icon"
                className="relative"
                style={{
                  width: iconSize,
                  height: iconSize,
                  opacity: 0.7,
                }}
                animate={{
                  y: [-2, 2, -2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Floating Glass Card with dynamic effects
export const FloatingGlassCard = ({
  children,
  className = "",
  glassOpacity = 0.08,
  borderOpacity = 0.1,
  shadowOpacity = 0.05,
  hoverStrength = 15,
  floatIntensity = 10,
}: {
  children: React.ReactNode;
  className?: string;
  glassOpacity?: number;
  borderOpacity?: number;
  shadowOpacity?: number;
  hoverStrength?: number;
  floatIntensity?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Calculate rotation based on mouse position
  const rotateX = useTransform(
    useMotionValue(mousePosition.y),
    [0, 200],
    [hoverStrength, -hoverStrength]
  );
  
  const rotateY = useTransform(
    useMotionValue(mousePosition.x),
    [0, 200],
    [-hoverStrength, hoverStrength]
  );
  
  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate relative mouse position within card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`rounded-2xl overflow-hidden relative ${className}`}
      style={{
        background: `rgba(255, 255, 255, ${glassOpacity})`,
        boxShadow: `0 8px 32px rgba(31, 38, 135, ${shadowOpacity})`,
        backdropFilter: 'blur(7px)',
        border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
        rotateX: isHovering ? rotateX : 0,
        rotateY: isHovering ? rotateY : 0,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      animate={{
        y: [0, -floatIntensity, 0]
      }}
      transition={{
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        },
        default: {
          duration: 0.2
        }
      }}
    >
      {/* Top highlight reflection */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent 70%)',
          rotateX: isHovering ? rotateX.get() * -1 : 0,
          rotateY: isHovering ? rotateY.get() * -1 : 0,
        }}
      />
      
      {/* Content with 3D transform */}
      <motion.div
        className="relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovering ? 'translateZ(20px)' : 'translateZ(0px)',
          transition: 'transform 0.2s ease-out'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
