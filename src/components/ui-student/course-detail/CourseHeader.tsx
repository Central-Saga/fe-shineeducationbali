"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Award } from 'lucide-react';
import { CourseDetailData } from '@/data/data-student/course-detail-data';

interface CourseHeaderProps {
  course: CourseDetailData;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative h-64 w-full">
        <Image 
          src={course.image} 
          alt={course.title} 
          fill
          style={{ objectFit: 'cover' }}
          className="object-center"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <Badge className="mb-2 bg-[#DAA625] hover:bg-[#c19621]">
            {course.category}
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.averageRating.toFixed(1)}</span>
              <span className="text-gray-300">({course.totalRatings} ulasan)</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.totalStudents} siswa</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{getTotalDuration(course)} jam belajar</span>
            </div>
            {course.certificateAvailable && (
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>Sertifikat</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="md:w-2/3">
            <h2 className="text-lg font-semibold mb-2">Tentang Kursus</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">Yang Akan Anda Pelajari:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#C40503] mr-2">✓</span>
                    <span className="text-sm text-gray-600">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {course.prerequisites.length > 0 && (
              <div>
                <h3 className="text-md font-medium mb-2">Prasyarat:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="md:w-1/3 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Progress Kursus</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2 mb-3" />
            <p className="text-sm text-gray-600 mb-4">
              {course.completedLessons} dari {course.totalLessons} pelajaran selesai
            </p>
            
            <div className="space-y-3">
              <Link href={course.currentLessonUrl || `/dashboard-student/academy/${course.id}/lesson/${course.firstLessonId}`}>
                <button className="w-full bg-[#C40503] text-white py-2 rounded-md font-medium hover:bg-[#a60402] transition-colors">
                  {course.completedLessons > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                </button>
              </Link>
              
              {course.materialsUrl && (
                <Link href={course.materialsUrl}>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Unduh Materi
                  </button>
                </Link>
              )}
            </div>
            
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">Kursus ini mencakup:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#DAA625]">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  <span>{course.modules.length} modul</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#DAA625]">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <span>{countLessonsByType(course, 'video')} video pembelajaran</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#DAA625]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>{countLessonsByType(course, 'reading')} materi bacaan</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#DAA625]">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                  <span>{countLessonsByType(course, 'quiz')} kuis latihan</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#DAA625]">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                  <span>{countLessonsByType(course, 'assignment')} tugas praktik</span>
                </li>
                {course.certificateAvailable && (
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#DAA625]">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    <span>Sertifikat kelulusan</span>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500">
                Terakhir diperbarui: {formatDate(course.lastUpdated)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getTotalDuration(course: CourseDetailData): number {
  const totalMinutes = course.modules.reduce((total, module) => 
    total + module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)
  , 0);
  
  return Math.round(totalMinutes / 60);
}

function countLessonsByType(course: CourseDetailData, type: 'video' | 'quiz' | 'assignment' | 'reading'): number {
  return course.modules.reduce((count, module) => 
    count + module.lessons.filter(lesson => lesson.type === type).length
  , 0);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
