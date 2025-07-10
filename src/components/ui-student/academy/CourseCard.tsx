"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Course } from '@/data/data-student/academy-data';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title} 
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-medium">
          {course.category}
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 relative rounded-full overflow-hidden bg-gray-200 mr-2">
            {course.instructorAvatar ? (
              <Image src={course.instructorAvatar} alt={course.instructor} fill />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#DAA625] text-white text-xs">
                {course.instructor.charAt(0)}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-600">{course.instructor}</p>
        </div>
        
        <div className="mb-1 flex justify-between text-xs text-gray-600">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <Progress value={course.progress} className="h-2 mb-2" />
        
        <div className="text-xs text-gray-600">
          {course.completedLessons} / {course.totalLessons} pelajaran selesai
        </div>
        
        <div className="mt-4">
          {course.status === 'enrolled' ? (
            <button className="w-full bg-[#C40503] text-white py-2 rounded hover:bg-[#a60402] transition-colors">
              Lanjutkan Belajar
            </button>
          ) : course.status === 'completed' ? (
            <button className="w-full bg-[#DAA625] text-white py-2 rounded hover:bg-[#b78d1f] transition-colors">
              Lihat Sertifikat
            </button>
          ) : (
            <button className="w-full border border-[#C40503] text-[#C40503] py-2 rounded hover:bg-[#C40503] hover:text-white transition-colors">
              Mulai Kursus
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
