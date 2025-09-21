import {
  Role,
  PermissionCode,
} from "@/types/role";
import { apiRequest } from "../api";

class RoleService {
  private defaultPermissions: Record<Role, PermissionCode[]> = {
    admin: [
      "student.view",
      "student.create",
      "student.edit",
      "student.delete",
      "class.view",
      "class.create",
      "class.edit",
      "class.delete",
      "attendance.view",
      "attendance.create",
      "attendance.edit",
      "grade.view",
      "grade.create",
      "grade.edit",
      "user.view",
      "user.create",
      "user.edit",
      "user.delete",
      "report.view",
      "report.create",
      "report.export",
    ],
    teacher: [
      "student.view",
      "class.view",
      "attendance.view",
      "attendance.create",
      "attendance.edit",
      "grade.view",
      "grade.create",
      "grade.edit",
      "report.view",
      "report.create",
    ],
    student: ["class.view", "attendance.view", "grade.view", "report.view"],
  };

  async getUserRoles(userId: string): Promise<Role[]> {
    return apiRequest<Role[]>("GET", `/api/v1/users/${userId}/roles`);
  }

  async getUserPermissions(userId: string): Promise<PermissionCode[]> {
    const roles = await this.getUserRoles(userId);
    const permissions = new Set<PermissionCode>();

    roles.forEach((role) => {
      this.defaultPermissions[role].forEach((permission) => {
        permissions.add(permission);
      });
    });

    return Array.from(permissions);
  }

  hasPermission(
    requiredPermission: PermissionCode,
    userPermissions: PermissionCode[]
  ): boolean {
    return userPermissions.includes(requiredPermission);
  }

  async assignRole(userId: string, role: Role): Promise<void> {
    return apiRequest<void>("POST", `/api/v1/users/${userId}/roles`, { role });
  }

  async removeRole(userId: string, role: Role): Promise<void> {
    return apiRequest<void>("DELETE", `/api/v1/users/${userId}/roles`, { role });
  }
}

export const roleService = new RoleService();
