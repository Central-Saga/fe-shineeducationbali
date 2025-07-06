"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/ui-home/Navbar";
import HeroSection from "@/components/ui-home/HeroSection";
import About from "@/components/ui-home/About";
import Program from "@/components/ui-home/Program";
import Langganan from "@/components/ui-home/Langganan";
import Footer from "@/components/ui-home/Footer";
import {
  ScrollFadeSection,
  StaggerScrollReveal
} from "@/components/animations/BackgroundAnimations";
import {
  AnimatedLine,
  Spotlight,
  GlassCard,
  AnimatedIconGrid,
  AnimatedBlob,
} from "@/components/animations/MicroAnimations";
import {
  ParallaxImage,
  ScrollingTextReveal,
} from "@/components/animations/ScrollAnimations";
import {
  ClientOnly,
  RandomParticles
} from "@/components/animations/ClientOnlyComponents";
import {
  StoryCanvas,
  ParallaxStorySection,
  ScrollSequence,
  StoryRevealSection,
  ParallaxScrollScene,
  ZoomParallaxSection
} from "@/components/animations/StorytellingAnimations";

interface FloatingItemProps {
  width: number;
  height: number;
  left: string;
  top: string;
  color1: string;
  color2: string;
  shape: "book" | "pencil" | "graduation" | "lightbulb";
}

// Modern, clean interactive background
const InteractiveBackground = () => {
  return (
    <>
      {/* Clean geometric pattern background */}
      <div className="fixed inset-0 -z-10">
        <svg className="w-full h-full opacity-5">
          <pattern
            id="pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 0L40 20L20 40L0 20Z"
              fill="none"
              stroke="rgba(120, 120, 120, 0.15)"
              strokeWidth="0.5"
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
      
      {/* Subtle particles - client-side rendered to avoid hydration errors */}
      <ClientOnly>
        <RandomParticles count={20} />
      </ClientOnly>
    </>
  );
};

