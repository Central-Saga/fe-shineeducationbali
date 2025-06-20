import { useEffect, useState } from "react";
import { roleService } from "@/lib/services/role.service";
import type { PermissionCode } from "@/types/role";

export function usePermission(requiredPermission: PermissionCode) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const permissions = await roleService.getUserPermissions(
          "current-user"
        );
        setHasPermission(
          roleService.hasPermission(requiredPermission, permissions)
        );
      } catch (error) {
        console.error("Failed to check permissions:", error);
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [requiredPermission]);

  return { hasPermission, loading };
}
