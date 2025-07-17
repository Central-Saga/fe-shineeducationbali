"use client";

import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, CircleDashed, Play, FileText, HelpCircle, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';
import { CourseModule } from '@/data/data-student/course-detail-data';

interface CourseCurriculumProps {
  modules: CourseModule[];
  onSelectLesson: (moduleId: string, lessonId: string) => void;
  currentLessonId?: string;
}

export function CourseCurriculum({ modules, onSelectLesson, currentLessonId }: CourseCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.id || '']);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4 mr-2 text-[#C40503]" />;
      case 'reading':
        return <FileText className="h-4 w-4 mr-2 text-[#C40503]" />;
      case 'quiz':
        return <HelpCircle className="h-4 w-4 mr-2 text-[#DAA625]" />;
      case 'assignment':
        return <FileSpreadsheet className="h-4 w-4 mr-2 text-[#DAA625]" />;
      default:
        return <CircleDashed className="h-4 w-4 mr-2 text-gray-400" />;
    }
  };

  const getLessonStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return (
          <div className="relative h-5 w-5">
            <div className="absolute inset-0 rounded-full border-2 border-[#C40503] border-t-transparent animate-spin"></div>
          </div>
        );
      case 'not-started':
      default:
        return <CircleDashed className="h-5 w-5 text-gray-300" />;
    }
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours} jam ${mins > 0 ? `${mins} menit` : ''}`;
    }
    return `${mins} menit`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Kurikulum Kursus</h2>
        <p className="text-gray-600 mt-1">
          {modules.length} modul • {getTotalLessons(modules)} pelajaran • {formatDuration(getTotalDuration(modules))} total durasi
        </p>
      </div>

      <Accordion
        type="multiple"
        value={expandedModules}
        className="w-full"
      >
        {modules.map((module, index) => {
          const completionPercentage = Math.round((module.completedLessons / module.lessons.length) * 100);
          
          return (
            <AccordionItem 
              key={module.id} 
              value={module.id} 
              className="border-b border-gray-200 last:border-b-0"
            >
              <AccordionTrigger
                onClick={() => toggleModule(module.id)}
                className="px-6 py-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between text-left">
                  <div>
                    <span className="font-medium text-base">
                      Modul {index + 1}: {module.title}
                    </span>
                    <p className="text-gray-500 text-sm mt-1">{module.description}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0 gap-4">
                    <span className="text-sm text-gray-500">
                      {module.completedLessons}/{module.lessons.length} selesai
                    </span>
                    <div className="w-24 hidden md:block">
                      <Progress value={completionPercentage} className="h-2" />
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="border-t border-gray-100">
                {module.lessons.map((lesson, i) => {
                  const isCurrentLesson = lesson.id === currentLessonId;
                  
                  return (
                    <Link 
                      key={lesson.id} 
                      href={`/dashboard-student/academy/lesson/${lesson.id}`}
                      className={`px-6 py-3 flex items-center border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${isCurrentLesson ? 'bg-gray-50' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectLesson(module.id, lesson.id);
                      }}
                    >
                      <div className="mr-3">
                        {getLessonStatusIcon(lesson.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center">
                          {getLessonIcon(lesson.type)}
                          <span className="text-sm font-medium">
                            {i + 1}. {lesson.title}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-6">
                          {lesson.description}
                        </p>
                      </div>
                      
                      <div className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                        {formatDuration(lesson.duration)}
                      </div>
                    </Link>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

// Helper functions
function getTotalLessons(modules: CourseModule[]): number {
  return modules.reduce((count, module) => count + module.lessons.length, 0);
}

function getTotalDuration(modules: CourseModule[]): number {
  return modules.reduce((total, module) => 
    total + module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)
  , 0);
}
