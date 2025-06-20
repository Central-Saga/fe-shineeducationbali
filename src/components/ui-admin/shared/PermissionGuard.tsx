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
        const permissions = await roleService.getUserPermissions(
          "current-user"
        );
        setHasPermission(
          roleService.hasPermission(requiredPermission, permissions)
        );
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
