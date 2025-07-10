"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, MessageCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

  const handleLogout = () => {
    localStorage.removeItem("pengguna");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-white border-b border-gray-100 px-6 py-3">
      <div className="flex items-center max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-2 w-[200px]">
          <Image
            src="/pichome/logo.png"
            alt="Shine Education Logo"
            width={120}
            height={40}
            className="object-contain"
          />
          <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            Student
          </span>
        </div>

        {/* Navigation Links - Centered */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard-student"
              className="text-gray-600 hover:text-yellow-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard-student/academy"
              className="text-gray-600 hover:text-yellow-600 font-medium transition-colors"
            >
              Academy
            </Link>
            <Link
              href="/dashboard-student/classes"
              className="text-gray-600 hover:text-yellow-600 font-medium transition-colors"
            >
              Class
            </Link>
            <Link
              href="/dashboard-student/subscription"
              className="text-gray-600 hover:text-yellow-600 font-medium transition-colors"
            >
              Langganan
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 w-[200px] justify-end">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5 text-gray-600" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {studentImage ? (
                    <Image
                      src={studentImage}
                      alt={studentName}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="bg-yellow-200 w-full h-full flex items-center justify-center text-yellow-800 font-medium">
                      {studentName.charAt(0)}
                    </div>
                  )}
                </Avatar>
                <span className="text-sm font-medium">{studentName}</span>
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
    </nav>
  );
}
