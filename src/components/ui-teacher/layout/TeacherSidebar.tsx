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
    <ScrollArea className="w-64 h-full bg-white border-r dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex h-14 items-center border-b px-6 bg-white dark:bg-gray-900">
          <Link
            className="flex items-center gap-2 font-semibold"
            href="/dashboard-teacher"
          >
            <Image
              src="/pichome/logo.png"
              alt="Shine Education Logo"
              width={100}
              height={100}
              className="h-8 w-auto object-contain"
              priority
              quality={100}
            />
          </Link>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {sidebarTeacherNavigation.map((item: NavItem) => {
              // Fixed active state logic to prevent conflicts between similar paths
              const isActive = (
                (item.submenu?.some((subitem: SubMenuItem) => {
                  // Check for exact match first
                  if (pathname === subitem.href) return true;
                  
                  // For paths like /attendance/my-attendance, ensure we don't also highlight /attendance submenu item
                  if (pathname.startsWith(`${subitem.href}/`)) {
                    // Special case for student attendance vs teacher attendance paths
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
                })) || 
                (item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`)))
              );

              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isOpen = isMenuOpen(item.name);

              return (
                <div key={item.name} className="relative group">
                  {hasSubmenu ? (
                    // Menu items with submenu
                    <div
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer",
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
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
                          "flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all",
                          isActive
                            ? "bg-red-50 text-red-600"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
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
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.submenu.map((subitem: SubMenuItem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className={cn(
                            "text-sm flex flex-col gap-1 rounded-lg px-3 py-2 transition-all",
                            pathname === subitem.href || 
                            (pathname.startsWith(`${subitem.href}/`) && 
                             !(subitem.href === "/dashboard-teacher/attendance" && 
                                (pathname.includes("/my-attendance") || 
                                 pathname.includes("/summary") || 
                                 pathname.includes("/leave-request"))) &&
                             !(subitem.href === "/dashboard-teacher/grades" && 
                                pathname.includes("/summary")))
                              ? "text-red-600 font-medium"
                              : "text-gray-500 hover:text-gray-900"
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
          </div>
        </nav>
      </div>
    </ScrollArea>
  );
}
