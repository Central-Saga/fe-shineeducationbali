"use client";

import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/ui-admin/layout/AdminSidebar";
import { AdminHeader } from "@/components/ui-admin/layout/AdminHeader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement proper logout logic here (clear session, tokens, etc)
    router.push("/"); // Redirect to landing page
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed left-4 top-4 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      {/* Sidebar Desktop */}
      <nav className="hidden lg:flex flex-col w-72 bg-white border-r">
        <AdminSidebar />
      </nav>

      {/* Main Content */}
      <div className="flex-1">
        <AdminHeader onLogout={handleLogout} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
