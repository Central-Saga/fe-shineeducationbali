"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/ui-admin/layout/AdminSidebar";
import { AdminHeader } from "@/components/ui-admin/layout/AdminHeader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for authentication on client-side
    if (typeof window !== "undefined") {
      // Get user data from localStorage - primary source
      const userData = localStorage.getItem("pengguna");

      if (!userData) {
        console.log("No user data found in localStorage, redirecting to login");
        router.push("/auth/login");
        return;
      }

      try {
        const user = JSON.parse(userData);

        // Check if user has admin role (support both array and string formats)
        const hasAdminRole = 
          Array.isArray(user.role) 
            ? user.role.some((role: string) => ["Admin", "Super Admin"].includes(role))
            : ["Admin", "Super Admin"].includes(user.role);

        if (!user.role || !hasAdminRole) {
          console.log("User is not an admin, redirecting to login");
          router.push("/auth/login");
          return;
        }

        console.log("Admin user authenticated successfully");
        setMounted(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/auth/login");
      }
    } else {
      setMounted(true);
    }
  }, [router]);

  if (!mounted) {
    return null;
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem("pengguna");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block w-64 border-r min-h-screen">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed left-4 top-4 z-40 bg-white shadow-md border-gray-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Main navigation menu for the dashboard</SheetDescription>
          </SheetHeader>
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader onLogout={handleLogout} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
