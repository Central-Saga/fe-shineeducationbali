"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarAdminNavigation } from "@/data/data-admin/sidebaradmin-data";

export function AdminSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menuName: string) => {
    setOpenMenu((current) => (current === menuName ? null : menuName));
  };

  const isMenuOpen = (menuName: string) => openMenu === menuName;

  return (
    <ScrollArea className="flex flex-col h-full">
      <div className="flex h-14 items-center border-b px-6">
        <Link
          className="flex items-center gap-2 font-semibold"
          href="/dashboard"
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
      <div className="flex-1 p-4">
        <nav className="flex flex-col gap-1">
          {" "}
          {sidebarAdminNavigation.map((item) => {
            const isActive =
              item.submenu?.some((subitem) => pathname === subitem.href) ??
              pathname === item.href;

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
                    <div className="flex items-center gap-3">
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
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all",
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </div>
                  </Link>
                )}{" "}
                {hasSubmenu && isOpen && item.submenu && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className={cn(
                          "text-sm flex flex-col gap-1 rounded-lg px-3 py-2 transition-all",
                          pathname === subitem.href
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
        </nav>
      </div>
    </ScrollArea>
  );
}
