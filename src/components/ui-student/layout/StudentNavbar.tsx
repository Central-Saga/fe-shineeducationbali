"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  Bell, MessageCircle, Home, BookOpen, CreditCard
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentNavbarProps {
  studentName: string;
  studentImage?: string;
}

export function StudentNavbar({
  studentName,
  studentImage,
}: StudentNavbarProps) {
  const [notifications] = useState(3);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("pengguna");
    router.push("/");
  };

  const navigationItems = [
    { href: "/dashboard-student", label: "Beranda", icon: Home, type: "single" },
    { href: "/dashboard-student/classes", label: "Kelas", icon: BookOpen, type: "single" },
    { href: "/dashboard-student/subscription", label: "Langganan", icon: CreditCard, type: "single" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard-student") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Image
              src="/pichome/logo.png"
              alt="Shine Education Logo"
              width={100}
              height={32}
              className="object-contain"
            />
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
              Student
            </Badge>
          </div>

          {/* Navigation Links - Compact */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href!);
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-yellow-100 text-yellow-800"
                      : "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>

            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5 text-gray-600" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-8">
                  <Avatar className="h-7 w-7">
                    {studentImage ? (
                      <Image
                        src={studentImage}
                        alt={studentName}
                        width={28}
                        height={28}
                      />
                    ) : (
                      <div className="bg-yellow-200 w-full h-full flex items-center justify-center text-yellow-800 font-medium text-sm">
                        {studentName.charAt(0)}
                      </div>
                    )}
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">{studentName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                <DropdownMenuItem>Bantuan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
