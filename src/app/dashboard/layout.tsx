"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  FilePieChart,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manajemen Pengguna",
    href: "/dashboard/users",
    icon: Users,
    submenu: [
      { name: "Daftar Pengguna", href: "/dashboard/users" },
      { name: "Tambah Pengguna", href: "/dashboard/users/create" },
      { name: "Role & Permissions", href: "/dashboard/users/roles" },
    ],
  },
  {
    name: "Kursus",
    href: "/dashboard/courses",
    icon: GraduationCap,
    submenu: [
      { name: "Daftar Kursus", href: "/dashboard/courses" },
      { name: "Kategori", href: "/dashboard/courses/categories" },
      { name: "Materi", href: "/dashboard/courses/materials" },
    ],
  },
  {
    name: "Jadwal",
    href: "/dashboard/schedule",
    icon: Calendar,
  },
  {
    name: "Laporan",
    href: "/dashboard/reports",
    icon: FilePieChart,
  },
  {
    name: "Pengaturan",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <ScrollArea className="flex flex-col h-full">
      <div className="flex h-14 items-center border-b px-6">
        <Link
          className="flex items-center gap-2 font-semibold"
          href="/dashboard"
        >
          <span className="text-xl font-bold">Shine Education</span>
        </Link>
      </div>
      <div className="flex-1 p-4">
        <nav className="flex flex-col gap-1">
          {navigation.map((item, index) => {
            const isActive = item.submenu
              ? item.submenu.some((subitem) => pathname === subitem.href)
              : pathname === item.href;

            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
                {item.submenu && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className={cn(
                          "text-sm flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                          pathname === subitem.href
                            ? "text-red-600 font-medium"
                            : "text-gray-500 hover:text-gray-900"
                        )}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </ScrollArea>
  );
}

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
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Sidebar Desktop */}
      <nav className="hidden lg:flex flex-col w-72 bg-white border-r">
        <SidebarContent />
      </nav>

      {/* Main Content */}
      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-white px-6">
          <div className="flex flex-1 items-center gap-4">
            <Link href="/dashboard" className="lg:hidden">
              <h1 className="text-xl font-bold">Shine Education</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/admin.png" alt="Superadmin" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Superadmin
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      superadmin@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Pengaturan</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
