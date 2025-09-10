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
      {/* Header Section with Modern Design */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#C40503]/5 via-transparent to-[#DAA625]/5 rounded-xl"></div>
        
        {/* Header Content */}
        <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              {/* Breadcrumbs */}
              {header.breadcrumbs && header.breadcrumbs.length > 0 && (
                <nav className="flex items-center space-x-2 text-sm">
                  {header.breadcrumbs.map((breadcrumb, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {index > 0 && (
                        <span className="text-gray-300">/</span>
                      )}
                      {breadcrumb.href ? (
                        <Link
                          href={breadcrumb.href}
                          className="text-gray-500 hover:text-[#C40503] transition-colors font-medium"
                        >
                          {breadcrumb.label}
                        </Link>
                      ) : (
                        <span className="text-[#C40503] font-semibold">
                          {breadcrumb.label}
                        </span>
                      )}
                    </div>
                  ))}
                </nav>
              )}

              {/* Title and Description */}
              <div className="flex items-center space-x-4">
                {header.showBackButton && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBack}
                    className="p-2 border-gray-300 hover:border-[#C40503] hover:text-[#C40503]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {header.title}
                  </h1>
                  {header.description && (
                    <p className="text-gray-600 text-lg">{header.description}</p>
                  )}
                </div>
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
                        ? "bg-[#C40503] hover:bg-[#a50402] text-white shadow-md hover:shadow-lg transition-all duration-200" 
                        : "border-gray-300 hover:border-[#C40503] hover:text-[#C40503]"
                      }
                      px-6 py-2 font-medium
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

      {/* Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
