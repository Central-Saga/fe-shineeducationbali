"use client";

import { ReactNode } from "react";
import { StatsCard } from "./StatsCard";
import { cn } from "@/lib/utils";

interface StatsItem {
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
}

interface StatsGridProps {
  stats: StatsItem[];
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  cardClassName?: string;
}

export function StatsGrid({
  stats,
  columns = 4,
  className = "",
  cardClassName = "",
}: StatsGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-1 md:grid-cols-2";
      case 3: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      case 5: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
      case 6: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <div className={cn(`grid ${getGridCols()} gap-6`, className)}>
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          color={stat.color}
          bgColor={stat.bgColor}
          trend={stat.trend}
          className={cardClassName}
        />
      ))}
    </div>
  );
}

export default StatsGrid;
