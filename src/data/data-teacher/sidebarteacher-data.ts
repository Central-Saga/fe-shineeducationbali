import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  GraduationCap,
  Home,
  ClipboardList,
  Award,
  LineChart,
  Settings,
  BookOpenCheck
} from "lucide-react";

export const sidebarTeacherNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard-teacher",
    icon: Home,
  },
  {
    name: "Kelas",
    icon: BookOpen,
    submenu: [
      {
        name: "Daftar Kelas",
        href: "/dashboard-teacher/classes",
        description: "Lihat semua kelas yang Anda ajar"
      },
      {
        name: "Jadwal",
        href: "/dashboard-teacher/schedule",
        description: "Jadwal mengajar Anda"
      }
    ]
  },
  {
    name: "Siswa",
    icon: Users,
    submenu: [
      {
        name: "Daftar Siswa",
        href: "/dashboard-teacher/students",
        description: "Siswa dalam kelas Anda"
      },
      {
        name: "Kehadiran",
        href: "/dashboard-teacher/attendance",
        description: "Rekam kehadiran siswa"
      }
    ]
  },
  {
    name: "Pembelajaran",
    icon: GraduationCap,
    submenu: [
      {
        name: "Materi",
        href: "/dashboard-teacher/materials",
        description: "Upload dan kelola materi ajar"
      },
      {
        name: "Tugas",
        href: "/dashboard-teacher/assignments",
        description: "Buat dan periksa tugas"
      },
      {
        name: "Nilai",
        href: "/dashboard-teacher/grades",
        description: "Input dan kelola nilai siswa"
      }
    ]
  },
  {
    name: "Laporan",
    icon: LineChart,
    href: "/dashboard-teacher/reports",
  },
  {
    name: "Pengaturan",
    icon: Settings,
    href: "/dashboard-teacher/settings",
  }
];
