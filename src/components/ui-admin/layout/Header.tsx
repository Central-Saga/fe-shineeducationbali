"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  header: {
    title: string;
    description?: string;
    breadcrumbs?: Breadcrumb[];
    showBackButton?: boolean;
    backHref?: string;
    actions?: {
      label: string;
      href?: string;
      onClick?: () => void;
      variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
      icon?: ReactNode;
    }[];
  };
  children: ReactNode;
  className?: string;
}

export function Header({ header, children, className = "" }: PageLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    if (header.backHref) {
      router.push(header.backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className={`space-y-6 p-5 md:p-8 ${className}`}>
      {/* Minimalist Creative Header */}
      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Subtle Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#C40503]"></div>
        
        {/* Minimalist Decorative Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-[#C40503]/20 rounded-full"></div>
        <div className="absolute bottom-4 right-8 w-1 h-1 bg-[#DAA625]/30 rounded-full"></div>
        
        {/* Header Content */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {header.showBackButton && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  className="p-2 border border-gray-300 text-gray-600 hover:border-[#C40503] hover:text-[#C40503] rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <div className="w-1 h-6 bg-[#C40503] rounded-full"></div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {header.title}
                  </h1>
                </div>
                {header.description && (
                  <p className="text-gray-600 font-medium ml-4">{header.description}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            {header.actions && header.actions.length > 0 && (
              <div className="flex items-center space-x-3">
                {header.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    onClick={action.onClick}
                    className={`
                      ${action.variant === "default" 
                        ? "bg-[#C40503] text-white hover:bg-[#a50402] shadow-sm hover:shadow-md transition-all duration-200 rounded-lg px-4 py-2 font-medium" 
                        : "border border-[#DAA625] text-[#DAA625] hover:bg-[#DAA625] hover:text-white transition-all duration-200 rounded-lg px-4 py-2 font-medium"
                      }
                    `}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.href ? (
                      <Link href={action.href}>{action.label}</Link>
                    ) : (
                      action.label
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Subtle Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C40503] via-[#DAA625] to-[#C40503]"></div>
      </div>

      {/* Content Wrapper */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
