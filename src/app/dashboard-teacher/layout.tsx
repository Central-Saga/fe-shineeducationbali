"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sheet } from "@/components/ui/sheet";
import { TeacherSidebar } from "@/components/ui-teacher/layout/TeacherSidebar";
import { TeacherHeader } from "@/components/ui-teacher/layout/TeacherHeader";

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check authentication only if in browser (client-side)
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("pengguna");
      
      if (!userData) {
        console.log("No user data found, redirecting to login");
        router.push("/auth/login");
        return;
      }

      try {
        const user = JSON.parse(userData);
        console.log("User data:", user);
        
        // For debugging
        if (user.role) {
          console.log("User role:", user.role);
        } else {
          console.log("User has no role defined");
        }

        // Check if user has teacher role
        if (!user.role || 
            (Array.isArray(user.role) && !user.role.includes("Teacher")) || 
            (typeof user.role === 'string' && user.role !== "Teacher")) {
          console.log("User is not a teacher, redirecting to login");
          router.push("/auth/login");
          return;
        }
        
        // User is authenticated and has teacher role
        setMounted(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Don't redirect on parsing error, just log it
        setMounted(true);
      }
    } else {
      // We're on the server, just render
      setMounted(true);
    }
  }, [router]);

  if (!mounted) {
    return null;
  }

  // Logout handler
  const handleLogout = () => {
    try {
      localStorage.removeItem("pengguna");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:flex h-full">
        <TeacherSidebar />
      </div>
      
      {/* Main content area with header */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Header is always visible at the top */}
        <TeacherHeader onLogout={handleLogout} />
        
        {/* Main scrollable area */}
        <div className="flex-1 overflow-auto">
          <div className="absolute top-0 right-0 w-full h-64 bg-[#C40503]/5 -z-10" />
          <main className="p-8 max-w-11xl mx-auto relative">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
