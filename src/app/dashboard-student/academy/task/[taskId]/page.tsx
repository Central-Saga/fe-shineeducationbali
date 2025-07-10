"use client";

import React from 'react';
import { AcademyManagement, AcademyView } from '@/components/ui-student/academy/AcademyManagement';

interface TaskDetailPageProps {
  params: {
    taskId: string;
  };
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { taskId } = params;
  
  return (
    <AcademyManagement 
      initialView={AcademyView.TASK} 
      taskId={taskId}
    />
  );
}
