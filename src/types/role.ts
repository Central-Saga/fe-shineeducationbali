export type Role = "admin" | "teacher" | "student";

export interface Permission {
  id: string;
  name: string;
  description: string;
  code: PermissionCode;
}

export type PermissionCode =
  // Student Management
  | "student.view"
  | "student.create"
  | "student.edit"
  | "student.delete"
  // Class Management
  | "class.view"
  | "class.create"
  | "class.edit"
  | "class.delete"
  // Attendance Management
  | "attendance.view"
  | "attendance.create"
  | "attendance.edit"
  // Grade Management
  | "grade.view"
  | "grade.create"
  | "grade.edit"
  // User Management
  | "user.view"
  | "user.create"
  | "user.edit"
  | "user.delete"
  // Report Management
  | "report.view"
  | "report.create"
  | "report.export";

export interface RolePermission {
  roleId: string;
  permissions: PermissionCode[];
}

export interface UserRole {
  userId: string;
  roles: Role[];
}
