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
  role: string[];
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
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-8 shadow-sm dark:bg-gray-900">
      <div className="flex flex-1 items-center gap-4">
        <Link href="/dashboard-teacher" className="lg:hidden">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Shine Education
          </h1>
        </Link>
        <div className="hidden md:flex text-sm font-medium ml-4">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#C40503]/5 to-[#DAA625]/5">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span>Teacher Dashboard</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-700" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#C40503] flex items-center justify-center text-[10px] text-white">3</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-[#DAA625]/20 hover:border-[#DAA625]/50 transition-all">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/teacher.png" alt={userData?.nama || 'User'} />
                <AvatarFallback className="bg-gradient-to-r from-[#C40503] to-[#DAA625] text-white">{userData ? getInitials(userData.nama) : 'T'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData?.nama || 'Loading...'}</p>
                <p className="text-xs leading-none text-muted-foreground mt-1">
                  {userData?.email || 'Loading...'}
                </p>
                <p className="text-xs text-[#DAA625] mt-1 font-medium">
                  {userData?.role?.[0] || 'Teacher'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="p-3">
              <Link href="/dashboard-teacher/settings" className="flex items-center">
                <Settings className="mr-3 h-4 w-4 text-gray-600" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-3 text-[#C40503] cursor-pointer hover:bg-[#C40503]/5 hover:text-[#C40503]"
              onClick={onLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
