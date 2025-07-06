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
  const [isMounted, setIsMounted] = useState(false);
  
  // Mount effect to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Theme-based colors with enhanced opacity and vibrancy
  const themeColors = useMemo(() => {
    switch(theme) {
      case "education":
        return {
          primary: "rgba(59, 130, 246, 0.1)",
          secondary: "rgba(139, 92, 246, 0.1)",
          accent: "rgba(249, 115, 22, 0.1)",
          highlight: "rgba(16, 185, 129, 0.1)"
        };
      case "journey":
        return {
          primary: "rgba(249, 115, 22, 0.1)",
          secondary: "rgba(236, 72, 153, 0.1)",
          accent: "rgba(139, 92, 246, 0.1)",
          highlight: "rgba(234, 179, 8, 0.1)"
        };
      case "growth":
        return {
          primary: "rgba(16, 185, 129, 0.1)",
          secondary: "rgba(234, 179, 8, 0.1)",
          accent: "rgba(59, 130, 246, 0.1)",
          highlight: "rgba(236, 72, 153, 0.1)"
        };
      default:
        return {
          primary: "rgba(59, 130, 246, 0.1)",
          secondary: "rgba(139, 92, 246, 0.1)",
          accent: "rgba(249, 115, 22, 0.1)",
          highlight: "rgba(16, 185, 129, 0.1)"
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
    // Add more transforms for additional visual effects
    translateX1: useTransform(scrollY, [0, 2000], [0, 100]),
    translateX2: useTransform(scrollY, [0, 2000], [0, -150]),
    blur1: useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]),
  };
  
  // Only render enhanced effects on client side
  if (!isMounted) {
    return (
      <div 
        ref={containerRef} 
        className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
      />
    );
  }
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Enhanced flowing background with theme colors and subtle animation */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ 
          background: `
            radial-gradient(circle at 20% 20%, ${themeColors.primary} 0%, transparent 70%), 
            radial-gradient(circle at 80% 50%, ${themeColors.secondary} 0%, transparent 70%), 
            radial-gradient(circle at 40% 80%, ${themeColors.accent} 0%, transparent 70%),
            radial-gradient(circle at 70% 10%, ${themeColors.highlight} 0%, transparent 60%)
          `,
          y: transforms.translateY1,
          scale: transforms.scale1,
          filter: "blur(60px)"
        }}
      />
      
      {/* Subtle noise texture overlay for richness */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')",
          backgroundRepeat: "repeat",
        }}
      />
      
      {/* Section-specific animated elements with enhanced visual interest */}
      {sectionProgress.map((opacity, i) => (
        <motion.div 
          key={i}
          className="absolute inset-0"
          style={{ opacity }}
        >
          {/* Large gradient shapes with subtle movement */}
          <motion.div
            className="absolute"
            style={{
              width: `${50 + (i * 10) % 30}vw`, 
              height: `${50 + (i * 15) % 40}vh`,
              left: i % 2 === 0 ? '5vw' : 'auto',
              right: i % 2 === 1 ? '5vw' : 'auto',
              top: `${20 + (i * 25) % 60}vh`,
              background: `radial-gradient(circle at center, 
                ${Object.values(themeColors)[i % 4]} 0%, 
                transparent 70%)`,
              rotate: i % 2 === 0 ? transforms.rotation1 : transforms.rotation2,
              y: i % 2 === 0 ? transforms.translateY2 : transforms.translateY3,
              x: i % 2 === 0 ? transforms.translateX1 : transforms.translateX2,
              filter: "blur(50px)",
              opacity: 0.6,
            }}
          />
          
          {/* Geometric pattern specific to section with enhanced parallax */}
          <motion.div
            className="absolute w-full h-full opacity-25"
            style={{
              backgroundImage: `url("/backgrounds/story-pattern-${(i % 3) + 1}.svg")`,
              backgroundSize: i % 2 === 0 ? '120% 120%' : '80% 80%',
              backgroundPosition: 'center',
              y: transforms.translateY1,
              scale: i % 2 === 0 ? 1.05 : 0.95,
            }}
          />
          
          {/* Additional decorative elements */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: `${10 + i * 5}vw`,
              height: `${10 + i * 5}vw`,
              right: `${(i * 20) % 80}%`,
              bottom: `${(i * 15) % 70}%`,
              background: `radial-gradient(circle at center, 
                ${Object.values(themeColors)[(i + 2) % 4]} 0%, 
                transparent 70%)`,
              opacity: 0.3,
              filter: "blur(40px)",
              y: i % 2 === 0 ? transforms.translateY3 : transforms.translateY2,
            }}
          />
        </motion.div>
      ))}
      
      {/* Subtle global light effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 pointer-events-none" />
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
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Mount check to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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
    ),
    // Add rotation for more dynamic movement
    rotate: useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [element.parallaxFactor > 0.5 ? -5 : 5, 0, element.parallaxFactor > 0.5 ? 5 : -5]
    ),
    // Add scale for more dynamic movement
    scale: useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [0.95, 1, 0.95]
    )
  }));
  
  const contentTransform = {
    y: useTransform(
      scrollYProgress,
      [0, 0.2, 0.8, 1],
      [20, 0, 0, -20]
    ),
    opacity: useTransform(
      scrollYProgress,
      [0, 0.1, 0.9, 1],
      [0.5, 1, 1, 0.5]
    )
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Enhanced background effect */}
      {isMounted && (
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
            y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9])
          }}
        />
      )}
      
      {/* Parallax elements with enhanced effects */}
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
            opacity: parallaxTransforms[i].opacity,
            rotate: parallaxTransforms[i].rotate,
            scale: parallaxTransforms[i].scale,
            transformOrigin: "center center",
            filter: element.type === 'shape' ? "blur(30px)" : "none"
          }}
        >
          {element.type === 'image' && (
            <img 
              src={element.content} 
              alt="Parallax element" 
              className="w-full h-full object-contain drop-shadow-lg"
              style={{
                transition: "filter 0.3s ease-in-out",
              }}
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
            <div 
              className="text-4xl font-bold opacity-10 whitespace-nowrap"
              style={{
                textShadow: "0 2px 10px rgba(255,255,255,0.2)",
                background: "linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {element.content}
            </div>
          )}
        </motion.div>
      ))}
      
      {/* Subtle glass effect border */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      
      {/* Main content with subtle parallax and fade effect */}
      <motion.div 
        className="relative z-10"
        style={{ 
          y: contentTransform.y,
          opacity: contentTransform.opacity
        }}
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
  fadeRange = 0.2,
  animationType = "fade" // "fade", "slide", "zoom", "reveal"
}: {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  staggerAmount?: number;
  fadeRange?: number;
  animationType?: "fade" | "slide" | "zoom" | "reveal";
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
    
    // Base opacity transform for all animation types
    const opacity = useTransform(
      scrollYProgress,
      [startShow, fullyVisible, startHide],
      [0, 1, 0]
    );
    
    // Different transform types based on animation style
    let transformY, transformX, transformScale, transformRotate;
    
    switch (animationType) {
      case "slide":
        transformY = useTransform(
          scrollYProgress,
          [startShow, fullyVisible, startHide],
          [50, 0, -50]
        );
        transformX = useTransform(
          scrollYProgress,
          [startShow, fullyVisible, startHide],
          [i % 2 === 0 ? -20 : 20, 0, i % 2 === 0 ? 20 : -20]
        );
        break;
        
      case "zoom":
        transformScale = useTransform(
          scrollYProgress,
          [startShow, fullyVisible, startHide],
          [0.8, 1, 0.8]
        );
        transformY = useTransform(
          scrollYProgress,
          [startShow, fullyVisible, startHide],
          [20, 0, -20]
        );
        break;
        
      case "reveal":
        transformY = useTransform(
          scrollYProgress,
          [startShow, fullyVisible, startHide],
          [0, 0, -30]
        );
        transformScale = useTransform(
          scrollYProgress,
          [startShow, fullyVisible, startHide],
          [0.95, 1, 1]
        );
        transformRotate = useTransform(
          scrollYProgress,
          [startShow, fullyVisible, startHide],
          [i % 2 === 0 ? -2 : 2, 0, 0]
        );
        break;
        
      case "fade":
      default:
        transformY = useTransform(
          scrollYProgress,
          [startShow, fullyVisible, startHide],
          [30, 0, -30]
        );
        break;
    }
    
    return {
      opacity,
      y: transformY,
      x: transformX,
      scale: transformScale,
      rotate: transformRotate
    };
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Background trace line for reveal animation type */}
      {animationType === "reveal" && (
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-300/20 to-transparent -translate-x-1/2" />
      )}
      
      {React.Children.map(children, (child, i) => (
        <motion.div
          className={`${childClassName} ${animationType === "reveal" ? "relative" : ""}`}
          style={{
            opacity: childTransforms[i].opacity,
            y: childTransforms[i].y,
            x: childTransforms[i].x,
            scale: childTransforms[i].scale,
            rotate: childTransforms[i].rotate,
            // Add a subtle shadow for depth
            boxShadow: animationType === "zoom" ? "0 10px 25px -5px rgba(0, 0, 0, 0.05)" : undefined,
            // Add a subtle transform origin variation for more natural movement
            transformOrigin: i % 2 === 0 ? "left center" : "right center"
          }}
        >
          {/* Visual enhancement for "reveal" animation type */}
          {animationType === "reveal" && (
            <div 
              className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-blue-400/30 -translate-x-1/2 -translate-y-1/2"
              style={{
                boxShadow: "0 0 10px rgba(96, 165, 250, 0.5)"
              }}
            />
          )}
          
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
  const [isMounted, setIsMounted] = useState(false);
  
  // Enhanced theme colors with gradients and transparency
  const themeColors = {
    blue: {
      primary: "rgba(59, 130, 246, 0.8)",
      gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%)",
      glow: "0 0 25px rgba(59, 130, 246, 0.4)",
      soft: "rgba(59, 130, 246, 0.1)"
    },
    purple: {
      primary: "rgba(139, 92, 246, 0.8)",
      gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%)",
      glow: "0 0 25px rgba(139, 92, 246, 0.4)",
      soft: "rgba(139, 92, 246, 0.1)"
    },
    orange: {
      primary: "rgba(249, 115, 22, 0.8)",
      gradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.8) 0%, rgba(234, 88, 12, 0.8) 100%)",
      glow: "0 0 25px rgba(249, 115, 22, 0.4)",
      soft: "rgba(249, 115, 22, 0.1)"
    },
    green: {
      primary: "rgba(16, 185, 129, 0.8)",
      gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.8) 100%)",
      glow: "0 0 25px rgba(16, 185, 129, 0.4)",
      soft: "rgba(16, 185, 129, 0.1)"
    }
  };
  
  // Mount check to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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
      {/* Only render enhanced visuals when mounted */}
      {isMounted ? (
        <>
          {/* Enhanced background effect with glass morphism */}
          <div 
            className="absolute inset-0 opacity-30 -z-10"
            style={{ 
              background: `radial-gradient(circle at 30% 30%, ${themeColors[theme].soft} 0%, transparent 70%)`,
              backdropFilter: "blur(40px)"
            }}
          />
          
          {/* Decorative section marker with enhanced visual styling */}
          <div 
            className="absolute left-0 top-0 h-full w-1" 
            style={{ 
              background: themeColors[theme].gradient,
              boxShadow: themeColors[theme].glow
            }} 
          />
          
          {/* Enhanced decorative vertical lines */}
          <div className="absolute left-12 top-0 h-full w-[1px] opacity-20" style={{ background: themeColors[theme].primary }} />
          <div className="absolute left-20 top-10 bottom-10 w-[1px] opacity-10" style={{ background: themeColors[theme].primary }} />
          
          {/* Enhanced section number indicator with modern styling */}
          <motion.div 
            className="absolute left-4 top-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
            style={{ background: themeColors[theme].gradient }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: inView ? 1 : 0.8, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {sectionNumber}
          </motion.div>
          
          {/* Decorative circle with pulse animation */}
          <motion.div
            className="absolute left-4 top-4 rounded-full"
            style={{ 
              width: "48px", 
              height: "48px",
              background: "transparent",
              border: `2px solid ${themeColors[theme].primary}`,
              opacity: 0.3,
            }}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Enhanced section title with reveal animation and gradient text */}
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
              <span 
                style={{
                  background: themeColors[theme].gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {sectionTitle}
              </span>
            </motion.div>
          )}
          
          {/* Content with staggered reveal and enhanced styling */}
          <motion.div
            className="ml-16 relative"
            initial="hidden"
            animate={controls}
            variants={variants}
          >
            {/* Subtle line decoration */}
            <div 
              className="absolute left-0 top-0 w-full h-[1px]"
              style={{ 
                background: `linear-gradient(to right, ${themeColors[theme].primary}, transparent)`,
                opacity: 0.2
              }}
            />
            
            {children}
            
            {/* Subtle line decoration */}
            <div 
              className="absolute left-0 bottom-0 w-full h-[1px]"
              style={{ 
                background: `linear-gradient(to right, ${themeColors[theme].primary}, transparent)`,
                opacity: 0.2
              }}
            />
          </motion.div>
          
          {/* Enhanced decorative side elements */}
          <motion.div
            className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-40 h-40 rounded-full opacity-10"
            style={{ 
              background: `radial-gradient(circle at center, ${themeColors[theme].primary} 0%, transparent 70%)`,
              filter: "blur(30px)"
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { 
              scale: [1, 1.1, 1], 
              opacity: 0.1,
              transition: { 
                scale: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: { duration: 1 }
              }
            } : { 
              scale: 0.8, 
              opacity: 0 
            }}
          />
          
          {/* Decorative pattern overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5 -z-5"
            style={{
              backgroundImage: `url('/backgrounds/story-pattern-${(sectionNumber % 3) + 1}.svg')`,
              backgroundSize: '500px',
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay'
            }}
          />
        </>
      ) : (
        // Basic version when not mounted
        <div className="ml-16 relative">
          {children}
        </div>
      )}
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
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Pre-compute all transforms outside of loops to avoid conditional hook calls
  // Create arrays with fixed length to ensure consistent hook calls
  const MAX_DEPTH = 10; // This is a safe upper limit that covers all possible depth values
  
  // Define all transforms upfront for consistent hook calls
  const scrollXTransforms = Array.from({ length: MAX_DEPTH }).map((_, i) => {
    const factor = (i + 1) / Math.max(1, depth);
    return useTransform(scrollYProgress, [0, 1], [0, -30 * factor]);
  });
  
  const scrollScaleTransforms = Array.from({ length: MAX_DEPTH }).map((_, i) => {
    const factor = (i + 1) / Math.max(1, depth);
    return useTransform(scrollYProgress, [0, 0.5, 1], [1, 1 + 0.05 * factor, 1]);
  });
  
  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    
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
  
  // Create parallax layers - only render the actual number of layers needed
  const renderLayers = () => {
    if (!isMounted) return null;
    
    return Array.from({ length: depth }).map((_, i) => {
      const factor = (i + 1) / depth;
      const mouseX = mousePosition.x * mouseInfluence * 100 * factor;
      const mouseY = mousePosition.y * mouseInfluence * 100 * factor;
      
      return (
        <motion.div
          key={i}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: -(i + 1),
            x: scrollXTransforms[i],
            translateX: mouseX,
            translateY: mouseY,
            scale: scrollScaleTransforms[i],
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
      );
    });
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Main content in front - always render */}
      <motion.div className="relative z-10">
        {children}
      </motion.div>
      
      {/* Parallax layers in background - conditionally render but hooks already called */}
      {renderLayers()}
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
  endScale = 1,
  overlayColor = "rgba(0,0,0,0.2)"
}: {
  children: React.ReactNode;
  bgImage?: string;
  className?: string;
  startScale?: number;
  endScale?: number;
  overlayColor?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Always initialize the scroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Initialize all transform hooks unconditionally
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [startScale, endScale]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  
  const blur = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [3, 0, 0, 3]
  );
  
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [20, -20]
  );
  
  const overlayOpacity = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [0.7, 0.4, 0.7]
  );
  
  const gridTranslateY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, -30]
  );
  
  const beamScale = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [1, 1.2, 1]
  );
  
  const beamRotate = useTransform(
    scrollYProgress, 
    [0, 1], 
    [-5, 5]
  );
  
  const contentTranslateY = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [30, 0, -30]
  );
  
  const contentScale = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    [0.95, 1, 1, 0.95]
  );
  
  // Mount check to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background elements - conditionally render but all hooks are already defined */}
      {isMounted && bgImage ? (
        <>
          {/* Enhanced background with zoom effect and filter effects */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              scale,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.3,
              filter: `blur(${blur.get()}px)`,
              y: translateY
            }}
          />
          
          {/* Color overlay with gradient for depth */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `linear-gradient(to bottom, 
                ${overlayColor.replace(')', ', 0.7)')}, 
                ${overlayColor.replace(')', ', 0.3)')}, 
                ${overlayColor.replace(')', ', 0.7)')})`,
              opacity: overlayOpacity
            }}
          />
          
          {/* Decorative grid lines */}
          <motion.div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              y: gridTranslateY
            }}
          />
          
          {/* Light beam effect */}
          <motion.div
            className="absolute -top-[100%] -left-[50%] w-[200%] h-[300%] pointer-events-none opacity-20"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 60%)',
              scale: beamScale,
              rotate: beamRotate
            }}
          />
          
          {/* Bottom shadow/vignette effect */}
          <div className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
        </>
      ) : null}
      
      {/* Content with enhanced fade and transform effects - always render */}
      <motion.div
        className="relative z-10"
        style={{ 
          opacity,
          y: contentTranslateY,
          scale: contentScale
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
