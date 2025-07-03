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

interface AdminHeaderProps {
  onLogout: () => void;
}

interface UserData {
  nama: string;
  email: string;
  role: string[];
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const data = localStorage.getItem("pengguna");
    if (data) {
      setUserData(JSON.parse(data));
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
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-white px-6 shadow-md">
      <div className="flex flex-1 items-center gap-4">
        <Link href="/dashboard" className="lg:hidden">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Shine Education
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center gap-3 ml-4">
          <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-1.5 rounded-full border border-green-200 text-sm text-green-700 flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Status Sistem: Normal</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div className="hidden md:flex relative">
          <div className="absolute left-3 top-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Cari..."
            className="w-64 rounded-lg bg-gray-50 border border-gray-200 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C40503] focus:border-transparent transition-all hover:bg-gray-100" 
          />
        </div>
        
        {/* Notification bell with counter */}
        <div className="relative">
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-200 bg-white hover:bg-gray-50 hover:text-[#C40503]">
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>
          <span className="absolute top-0 right-0 h-5 w-5 bg-[#C40503] rounded-full flex items-center justify-center text-[10px] text-white font-medium border-2 border-white">3</span>
        </div>
        
        <div className="h-8 w-px bg-gray-200"></div>
        
        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-3 rounded-full pl-2 pr-4 hover:bg-gray-100">
              <Avatar className="h-10 w-10 border-2 border-[#DAA625] ring-2 ring-gray-100">
                <AvatarImage src="/avatars/admin.png" alt={userData?.nama || 'User'} />
                <AvatarFallback className="bg-gradient-to-br from-[#C40503] to-[#DAA625] text-white">
                  {userData ? getInitials(userData.nama) : 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium leading-none">{userData?.nama || 'Admin'}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <span className="h-1.5 w-1.5 bg-[#DAA625] rounded-full mr-1.5"></span>
                  <span>{userData?.role?.[0] || 'Super Admin'}</span>
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60" align="end" forceMount>
            <div className="flex items-center gap-2 p-2 border-b">
              <div className="bg-gradient-to-r from-[#C40503] to-[#DAA625] w-1 h-4 rounded-full"></div>
              <div className="font-medium">Menu Pengguna</div>
            </div>
            <div className="p-2 bg-gray-50">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData?.nama || 'Admin Shine'}</p>
                <p className="text-xs text-gray-500">
                  {userData?.email || 'admin@shineeducation.com'}
                </p>
                <p className="text-xs text-[#C40503] font-medium mt-1">
                  {userData?.role?.[0] || 'Super Admin'}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <span className="block text-sm">Profil Saya</span>
                <span className="block text-xs text-gray-500">Kelola informasi akun</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-amber-50 flex items-center justify-center">
                <Settings className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <span className="block text-sm">Pengaturan</span>
                <span className="block text-xs text-gray-500">Konfigurasi sistem</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer text-[#C40503]"
              onClick={onLogout}
            >
              <div className="h-8 w-8 rounded-md bg-red-50 flex items-center justify-center">
                <LogOut className="h-4 w-4 text-[#C40503]" />
              </div>
              <div>
                <span className="block text-sm">Keluar</span>
                <span className="block text-xs text-gray-500">Keluar dari akun</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}