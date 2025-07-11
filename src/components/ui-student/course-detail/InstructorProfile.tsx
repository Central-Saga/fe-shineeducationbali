"use client";

import React from 'react';
import Link from 'next/link';
import { CourseDetailData } from '@/data/data-student/course-detail-data';

interface InstructorProfileProps {
  course: CourseDetailData;
}

export function InstructorProfile({ course }: InstructorProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Pengajar</h2>
      </div>
      
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-16 h-16 rounded-full bg-[#DAA625] flex items-center justify-center text-white text-xl font-bold">
              {course.instructor.charAt(0)}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">{course.instructor}</h3>
            
            <div className="mt-1 flex items-center">
              <span className="text-sm text-gray-500">
                {getTotalLessons(course)} pelajaran • {course.totalStudents} siswa
              </span>
            </div>
            
            <p className="mt-4 text-gray-700">
              {course.instructorBio}
            </p>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Kualifikasi</h4>
              <div className="space-y-1">
                {course.instructorExperience.split(', ').map((exp, index) => (
                  <div key={index} className="flex items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 text-[#C40503] flex-shrink-0 mt-0.5"
                    >
                      <path d="m5 12 5 5 9-9"/>
                    </svg>
                    <span className="text-sm text-gray-600">{exp}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Link href={`/dashboard-student/messages/instructor/${encodeURIComponent(course.instructor)}`}>
              <button className="mt-6 inline-flex items-center text-[#C40503] font-medium hover:underline">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Hubungi Pengajar
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function
function getTotalLessons(course: CourseDetailData): number {
  return course.modules.reduce((count, module) => count + module.lessons.length, 0);
}
