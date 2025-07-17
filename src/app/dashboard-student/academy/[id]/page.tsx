"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCourseDetail } from '@/data/data-student/course-detail-data';
import { CourseHeader } from '@/components/ui-student/course-detail/CourseHeader';
import { CourseCurriculum } from '@/components/ui-student/course-detail/CourseCurriculum';
import { InstructorProfile } from '@/components/ui-student/course-detail/InstructorProfile';
import { CourseReviews } from '@/components/ui-student/course-detail/CourseReviews';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseContentViewer } from '@/components/ui-student/course-detail/CourseContentViewer';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailPage() {
  // Type assertion for params
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'overview' | 'learning'>('overview');
  const [currentModuleId, setCurrentModuleId] = useState<string>('');
  const [currentLessonId, setCurrentLessonId] = useState<string>('');
  
  // Get course data - safely accessing the id parameter
  const paramsObj = params as { id: string };
  const courseId = paramsObj.id;
  const courseDetail = getCourseDetail(courseId);

  useEffect(() => {
    // If course is found, set default module and lesson IDs
    if (courseDetail && courseDetail.modules.length > 0) {
      const firstModule = courseDetail.modules[0];
      setCurrentModuleId(firstModule.id);
      
      if (firstModule.lessons.length > 0) {
        setCurrentLessonId(firstModule.lessons[0].id);
      }
    }
  }, [courseDetail]);

  if (!courseDetail) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Kursus tidak ditemukan</h1>
        <Link 
          href="/dashboard-student/academy" 
          className="text-[#C40503] hover:underline flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Akademi
        </Link>
      </div>
    );
  }

  const handleSelectLesson = (moduleId: string, lessonId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
    setViewMode('learning');
  };

  const handleNavigateLesson = (moduleId: string, lessonId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Navigation breadcrumb */}
      <div className="mb-4">
        <Link 
          href="/dashboard-student/academy" 
          className="text-[#C40503] hover:underline flex items-center text-sm"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Akademi
        </Link>
      </div>
      
      {viewMode === 'overview' ? (
        <>
          {/* Course Header Section */}
          <CourseHeader course={courseDetail} />
          
          {/* Tabs and Content */}
          <div className="mt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full border-b border-gray-200 mb-6">
                <TabsTrigger value="overview" className="text-base">
                  Ringkasan
                </TabsTrigger>
                <TabsTrigger value="curriculum" className="text-base">
                  Kurikulum
                </TabsTrigger>
                <TabsTrigger value="instructor" className="text-base">
                  Pengajar
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-base">
                  Ulasan
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <CourseCurriculum 
                      modules={courseDetail.modules} 
                      onSelectLesson={handleSelectLesson}
                    />
                  </div>
                  
                  <div className="lg:col-span-1">
                    <InstructorProfile course={courseDetail} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum">
                <CourseCurriculum 
                  modules={courseDetail.modules} 
                  onSelectLesson={handleSelectLesson}
                />
              </TabsContent>
              
              <TabsContent value="instructor">
                <InstructorProfile course={courseDetail} />
              </TabsContent>
              
              <TabsContent value="reviews">
                <CourseReviews course={courseDetail} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Courses */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Kursus Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* This would be populated with actual related courses */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Kursus Terkait {i}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Learning Mode View
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseContentViewer 
              course={courseDetail}
              moduleId={currentModuleId}
              lessonId={currentLessonId}
              onNavigate={handleNavigateLesson}
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold">Kurikulum Kursus</h2>
                <button 
                  onClick={() => setViewMode('overview')}
                  className="text-sm text-[#C40503] hover:underline"
                >
                  Kembali ke Ringkasan
                </button>
              </div>
              <div className="p-4">
                <CourseCurriculum 
                  modules={courseDetail.modules} 
                  onSelectLesson={handleSelectLesson}
                  currentLessonId={currentLessonId}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
