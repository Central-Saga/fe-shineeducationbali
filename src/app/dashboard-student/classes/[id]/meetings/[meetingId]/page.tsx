"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getClassDetail } from '@/data/data-student/class-detail-data';
import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";
import { Button } from '@/components/ui/button';

export default function MeetingDetailPage() {
  const params = useParams();
  const classId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const meetingId = typeof params.meetingId === 'string' ? params.meetingId : Array.isArray(params.meetingId) ? params.meetingId[0] : '';
  const classDetail = getClassDetail(classId);

  // Dummy: ambil materi dan tugas dari classDetail, filter sesuai meetingId jika ada mapping
  // Untuk demo, ambil semua materi dan tugas
  const materials = classDetail?.materials || [];
  const assignments = classDetail?.assignments || [];

  // Checkbox state untuk materi dan tugas
  const [materialsChecked, setMaterialsChecked] = useState(Array(materials.length).fill(false));
  const [assignmentsChecked, setAssignmentsChecked] = useState(Array(assignments.length).fill(false));

  const handleMaterialCheck = (idx: number) => {
    setMaterialsChecked((prev) => prev.map((v, i) => i === idx ? !v : v));
  };
  const handleAssignmentCheck = (idx: number) => {
    setAssignmentsChecked((prev) => prev.map((v, i) => i === idx ? !v : v));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Link href={`/dashboard-student/classes/${classId}`} className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Kembali ke Daftar Pertemuan
      </Link>

      <h1 className="text-2xl font-bold mb-2">Detail Pertemuan</h1>

      {/* Materi Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Materi Pembelajaran</h2>
        {materials.length === 0 && <div className="text-gray-500">Belum ada materi.</div>}
        <ul className="space-y-4">
          {materials.map((mat, idx) => (
            <li key={mat.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <input type="checkbox" checked={materialsChecked[idx]} onChange={() => handleMaterialCheck(idx)} className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <div className="font-medium">{mat.title}</div>
                <div className="text-sm text-gray-500 mb-1">{mat.description}</div>
                <a href={mat.fileUrl} download className="inline-flex items-center text-[#C40503] hover:underline text-sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Download Materi
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tugas Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Tugas</h2>
        {assignments.length === 0 && <div className="text-gray-500">Belum ada tugas.</div>}
        <ul className="space-y-4">
          {assignments.map((asg, idx) => (
            <li key={asg.id} className="flex flex-col gap-2 p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={assignmentsChecked[idx]} onChange={() => handleAssignmentCheck(idx)} className="h-5 w-5 text-green-600" />
                <div className="font-medium">{asg.title}</div>
              </div>
              <div className="text-sm text-gray-500 mb-1">{asg.description}</div>
              {/* Pengiriman tugas */}
              <div className="mt-2">
                <label className="block text-sm font-medium mb-1">Pengiriman Berkas</label>
                <input type="file" className="block w-full border rounded p-2" />
                <Button className="mt-2 bg-[#C40503] text-white">Kirim Tugas</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}