import {
  Role,
  Permission,
  RolePermission,
  UserRole,
  PermissionCode,
} from "@/types/role";

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
    // TODO: Implement API call to get user roles
    return ["student"];
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
    // TODO: Implement API call to assign role
  }

  async removeRole(userId: string, role: Role): Promise<void> {
    // TODO: Implement API call to remove role
  }
}

export const roleService = new RoleService();
