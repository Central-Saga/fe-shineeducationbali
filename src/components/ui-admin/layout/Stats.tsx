"use client";

// import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  color?: "red" | "amber" | "blue" | "green" | "purple" | "gray";
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
}

interface StatsCardsProps {
  stats: StatCard[];
  className?: string;
}

export function Stats({ stats, className = "" }: StatsCardsProps) {
  const getColorClasses = (color: string = "gray") => {
    const colorMap = {
      red: "bg-[#C40503] border-[#C40503]",
      amber: "bg-[#DAA625] border-[#DAA625]",
      blue: "bg-blue-500 border-blue-500",
      green: "bg-green-500 border-green-500",
      purple: "bg-purple-500 border-purple-500",
      gray: "bg-gray-500 border-gray-500",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`relative bg-white border-2 ${getColorClasses(stat.color)} rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
            <div className={`w-full h-full ${getColorClasses(stat.color).split(' ')[0]} rounded-bl-full`}></div>
          </div>
          
          <div className="relative p-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {stat.title}
                </span>
                {stat.icon && (
                  <stat.icon className={`h-5 w-5 ${getColorClasses(stat.color).split(' ')[0]} opacity-80`} />
                )}
              </div>
              <span className={`text-3xl font-bold ${getColorClasses(stat.color).split(' ')[0]} mb-1`}>
                {stat.value}
              </span>
              {stat.description && (
                <span className="text-sm text-gray-500">
                  {stat.description}
                </span>
              )}
              {stat.trend && (
                <div className="flex items-center space-x-1 text-xs">
                  <span className={`${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'} font-medium`}>
                    {stat.trend.isPositive ? '↗' : '↘'} {stat.trend.value}%
                  </span>
                  <span className="text-gray-500">{stat.trend.label}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
