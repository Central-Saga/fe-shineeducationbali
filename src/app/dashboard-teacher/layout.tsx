"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sheet } from "@/components/ui/sheet";

export default function TeacherDashboardLayout({
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

    const user = JSON.parse(dataPengguna);
    if (!user.peran.includes("Teacher")) {
      router.push("/auth/login");
      return;
    }

    setMounted(true);
  }, [router]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar untuk Guru */}
      <Sheet>
        <div className="w-64 h-full bg-white border-r shadow-sm">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
              Dashboard Guru
            </h2>
            <nav className="space-y-2">
              <a
                href="/dashboard-teacher"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <span className="mr-3">🏠</span>
                Beranda
              </a>
              <a
                href="/dashboard-teacher/schedule"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <span className="mr-3">📅</span>
                Jadwal
              </a>
              <a
                href="/dashboard-teacher/materials"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <span className="mr-3">📚</span>
                Materi
              </a>
              <a
                href="/dashboard-teacher/grades"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <span className="mr-3">📊</span>
                Nilai
              </a>
              <a
                href="/dashboard-teacher/assignments"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <span className="mr-3">✏️</span>
                Tugas
              </a>
              <a
                href="/dashboard-teacher/students"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <span className="mr-3">👥</span>
                Siswa
              </a>
            </nav>
          </div>
        </div>
      </Sheet>

      {/* Konten Utama */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
