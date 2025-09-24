export interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
  category: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: number[]; // Array of permission IDs
  isDefault: boolean;
  userCount: number;
}

export const mockPermissions: Permission[] = [
  {
    id: 1,
    name: "View Dashboard",
    code: "view_dashboard",
    description: "Can view main dashboard statistics and charts",
    category: "Dashboard",
  },
  {
    id: 2,
    name: "Manage Users",
    code: "manage_users",
    description: "Can create, edit, and delete user accounts",
    category: "User Management",
  },
  {
    id: 3,
    name: "View Users",
    code: "view_users",
    description: "Can view user accounts details",
    category: "User Management",
  },
  {
    id: 4,
    name: "Manage Students",
    code: "manage_students",
    description: "Can create, edit, and delete student accounts",
    category: "User Management",
  },
  {
    id: 5,
    name: "View Students",
    code: "view_students",
    description: "Can view student details",
    category: "User Management",
  },
  {
    id: 6,
    name: "Manage Teachers",
    code: "manage_teachers",
    description: "Can create, edit, and delete teacher accounts",
    category: "User Management",
  },
  {
    id: 7,
    name: "View Teachers",
    code: "view_teachers",
    description: "Can view teacher details",
    category: "User Management",
  },
  {
    id: 8,
    name: "Manage Classes",
    code: "manage_classes",
    description: "Can create, edit, and delete classes",
    category: "Class Management",
  },
  {
    id: 9,
    name: "View Classes",
    code: "view_classes",
    description: "Can view class details",
    category: "Class Management",
  },
  {
    id: 10,
    name: "Manage Programs",
    code: "manage_programs",
    description: "Can create, edit, and delete programs",
    category: "Program Management",
  },
  {
    id: 11,
    name: "View Programs",
    code: "view_programs",
    description: "Can view program details",
    category: "Program Management",
  },
  {
    id: 12,
    name: "Manage Programs",
    code: "manage_programs",
    description: "Can create, edit, and delete programs",
    category: "Program Management",
  },
  {
    id: 13,
    name: "View Programs",
    code: "view_programs",
    description: "Can view program details",
    category: "Program Management",
  },
  {
    id: 14,
    name: "Manage Payments",
    code: "manage_payments",
    description: "Can view and process payments",
    category: "Finance",
  },
  {
    id: 15,
    name: "View Payments",
    code: "view_payments",
    description: "Can view payment details",
    category: "Finance",
  },
  {
    id: 16,
    name: "Manage Certificates",
    code: "manage_certificates",
    description: "Can create, edit, and delete certificates",
    category: "Certificates",
  },
  {
    id: 17,
    name: "View Certificates",
    code: "view_certificates",
    description: "Can view certificate details",
    category: "Certificates",
  },
  {
    id: 18,
    name: "Manage Reports",
    code: "manage_reports",
    description: "Can create and edit reports",
    category: "Reports",
  },
  {
    id: 19,
    name: "View Reports",
    code: "view_reports",
    description: "Can view reports",
    category: "Reports",
  },
  {
    id: 20,
    name: "Manage Roles",
    code: "manage_roles",
    description: "Can create, edit, and delete roles and permissions",
    category: "System",
  },
];

export const mockRoles: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    description: "Complete access to all system features and settings",
    permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    isDefault: false,
    userCount: 2,
  },
  {
    id: 2,
    name: "Admin",
    description: "Administrative access with some limitations",
    permissions: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
    isDefault: false,
    userCount: 5,
  },
  {
    id: 3,
    name: "Teacher",
    description: "Access to teaching materials and student management",
    permissions: [1, 5, 7, 9, 11, 13, 17, 19],
    isDefault: false,
    userCount: 15,
  },
  {
    id: 4,
    name: "Student",
    description: "Access to learning materials and their own profile",
    permissions: [1],
    isDefault: true,
    userCount: 250,
  },
  {
    id: 5,
    name: "Parent",
    description: "Access to view their child's progress and schedule",
    permissions: [1],
    isDefault: false,
    userCount: 180,
  },
  {
    id: 6,
    name: "Staff",
    description: "Basic administrative access for clerical tasks",
    permissions: [1, 3, 5, 7, 9, 11, 15, 17],
    isDefault: false,
    userCount: 8,
  },
];
