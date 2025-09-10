"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Settings } from "lucide-react";

interface ContentCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
    icon?: ReactNode;
  }[];
  showSettings?: boolean;
  onSettingsClick?: () => void;
  className?: string;
}

export function Content({ 
  title, 
  description, 
  children, 
  actions, 
  showSettings = false,
  onSettingsClick,
  className = ""
}: ContentCardProps) {
  return (
    <div className={`relative bg-white border border-gray-200 rounded-xl shadow-sm ${className}`}>
      {/* Header Section */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {actions && actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "outline"}
                size="sm"
                onClick={action.onClick}
                className={`
                  ${action.variant === "default" 
                    ? "bg-[#C40503] hover:bg-[#a50402] text-white shadow-md hover:shadow-lg transition-all duration-200" 
                    : "border-gray-300 hover:border-[#C40503] hover:text-[#C40503] text-gray-700"
                  }
                  px-4 py-2 font-medium
                `}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </Button>
            ))}
            {showSettings && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSettingsClick}
                className="p-2 border-gray-300 hover:border-[#C40503] hover:text-[#C40503]"
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