export default function Home() {
  const [items, setItems] = useState<FloatingItemProps[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const shapes: FloatingItemProps["shape"][] = [
      "book",
      "pencil",
      "graduation",
      "lightbulb",
    ];
    
    // More subtle and modern colors
    const colors1 = ["#f0f9ff", "#fff7ed", "#f5f3ff", "#f0fdf4"];
    const colors2 = ["#bae6fd", "#fed7aa", "#ddd6fe", "#bbf7d0"];
    
    const positions = [20, 40, 60, 80];
    const newItems = Array(4)
      .fill(null)
      .map((_, index) => ({
        width: 6, // Slightly smaller
        height: 6, // Slightly smaller
        left: `${positions[index]}%`,
        top: `${(100 / 4) * (index + 1)}vh`,
        color1: colors1[index % colors1.length],
        color2: colors2[index % colors2.length],
        shape: shapes[index % shapes.length],
      }));

    setItems(newItems);
  }, []);

  return (
    <main className="relative overflow-hidden">
      {/* Subtle spotlight effect following cursor */}
      <Spotlight size={400} opacity={0.08} />
      
      <div className="relative">
        {/* Modern geometric pattern background */}
        <InteractiveBackground />
        
        {/* Main storytelling canvas with parallax and scroll effects */}
        <StoryCanvas sections={4} theme="education" />
        
        {/* Enhanced modern animated blobs with SVG morphing for depth */}
        <AnimatedBlob
          className="-z-10 left-[5%] top-[15%]"
          color="rgba(96, 165, 250, 0.08)"
          size="40rem"
          duration={30}
          pulseIntensity={0.12}
          blobType="smooth"
        />
        
        <AnimatedBlob
          className="-z-10 right-[10%] top-[45%]"
          color="rgba(249, 115, 22, 0.08)"
          size="45rem"
          duration={35}
          delay={2}
          pulseIntensity={0.1}
          pulseSpeed={4}
          blobType="wavy"
        />
        
        <AnimatedBlob
          className="-z-10 left-[15%] top-[65%]"
          color="rgba(139, 92, 246, 0.08)"
          size="35rem"
          duration={28}
          delay={1}
          pulseIntensity={0.09}
          blobType="spiky"
        />
        
        {/* Additional smaller accent blobs for more visual interest */}
        <AnimatedBlob
          className="-z-10 right-[15%] top-[20%]"
          color="rgba(16, 185, 129, 0.07)"
          size="20rem"
          duration={25}
          delay={1.5}
          pulseIntensity={0.15}
          pulseSpeed={3}
          blobType="smooth"
        />
        
        <AnimatedBlob
          className="-z-10 left-[30%] top-[40%]"
          color="rgba(234, 179, 8, 0.06)"
          size="15rem"
          duration={22}
          delay={3}
          pulseIntensity={0.12}
          blobType="wavy"
        />
        
        {/* Floating educational shapes with subtle animations */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {mounted &&
            items.map((item, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  width: `${item.width}rem`,
                  height: `${item.height}rem`,
                  left: item.left,
                  top: item.top,
                  clipPath:
                    item.shape === "book"
                      ? "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
                      : item.shape === "pencil"
                      ? "polygon(20% 0%, 80% 0%, 100% 90%, 50% 100%, 0% 90%)"
                      : item.shape === "graduation"
                      ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                      : "circle(50% at 50% 50%)", // lightbulb default
                  background: `linear-gradient(45deg, ${item.color1}, ${item.color2})`,
                  boxShadow: `0 0 15px ${item.color2}22`,
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                }}
                animate={{
                  y: [-10, 10],
                  x: [-5, 5],
                  rotate: [-3, 3],
                  scale: [0.98, 1.02],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  delay: index * 0.3,
                }}
              />
            ))}
        </div>
        
        {/* Animated decorative lines for visual interest */}
        <div className="absolute left-10 bottom-[10vh] -z-10">
          {[...Array(3)].map((_, i) => (
            <AnimatedLine 
              key={i}
              length={40 + i * 20} 
              angle={i * 30} 
              duration={4 + i} 
              color={`rgba(${200 + i * 20}, ${100 + i * 30}, ${150 + i * 20}, 0.07)`}
              className={`mb-${3 + i}`}
            />
          ))}
        </div>
        
        <div className="absolute right-10 top-[40vh] -z-10">
          {[...Array(3)].map((_, i) => (
            <AnimatedLine 
              key={i}
              length={30 + i * 25} 
              angle={-i * 25} 
              duration={3 + i * 1.5} 
              color={`rgba(${100 + i * 30}, ${150 + i * 20}, ${200 + i * 20}, 0.07)`}
              className={`mt-${3 + i}`}
            />
          ))}
        </div>
      </div>
      
      <Navbar />

      {/* Enhanced Hero section with advanced parallax scrolling and zoom effects */}
      <ZoomParallaxSection 
        className="w-full" 
        startScale={1.2} 
        endScale={1}
        bgImage="/backgrounds/wave-header.svg"
      >
        <div className="relative overflow-hidden">
          {/* Multi-layered parallax background for hero section */}
          <div className="absolute inset-0 -z-10">
            <ParallaxImage 
              src="/backgrounds/wave-header.svg" 
              alt="Wave Pattern"
              className="w-full h-full opacity-20"
              speed={0.15}
            />
          </div>
          
          {/* Subtle particles in background */}
          <div className="absolute inset-0 -z-5">
            <ClientOnly>
              <RandomParticles count={15} />
            </ClientOnly>
          </div>
          
          {/* Enhanced decorative glass elements with parallax */}
          <ParallaxScrollScene className="absolute inset-0 -z-5 overflow-hidden" depth={5} mouseInfluence={0.03}>
            {/* Larger glass elements */}
            <GlassCard 
              className="absolute top-20 left-[5%] w-24 h-24 opacity-40 rotate-12" 
              depth="light"
              color="blue"
            >
              <div className="w-full h-full"></div>
            </GlassCard>
            
            <GlassCard 
              className="absolute top-[40%] right-[8%] w-32 h-32 opacity-50" 
              depth="light"
              color="purple"
            >
              <div className="w-full h-full"></div>
            </GlassCard>
            
            {/* Smaller glass elements */}
            <GlassCard 
              className="absolute top-[30%] left-[20%] w-16 h-16 opacity-30 -rotate-6" 
              depth="light"
              color="emerald"
            >
              <div className="w-full h-full"></div>
            </GlassCard>
            
            <GlassCard 
              className="absolute bottom-[20%] right-[25%] w-20 h-20 opacity-35 rotate-12" 
              depth="light"
              color="amber"
            >
              <div className="w-full h-full"></div>
            </GlassCard>
            
            <GlassCard 
              className="absolute bottom-[10%] left-[10%] w-12 h-12 opacity-40 rotate-45" 
              depth="light"
              color="blue"
            >
              <div className="w-full h-full"></div>
            </GlassCard>
          </ParallaxScrollScene>
          
          <HeroSection />
        </div>
      </ZoomParallaxSection>
      
      {/* Program section with parallax story elements */}
      <ParallaxStorySection 
        className="w-full relative" 
        elements={[
          {
            type: 'image',
            content: '/icons/book.svg',
            position: [5, 20],
            parallaxFactor: 0.8,
            opacity: 0.1,
            size: [100, 100],
            className: '-z-5'
          },
          {
            type: 'image',
            content: '/icons/graduation.svg',
            position: [80, 30],
            parallaxFactor: 0.6,
            opacity: 0.1,
            size: [120, 120],
            className: '-z-5'
          },
          {
            type: 'shape',
            content: 'radial-gradient(circle at center, rgba(219, 39, 119, 0.1) 0%, transparent 70%)',
            position: [10, 50],
            parallaxFactor: 0.5,
            size: [200, 200],
            className: '-z-10'
          },
          {
            type: 'shape',
            content: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.1) 0%, transparent 70%)',
            position: [70, 60],
            parallaxFactor: 0.7,
            size: [180, 180],
            className: '-z-10'
          }
        ]}
      >
        {/* Animated icon grid with education icons */}
        <div className="absolute left-[5%] top-[30%] -z-10">
          <AnimatedIconGrid 
            className="w-24" 
            iconSize="2.5rem"
            columns={2}
            gap={2}
          />
        </div>
        
        <Program />
      </ParallaxStorySection>
      
      {/* About section with sequence reveal animations */}
      <ScrollSequence className="relative" childClassName="block" staggerAmount={0.1} fadeRange={0.4}>
        {/* Parallax floating elements */}
        <div className="absolute -left-20 top-20 w-48 h-48 opacity-10 -z-1">
          <ParallaxImage 
            src="/icons/lightbulb.svg" 
            alt="Lightbulb"
            speed={0.08}
            imgClassName="w-full h-full"
          />
        </div>
        
        <div className="absolute -right-10 bottom-20 w-40 h-40 opacity-10 -z-1">
          <ParallaxImage 
            src="/icons/pencil.svg" 
            alt="Pencil"
            speed={0.06}
            imgClassName="w-full h-full"
          />
        </div>
        
        <StoryRevealSection 
          sectionTitle="About Us" 
          sectionNumber={1} 
          theme="blue"
          className="mb-16 p-8 rounded-2xl bg-white/5 backdrop-blur-sm"
        >
          <div className="relative">
            {/* Decorative accent pattern */}
            <div className="absolute -right-4 -top-4 w-24 h-24 opacity-10">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            
            <About />
            
            {/* Bottom decorative element */}
            <div className="absolute -left-2 -bottom-2 w-32 h-8 opacity-10">
              <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 15 H100" stroke="currentColor" strokeWidth="2" />
                <path d="M20 5 L20 25" stroke="currentColor" strokeWidth="2" />
                <path d="M40 0 L40 30" stroke="currentColor" strokeWidth="2" />
                <path d="M60 5 L60 25" stroke="currentColor" strokeWidth="2" />
                <path d="M80 0 L80 30" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </StoryRevealSection>
      </ScrollSequence>
      
      {/* Langganan section with scrollytelling elements */}
      <ParallaxScrollScene className="relative overflow-hidden" depth={2}>
        <ParallaxImage 
          src="/backgrounds/wave-header.svg" 
          alt="Wave Pattern"
          className="absolute inset-0 -z-1 opacity-10"
          speed={0.1}
        />
        
        <ScrollFadeSection startFade={0.2} endFade={0.6}>
          <StaggerScrollReveal childClassName="block" delayBetween={0.1}>
            <ScrollingTextReveal
              text="Berlangganan Sekarang!"
              className="text-center text-3xl font-bold text-[#C40503] mb-6 hidden lg:block"
              threshold={0.7}
              staggerChildren={0.02}
            />
            <Langganan />
          </StaggerScrollReveal>
        </ScrollFadeSection>
      </ParallaxScrollScene>
      
      <Footer />
    </main>
  );
}
