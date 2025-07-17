"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "@/components/ui-student/academy/CourseCard";
import { CourseFilter } from "@/components/ui-student/academy/CourseFilter";
import { AcademyStats } from "@/components/ui-student/academy/AcademyStats";
import { studentCourses, popularCourses, Course } from "@/data/data-student/academy-data";

export default function AcademyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter courses based on search query, category, and status
  const filterCourses = (courses: Course[]) => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const filteredEnrolled = filterCourses(studentCourses);
  const filteredPopular = filterCourses(popularCourses);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Academy</h1>
        <p className="text-gray-600">
          Kelola pembelajaran Anda dan jelajahi kursus-kursus baru untuk meningkatkan keterampilan
        </p>
      </div>
      
      {/* Stats Section */}
      <AcademyStats 
        enrolledCourses={studentCourses.length} 
        completedCourses={studentCourses.filter(c => c.status === 'completed').length}
        hoursSpent={128}
        averageScore={85}
      />
      
      {/* Filter Section */}
      <CourseFilter 
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
      />
      
      {/* Course Tabs */}
      <Tabs defaultValue="my-courses" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="my-courses" className="text-sm">
            Kursus Saya
          </TabsTrigger>
          <TabsTrigger value="explore" className="text-sm">
            Jelajahi Kursus Baru
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-courses">
          {filteredEnrolled.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEnrolled.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kursus ditemukan</h3>
              <p className="text-gray-600">
                Coba ubah filter atau cari dengan kata kunci lain
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="explore">
          {filteredPopular.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPopular.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kursus ditemukan</h3>
              <p className="text-gray-600">
                Coba ubah filter atau cari dengan kata kunci lain
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Featured Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Rekomendasi Kursus</h2>
          <button className="text-[#C40503] hover:underline">Lihat Semua</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCourses.slice(0, 3).map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      
      {/* Banner - Promo Section */}
      <div className="mt-12 rounded-lg overflow-hidden relative">
        <div className="bg-gradient-to-r from-[#C40503] to-[#DAA625] p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Dapatkan Akses Premium ke Semua Kursus
            </h2>
            <p className="text-white/90 mb-6">
              Langganan premium memberikan Anda akses ke semua kursus, sertifikat, dan materi eksklusif
            </p>
            <button className="bg-white text-[#C40503] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Lihat Paket Langganan
            </button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative h-40 w-40 md:h-60 md:w-60">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute inset-8 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-16 w-16 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 8L16 12L10 16V8Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
