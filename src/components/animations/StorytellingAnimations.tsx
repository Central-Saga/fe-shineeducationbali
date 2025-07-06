"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimation, useInView } from "framer-motion";

/**
 * StoryCanvas - A full-screen canvas that creates a subtle, story-driven animation layer
 * that responds to scroll position with parallax effects and depth
 */
export const StoryCanvas = ({ 
  sections = 3,
  theme = "education", // education, journey, growth
  className = ""
}: {
  sections?: number;
  theme?: "education" | "journey" | "growth";
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll();
  
  // Theme-based colors
  const themeColors = useMemo(() => {
    switch(theme) {
      case "education":
        return {
          primary: "rgba(59, 130, 246, 0.08)",
          secondary: "rgba(139, 92, 246, 0.08)",
          accent: "rgba(249, 115, 22, 0.08)",
          highlight: "rgba(16, 185, 129, 0.08)"
        };
      case "journey":
        return {
          primary: "rgba(249, 115, 22, 0.08)",
          secondary: "rgba(236, 72, 153, 0.08)",
          accent: "rgba(139, 92, 246, 0.08)",
          highlight: "rgba(234, 179, 8, 0.08)"
        };
      case "growth":
        return {
          primary: "rgba(16, 185, 129, 0.08)",
          secondary: "rgba(234, 179, 8, 0.08)",
          accent: "rgba(59, 130, 246, 0.08)",
          highlight: "rgba(236, 72, 153, 0.08)"
        };
      default:
        return {
          primary: "rgba(59, 130, 246, 0.08)",
          secondary: "rgba(139, 92, 246, 0.08)",
          accent: "rgba(249, 115, 22, 0.08)",
          highlight: "rgba(16, 185, 129, 0.08)"
        };
    }
  }, [theme]);
  
  // Create section-specific transforms outside of useMemo to avoid hooks in loops
  const sectionProgress = Array.from({ length: sections }).map((_, i) => {
    const start = i / sections;
    const end = (i + 1) / sections;
    return useTransform(
      scrollYProgress,
      [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)],
      [0, 1, 1, 0]
    );
  });
  
  // Pre-compute transforms to avoid hooks in render
  const transforms = {
    translateY1: useTransform(scrollY, [0, 2000], [0, -200]),
    translateY2: useTransform(scrollY, [0, 2000], [0, -400]),
    translateY3: useTransform(scrollY, [0, 2000], [0, -600]),
    scale1: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
    opacity1: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]),
    rotation1: useTransform(scrollYProgress, [0, 1], [0, 10]),
    rotation2: useTransform(scrollYProgress, [0, 1], [0, -15]),
  };
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Flowing background with theme colors */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: `radial-gradient(circle at 20% 20%, ${themeColors.primary} 0%, transparent 60%), 
                      radial-gradient(circle at 80% 50%, ${themeColors.secondary} 0%, transparent 60%), 
                      radial-gradient(circle at 40% 80%, ${themeColors.accent} 0%, transparent 60%)`,
          y: transforms.translateY1,
          scale: transforms.scale1
        }}
      />
      
      {/* Section-specific animated elements */}
      {sectionProgress.map((opacity, i) => (
        <motion.div 
          key={i}
          className="absolute inset-0"
          style={{ opacity }}
        >
          {/* Floating decorative elements based on section */}
          <motion.div
            className="absolute w-[40vw] h-[40vw]"
            style={{
              left: i % 2 === 0 ? '5vw' : 'auto',
              right: i % 2 === 1 ? '5vw' : 'auto',
              top: `${20 + (i * 20) % 60}vh`,
              background: `radial-gradient(circle at center, 
                ${Object.values(themeColors)[i % 4]} 0%, 
                transparent 70%)`,
              rotate: i % 2 === 0 ? transforms.rotation1 : transforms.rotation2,
              y: i % 2 === 0 ? transforms.translateY2 : transforms.translateY3
            }}
          />
          
          {/* Geometric pattern specific to section */}
          <motion.div
            className="absolute w-full h-full opacity-20"
            style={{
              backgroundImage: `url("/backgrounds/story-pattern-${(i % 3) + 1}.svg")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              y: transforms.translateY1
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

/**
 * ParallaxStorySection - Creates a section with parallax elements that tell a story
 * as the user scrolls through it
 */
export const ParallaxStorySection = ({
  children,
  className = "",
  elements = [],
  bgColor = "transparent"
}: {
  children: React.ReactNode;
  className?: string;
  elements?: Array<{
    type: 'image' | 'shape' | 'text';
    content: string;
    position: [number, number]; // [x%, y%]
    parallaxFactor: number;
    size?: [number, number]; // [width, height]
    opacity?: number;
    className?: string;
  }>;
  bgColor?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Create individual transforms for each element outside the useMemo to avoid hooks in loops
  const parallaxTransforms = elements.map((element) => ({
    y: useTransform(
      scrollYProgress, 
      [0, 1], 
      [50 * element.parallaxFactor, -50 * element.parallaxFactor]
    ),
    opacity: useTransform(
      scrollYProgress,
      [0, 0.2, 0.8, 1],
      [0, element.opacity || 1, element.opacity || 1, 0]
    )
  }));
  
  const contentTransform = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [20, 0, 0, -20]
  );

  return (
    <motion.div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Parallax elements */}
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none ${element.className || ''}`}
          style={{
            left: `${element.position[0]}%`,
            top: `${element.position[1]}%`,
            width: element.size ? `${element.size[0]}px` : 'auto',
            height: element.size ? `${element.size[1]}px` : 'auto',
            y: parallaxTransforms[i].y,
            opacity: parallaxTransforms[i].opacity
          }}
        >
          {element.type === 'image' && (
            <img 
              src={element.content} 
              alt="Parallax element" 
              className="w-full h-full object-contain"
            />
          )}
          {element.type === 'shape' && (
            <div
              className="w-full h-full"
              style={{ 
                background: element.content,
                borderRadius: '50%',
                filter: 'blur(40px)'
              }}
            />
          )}
          {element.type === 'text' && (
            <div className="text-4xl font-bold opacity-10 whitespace-nowrap">
              {element.content}
            </div>
          )}
        </motion.div>
      ))}
      
      {/* Main content with subtle parallax */}
      <motion.div 
        className="relative z-10"
        style={{ y: contentTransform }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/**
 * ScrollSequence - Animates children in a sequence as user scrolls through the container
 */
export const ScrollSequence = ({
  children,
  className = "",
  childClassName = "",
  staggerAmount = 0.15,
  fadeRange = 0.2
}: {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  staggerAmount?: number;
  fadeRange?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Pre-compute transforms for each child outside of useMemo to avoid hooks in loops
  const childrenArray = React.Children.toArray(children);
  const childTransforms = childrenArray.map((_, i) => {
    const startShow = i * staggerAmount;
    const fullyVisible = startShow + (fadeRange / 2);
    const startHide = startShow + fadeRange;
    
    return {
      opacity: useTransform(
        scrollYProgress,
        [startShow, fullyVisible, startHide],
        [0, 1, 0]
      ),
      y: useTransform(
        scrollYProgress,
        [startShow, fullyVisible, startHide],
        [50, 0, -50]
      )
    };
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {React.Children.map(children, (child, i) => (
        <motion.div
          className={`${childClassName}`}
          style={{
            opacity: childTransforms[i].opacity,
            y: childTransforms[i].y
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

/**
 * StoryRevealSection - Creates a section that reveals content as user scrolls,
 * with animated storytelling elements
 */
export const StoryRevealSection = ({
  children,
  className = "",
  sectionTitle = "",
  sectionNumber = 1,
  theme = "blue"
}: {
  children: React.ReactNode;
  className?: string;
  sectionTitle?: string;
  sectionNumber?: number;
  theme?: "blue" | "purple" | "orange" | "green";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  // Theme colors
  const themeColors = {
    blue: "rgba(59, 130, 246, 0.7)",
    purple: "rgba(139, 92, 246, 0.7)",
    orange: "rgba(249, 115, 22, 0.7)",
    green: "rgba(16, 185, 129, 0.7)"
  };
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Decorative section marker */}
      <div className="absolute left-0 top-0 h-full w-1" style={{ 
        background: themeColors[theme],
        boxShadow: `0 0 20px ${themeColors[theme]}`
      }} />
      
      {/* Section number indicator */}
      <div 
        className="absolute left-4 top-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
        style={{ background: themeColors[theme] }}
      >
        {sectionNumber}
      </div>
      
      {/* Section title with reveal animation */}
      {sectionTitle && (
        <motion.div
          className="text-2xl font-bold mb-8 ml-16"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
          }}
        >
          {sectionTitle}
        </motion.div>
      )}
      
      {/* Content with staggered reveal */}
      <motion.div
        className="ml-16"
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        {children}
      </motion.div>
      
      {/* Decorative side elements */}
      <motion.div
        className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-40 rounded-full opacity-10"
        style={{ background: themeColors[theme] }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

/**
 * ParallaxScrollScene - Creates an immersive, depth-filled scene with multiple
 * parallax layers that react to scroll and mouse movement
 */
export const ParallaxScrollScene = ({
  children,
  className = "",
  depth = 3,
  mouseInfluence = 0.03
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  mouseInfluence?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Pre-compute transforms outside of the loop to avoid hooks inside loops
  const parallaxTransforms = Array.from({ length: depth }).map((_, i) => {
    const factor = (i + 1) / depth;
    return {
      x: useTransform(scrollYProgress, [0, 1], [0, -30 * factor]),
      scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1 + 0.05 * factor, 1])
    };
  });
  
  // Compute mouse-influenced values separately
  const layers = useMemo(() => {
    return Array.from({ length: depth }).map((_, i) => {
      const factor = (i + 1) / depth;
      return {
        x: parallaxTransforms[i].x,
        mouseX: mousePosition.x * mouseInfluence * 100 * factor,
        mouseY: mousePosition.y * mouseInfluence * 100 * factor,
        scale: parallaxTransforms[i].scale
      };
    });
  }, [depth, mouseInfluence, mousePosition.x, mousePosition.y, parallaxTransforms]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Main content in front */}
      <motion.div className="relative z-10">
        {children}
      </motion.div>
      
      {/* Parallax layers in background */}
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: -(i + 1),
            x: layer.x,
            y: 0,
            translateX: layer.mouseX,
            translateY: layer.mouseY,
            scale: layer.scale,
          }}
        >
          {/* Layer content - circles with varying opacity */}
          <div
            className="absolute rounded-full opacity-5"
            style={{
              width: `${30 + i * 20}%`,
              height: `${30 + i * 20}%`,
              left: `${(i * 15) % 70}%`,
              top: `${(i * 20) % 60}%`,
              background: `radial-gradient(circle at center, 
                rgba(${100 + i * 50}, ${100 + i * 20}, ${200 - i * 30}, 0.2) 0%, 
                transparent 70%)`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

/**
 * ZoomParallaxSection - Creates a section with a zoom effect as you scroll through
 */
export const ZoomParallaxSection = ({
  children,
  bgImage,
  className = "",
  startScale = 1.2,
  endScale = 1
}: {
  children: React.ReactNode;
  bgImage?: string;
  className?: string;
  startScale?: number;
  endScale?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [startScale, endScale]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background image with zoom effect */}
      {bgImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            scale,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2
          }}
        />
      )}
      
      {/* Content with fade effect */}
      <motion.div
        className="relative z-10"
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
};
