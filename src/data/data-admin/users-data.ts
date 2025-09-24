// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending" | "Aktif" | "Nonaktif";
  avatar?: string;
  phone?: string;
  lastActive?: string;
  createdAt?: string;
  permissions?: string[];
  department?: string;
  position?: string;
}

// Mock users for UserList/UsersManagement component
export const mockDetailedUsers: User[] = [
  {
    id: "USR001",
    name: "John Smith",
    email: "john.smith@shineeducation.com",
    role: "Super Admin",
    status: "active",
    avatar: "/images/avatars/admin1.png",
    phone: "+62812345678",
    lastActive: "2025-07-05T09:30:00",
    createdAt: "2023-01-10",
    permissions: ["view_all", "edit_all", "delete", "manage_users"],
    department: "Management",
    position: "IT Director",
  },
  {
    id: "USR002",
    name: "Sarah Johnson",
    email: "sarah.johnson@shineeducation.com",
    role: "Admin",
    status: "active",
    avatar: "/images/avatars/admin2.png",
    phone: "+62823456789",
    lastActive: "2025-07-04T15:45:00",
    createdAt: "2023-02-15",
    permissions: ["view_all", "edit_limited", "manage_students"],
    department: "Administration",
    position: "Office Manager",
  },
  {
    id: "USR003",
    name: "Michael Brown",
    email: "michael.brown@shineeducation.com",
    role: "Teacher",
    status: "active",
    avatar: "/images/avatars/teacher1.png",
    phone: "+62834567890",
    lastActive: "2025-07-05T08:15:00",
    createdAt: "2023-03-20",
    permissions: ["view_classes", "edit_grades", "manage_attendance"],
    department: "Education",
    position: "Senior Teacher",
  },
  {
    id: "USR004",
    name: "Emily Wilson",
    email: "emily.wilson@shineeducation.com",
    role: "Teacher",
    status: "inactive",
    avatar: "/images/avatars/teacher2.png",
    phone: "+62845678901",
    lastActive: "2025-07-01T10:30:00",
    createdAt: "2023-04-05",
    permissions: ["view_classes", "edit_grades"],
    department: "Education",
    position: "Junior Teacher",
  },
  {
    id: "USR005",
    name: "David Lee",
    email: "david.lee@shineeducation.com",
    role: "Student",
    status: "active",
    avatar: "/images/avatars/student1.png",
    phone: "+62856789012",
    lastActive: "2025-07-05T11:20:00",
    createdAt: "2023-05-12",
    permissions: ["view_programs"],
    department: "Student",
    position: "Student",
  },
  {
    id: "USR006",
    name: "Jennifer Lopez",
    email: "jennifer.lopez@shineeducation.com",
    role: "Student",
    status: "pending",
    avatar: "/images/avatars/student2.png",
    phone: "+62867890123",
    lastActive: "2025-07-03T14:10:00",
    createdAt: "2023-06-18",
    permissions: ["view_programs"],
    department: "Student",
    position: "Student",
  },
  {
    id: "USR007",
    name: "Robert Davis",
    email: "robert.davis@shineeducation.com",
    role: "Admin",
    status: "active",
    avatar: "/images/avatars/admin3.png",
    phone: "+62878901234",
    lastActive: "2025-07-05T07:45:00",
    createdAt: "2023-07-22",
    permissions: ["view_all", "edit_limited"],
    department: "Finance",
    position: "Financial Manager",
  },
  {
    id: "USR008",
    name: "Linda Miller",
    email: "linda.miller@shineeducation.com",
    role: "Teacher",
    status: "active",
    avatar: "/images/avatars/teacher3.png",
    phone: "+62889012345",
    lastActive: "2025-07-04T13:25:00",
    createdAt: "2023-08-30",
    permissions: ["view_classes", "edit_grades", "manage_attendance"],
    department: "Education",
    position: "Teacher",
  },
];

// Original mock users for other components
export const mockUsers = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Murid",
    email: "budi@example.com",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Ani Wijaya",
    role: "Staff",
    email: "ani@example.com",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Dewi Putri",
    role: "Murid",
    email: "dewi@example.com",
    status: "Nonaktif",
  },
  {
    id: 4,
    name: "Rina Sari",
    role: "Guru",
    email: "rina@example.com",
    status: "Aktif",
  },
  {
    id: 5,
    name: "Joko Widodo",
    role: "Admin",
    email: "joko@example.com",
    status: "Aktif",
  },
];
