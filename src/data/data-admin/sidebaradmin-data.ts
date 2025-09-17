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
        name: "Students",
        href: "/dashboard/users/students",
        description: "Manage student data and class placement",
      },
      {
        name: "Teachers",
        href: "/dashboard/users/teachers",
        description: "Manage teacher data and teaching schedule",
      },
      {
        name: "Roles & Permissions",
        href: "/dashboard/users/roles",
        description: "Set user roles and access rights",
      },
    ],
  },
  {
    name: "Class Room",
    href: "/dashboard/classroom",
    icon: School,
    submenu: [
      {
        name: "Program Catalog",
        href: "/dashboard/program",
        description: "Manage learning program catalog",
      },
      {
        name: "Course List",
        href: "/dashboard/courses",
        description: "Manage available courses",
      },
      {
        name: "Class Management",
        href: "/dashboard/class",
        description: "Manage class schedules and batches",
      },
      {
        name: "Schedule Management",
        href: "/dashboard/schedule",
        description: "Manage class schedules and timetables",
      },
    ],
  },
  {
    name: "Attendance",
    href: "/dashboard/attendance",
    icon: ClipboardList,
    submenu: [
      {
        name: "Students",
        href: "/dashboard/attendance/students",
        description: "Monitor student attendance input by teachers",
      },
      {
        name: "Teachers",
        href: "/dashboard/attendance/teachers",
        description: "Monitor teacher attendance uploaded by themselves",
      },
      {
        name: "Reports",
        href: "/dashboard/attendance/reports",
        description: "View attendance reports and statistics",
      },
      {
        name: "Settings",
        href: "/dashboard/attendance/settings",
        description: "Configure attendance system",
      },
    ],
  },
  {
    name: "Grade Management",
    href: "/dashboard/grades",
    icon: FilePieChart,
    submenu: [
      {
        name: "Grade List",
        href: "/dashboard/grades",
        description: "View and manage student grades",
      },
      {
        name: "Grade Reports",
        href: "/dashboard/grades/reports",
        description: "Generate student grade reports",
      },
    ],
  },
  {
    name: "Certificate Management",
    href: "/dashboard/certificates",
    icon: GraduationCap,
    submenu: [
      {
        name: "Certificate List",
        href: "/dashboard/certificates",
        description: "Manage issued certificates",
      },
      {
        name: "Certificate Templates",
        href: "/dashboard/certificates/templates",
        description: "Configure certificate templates",
      },
      {
        name: "Batch Issuance",
        href: "/dashboard/certificates/batch",
        description: "Issue certificates in bulk",
      },
    ],
  },
  {
    name: "Payment Management",
    href: "/dashboard/payments",
    icon: Wallet,
    submenu: [

      {
        name: "Teacher Salary",
        href: "/dashboard/payments/teacher-salary",
        description: "Manage teacher salary payments",
      },
      {
        name: "Student Packages",
        href: "/dashboard/payments/student-packages",
        description: "Manage student program packages",
      },
    ],
  },
  {
    name: "Career Center",
    href: "/dashboard/career",
    icon: Briefcase,
    submenu: [
      {
        name: "Job Vacancies",
        href: "/dashboard/career/vacancies",
        description: "Manage available job positions",
      },
      {
        name: "Job Applications",
        href: "/dashboard/career/applications",
        description: "Manage incoming job applications",
      },
    ],
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
