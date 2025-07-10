"use client";

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

interface ProgramDetailPageProps {
  params: {
    programId: string;
  };
}

// Since we've redesigned our UI to not use programs, redirect to main academy page
export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  useEffect(() => {
    redirect('/dashboard-student/academy');
  }, []);

  // This component will redirect, so we don't need to render anything
  return null;
}
