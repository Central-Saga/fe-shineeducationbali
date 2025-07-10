"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react';

interface AcademyStatsProps {
  enrolledCourses: number;
  completedCourses: number;
  hoursSpent: number;
  averageScore: number;
}

export function AcademyStats({ 
  enrolledCourses, 
  completedCourses, 
  hoursSpent, 
  averageScore 
}: AcademyStatsProps) {
  const stats = [
    {
      title: "Kursus Terdaftar",
      value: enrolledCourses,
      icon: <BookOpen className="h-6 w-6 text-[#C40503]" />,
      bgColor: "bg-red-50"
    },
    {
      title: "Kursus Selesai",
      value: completedCourses,
      icon: <Award className="h-6 w-6 text-[#DAA625]" />,
      bgColor: "bg-yellow-50"
    },
    {
      title: "Jam Belajar",
      value: hoursSpent,
      icon: <Clock className="h-6 w-6 text-[#C40503]" />,
      bgColor: "bg-red-50"
    },
    {
      title: "Skor Rata-Rata",
      value: `${averageScore}%`,
      icon: <TrendingUp className="h-6 w-6 text-[#DAA625]" />,
      bgColor: "bg-yellow-50"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h4 className="text-2xl font-bold">{stat.value}</h4>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
