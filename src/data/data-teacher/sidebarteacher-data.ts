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
  BookOpenCheck,
  Clock,
  Wallet,
  CalendarRange,
  BarChart4,
  FileHeart,
  Receipt,
  History,
  Gift
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
    name: "Absensi & Cuti",
    icon: Clock,
    submenu: [
      {
        name: "Kehadiran Saya",
        href: "/dashboard-teacher/attendance/my-attendance",
        description: "Catat dan lihat absensi harian Anda"
      },
      {
        name: "Rekap Kehadiran",
        href: "/dashboard-teacher/attendance/summary",
        description: "Lihat rekap kehadiran bulanan"
      },
      {
        name: "Pengajuan Cuti",
        href: "/dashboard-teacher/attendance/leave-request",
        description: "Ajukan dan kelola pengajuan cuti Anda"
      }
    ]
  },
  {
    name: "Gaji & Tunjangan",
    icon: Wallet,
    submenu: [
      {
        name: "Slip Gaji",
        href: "/dashboard-teacher/salary/payslip",
        description: "Lihat dan unduh slip gaji bulanan"
      },
      {
        name: "Riwayat Pembayaran",
        href: "/dashboard-teacher/salary/history",
        description: "Lihat riwayat pembayaran gaji"
      },
      {
        name: "Tunjangan",
        href: "/dashboard-teacher/salary/benefits",
        description: "Informasi tunjangan dan benefit"
      }
    ]
  },
  // {
  //   name: "Laporan",
  //   icon: LineChart,
  //   href: "/dashboard-teacher/reports",
  // },
  {
    name: "Pengaturan",
    icon: Settings,
    href: "/dashboard-teacher/settings",
  }
];
