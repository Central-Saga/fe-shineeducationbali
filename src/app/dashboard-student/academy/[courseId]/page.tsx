"use client";

import React from 'react';
import { AcademyManagement, AcademyView } from '@/components/ui-student/academy/AcademyManagement';

interface SubjectDetailPageProps {
  params: {
    courseId: string;
  };
}

export default function SubjectDetailPage({ params }: SubjectDetailPageProps) {
  const { courseId } = params;
  
  return (
    <AcademyManagement 
      initialView={AcademyView.SUBJECT} 
      subjectId={courseId}
    />
  );
}
