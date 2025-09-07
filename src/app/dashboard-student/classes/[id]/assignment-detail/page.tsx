"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, FileText, Download, Upload, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/dashboard-student/classes"
          className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Kelas
        </Link>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">{assignment.title}</CardTitle>
              <Badge variant="destructive">Belum Dikumpulkan</Badge>
            </div>
            <p className="text-gray-700">{assignment.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* File Download Section */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#C40503]/10 rounded-lg">
                      <FileText className="h-5 w-5 text-[#C40503]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{assignment.fileName}</p>
                      <p className="text-sm text-gray-600">{assignment.fileDate}</p>
                    </div>
                  </div>
                  <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-[#C40503] text-[#C40503] hover:bg-[#C40503] hover:text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </a>
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Status Pengajuan Tugas</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status Penilaian</p>
                          <p className="font-semibold text-gray-900">Belum dinilai</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <Clock className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Jatuh Tempo</p>
                          <p className="font-semibold text-gray-900">{assignment.deadline}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <FileText className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">File Dikirim</p>
                          <p className="font-semibold text-red-600">Belum ada</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Perhatian:</span> Anda belum mengirimkan jawaban untuk tugas ini.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <Button className="bg-[#C40503] hover:bg-[#a30402]">
                  <Upload className="h-4 w-4 mr-2" />
                  Kirim Jawaban
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
