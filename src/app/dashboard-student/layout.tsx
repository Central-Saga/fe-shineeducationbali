"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudentNavbar } from "@/components/ui-student/layout/StudentNavbar";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Cek autentikasi
    const dataPengguna = localStorage.getItem("pengguna");
    if (!dataPengguna) {
      router.push("/auth/login");
      return;
    }

    try {
      const user = JSON.parse(dataPengguna);
      // Periksa peran untuk menangani kedua struktur data lama dan baru
      const isStudent =
        (user.role && user.role.includes("Student")) ||
        (user.peran && user.peran.includes("Student"));

      if (!isStudent) {
        router.push("/auth/login");
        return;
      }

      setMounted(true);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/auth/login");
    }
  }, [router]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar studentName="John Doe" />
      {/* Konten utama dengan jarak yang tepat dari navbar */}
      <div className="pt-10">
        <main>{children}</main>
      </div>
    </div>
  );
}
