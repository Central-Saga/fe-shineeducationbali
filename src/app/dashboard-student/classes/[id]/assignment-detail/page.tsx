"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { AssignmentDetailCard } from "@/components/ui-student/classes/assignment";
import { getAssignmentByType } from "@/data/data-student/classes/assignment-data";

export default function AssignmentDetailPage() {
  // Ambil tipe tugas dari query param
  const searchParams = useSearchParams();
  const params = useParams();
  const type = searchParams.get("type");
  const [classId, setClassId] = useState('');

  useEffect(() => {
    if (params && typeof params.id === 'string') {
      setClassId(params.id);
    } else if (params && Array.isArray(params.id)) {
      setClassId(params.id[0]);
    }
  }, [params]);

  // Ambil data assignment dari data yang sudah dipindahkan
  const assignment = getAssignmentByType(type || "kuis");

  // Loading state sambil menunggu classId
  if (!classId) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C40503]"></div>
          </div>
        </div>
      </div>
    );
  }

  return <AssignmentDetailCard assignment={assignment} classId={classId} type={type || "kuis"} />;
}
