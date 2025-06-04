"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles data
    const newParticles = Array(8).fill(null).map((_, i) => ({
      id: i,
      width: 10 + Math.random() * 20,
      height: 10 + Math.random() * 20,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: i * 0.2,
      duration: Math.random() * 5 + 3,
      xOffset: Math.random() * 600 - 300,
      yOffset: Math.random() * 600 - 300,
      isRed: i % 2 === 0
    }));
    setParticles(newParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (email === "superadmin@example.com" && password === "password") {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulasi loading
        router.push("/dashboard");
        return;
      }
      setError("Email atau password salah");
    } catch (err) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };
  const springAnimation = {
    scale: [1, 1.02],
    rotate: [0, 1],
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  };

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      {/* Interactive Background */}
      <div
        className="absolute inset-0 opacity-40 transition-all duration-300"
        style={{
          backgroundImage: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(196, 5, 3, 0.15) 0%, transparent 30%),
            radial-gradient(circle at ${mousePosition.x - 100}px ${mousePosition.y + 100}px, rgba(218, 166, 37, 0.1) 0%, transparent 40%)
          `
        }}
      />      {/* Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{ opacity: 0 }}
          animate={{
            x: [0, particle.xOffset],
            y: [0, particle.yOffset],
            scale: [0, 1, 0],
            rotate: [0, 360],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
            background: particle.isRed ? 
              'linear-gradient(45deg, rgba(196, 5, 3, 0.2), rgba(196, 5, 3, 0.1))' : 
              'linear-gradient(45deg, rgba(218, 166, 37, 0.2), rgba(218, 166, 37, 0.1))',
            borderRadius: '50%',
            filter: 'blur(8px)'
          }}
        />
      ))}

      <div className="relative w-full max-w-lg mx-auto px-4">
        {/* Logo Animation */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={springAnimation}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <div className="inline-block relative group">
            <motion.div
              animate={{ y: [-10, 10] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/pichome/logo.png"
                alt="Shine Education Logo"
                width={180}
                height={180}
                className="relative z-10"
              />
            </motion.div>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#C40503] to-[#DAA625] opacity-20 blur-xl rounded-full animate-gradient-x group-hover:opacity-30 transition-opacity" />
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Card className="relative backdrop-blur-xl bg-white/90 border-0 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C40503]/5 to-[#DAA625]/5 rounded-lg" />

            <CardHeader className="relative space-y-1 text-center pb-4">
              <motion.h2
                className="text-2xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent animate-shine inline-block pb-2">
                  Masuk ke Akun Anda
                </span>
              </motion.h2>
              <p className="text-gray-600">
                Selamat datang kembali di Shine Education
              </p>
            </CardHeader>

            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/50 border-gray-200 focus:border-[#C40503] focus:ring-[#C40503] transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#C40503]/10 to-[#DAA625]/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="password">Password</Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/50 border-gray-200 focus:border-[#C40503] focus:ring-[#C40503] transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#C40503]/10 to-[#DAA625]/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </div>
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-md"
                  >
                    <div className="absolute inset-0 bg-red-50 animate-pulse" />
                    <div className="relative text-sm text-[#C40503] text-center p-2">
                      {error}
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Button Animation */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative overflow-hidden group"
                  >
              <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#C40503] to-[#DAA625]"
                      animate={{
                        opacity: isLoading ? 0.8 : 1,
                        scale: isLoading ? 1.02 : 1
                      }}
                      transition={{ duration: 0.5, repeat: isLoading ? Infinity : 0 }}
                    />
                    <span className="relative z-10">
                      {isLoading ? "Memproses..." : "Masuk"}
                    </span>
                  </Button>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="text-gray-500 text-sm">Belum punya akun? </span>
                  <Link
                    href="/auth/register"
                    className="text-sm font-medium relative inline-block group"
                  >
                    <span className="bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
                      Daftar di sini
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#C40503] to-[#DAA625] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
