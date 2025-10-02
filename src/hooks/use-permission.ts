import { useEffect, useState } from "react";
import { roleService } from "@/lib/services/role.service";
import type { PermissionCode } from "@/types/role";

export function usePermission(requiredPermission: PermissionCode) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        // Get all permissions first
        const permissionsResponse = await roleService.getPermissions();
        const permissions = permissionsResponse.data || [];
        
        // Ensure permissions is an array
        const permissionsArray = Array.isArray(permissions) ? permissions : [];
        
        // Check if the required permission exists in the system
        const hasRequiredPermission = permissionsArray.some(
          (permission: { code: string }) => permission.code === requiredPermission
        );
        
        setHasPermission(hasRequiredPermission);
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
