"use client";

import React from 'react';
import { getClassDetail } from '@/data/data-student/class-detail-data';

export default function ClassDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const classId = (params as { id: string }).id;
  const classDetail = getClassDetail(classId);

  if (!classDetail) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
