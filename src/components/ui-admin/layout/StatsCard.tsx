"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  color?: string;
  bgColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  color = "bg-[#C40503]",
  bgColor = "bg-red-50",
  trend,
  className = "",
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow", className)}>
      {/* Colored top bar */}
      <div className={`h-1 w-full ${color}`}></div>
      
      <div className="p-6 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          
          {description && (
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className={`inline-block h-2 w-2 rounded-full ${color}`}></span>
              {description}
            </div>
          )}
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-gray-500">
                {trend.label || 'vs last month'}
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`p-3 rounded-full ${bgColor} flex-shrink-0`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

export default StatsCard;
