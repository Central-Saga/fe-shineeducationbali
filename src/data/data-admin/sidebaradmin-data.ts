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
  Wallet,
  CalendarRange,
  Briefcase, // Tambahan icon untuk Career Center
} from "lucide-react";

export interface SubMenuItem {
  name: string;
  href: string;
  description?: string;
  permission?: string; // 'view' or 'edit' or undefined (defaults to full access)
  roles?: string[]; // which roles can see this menu item
}

export interface MenuItem {
  name: string;
  href: string;
  icon: any; // Using any for Lucide icons
  submenu?: SubMenuItem[];
  permission?: string; // 'view' or 'edit' or undefined (defaults to full access)
  roles?: string[]; // which roles can see this menu item
}

export const sidebarAdminNavigation: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    href: "/dashboard/users",
    icon: Users,
    submenu: [
      {
        name: "All Users",
        href: "/dashboard/users",
        description: "Manage all user accounts in the system",
      },
      {
        name: "Admin & Teacher",
        href: "/dashboard/users/users",
        description: "Manage admin and teacher accounts",
        permission: "view", // Admin hanya bisa view, Super Admin bisa edit (default)
        roles: ["Admin", "Super Admin"], // Hanya Admin dan Super Admin yang bisa melihat menu ini
      },
      {
        name: "Student",
        href: "/dashboard/users/students",
        description: "Manage student data and class placement",
      },
      {
        name: "Teacher",
        href: "/dashboard/users/teachers",
        description: "Manage teacher data and teaching schedule",
      },
      {
        name: "Role & Permissions",
        href: "/dashboard/users/roles",
        description: " Set user roles and access rights",
      },
    ],
  },
    {
    name: "Katalog Program",
    href: "/dashboard/program",
    icon: School,
    submenu: [
      {
        name: "Daftar Program",
        href: "/dashboard/program",
        description: "Kelola katalog program pembelajaran",
      },
    ],
  },
  {
    name: "Classes",
    href: "/dashboard/class",
    icon: Users,
    submenu: [
      {
        name: "Class List",
        href: "/dashboard/class",
        description: "Kelola daftar kelas dan batch pembelajaran",
      },
    ],
  },
  {
    name: "Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
    submenu: [
      {
        name: "Courses List",
        href: "/dashboard/courses",
        description: "Kelola daftar kursus yang tersedia",
      },
      {
        name: "Kategori",
        href: "/dashboard/courses/categories",
        description: "Atur kategori kursus",
      },
    ],
  },
  {
    name: "Attendance",
    href: "/dashboard/attendance",
    icon: ClipboardList,
    submenu: [
      {
        name: "Attendance  Harian",
        href: "/dashboard/attendance/daily",
        description: "Catat dan kelola absensi harian",
      },
      {
        name: "Report Attendance",
        href: "/dashboard/attendance/reports",
        description: "Lihat laporan dan statistik absensi",
      },
      {
        name: "Attendance Settings",
        href: "/dashboard/attendance/settings",
        description: "Konfigurasi sistem absensi",
      },
    ],
  },
  {
    name: "Grade",
    href: "/dashboard/grades",
    icon: FilePieChart,
    submenu: [
      {
        name: "Grade List",
        href: "/dashboard/grades",
        description: "Lihat dan kelola nilai siswa",
      },
      {
        name: " Grade Settings",
        href: "/dashboard/grades/reports",
        description: "Generate laporan nilai siswa",
      },
    ],
  },
  {
    name: "Certificate",
    href: "/dashboard/certificates",
    icon: GraduationCap,
    submenu: [
      {
        name: "Certificate List ",
        href: "/dashboard/certificates",
        description: "Kelola certificate  yang telah diterbitkan",
      },
      {
        name: "Template Certificate ",
        href: "/dashboard/certificates/templates",
        description: "Atur template certificate ",
      },
      {
        name: "Penerbitan Batch",
        href: "/dashboard/certificates/batch",
        description: "Terbitkan certificate  secara massal",
      },
    ],
  },
  {
    name: "Payments",
    href: "/dashboard/payments",
    icon: Wallet,
    submenu: [
      {
        name: "Transaksi",
        href: "/dashboard/payments/transactions",
        description: "Kelola transaksi pembayaran siswa & Gaji Guru",
      },
      {
        name: "Laporan Keuangan",
        href: "/dashboard/payments/reports",
        description: "Lihat laporan dan rekap keuangan",
      },
      {
        name: "Payment Settings",
        href: "/dashboard/payments/settings",
        description: "Konfigurasi sistem pembayaran",
      },
    ],
  },
  {
    name: "Schedule",
    href: "/dashboard/schedule",
    icon: CalendarRange,
  },
    {
    name: "Career Center",
    href: "/dashboard/career",
    icon: Briefcase,
    submenu: [
      {
        name: "Job Vacancies",
        href: "/dashboard/career/vacancies",
        description: "Kelola lowongan pekerjaan yang tersedia",
      },
      {
        name: "Job Applications",
        href: "/dashboard/career/applications",
        description: "Kelola lamaran pekerjaan yang masuk",
      },
    ],
  },
  // {
  //   name: "Reports",
  //   href: "/dashboard/reports",
  //   icon: FilePieChart,
  // },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
