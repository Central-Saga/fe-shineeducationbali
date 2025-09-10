"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Settings, MoreHorizontal } from "lucide-react";
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
      {/* Modern Header Design */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Header Top Bar */}
        <div className="bg-gradient-to-r from-[#C40503] to-[#DAA625] h-2 rounded-t-lg"></div>
        
        {/* Header Content */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {header.showBackButton && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  className="p-2 border-[#C40503] text-[#C40503] hover:bg-[#C40503] hover:text-white rounded-lg"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-[#C40503]">
                  {header.title}
                </h1>
                {header.description && (
                  <p className="text-[#DAA625] font-medium">{header.description}</p>
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
                        ? "bg-[#C40503] hover:bg-[#a50402] text-white shadow-sm hover:shadow-md transition-all duration-200 rounded-lg px-4 py-2 font-medium" 
                        : "border-[#DAA625] text-[#DAA625] hover:bg-[#DAA625] hover:text-white transition-all duration-200 rounded-lg px-4 py-2 font-medium"
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
      </div>

      {/* Content Wrapper */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
