"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence, Variants } from "framer-motion";

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
  transition = { duration: 0.5 }
}: {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  staggerDelay?: number;
  threshold?: number;
  transition?: any;
}) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * staggerDelay,
        ...transition 
      } 
    })
  };
  
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
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  
  // Use a ref to track whether the component is mounted
  const isMounted = useRef(false);
  
  useEffect(() => {
    // Set mounted to true
    isMounted.current = true;
    
    const handleScroll = () => {
      if (!ref.current || !isMounted.current) return;
      const { top } = ref.current.getBoundingClientRect();
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Only update when element is in view
      if (top < windowHeight && top > -ref.current.offsetHeight) {
        setOffset(scrollPos * speed);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => {
      isMounted.current = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return (
    <div
      ref={ref}
      className={`overflow-hidden relative ${className}`}
    >
      <div
        style={{
          transform: `translateY(${offset}px)`,
        }}
        className="transition-transform duration-100 ease-out"
      >
        <img 
          src={src} 
          alt={alt} 
          className={`${imgClassName}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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

// Scroll-triggered section with fade-in effect
export const ScrollSection = ({
  children,
  className = "",
  delay = 0,
  distance = 50,
  direction = "up"
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };
  
  const initialState = {
    opacity: 0,
    ...directionMap[direction]
  };
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
              duration: 0.8,
              delay
            }
          });
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, delay, direction, distance, ref]);
  
  return (
    <motion.div
      ref={(el) => setRef(el)}
      className={className}
      initial={initialState}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

// Floating image that moves in response to scroll position
export const FloatingScrollImage = ({
  src,
  alt = "",
  className = "",
  speed = 0.05,
  offsetMultiplier = 1,
  imgClassName = ""
}: {
  src: string;
  alt?: string;
  className?: string;
  speed?: number;
  offsetMultiplier?: number;
  imgClassName?: string;
}) => {
  const [scrollPos, setScrollPos] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const isMounted = useRef(true);
  
  useEffect(() => {
    const handleScroll = () => {
      if (isMounted.current) {
        setScrollPos(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      isMounted.current = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const yOffset = scrollPos * speed * offsetMultiplier;
  
  return (
    <div className={`relative ${className}`}>
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${imgClassName}`}
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translateY(${yOffset}px)`
        }}
        transition={{ type: 'tween', ease: 'linear' }}
      />
    </div>
  );
};

// Animated card with hover and scroll effects
export const AnimatedCard = ({
  children,
  className = "",
  threshold = 0.1,
  hoverScale = 1.05,
  hoverRotate = 2
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  hoverScale?: number;
  hoverRotate?: number;
}) => {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
          });
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [controls, ref, threshold]);
  
  // Avoid using Math.random() directly in the render method to prevent hydration errors
  const rotateDirection = useRef(Math.random() > 0.5 ? 1 : -1).current;
  
  return (
    <motion.div
      ref={(el) => setRef(el)}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      whileHover={{ 
        scale: hoverScale, 
        rotate: rotateDirection * hoverRotate
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  );
};
