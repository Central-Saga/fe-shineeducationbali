"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Upload, FileText, X, CheckCircle, AlertCircle, Edit3, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { saveSubmissionData, clearSubmissionData } from "@/data/data-student/classes/assignment-data";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface FileUpload {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
}

interface EditSubmissionCardProps {
  assignment: {
    title: string;
    description: string;
    fileName: string;
    fileUrl: string;
    fileDate: string;
    status: string;
    deadline: string;
    lastChanged: string;
    submittedFile: any;
  };
  classId: string;
  type: string;
}

export default function EditSubmissionCard({ assignment, classId, type }: EditSubmissionCardProps) {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [existingSubmission, setExistingSubmission] = useState<{ files: any[]; comment: string; submittedDate: string } | null>(null);
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Ambil data submission yang tersimpan
    if (typeof window !== 'undefined' && type) {
      const savedSubmission = localStorage.getItem(`assignment_submission_${type}`);
      if (savedSubmission) {
        const data = JSON.parse(savedSubmission);
        setExistingSubmission(data);
        setComment(data.comment || '');
      }
    }
  }, [type]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles: FileUpload[] = Array.from(selectedFiles).map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const markFileForDeletion = (fileId: string) => {
    setFilesToDelete(prev => [...prev, fileId]);
  };

  const unmarkFileForDeletion = (fileId: string) => {
    setFilesToDelete(prev => prev.filter(id => id !== fileId));
  };

  const handleDeleteSubmission = async () => {
    setIsDeleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Hapus data submission dari localStorage
    clearSubmissionData(type);
    
    // Dispatch custom event untuk update UI
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('assignmentSubmitted', { 
        detail: { type, deleted: true } 
      }));
    }
    
    setIsDeleting(false);
    setIsUpdated(true);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simpan data submission yang diperbarui ke localStorage
    const filesData = files.map(file => ({
      id: file.id,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    // Filter file lama yang tidak dihapus, lalu gabungkan dengan file baru
    const remainingOldFiles = (existingSubmission?.files || []).filter((file: any) => 
      !filesToDelete.includes(file.id)
    );
    const allFiles = [...remainingOldFiles, ...filesData];
    
    saveSubmissionData(type, allFiles, comment);
    
    // Dispatch custom event untuk update UI
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('assignmentSubmitted', { 
        detail: { type, files: allFiles } 
      }));
    }
    
    setIsUpdated(true);
    setIsSubmitting(false);
  };

  if (isUpdated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/dashboard-student/classes/${classId}/assignment-detail?type=${type}`}
            className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali ke Detail Tugas
          </Link>
          
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Jawaban Berhasil Diperbarui!</h2>
              <p className="text-gray-600 mb-6">
                Perubahan pada jawaban Anda telah berhasil disimpan.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href={`/dashboard-student/classes/${classId}/assignment-detail?type=${type}`}>
                  <Button className="bg-[#C40503] hover:bg-[#a30402]">
                    Lihat Detail Tugas
                  </Button>
                </Link>
                <Link href={`/dashboard-student/classes/${classId}`}>
                  <Button variant="outline">
                    Kembali ke Kelas
                  </Button>
                </Link>
              </div>
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
          href={`/dashboard-student/classes/${classId}/assignment-detail?type=${type}`}
          className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Detail Tugas
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">Edit Jawaban</CardTitle>
              <Badge 
                variant="secondary" 
                className="bg-blue-100 text-blue-800 font-semibold px-3 py-1"
              >
                <Edit3 className="h-3 w-3 mr-1" />
                {assignment.title}
              </Badge>
            </div>
            <p className="text-gray-700">{assignment.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Assignment Info */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Informasi Tugas</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">Jatuh Tempo:</span>
                    <p className="text-blue-900">{assignment.deadline}</p>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Terakhir Diperbarui:</span>
                    <p className="text-blue-900">{existingSubmission ? new Date(existingSubmission.submittedDate).toLocaleString('id-ID') : '-'}</p>
                  </div>
                </div>
              </div>

              {/* Current Submission */}
              {existingSubmission && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Jawaban Saat Ini</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-3">
                      {existingSubmission.files?.map((file: any) => {
                        const isMarkedForDeletion = filesToDelete.includes(file.id);
                        return (
                          <div key={file.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            isMarkedForDeletion 
                              ? 'bg-red-50 border-red-200' 
                              : 'bg-white border-gray-200'
                          }`}>
                            <FileText className={`h-5 w-5 ${
                              isMarkedForDeletion ? 'text-red-500' : 'text-[#C40503]'
                            }`} />
                            <div className="flex-1">
                              <p className={`font-medium ${
                                isMarkedForDeletion ? 'text-red-600 line-through' : 'text-gray-900'
                              }`}>
                                {file.name}
                              </p>
                              <p className={`text-sm ${
                                isMarkedForDeletion ? 'text-red-500' : 'text-gray-600'
                              }`}>
                                {file.size}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {isMarkedForDeletion ? (
                                <Badge variant="outline" className="text-red-600 border-red-600">
                                  Akan Dihapus
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Terkirim
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => 
                                  isMarkedForDeletion 
                                    ? unmarkFileForDeletion(file.id)
                                    : markFileForDeletion(file.id)
                                }
                                className={`${
                                  isMarkedForDeletion 
                                    ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                                    : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                                }`}
                              >
                                {isMarkedForDeletion ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                      {existingSubmission.comment && (
                        <div className="p-3 bg-white rounded-lg border">
                          <p className="text-sm text-gray-600 mb-1">Komentar:</p>
                          <p className="text-gray-900">{existingSubmission.comment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* New Files Upload */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Tambah File Baru</h4>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#C40503] transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-gray-600">
                      <span className="text-[#C40503] font-medium">Klik untuk upload file tambahan</span> atau drag & drop file di sini
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                    </p>
                  </label>
                </div>

                {/* New Uploaded Files */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-900">File baru yang akan ditambahkan:</h5>
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-[#C40503]" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">{file.size}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-between pt-4 border-t">
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                        disabled={isSubmitting || isDeleting}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus Submission
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Submission</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus seluruh submission ini? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteSubmission}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Menghapus...
                            </>
                          ) : (
                            'Hapus'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                
                <div className="flex gap-2">
                  <Link href={`/dashboard-student/classes/${classId}/assignment-detail?type=${type}`}>
                    <Button variant="outline">Batal</Button>
                  </Link>
                  <Button
                    onClick={handleUpdate}
                    disabled={isSubmitting || isDeleting}
                    className="bg-[#C40503] hover:bg-[#a30402] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Memperbarui...
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Perbarui Jawaban
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
