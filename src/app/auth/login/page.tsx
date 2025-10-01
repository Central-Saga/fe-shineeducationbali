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
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { authService, LoginRequest } from "@/lib/services/auth.service";
import "@/styles/particles.css";

interface Star {
  id: number;
  size: "small" | "medium" | "large";
  left: string;
  top: string;
  delay: number;
  isFloating: boolean;
}

interface EducationIcon {
  id: number;
  icon: string;
  left: string;
  top: string;
  rotation: number;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Star[]>([]);
  const [educationIcons, setEducationIcons] = useState<EducationIcon[]>([]);

  useEffect(() => {
    // Check for success message from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message) {
      setSuccessMessage(decodeURIComponent(message));
    }

    // Generate education icons using available SVGs
    const icons = ["/file.svg", "/globe.svg", "/window.svg", "/vercel.svg"];
    const newIcons: EducationIcon[] = Array(12)
      .fill(null)
      .map((_, i) => ({
        id: i,
        icon: icons[i % icons.length],
        left: `${Math.random() * 90 + 5}%`, // Memastikan icon tidak terlalu di pinggir
        top: `${Math.random() * 90 + 5}%`,
        rotation: Math.random() * 360,
      }));
    setEducationIcons(newIcons);

    // Generate stars with different sizes
    const newStars: Star[] = Array(80)
      .fill(null)
      .map((_, i) => {
        // Weight the sizes to have more small stars
        const sizeRand = Math.random();
        const size =
          sizeRand < 0.6 ? "small" : sizeRand < 0.85 ? "medium" : "large";

        // Create clusters of stars
        const cluster = Math.floor(i / 20); // 4 clusters
        const baseX = (cluster % 2) * 50; // 2 columns
        const baseY = Math.floor(cluster / 2) * 50; // 2 rows

        return {
          id: i,
          size: size as "small" | "medium" | "large",
          left: `${baseX + Math.random() * 50}%`,
          top: `${baseY + Math.random() * 50}%`,
          delay: Math.random() * 5,
          isFloating: Math.random() > 0.4, // More floating stars
        };
      });
    setStars(newStars);

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validasi input
      if (!email || !password) {
        setError("Email dan password harus diisi");
        setIsLoading(false);
        return;
      }

      // Kirim request ke API backend
      const loginData: LoginRequest = {
        email: email.trim(),
        password: password,
      };

      console.log("Mengirim request login ke API:", loginData);
      const response = await authService.login(loginData);

      // Handle response backend yang sebenarnya
      if (response.user && response.token) {
        const { user, token } = response;

        // Set cookie untuk autentikasi dengan expire time
        const expireTime = new Date();
        expireTime.setHours(expireTime.getHours() + 24); // Cookie berlaku 24 jam

        // Simpan token
        document.cookie = `access_token=${token}; path=/; expires=${expireTime.toUTCString()}; secure; samesite=strict`;

        // Simpan data pengguna dengan struktur yang seragam
        const userData = JSON.stringify({
          nama: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        });

        // Simpan di localStorage untuk penggunaan client-side
        localStorage.setItem("pengguna", userData);

        // Simpan juga di cookie untuk middleware
        document.cookie = `data_pengguna=${userData}; path=/; expires=${expireTime.toUTCString()}; secure; samesite=strict`;

        // Debug log
        console.log("Login berhasil:", {
          user: user,
          cookies: document.cookie,
          localStorage: localStorage.getItem("pengguna"),
        });

        // Redirect berdasarkan role
        console.log("Redirecting user with role:", user.role);

        switch (user.role) {
          case "Student":
            await router.push("/dashboard-student");
            break;
          case "Teacher":
            await router.push("/dashboard-teacher");
            break;
          case "Super Admin":
          case "Admin":
            await router.push("/dashboard");
            break;
          default:
            console.warn("Role tidak dikenali:", user.role);
            // Default redirect ke dashboard admin
            await router.push("/dashboard");
        }
      } else {
        setError(response.message || "Login gagal");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan saat login. Silakan coba lagi.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-white">
      {/* Background Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star star-${star.size} ${
            star.isFloating ? "floating" : ""
          }`}
          style={{
            left: star.left,
            top: star.top,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Education Icons with bounce effect */}
      {educationIcons.map((icon) => (
        <motion.div
          key={icon.id}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0.6, 0.8, 0.6],
            rotate: [0, icon.rotation, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
          style={{
            position: "absolute",
            left: icon.left,
            top: icon.top,
            opacity: 0.2,
            transformOrigin: "center",
          }}
        >
          <Image
            src={icon.icon}
            alt="Education Icon"
            width={40}
            height={40}
            className="drop-shadow-lg"
          />
        </motion.div>
      ))}

      {/* Cursor Effect */}
      <motion.div
        className="pointer-events-none fixed w-[400px] h-[400px] bg-[#C40503]/5"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          filter: "blur(50px)",
        }}
      />

      <div className="relative w-full max-w-md mx-auto px-4 z-10">
        {/* Logo with glow effect */}
        <motion.div
          className="text-center mb-8 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#C40503]/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ filter: "blur(20px)" }}
          />
          <Image
            src="/pichome/logo.png"
            alt="Shine Education Logo"
            width={200}
            height={80}
            className="mx-auto relative z-10"
          />
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
          style={{ transformOrigin: "center" }}
        >
          <Card className="bg-white/90 shadow-2xl border-0 backdrop-blur-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[#C40503]/5" />

            <CardHeader className="space-y-1 text-center relative py-5">
              {" "}
              <motion.h2
                className="text-2xl font-bold text-[#C40503]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Sign In to Your Account
              </motion.h2>
              <p className="text-gray-500">
                Selamat datang kembali di Shine Education ✨
              </p>
            </CardHeader>

            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                {" "}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#C40503]" />
                    Email
                  </Label>
                  <motion.div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email Anda"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white text-black border-[1px] border-transparent
                        focus:border-[#C40503] focus:outline-none focus:ring-0
                        shadow-none focus:ring-transparent hover:shadow-none
                        active:shadow-none focus-visible:ring-0
                        transition-colors duration-300"
                      style={{ boxShadow: "none" }}
                      required
                    />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#C40503]" />
                    Password
                  </Label>
                  <motion.div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan password Anda"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white text-black border-[1px] border-gray-200
                        focus:border-[#C40503] focus:outline-none focus:ring-0
                        !shadow-none !ring-0 hover:shadow-none active:shadow-none
                        transition-colors duration-300"
                      style={{ boxShadow: "none" }}
                      required
                    />
                  </motion.div>
                </div>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50/80 backdrop-blur-sm text-green-700 text-sm p-3 rounded-md text-center"
                  >
                    {successMessage}
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50/80 backdrop-blur-sm text-[#C40503] text-sm p-3 rounded-md text-center"
                  >
                    {error}
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transformOrigin: "center" }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#C40503] hover:bg-[#C40503]/90 text-white transition-all duration-300 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        Masuk
                      </>
                    )}
                  </Button>
                </motion.div>
                <div className="text-center text-sm py-5">
                  <span className="text-gray-500">Belum punya akun? </span>
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.1 }}
                    style={{ transformOrigin: "center" }}
                  >
                     <Link
                       href="/auth/register"
                       className="text-[#C40503] hover:text-[#DAA521] font-medium transition-all duration-300 inline-flex items-center gap-1"
                     >
                       <UserPlus className="h-4 w-4" />
                       Daftar di sini
                     </Link>
                  </motion.div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
