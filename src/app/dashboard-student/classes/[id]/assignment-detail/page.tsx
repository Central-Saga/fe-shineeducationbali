"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, FileText } from "lucide-react";

export default function AssignmentDetailPage() {
  // Ambil tipe tugas dari query param
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // Data tugas sesuai card di halaman detail class
  const assignments = {
    kuis: {
      title: "Kuis + Tugas",
      description: "Kerjakan soal kuis dan tugas yang diberikan pada pertemuan ini.",
      fileName: "Soal Kuis & Tugas.pdf",
      fileUrl: "#",
      fileDate: "7 July 2025, 14:43",
      status: "Belum dikirimkan",
      deadline: "Tuesday, 8 July 2025, 13:00",
      lastChanged: "-",
      submittedFile: null,
    },
    uts: {
      title: "UTS",
      description: "Ujian Tengah Semester, kerjakan sesuai instruksi guru.",
      fileName: "Soal UTS.pdf",
      fileUrl: "#",
      fileDate: "7 July 2025, 14:43",
      status: "Belum dikirimkan",
      deadline: "Tuesday, 8 July 2025, 13:00",
      lastChanged: "-",
      submittedFile: null,
    },
  };
  const assignment = type === "uts" ? assignments.uts : assignments.kuis;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link
        href="/dashboard-student/classes"
        className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Kembali ke Kelas
      </Link>
      <div className="bg-white rounded-xl shadow-lg p-8 border">
        <h1 className="text-2xl font-bold mb-2 text-[#C40503]">{assignment.title}</h1>
        <p className="mb-4 text-gray-700">{assignment.description}</p>
        <div className="mb-4">
          <a
            href={assignment.fileUrl}
            className="inline-flex items-center gap-2 text-[#C40503] font-semibold underline"
          >
            <FileText className="h-5 w-5" /> {assignment.fileName}
          </a>
          <span className="ml-2 text-xs text-gray-500">{assignment.fileDate}</span>
        </div>
        <div className="mb-6">
          <h4 className="font-bold text-lg mb-2 text-gray-800">Status pengajuan tugas</h4>
          <div className="rounded-lg overflow-hidden border">
            <div className="bg-red-100 p-3 text-red-700 font-semibold">
              {assignment.status}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t">
              <div className="p-3 border-r text-gray-700">
                Status penilaian<br />
                <span className="font-semibold">Belum dinilai</span>
              </div>
              <div className="p-3 border-r text-gray-700">
                Jatuh tempo<br />
                <span className="font-semibold">{assignment.deadline}</span>
              </div>
              <div className="p-3 text-gray-700">
                Waktu tersisa<br />
                <span className="font-semibold text-red-700">Belum ada pengajuan</span>
              </div>
            </div>
            <div className="p-3 border-t text-gray-700">
              Terakhir diubah<br />
              <span className="font-semibold">{assignment.lastChanged}</span>
            </div>
            <div className="p-3 border-t text-gray-700">
              Pengiriman berkas<br />
              <span className="inline-flex items-center gap-2 bg-[#fff7f7] border border-[#f3bcbc] px-2 py-1 rounded text-[#C40503] font-semibold">
                <FileText className="h-4 w-4" /> Belum ada file dikirimkan
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <button className="bg-[#0d5c7d] text-white px-5 py-2 rounded font-semibold hover:bg-[#09445c] transition-colors">
            Kirim Jawaban
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Anda belum mengirimkan jawaban untuk tugas ini.
        </div>
      </div>
    </div>
  );
}
