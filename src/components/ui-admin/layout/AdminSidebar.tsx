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
    <ScrollArea className="flex flex-col h-full relative">
      {/* Elegant radial gradient background with subtle noise texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f8f8] to-white"></div>
      <div className="absolute inset-0 opacity-20" 
        style={{ 
          background: "radial-gradient(circle at center, rgba(218,166,37,0.1) 0%, rgba(196,5,3,0.05) 70%, rgba(255,255,255,0) 100%)"
        }}
      />
      <div className="absolute inset-0 opacity-5" 
        style={{ 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")",
          animation: "noisePan 20s linear infinite"
        }} 
      />
      {/* Premium Branded Header with Dynamic Elements */}
      <div className="relative pt-5 pb-6 z-10">
        {/* Dynamic background with premium gradients */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Vibrant gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C40503]/5 via-white to-[#DAA625]/5"></div>
          
          {/* Elegant gradient pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-radial-advanced"></div>
            <div className="absolute inset-0 bg-noise-subtle"></div>
          </div>
          
          {/* Decorative accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C40503] via-[#DAA625] to-[#C40503]"></div>
          
          {/* Dynamic accent corner shapes */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-[#C40503]/10 rounded-br-full blur-sm"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#DAA625]/10 rounded-bl-full blur-sm"></div>
          
          {/* Bottom accent shape */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#C40503]/10 to-transparent"></div>
          
          {/* Animated particles */}
          <div className="particle bg-[#C40503] absolute"></div>
          <div className="particle bg-[#DAA625] absolute animation-delay-100"></div>
          <div className="particle bg-[#C40503] absolute animation-delay-200"></div>
          <div className="particle bg-[#DAA625] absolute animation-delay-300"></div>
          <div className="particle bg-[#C40503] absolute animation-delay-400"></div>
          
          {/* Subtle animated pulsing circles */}
          <div className="absolute left-1/4 top-1/3">
            <div className="w-24 h-24 rounded-full border border-[#C40503]/5 animate-ping-slow opacity-30"></div>
          </div>
          <div className="absolute right-1/4 bottom-1/3">
            <div className="w-16 h-16 rounded-full border border-[#DAA625]/5 animate-ping-slower opacity-30"></div>
          </div>
        </div>
        
        {/* Modern elegant logo display with paper fold effect */}
        <div className="relative mx-auto w-full max-w-[180px] z-10">
          <Link href="/dashboard" className="block">
            <div className="relative group">
              {/* Paper-like texture background */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-white paper-texture"></div>
                
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 grid-pattern opacity-5"></div>
                
                {/* Subtle corner accents */}
                <div className="absolute top-0 left-0 w-10 h-10">
                  <div className="absolute w-full h-full corner-accent-tl"></div>
                </div>
                <div className="absolute top-0 right-0 w-10 h-10">
                  <div className="absolute w-full h-full corner-accent-tr"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-10 h-10">
                  <div className="absolute w-full h-full corner-accent-bl"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-10 h-10">
                  <div className="absolute w-full h-full corner-accent-br"></div>
                </div>
              </div>
              
              {/* Fold effect overlay */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-12 h-12 paper-fold-tr"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 paper-fold-bl"></div>
              </div>
              
              {/* Elegant border with accent colors */}
              <div className="absolute inset-0 rounded-xl border border-gray-200 shadow-sm">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#C40503] to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-[#DAA625] to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#C40503] to-transparent"></div>
              </div>
              
              {/* Inner logo container */}
              <div className="relative p-4 transition-all duration-300">
                {/* Dynamic highlight on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 light-sweep"></div>
                </div>
                
                {/* The actual logo with embossed effect */}
                <div className="relative transform group-hover:scale-105 transition-all duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 transform translate-y-px translate-x-px opacity-30 blur-[1px]">
                      <Image
                        src="/pichome/logo.png"
                        alt="Shine Education Logo Shadow"
                        width={150}
                        height={150}
                        className="w-full h-auto object-contain"
                        priority
                        quality={90}
                      />
                    </div>
                    <Image
                      src="/pichome/logo.png"
                      alt="Shine Education Logo"
                      width={150}
                      height={150}
                      className="w-full h-auto object-contain relative z-10"
                      priority
                      quality={100}
                    />
                  </div>
                </div>
              </div>
              
              {/* Interactive shadow on hover */}
              <div className="absolute -bottom-3 inset-x-5 h-8 opacity-30 rounded-full blur-md bg-black/10 transform origin-center scale-90 group-hover:scale-100 transition-all duration-300"></div>
            </div>
          </Link>
        </div>
        
        {/* Advanced animation styles */}
        <style jsx global>{`
          /* Particles animation */
          .particle {
            width: 3px;
            height: 3px;
            border-radius: 50%;
            opacity: 0;
            animation: particle-animation 8s ease-in-out infinite;
          }
          
          @keyframes particle-animation {
            0% { transform: translate(10vw, 10vh) scale(0); opacity: 0; }
            50% { opacity: 0.6; }
            100% { transform: translate(calc(10vw - 20px), calc(10vh - 50px)) scale(1); opacity: 0; }
          }
          
          /* Particle positioning */
          .particle:nth-child(1) { top: 20%; left: 20%; }
          .particle:nth-child(2) { top: 25%; right: 30%; }
          .particle:nth-child(3) { bottom: 30%; left: 15%; }
          .particle:nth-child(4) { bottom: 20%; right: 20%; }
          .particle:nth-child(5) { top: 40%; left: 40%; }
          
          /* Animation delays */
          .animation-delay-100 { animation-delay: 1s; }
          .animation-delay-200 { animation-delay: 2s; }
          .animation-delay-300 { animation-delay: 3s; }
          .animation-delay-400 { animation-delay: 4s; }
          
          /* Ping animations */
          @keyframes ping-slow {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 0.3; }
            100% { transform: scale(0.95); opacity: 0.5; }
          }
          
          @keyframes ping-slower {
            0% { transform: scale(0.9); opacity: 0.4; }
            50% { transform: scale(1.3); opacity: 0.2; }
            100% { transform: scale(0.9); opacity: 0.4; }
          }
          
          @keyframes noisePan {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          
          .animate-ping-slow {
            animation: ping-slow 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          .animate-ping-slower {
            animation: ping-slower 9s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          /* Paper Texture Effect */
          .paper-texture {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
            background-size: 300px 300px;
          }
          
          .grid-pattern {
            background-image: linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
          }
          
          /* Paper Fold Effects */
          .paper-fold-tr {
            background: linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.03) 50%);
            border-radius: 0 0 0 10px;
            box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.05);
          }
          
          .paper-fold-bl {
            background: linear-gradient(315deg, transparent 50%, rgba(0, 0, 0, 0.02) 50%);
            border-radius: 0 10px 0 0;
            box-shadow: 1px -1px 2px rgba(0, 0, 0, 0.05);
          }
          
          /* Corner Accents */
          .corner-accent-tl {
            background: radial-gradient(circle at 0 0, transparent 70%, rgba(196, 5, 3, 0.1) 100%);
          }
          
          .corner-accent-tr {
            background: radial-gradient(circle at 100% 0, transparent 70%, rgba(218, 166, 37, 0.1) 100%);
          }
          
          .corner-accent-bl {
            background: radial-gradient(circle at 0 100%, transparent 70%, rgba(218, 166, 37, 0.1) 100%);
          }
          
          .corner-accent-br {
            background: radial-gradient(circle at 100% 100%, transparent 70%, rgba(196, 5, 3, 0.1) 100%);
          }
          
          /* Light Sweep Animation */
          .light-sweep {
            background: linear-gradient(90deg, 
              transparent, 
              rgba(255, 255, 255, 0), 
              rgba(255, 255, 255, 0.4), 
              rgba(255, 255, 255, 0), 
              transparent);
            background-size: 200% 100%;
            animation: sweep 2s ease-in-out infinite;
          }
          
          @keyframes sweep {
            0% { background-position: -100% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
      
      {/* Navigation Section */}
      <div className="flex-1 px-3 py-4 mt-2 relative z-10">
        <div className="relative mb-6">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="absolute left-0 w-1/3 h-px bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
          <div className="pt-4 pb-2">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-2 flex items-center">
              <span className="w-1 h-4 bg-[#C40503] rounded-full mr-2"></span>
              MAIN MENU
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
