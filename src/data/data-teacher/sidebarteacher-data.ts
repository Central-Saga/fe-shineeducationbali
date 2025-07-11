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
    name: "Classes",
    icon: BookOpen,
    submenu: [
      {
        name: "Class Management",
        href: "/dashboard-teacher/classes",
        description: "View all classes you teach"
      },
      //       {
      //   name: "Materials",
      //   href: "/dashboard-teacher/materials",
      //   description: "Upload and manage teaching materials"
      // },
      // {
      //   name: "Assignments",
      //   href: "/dashboard-teacher/assignments",
      //   description: "Create and check assignments"
      // },
      // {
      //   name: "Grades",
      //   href: "/dashboard-teacher/grades",
      //   description: "Input and manage student grades"
      // }
    ]
  },
  {
    name: "Students",
    icon: Users,
    submenu: [
      {
        name: "Student List",
        href: "/dashboard-teacher/students",
        description: "Students in your classes"
      },
      {
        name: "Attendance",
        href: "/dashboard-teacher/attendance",
        description: "Record student attendance"
      }
    ]
  },
  {
    name: "Attendance & Leave",
    icon: Clock,
    submenu: [
      {
        name: "My Attendance",
        href: "/dashboard-teacher/attendance/my-attendance",
        description: "Record and view your daily attendance"
      },
      {
        name: "Attendance Summary",
        href: "/dashboard-teacher/attendance/summary",
        description: "View monthly attendance summary"
      },
      {
        name: "Leave Request",
        href: "/dashboard-teacher/attendance/leave-request",
        description: "Submit and manage your leave requests"
      }
    ]
  },
  {
    name: "Salary & Benefits",
    icon: Wallet,
    submenu: [
      {
        name: "Payslip",
        href: "/dashboard-teacher/salary/payslip",
        description: "View and download monthly payslips"
      },
      {
        name: "Payment History",
        href: "/dashboard-teacher/salary/history",
        description: "View salary payment history"
      },
      {
        name: "Benefits",
        href: "/dashboard-teacher/salary/benefits",
        description: "Information on allowances and benefits"
      }
    ]
  },
  // {
  //   name: "Reports",
  //   icon: LineChart,
  //   href: "/dashboard-teacher/reports",
  // },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard-teacher/settings",
  }
];
