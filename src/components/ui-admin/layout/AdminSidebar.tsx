"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Settings,
  FilePieChart,
  BookOpen,
  ClipboardList,
  School,
  ChevronDown,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manajemen Pengguna",
    href: "/dashboard/users",
    icon: Users,
    submenu: [
      {
        name: "Manajemen Siswa",
        href: "/dashboard/users/students",
        description: "Kelola data siswa dan penempatan kelas",
      },
      {
        name: "Manajemen Guru",
        href: "/dashboard/users/teachers",
        description: "Kelola data guru dan jadwal mengajar",
      },
      {
        name: "Role & Permissions",
        href: "/dashboard/users/roles",
        description: "Atur peran dan hak akses pengguna",
      },
    ],
  },
  {
    name: "Kursus",
    href: "/dashboard/courses",
    icon: BookOpen,
    submenu: [
      {
        name: "Daftar Kursus",
        href: "/dashboard/courses",
        description: "Kelola daftar kursus yang tersedia",
      },
      {
        name: "Kategori",
        href: "/dashboard/courses/categories",
        description: "Atur kategori kursus",
      },
      {
        name: "Materi",
        href: "/dashboard/courses/materials",
        description: "Kelola materi pembelajaran",
      },
      {
        name: "Jadwal Kursus",
        href: "/dashboard/courses/schedule",
        description: "Atur jadwal kursus dan guru pengajar",
      },
      {
        name: "Penempatan Siswa",
        href: "/dashboard/courses/assignments",
        description: "Atur penempatan siswa ke kursus",
      },
    ],
  },
  {
    name: "Sistem Absensi",
    href: "/dashboard/attendance",
    icon: ClipboardList,
    submenu: [
      {
        name: "Absensi Harian",
        href: "/dashboard/attendance/daily",
        description: "Catat dan kelola absensi harian",
      },
      {
        name: "Laporan Absensi",
        href: "/dashboard/attendance/reports",
        description: "Lihat laporan dan statistik absensi",
      },
      {
        name: "Pengaturan Absensi",
        href: "/dashboard/attendance/settings",
        description: "Konfigurasi sistem absensi",
      },
    ],
  },
  {
    name: "Manajemen Nilai",
    href: "/dashboard/grades",
    icon: FilePieChart,
    submenu: [
      {
        name: "Daftar Nilai",
        href: "/dashboard/grades",
        description: "Lihat dan kelola nilai siswa",
      },
      {
        name: "Laporan Nilai",
        href: "/dashboard/grades/reports",
        description: "Generate laporan nilai siswa",
      },
    ],
  },
  {
    name: "Manajemen Sertifikat",
    href: "/dashboard/certificates",
    icon: GraduationCap,
    submenu: [
      {
        name: "Daftar Sertifikat",
        href: "/dashboard/certificates",
        description: "Kelola sertifikat yang telah diterbitkan",
      },
      {
        name: "Template Sertifikat",
        href: "/dashboard/certificates/templates",
        description: "Atur template sertifikat",
      },
      {
        name: "Penerbitan Batch",
        href: "/dashboard/certificates/batch",
        description: "Terbitkan sertifikat secara massal",
      },
    ],
  },
  {
    name: "Manajemen Pembayaran",
    href: "/dashboard/payments",
    icon: Wallet,
    submenu: [
      {
        name: "Transaksi",
        href: "/dashboard/payments/transactions",
        description: "Kelola transaksi pembayaran siswa",
      },
      {
        name: "Laporan Keuangan",
        href: "/dashboard/payments/reports",
        description: "Lihat laporan dan rekap keuangan",
      },
      {
        name: "Pengaturan Pembayaran",
        href: "/dashboard/payments/settings",
        description: "Konfigurasi sistem pembayaran",
      },
    ],
  },
  {
    name: "Jadwal",
    href: "/dashboard/schedule",
    icon: Calendar,
  },
  {
    name: "Laporan",
    href: "/dashboard/reports",
    icon: FilePieChart,
  },
  {
    name: "Pengaturan",
    href: "/dashboard/settings",
    icon: Settings,
  },
  
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menuName: string) => {
    setOpenMenu((current) => (current === menuName ? null : menuName));
  };

  const isMenuOpen = (menuName: string) => openMenu === menuName;

  return (
    <ScrollArea className="flex flex-col h-full">
      <div className="flex h-14 items-center border-b px-6">
        <Link
          className="flex items-center gap-2 font-semibold"
          href="/dashboard"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Shine Education
          </span>
        </Link>
      </div>
      <div className="flex-1 p-4">
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive = item.submenu
              ? item.submenu.some((subitem) => pathname === subitem.href)
              : pathname === item.href;

            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isOpen = isMenuOpen(item.name);

            return (
              <div key={item.name} className="relative group">
                {hasSubmenu ? (
                  // Menu items with submenu
                  <div
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer",
                      isActive
                        ? "bg-red-50 text-red-600"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    )}
                    onClick={() => toggleMenu(item.name)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="text-gray-400">
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                ) : (
                  // Menu items without submenu (like Dashboard)
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all",
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Submenu rendering remains the same */}
                {hasSubmenu && isOpen && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className={cn(
                          "text-sm flex flex-col gap-1 rounded-lg px-3 py-2 transition-all",
                          pathname === subitem.href
                            ? "text-red-600 font-medium"
                            : "text-gray-500 hover:text-gray-900"
                        )}
                      >
                        <span>{subitem.name}</span>
                        {subitem.description && (
                          <span className="text-xs text-gray-400">
                            {subitem.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </ScrollArea>
  );
}
