"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, FileText, Download, Upload, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AssignmentDetailCardProps {
  assignment: {
    title: string;
    description: string;
    fileName: string;
    fileUrl: string;
    fileDate: string;
    status: string;
    deadline: string;
    lastChanged: string;
    submittedFile: { id: string; name: string; size: string; type: string } | null;
    submissionData?: { files: any[]; comment: string; submittedDate: string };
  };
  classId?: string;
  type?: string;
}

export default function AssignmentDetailCard({ assignment, classId, type }: AssignmentDetailCardProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<{ files: any[]; comment: string; submittedDate: string } | null>(null);

  useEffect(() => {
    // Cek apakah ada data submission yang tersimpan
    if (typeof window !== 'undefined' && type) {
      const savedSubmission = localStorage.getItem(`assignment_submission_${type}`);
      if (savedSubmission) {
        const data = JSON.parse(savedSubmission);
        setSubmissionData(data);
        setIsSubmitted(true);
      }
    }
  }, [type]);
  // Fallback jika assignment undefined
  if (!assignment) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/dashboard-student/classes/${classId || '1'}`}
            className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali ke Kelas
          </Link>
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Assignment tidak ditemukan</h2>
              <p className="text-gray-600 mb-6">
                Assignment yang Anda cari tidak tersedia atau tidak ditemukan.
              </p>
              <Link href={`/dashboard-student/classes/${classId || '1'}`}>
                <Button className="bg-[#C40503] hover:bg-[#a30402]">
                  Kembali ke Kelas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/dashboard-student/classes/${classId || '1'}`}
          className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Kelas
        </Link>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">{assignment.title}</CardTitle>
              <Badge 
                variant={isSubmitted ? "secondary" : "destructive"}
                className={isSubmitted 
                  ? "bg-green-100 text-green-800 font-semibold px-3 py-1 border-2 border-green-200" 
                  : "bg-red-600 text-white font-semibold px-3 py-1"
                }
              >
                {isSubmitted ? "Sudah Dikumpulkan" : "Belum Dikumpulkan"}
              </Badge>
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
                        <div className={`p-2 rounded-lg ${isSubmitted ? 'bg-green-100' : 'bg-orange-100'}`}>
                          <FileText className={`h-4 w-4 ${isSubmitted ? 'text-green-600' : 'text-orange-600'}`} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">File Dikirim</p>
                          <p className={`font-semibold ${isSubmitted ? 'text-green-600' : 'text-red-600'}`}>
                            {isSubmitted ? (submissionData?.files?.length || 0) + ' file' : 'Belum ada'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {!isSubmitted ? (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Perhatian:</span> Anda belum mengirimkan jawaban untuk tugas ini.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Berhasil:</span> Jawaban Anda telah dikirim pada {submissionData?.submittedDate ? new Date(submissionData.submittedDate).toLocaleString('id-ID') : 'Tidak diketahui'}.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                {!isSubmitted ? (
                  <Link href={`/dashboard-student/classes/${classId || '1'}/submit-assignment?type=${type || 'kuis'}`}>
                    <Button className="bg-[#C40503] hover:bg-[#a30402]">
                      <Upload className="h-4 w-4 mr-2" />
                      Kirim Jawaban
                    </Button>
                  </Link>
                ) : (
                  <div className="flex gap-2">
                    <Link href={`/dashboard-student/classes/${classId || '1'}/edit-submission?type=${type || 'kuis'}`}>
                      <Button variant="outline" className="border-[#C40503] text-[#C40503] hover:bg-[#C40503] hover:text-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Edit Jawaban
                      </Button>
                    </Link>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold px-3 py-1">
                      Sudah Dikirim
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
