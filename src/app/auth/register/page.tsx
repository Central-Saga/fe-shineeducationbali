"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Users, 
  Lock, 
  Shield, 
  LogIn,
  UserPlus 
} from "lucide-react";

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  duration: number;
}

// interface FormField {
//   id: keyof typeof FormData;
//   label: string;
//   type: string;
//   placeholder: string;
//   icon: string;
// }

type FieldId = keyof FormData;

interface FormFieldType {
  id: FieldId;
  label: string;
  type: string;
  placeholder: string;
  icon: string;
}

const formFields: FormFieldType[] = [
  {
    id: "namaLengkap",
    label: "Nama Lengkap",
    type: "text",
    placeholder: "Masukkan nama lengkap",
    icon: "User",
  },
  {
    id: "tanggalLahir",
    label: "Tanggal Lahir",
    type: "date",
    placeholder: "Masukkan tanggal lahir",
    icon: "Calendar",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Masukkan alamat email",
    icon: "Mail",
  },
  {
    id: "noTelepon",
    label: "Nomor Telepon",
    type: "tel",
    placeholder: "Masukkan nomor telepon",
    icon: "Phone",
  },
  {
    id: "alamat",
    label: "Alamat",
    type: "textarea",
    placeholder: "Masukkan alamat lengkap",
    icon: "MapPin",
  },
  {
    id: "sekolahAsal",
    label: "Sekolah Asal",
    type: "text",
    placeholder: "Masukkan nama sekolah asal",
    icon: "GraduationCap",
  },
  {
    id: "namaOrangTua",
    label: "Nama Orang Tua/Wali",
    type: "text",
    placeholder: "Masukkan nama orang tua atau wali",
    icon: "Users",
  },
  {
    id: "noOrangTua",
    label: "No. Telepon Orang Tua/Wali",
    type: "tel",
    placeholder: "Masukkan nomor telepon orang tua/wali",
    icon: "Phone",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Masukkan password",
    icon: "Lock",
  },
  {
    id: "konfirmasiPassword",
    label: "Konfirmasi Password",
    type: "password",
    placeholder: "Masukkan ulang password",
    icon: "Shield",
  },
];

interface FormData {
  namaLengkap: string;
  email: string;
  password: string;
  konfirmasiPassword: string;
  noTelepon: string;
  alamat: string;
  sekolahAsal: string;
  namaOrangTua: string;
  noOrangTua: string;
  tanggalLahir: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [activeField, setActiveField] = useState("");
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  // const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
    noTelepon: "",
    alamat: "",
    sekolahAsal: "",
    namaOrangTua: "",
    noOrangTua: "",
    tanggalLahir: "",
  });
  const [error, setError] = useState("");

  // Helper function to render icons
  const renderIcon = (iconName: string) => {
    const iconProps = { className: "h-4 w-4 text-[#C40503]" };
    switch (iconName) {
      case "User": return <User {...iconProps} />;
      case "Calendar": return <Calendar {...iconProps} />;
      case "Mail": return <Mail {...iconProps} />;
      case "Phone": return <Phone {...iconProps} />;
      case "MapPin": return <MapPin {...iconProps} />;
      case "GraduationCap": return <GraduationCap {...iconProps} />;
      case "Users": return <Users {...iconProps} />;
      case "Lock": return <Lock {...iconProps} />;
      case "Shield": return <Shield {...iconProps} />;
      default: return <User {...iconProps} />;
    }
  };

  useEffect(() => {
    // Generate random floating emojis
    const educationEmojis = ["📚", "✏️", "🎨", "🔬", "🎭", "🎮", "🎵", "⭐"];
    const newEmojis = Array(8)
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.konfirmasiPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    const registrationData = {
      ...formData,
      role: "student",
    };

    try {
      // TODO: Send registration data to API
      console.log("Register attempt:", registrationData);
      router.push("/auth/login");
    } catch {
      setError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(#C40503_1px,transparent_1px)] [background-size:40px_40px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(#DAA521_1px,transparent_1px)] [background-size:30px_30px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

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

      {/* Main Card */}
      <motion.div
        className="w-full max-w-4xl relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      >
        <Card className="relative bg-white/95 backdrop-blur-md shadow-xl border-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#C40503]/5" />
          <CardHeader className="space-y-1 relative">
            {/* Logo Animation */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
            >
              <div className="relative py-5">
                <motion.div
                  className="absolute inset-0 bg-[#C40503]/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Image
                  src="/pichome/logo.png"
                  alt="Shine Education Logo"
                  width={150}
                  height={150}
                  className="relative z-10"
                />
              </div>
            </motion.div>

            {/* Title Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold text-center text-[#C40503]">
                Bergabung dengan Shine Education
              </CardTitle>
              <CardDescription className="text-center mt-2 text-[#C40503]/80 pb-5">
                Mulai petualangan belajarmu bersama kami! ✨
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              {formFields.map((field) => (
                <motion.div
                  key={field.id}
                  className={`space-y-2 ${
                    field.type === "textarea" ? "col-span-2" : ""
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: formFields.indexOf(field) * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                  }}
                >
                  <Label
                    htmlFor={field.id}
                    className="flex items-center gap-2 text-black font-medium"
                  >
                    {renderIcon(field.icon)}
                    {field.label}
                  </Label>{" "}
                  <motion.div className="relative">
                    {" "}
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className={`min-h-[100px] bg-white text-black placeholder:text-gray-500
                          border-[1px] ${
                            activeField === field.id
                              ? "border-[#C40503]"
                              : "border-gray-200"
                          }
                          focus:border-[#C40503] focus:outline-none focus:ring-0
                          !shadow-none !ring-0 hover:shadow-none active:shadow-none
                          transition-colors duration-300`}
                        style={{ boxShadow: "none" }}
                        onFocus={() => setActiveField(field.id)}
                        onBlur={() => setActiveField("")}
                        required
                      />
                    ) : (
                      <Input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className="bg-white text-black placeholder:text-gray-500
                          border-[1px] border-gray-200
                          focus:border-[#C40503] focus:outline-none focus:ring-0
                          !shadow-none !ring-0 hover:shadow-none active:shadow-none
                          transition-colors duration-300"
                        style={{ boxShadow: "none" }}
                        onFocus={() => setActiveField(field.id)}
                        onBlur={() => setActiveField("")}
                        required
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="col-span-2 bg-[#C40503]/10 backdrop-blur-sm text-[#C40503] text-sm p-3 rounded-md text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div
                className="col-span-2"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-[#C40503] hover:bg-[#C40503]/90 text-white transition-all duration-300 flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Mulai Belajar Bersama Kami!
                </Button>
              </motion.div>
            </form>
          </CardContent>{" "}
          <CardFooter className="flex justify-center py-5">
            <div className="text-sm text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <span className="text-gray-500">Sudah punya akun? </span>
                <Link
                  href="/auth/login"
                  className="group relative inline-block"
                >
                   <motion.span
                     className="font-medium text-[#DAA521] group-hover:text-[#C40503] transition-all duration-300 inline-flex items-center gap-1"
                     whileHover={{ scale: 1.1 }}
                     style={{
                       display: "inline-flex",
                       transformOrigin: "center",
                     }}
                   >
                     <LogIn className="" />
                     Masuk di sini
                   </motion.span>
                </Link>
              </motion.div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
