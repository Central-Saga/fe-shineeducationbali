"use client";

import React from 'react';
import { AcademyManagement, AcademyView } from '@/components/ui-student/academy/AcademyManagement';

export default function AcademyPage() {
  return (
    <AcademyManagement initialView={AcademyView.MAIN} />
  );
}
