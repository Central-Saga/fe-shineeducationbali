"use client";

import React, { use } from 'react';
import { getClassDetail } from '@/data/data-student/class-detail-data';

export default function ClassDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  // In Next.js 15, params is a Promise that needs to be awaited
  const { id: classId } = use(params);
  const classDetail = getClassDetail(classId);

  if (!classDetail) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
