"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { roleService } from "@/lib/services/role.service";
import { PermissionCode } from "@/types/role";
import { Loading } from "@/components/ui/loading";

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermission: PermissionCode;
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  children,
  requiredPermission,
  fallback,
}: PermissionGuardProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        // Get all permissions first
        const permissionsResponse = await roleService.getPermissions();
        const permissions = permissionsResponse.data || [];
        
        // Ensure permissions is an array
        const permissionsArray = Array.isArray(permissions) ? permissions : [];
        
        // For now, we'll allow access if the permission exists in the system
        // In a real implementation, you would check against user's actual permissions
        const hasRequiredPermission = permissionsArray.some(
          (permission: { code: string }) => permission.code === requiredPermission
        );
        
        setHasPermission(hasRequiredPermission);
      } catch (error) {
        console.error("Failed to check permissions:", error);
        setHasPermission(false);
      }
    };

    checkPermission();
  }, [requiredPermission]);

  if (hasPermission === null) {
    return <Loading fullScreen size="lg" />;
  }

  if (!hasPermission) {
    return fallback || redirect("/dashboard");
  }

  return <>{children}</>;
}
