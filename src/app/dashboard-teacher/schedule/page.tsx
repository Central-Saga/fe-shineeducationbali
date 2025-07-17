"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SchedulePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect ke halaman kelas dengan tab schedule yang aktif
    router.push('/dashboard-teacher/classes?tab=schedule');
  }, [router]);
  
  return (
    <div className="p-6 flex items-center justify-center h-screen">
      <p className="text-gray-500">Mengalihkan ke halaman Kelas...</p>
    </div>
  );
}
