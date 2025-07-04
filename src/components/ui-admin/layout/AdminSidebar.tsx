"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarAdminNavigation, MenuItem } from "@/data/data-admin/sidebaradmin-data";

export function AdminSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string[]>([]);
  const [filteredNavigation, setFilteredNavigation] = useState<MenuItem[]>(sidebarAdminNavigation);

  useEffect(() => {
    // Get user data from localStorage
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("pengguna");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          const roles = Array.isArray(user.role) ? user.role : [user.role];
          setUserRole(roles);
          
          // For now, we show all menu items for Admin and Super Admin
          // If specific filtering is needed, it can be implemented here
          console.log("User roles for sidebar:", roles);
        } catch (error) {
          console.error("Error parsing user data for sidebar:", error);
        }
      }
    }
  }, []);

  const toggleMenu = (menuName: string) => {
    setOpenMenu((current) => (current === menuName ? null : menuName));
  };

  const isMenuOpen = (menuName: string) => openMenu === menuName;

  return (
    <ScrollArea className="flex flex-col h-full bg-gradient-to-b from-[#f8f8f8] to-white">
      {/* Logo Section with Wave Background */}
      <div className="relative py-4 px-4 overflow-hidden">
        {/* Wave background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#C40503] to-[#DAA625] overflow-hidden">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              fill="white" 
              fillOpacity="0.15"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              fill="white" 
              fillOpacity="0.1"
            ></path>
          </svg>
        </div>
        
        {/* Logo centered on the wave background */}
        <Link
          className="flex items-center justify-center relative z-10"
          href="/dashboard"
        >
          <div className="bg-white rounded-lg p-2 shadow-lg">
            <Image
              src="/pichome/logo.png"
              alt="Shine Education Logo"
              width={120}
              height={120}
              className="h-12 w-auto object-contain"
              priority
              quality={100}
            />
          </div>
        </Link>
      </div>
      
      {/* Navigation Section */}
      <div className="flex-1 px-3 py-4 mt-2">
        <div className="relative mb-6">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="absolute left-0 w-1/3 h-px bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
          <div className="pt-4 pb-2">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-2 flex items-center">
              <span className="w-1 h-4 bg-[#C40503] rounded-full mr-2"></span>
              MENU UTAMA
              {userRole.includes("Super Admin") && (
                <span className="ml-2 px-2 py-0.5 text-[10px] bg-gradient-to-r from-[#C40503] to-[#DAA625] text-white rounded-full">
                  SUPER ADMIN
                </span>
              )}
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1.5">
          {sidebarAdminNavigation.map((item) => {
            // Check if the current user has permission to see this menu item
            if (item.roles && !item.roles.some(role => userRole.includes(role))) {
              return null; // Don't show this menu item if user doesn't have the required role
            }

            // Create a deep copy of the item for modification
            const menuItem = { ...item };
            
            // If item has submenu, filter its submenu items based on user role
            if (menuItem.submenu && menuItem.submenu.length > 0) {
              menuItem.submenu = menuItem.submenu
                .filter(subitem => {
                  // Keep the item if no roles specified or user has one of the required roles
                  return !subitem.roles || subitem.roles.some(role => userRole.includes(role));
                })
                .map(subitem => {
                  // Add view-only badge for items with view permission for Admin
                  if (subitem.permission === "view" && !userRole.includes("Super Admin")) {
                    return {
                      ...subitem,
                      description: subitem.description + " (View Only)" // Add view-only indicator
                    };
                  }
                  return subitem;
                });
            }

            const isActive =
              menuItem.submenu?.some((subitem) => pathname === subitem.href) ??
              pathname === menuItem.href;

            const hasSubmenu = menuItem.submenu && menuItem.submenu.length > 0;
            const isOpen = isMenuOpen(menuItem.name);

            return (
              <div key={item.name} className="relative group">
                {hasSubmenu ? (
                  // Menu items with submenu
                  <div
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 transition-all cursor-pointer",
                      isActive
                        ? "bg-gradient-to-r from-[#C40503]/10 to-[#DAA625]/10 text-[#C40503] font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                    onClick={() => toggleMenu(item.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-7 w-7 rounded-md flex items-center justify-center",
                        isActive 
                          ? "bg-[#C40503] text-white"
                          : "bg-gray-100 text-gray-500"
                      )}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className={isActive ? "text-[#C40503]" : "text-gray-400"}>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                ) : (
                  // Menu items without submenu (like Dashboard)
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 transition-all",
                        isActive
                          ? "bg-gradient-to-r from-[#C40503]/10 to-[#DAA625]/10 text-[#C40503] font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-7 w-7 rounded-md flex items-center justify-center",
                          isActive 
                            ? "bg-[#C40503] text-white"
                            : "bg-gray-100 text-gray-500"
                        )}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </div>
                  </Link>
                )}
                
                {/* Submenu Items */}
                {hasSubmenu && isOpen && item.submenu && (
                  <div className="ml-10 mt-1 flex flex-col gap-0.5 border-l-2 border-gray-100 pl-3">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className={cn(
                          "text-sm flex flex-col gap-1 rounded-lg px-3 py-2 transition-all",
                          pathname === subitem.href
                            ? "text-[#C40503] font-medium"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        )}
                      >
                        <span>{subitem.name}</span>
                        {subitem.description && (
                          <span className="text-xs text-gray-400">
                            {subitem.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        
        {/* Decorative element at the bottom */}
        <div className="mt-8 relative pt-6">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-px w-4/5 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="flex justify-center">
            <div className="rounded-full h-1 w-24 bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
