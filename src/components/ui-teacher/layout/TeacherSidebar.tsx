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
        <div className="relative h-28 overflow-hidden">
          {/* Background with 3D layered effect */}
          <div className="absolute inset-0">
            {/* Base gradient layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8a0202] via-[#C40503] to-[#DAA625]"></div>
            
            {/* Overlapping wave shapes */}
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path 
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                fill="#ffffff" 
                fillOpacity=".07"
              ></path>
              <path 
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                fill="#ffffff" 
                fillOpacity=".05"
              ></path>
            </svg>
            
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 mix-blend-overlay opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '150px 150px'
              }}
            ></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute w-8 h-8 rounded-full bg-white/10" 
               style={{ 
                 top: '10%', 
                 right: '15%',
                 animation: 'float 6s ease-in-out infinite'
               }}></div>
          <div className="absolute w-4 h-4 rounded-full bg-white/10" 
               style={{ 
                 top: '60%', 
                 left: '10%',
                 animation: 'float 4s ease-in-out infinite',
                 animationDelay: '1s'
               }}></div>
               
          {/* Hidden keyframes animation */}
          <style jsx global>{`
            @keyframes float {
              0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
            }
          `}</style>
          
          {/* Modern asymmetrical container */}
          <div className="relative flex items-center justify-center h-full">
            <Link href="/dashboard-teacher">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 pl-3 pr-5 rounded-r-2xl rounded-bl-2xl shadow-lg border-l-4 border-white/20 transform -translate-x-2 hover:translate-x-0 transition-transform duration-300 group">
                <div className="bg-white rounded-full p-1.5 shadow-md">
                  <Image
                    src="/pichome/logo.png"
                    alt="Shine Education"
                    width={100}
                    height={100}
                    className="h-9 w-auto object-contain"
                    priority
                    quality={100}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-semibold tracking-wider">Teacher</span>
                  <span className="text-white/90 text-sm font-bold tracking-wide group-hover:text-yellow-200 transition-colors">Portal</span>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Glowing accent */}
          <div className="absolute bottom-0 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-300/70 to-transparent blur-sm transform -translate-x-1/2"></div>
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
                          ? "bg-gradient-to-r from-[#C40503]/10 to-[#DAA625]/10 text-[#C40503] font-medium shadow-sm"
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
                            ? "bg-gradient-to-r from-[#C40503]/10 to-[#DAA625]/10 text-[#C40503] font-medium shadow-sm"
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
                              ? "text-[#C40503] font-medium bg-gradient-to-r from-[#C40503]/5 to-[#DAA625]/5"
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
