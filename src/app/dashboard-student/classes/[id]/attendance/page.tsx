"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { attendanceDummy, AttendanceMeeting } from "@/data/data-student/attendance-dummy";
import { CheckCircle2, XCircle } from "lucide-react";

export default function AttendanceTablePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        href="../"
        className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Kembali ke Detail Kelas
      </Link>
      <h1 className="text-2xl font-bold text-[#C40503] mb-6">Rekap Kehadiran Anda</h1>
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <div className="flex flex-col gap-3">
          {attendanceDummy.map((item: AttendanceMeeting, idx: number) => (
            <div key={idx} className="flex items-center gap-4 border-b last:border-b-0 py-2">
              <div className="flex-1">
                <div className="font-medium text-gray-800">{item.meeting}</div>
                {item.date && <div className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>}
              </div>
              <div>
                {item.hadir ? (
                  <span className="inline-flex items-center gap-1 text-green-600 font-semibold"><CheckCircle2 className="w-6 h-6 mr-1" /> Hadir</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[#C40503] font-semibold"><XCircle className="w-6 h-6 mr-1" /> Tidak Hadir</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-sm text-gray-500 text-center">Keterangan: <span className="inline-flex items-center gap-1 text-green-600 font-bold"><CheckCircle2 className="w-4 h-4" /> Hadir</span>, <span className="inline-flex items-center gap-1 text-[#C40503] font-bold"><XCircle className="w-4 h-4" /> Tidak Hadir</span></div>
      </div>
    </div>
  );
}
