"use client";

import React from 'react';
import Link from 'next/link';
import { CourseDetailData, CourseModule, CourseLesson } from '@/data/data-student/course-detail-data';
import { ChevronLeft, ChevronRight, Download, MessageCircle, BookOpen } from 'lucide-react';

interface CourseContentViewerProps {
  course: CourseDetailData;
  moduleId: string;
  lessonId: string;
  onNavigate: (moduleId: string, lessonId: string) => void;
}

export function CourseContentViewer({ course, moduleId, lessonId, onNavigate }: CourseContentViewerProps) {
  // Find the current module and lesson
  const currentModule = course.modules.find(m => m.id === moduleId);
  const currentLesson = currentModule?.lessons.find(l => l.id === lessonId);

  if (!currentModule || !currentLesson) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">Pelajaran tidak ditemukan</p>
      </div>
    );
  }

  // Find previous and next lessons for navigation
  const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === lessonId);
  const moduleIndex = course.modules.findIndex(m => m.id === moduleId);

  let prevLessonData = null;
  let nextLessonData = null;

  // Previous lesson
  if (currentLessonIndex > 0) {
    // Previous lesson in the same module
    const prevLesson = currentModule.lessons[currentLessonIndex - 1];
    prevLessonData = { moduleId, lessonId: prevLesson.id, title: prevLesson.title };
  } else if (moduleIndex > 0) {
    // Last lesson of the previous module
    const prevModule = course.modules[moduleIndex - 1];
    const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
    prevLessonData = { moduleId: prevModule.id, lessonId: lastLesson.id, title: lastLesson.title };
  }

  // Next lesson
  if (currentLessonIndex < currentModule.lessons.length - 1) {
    // Next lesson in the same module
    const nextLesson = currentModule.lessons[currentLessonIndex + 1];
    nextLessonData = { moduleId, lessonId: nextLesson.id, title: nextLesson.title };
  } else if (moduleIndex < course.modules.length - 1) {
    // First lesson of the next module
    const nextModule = course.modules[moduleIndex + 1];
    const firstLesson = nextModule.lessons[0];
    nextLessonData = { moduleId: nextModule.id, lessonId: firstLesson.id, title: firstLesson.title };
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with lesson title */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>Modul {moduleIndex + 1}:</span>
          <span className="mx-2">{currentModule.title}</span>
          <span className="mx-2">•</span>
          <span>Pelajaran {currentLessonIndex + 1} dari {currentModule.lessons.length}</span>
        </div>
        <h1 className="text-xl font-semibold mt-1">{currentLesson.title}</h1>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {renderLessonContent(currentLesson)}
      </div>
      
      {/* Navigation */}
      <div className="border-t border-gray-200 p-4 flex justify-between">
        <button
          onClick={() => prevLessonData && onNavigate(prevLessonData.moduleId, prevLessonData.lessonId)}
          className={`flex items-center px-4 py-2 rounded-md ${
            prevLessonData 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-gray-400 cursor-not-allowed'
          }`}
          disabled={!prevLessonData}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          <span>Sebelumnya</span>
        </button>
        
        <button
          onClick={() => nextLessonData && onNavigate(nextLessonData.moduleId, nextLessonData.lessonId)}
          className={`flex items-center px-4 py-2 rounded-md ${
            nextLessonData 
              ? 'bg-[#C40503] text-white hover:bg-[#a60402]' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!nextLessonData}
        >
          <span>Berikutnya</span>
          <ChevronRight className="h-4 w-4 ml-2" />
        </button>
      </div>
      
      {/* Discussion section */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <MessageCircle className="h-5 w-5 mr-2 text-[#DAA625]" />
          <h2 className="text-lg font-medium">Diskusi</h2>
        </div>
        
        <div className="mb-4">
          <textarea 
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#C40503] focus:border-transparent resize-none"
            rows={3}
            placeholder="Tanyakan sesuatu atau bagikan pemikiran Anda tentang pelajaran ini..."
          />
        </div>
        
        <div className="flex justify-end">
          <button className="bg-[#C40503] text-white py-2 px-4 rounded-md hover:bg-[#a60402] transition-colors">
            Kirim Komentar
          </button>
        </div>
        
        <div className="mt-6">
          <p className="text-center text-gray-500 text-sm">
            Belum ada diskusi untuk pelajaran ini
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function renderLessonContent(lesson: CourseLesson) {
  switch (lesson.type) {
    case 'video':
      return (
        <div>
          <div className="bg-gray-800 rounded-lg aspect-video mb-6 flex items-center justify-center">
            {lesson.videoUrl ? (
              <div className="w-full h-full relative">
                {/* In a real implementation, this would be an actual video player */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-sm p-5 rounded-full">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="30" 
                      height="30" 
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-white">Video tidak tersedia</p>
            )}
          </div>
          
          <h2 className="text-lg font-medium mb-3">Deskripsi</h2>
          <p className="text-gray-600 mb-6">{lesson.description}</p>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
            <div className="text-sm text-gray-600">
              Durasi: {formatDuration(lesson.duration)}
            </div>
            
            <Link href={lesson.materialUrl || '#'}>
              <button className="flex items-center text-[#C40503] hover:underline">
                <Download className="h-4 w-4 mr-2" />
                Unduh Materi Pendukung
              </button>
            </Link>
          </div>
        </div>
      );
      
    case 'reading':
      return (
        <div>
          <div className="flex items-center mb-4">
            <BookOpen className="h-6 w-6 mr-2 text-[#DAA625]" />
            <h2 className="text-lg font-medium">Materi Bacaan</h2>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
            <div className="prose max-w-none">
              <p>
                {lesson.description}
              </p>
              <p className="text-gray-500 italic">
                (Materi bacaan lengkap akan ditampilkan di sini)
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
            <div className="text-sm text-gray-600">
              Waktu membaca: {formatDuration(lesson.duration)}
            </div>
            
            <Link href={lesson.materialUrl || '#'}
              className="flex items-center text-[#C40503] hover:underline"
            >
              <Download className="h-4 w-4 mr-2" />
              Unduh sebagai PDF
            </Link>
          </div>
        </div>
      );
      
    case 'quiz':
      return (
        <div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-3 flex items-center text-yellow-800">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Kuis: {lesson.title}
            </h2>
            
            <p className="text-gray-700 mb-4">{lesson.description}</p>
            
            <div className="mb-4">
              <div className="font-medium mb-2">Informasi Kuis:</div>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Jumlah soal: {lesson.quizCount}</li>
                <li>• Waktu pengerjaan: {formatDuration(lesson.duration)}</li>
                <li>• Format: Pilihan ganda dan isian singkat</li>
                <li>• Nilai minimum kelulusan: 70</li>
              </ul>
            </div>
            
            <Link href={`/dashboard-student/quiz/${lesson.id}`}>
              <button className="bg-[#DAA625] text-white py-2 px-4 rounded-md hover:bg-[#b78d1f] transition-colors">
                Mulai Kuis
              </button>
            </Link>
          </div>
        </div>
      );
      
    case 'assignment':
      return (
        <div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-3 flex items-center text-red-800">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Tugas: {lesson.title}
            </h2>
            
            <p className="text-gray-700 mb-4">{lesson.description}</p>
            
            <div className="mb-4">
              <div className="font-medium mb-2">Petunjuk Tugas:</div>
              <div className="text-sm text-gray-600 mb-4">
                <p>Lengkapi tugas ini sesuai dengan petunjuk dan unggah file hasil pekerjaan Anda di bawah ini.</p>
                <p className="mt-2">Batas waktu pengumpulan: 7 hari dari sekarang</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/dashboard-student/assignments/submit/${lesson.id}`}>
                <button className="bg-[#C40503] text-white py-2 px-4 rounded-md hover:bg-[#a60402] transition-colors">
                  Kumpulkan Tugas
                </button>
              </Link>
              <Link href={lesson.materialUrl || '#'}>
                <button className="border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Unduh Petunjuk
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
      
    default:
      return (
        <div className="text-center py-8 text-gray-500">
          Konten tidak tersedia
        </div>
      );
  }
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours} jam ${mins > 0 ? `${mins} menit` : ''}`;
  }
  return `${mins} menit`;
}
