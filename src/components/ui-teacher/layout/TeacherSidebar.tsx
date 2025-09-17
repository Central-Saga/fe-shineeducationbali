"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icons
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  GraduationCap,
  Home,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Award,
  LineChart,
  Settings,
  BookOpenCheck
} from "lucide-react";

// Custom animation styles
const floatingAnimations = {
  slow: {
    animation: 'float 6s ease-in-out infinite',
  },
  medium: {
    animation: 'float 4s ease-in-out infinite',
  },
  fast: {
    animation: 'float 3s ease-in-out infinite',
  },
};

// Get teacher navigation data from our data file
// Define types for our navigation items
interface SubMenuItem {
  name: string;
  href: string;
  description?: string;
}

interface NavItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  submenu?: SubMenuItem[];
}

import { sidebarTeacherNavigation } from "@/data/data-teacher/sidebarteacher-data";

export function TeacherSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menuName: string) => {
    setOpenMenu((current) => (current === menuName ? null : menuName));
  };

  const isMenuOpen = (menuName: string) => openMenu === menuName;

  // Auto-open menu based on current path
  React.useEffect(() => {
    sidebarTeacherNavigation.forEach((item: NavItem) => {
      if (item.submenu?.some((subitem: SubMenuItem) => 
          pathname === subitem.href || pathname.startsWith(`${subitem.href}/`))
      ) {
        setOpenMenu(item.name);
      }
    });
  }, [pathname]);

  return (
    <ScrollArea className="w-64 h-full bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="relative">
          {/* Simple, clean teacher header */}
          <div className="bg-[#C40001] pt-5 pb-4">
            {/* Simple accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#DAA625]"></div>
            
            <Link href="/dashboard-teacher" className="block">
              <div className="relative mx-auto" style={{ width: "120px" }}>
                {/* Clean logo presentation with optimal size */}
                <div className="bg-white rounded-md p-2.5 shadow-sm mx-auto">
                  <Image
                    src="/pichome/logo.png"
                    alt="Shine Education"
                    width={115}
                    height={115}
                    className="w-full h-auto object-contain"
                    priority
                    quality={100}
                  />
                </div>
              </div>
            </Link>
          </div>
          
          {/* Clean divider */}
          <div className="h-[1px] bg-gray-200 w-full"></div>
        </div>
        
        <nav className="flex-1 p-5 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {sidebarTeacherNavigation.map((item: NavItem) => {
              // Improved active state logic to prevent conflicts between similar paths
              const isActive = (() => {
                // For dashboard item, it should only be active on exact match
                if (item.href === "/dashboard-teacher" && item.name === "Dashboard") {
                  return pathname === "/dashboard-teacher";
                }
                
                // For items with submenu, check if any submenu item is active
                if (item.submenu?.length) {
                  return item.submenu.some((subitem) => {
                    // Check for exact match first
                    if (pathname === subitem.href) return true;
                    
                    // For paths like /attendance/my-attendance, ensure proper highlighting
                    if (pathname.startsWith(`${subitem.href}/`)) {
                      // Handle special cases
                      if (subitem.href === "/dashboard-teacher/attendance" && 
                          (pathname.includes("/my-attendance") || 
                          pathname.includes("/summary") || 
                          pathname.includes("/leave-request"))) {
                        return false;
                      }
                      // Special case for grades
                      if (subitem.href === "/dashboard-teacher/grades" && 
                          pathname.includes("/summary")) {
                        return false;
                      }
                      return true;
                    }
                    return false;
                  });
                }
                
                // For items without submenu but with href, check exact match or path start
                if (item.href) {
                  // Dashboard should only be active on exact match
                  if (item.href === "/dashboard-teacher") {
                    return pathname === "/dashboard-teacher";
                  }
                  return pathname === item.href || pathname.startsWith(`${item.href}/`);
                }
                
                return false;
              })();

              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isOpen = isMenuOpen(item.name);

              return (
                <div key={item.name} className="relative group">
                  {hasSubmenu ? (
                    // Menu items with submenu
                    <div
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-4 py-3 transition-all cursor-pointer",
                        isActive
                          ? "bg-[#C40503]/10 text-[#C40503] font-medium shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                      )}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="text-gray-400">
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  ) : (
                    // Menu items without submenu (like Dashboard)
                    <Link href={item.href || "#"}>
                      <div
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-lg px-4 py-3 transition-all",
                          isActive
                            ? "bg-[#C40503]/10 text-[#C40503] font-medium shadow-sm"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                      </div>
                    </Link>
                  )}
                  
                  {hasSubmenu && isOpen && item.submenu && (
                    <div className="ml-7 mt-1 flex flex-col gap-2 pl-2 border-l-2 border-gray-200">
                      {item.submenu.map((subitem: SubMenuItem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className={cn(
                            "text-sm flex flex-col gap-1 rounded-lg px-4 py-2.5 transition-all",
                            pathname === subitem.href || 
                            (pathname.startsWith(`${subitem.href}/`) && 
                             !(subitem.href === "/dashboard-teacher/attendance" && 
                                (pathname.includes("/my-attendance") || 
                                 pathname.includes("/summary") || 
                                 pathname.includes("/leave-request"))) &&
                             !(subitem.href === "/dashboard-teacher/grades" && 
                                pathname.includes("/summary")))
                              ? "text-[#C40503] font-medium bg-[#C40503]/5"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                          )}
                        >
                          <span className="font-medium">{subitem.name}</span>
                          {subitem.description && (
                            <span className="text-xs text-gray-500">
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
          </div>
        </nav>
      </div>
    </ScrollArea>
  );
}
