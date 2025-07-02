"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeacherHeaderProps {
  onLogout: () => void;
}

interface UserData {
  nama: string;
  email: string;
  peran: string[];
}

export function TeacherHeader({ onLogout }: TeacherHeaderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem("pengguna");
    if (data) {
      try {
        setUserData(JSON.parse(data));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-6 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <Link href="/dashboard-teacher" className="lg:hidden">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Shine Education
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/teacher.png" alt={userData?.nama || 'User'} />
                <AvatarFallback>{userData ? getInitials(userData.nama) : 'T'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData?.nama || 'Loading...'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData?.email || 'Loading...'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userData?.peran?.[0] || 'Teacher'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard-teacher/settings">
                <Settings className="mr-3 h-4 w-4" />
                <span>Pengaturan</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={onLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
