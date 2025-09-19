"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, Clock, Upload, CheckCircle, AlertCircle, 
  ChevronDown, ChevronUp, Download, X, File 
} from 'lucide-react';
import Link from 'next/link';
import { ClassAssignment } from '@/data/data-student/class-detail-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AssignmentSubmission {
  assignmentId: string;
  submissionText: string;
  selectedFile: File | null;
}

interface ClassAssignmentsProps {
  assignments: ClassAssignment[];
}

export function ClassAssignments({ assignments }: ClassAssignmentsProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState<ClassAssignment | null>(null);
  const [submissionForm, setSubmissionForm] = useState<AssignmentSubmission>({
    assignmentId: '',
    submissionText: '',
    selectedFile: null
  });

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const openSubmissionDialog = (assignment: ClassAssignment) => {
    setCurrentAssignment(assignment);
    setSubmissionForm({
      assignmentId: assignment.id,
      submissionText: '',
      selectedFile: null
    });
    setSubmissionDialogOpen(true);
  };

  const closeSubmissionDialog = () => {
    setSubmissionDialogOpen(false);
    setCurrentAssignment(null);
    setSubmissionForm({
      assignmentId: '',
      submissionText: '',
      selectedFile: null
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'not-submitted':
        return 'bg-yellow-100 text-yellow-700';
      case 'graded':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Upload className="h-4 w-4 text-blue-700" />;
      case 'not-submitted':
        return <AlertCircle className="h-4 w-4 text-yellow-700" />;
      case 'graded':
        return <CheckCircle className="h-4 w-4 text-green-700" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validasi ukuran file (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError("Ukuran file melebihi batas maksimum 10MB");
      }
      
      setSubmissionForm({
        ...submissionForm,
        selectedFile: file
      });
    }
  };

  const handleSubmit = () => {
    if (!currentAssignment) return;
    
    // Reset error state
    setSubmitError(null);
    
    // Validasi
    if (!submissionForm.selectedFile) {
      setSubmitError("Harap unggah file tugas");
      return;
    }
    
    if (submissionForm.selectedFile.size > 10 * 1024 * 1024) {
      setSubmitError("Ukuran file melebihi batas maksimum 10MB");
      return;
    }
    
    setSubmitting(true);
    
    // Simulasi pengiriman data ke server
    setTimeout(() => {
      // Here you would normally send the data to your API
      console.log('Submitting assignment:', {
        assignmentId: submissionForm.assignmentId,
        text: submissionForm.submissionText,
        file: submissionForm.selectedFile
      });
      
      // Update local state untuk simulasi keberhasilan
      const updatedAssignments = [...assignments];
      const assignmentIndex = updatedAssignments.findIndex(a => a.id === currentAssignment.id);
      
      if (assignmentIndex !== -1 && submissionForm.selectedFile) {
        // Create updated assignment with submitted status
        const updatedAssignment = { ...updatedAssignments[assignmentIndex] };
        updatedAssignment.status = 'submitted';
        updatedAssignment.submittedDate = new Date().toISOString();
        
        // Add attachment information
        updatedAssignment.attachments = [
          {
            id: `att-${Date.now()}`,
            name: submissionForm.selectedFile.name,
            url: "#", // Dalam aplikasi nyata, ini akan menjadi URL sebenarnya
            size: `${(submissionForm.selectedFile.size / 1024 / 1024).toFixed(2)} MB`
          }
        ];
        
        // Update the assignments array
        updatedAssignments[assignmentIndex] = updatedAssignment;
        
        // In a real application, you would call an API to update the status
      }
      
      setSubmitting(false);
      
      // Show success notification
      setSubmitSuccess(true);
      
      // Auto close dialog after showing success
      setTimeout(() => {
        closeSubmissionDialog();
        setSubmitSuccess(false);
      }, 2000);
    }, 1500);
  };

  const pendingAssignments = assignments.filter(assignment => assignment.status === 'not-submitted');
  const submittedAssignments = assignments.filter(assignment => assignment.status === 'submitted');
  const gradedAssignments = assignments.filter(assignment => assignment.status === 'graded');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#DAA625]" />
          Tugas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Assignment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Belum Dikumpulkan</p>
            <p className="text-xl font-bold text-yellow-600">{pendingAssignments.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Dikumpulkan</p>
            <p className="text-xl font-bold text-blue-600">{submittedAssignments.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Sudah Dinilai</p>
            <p className="text-xl font-bold text-green-600">{gradedAssignments.length}</p>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="pending">Belum Dikumpulkan</TabsTrigger>
            <TabsTrigger value="submitted">Dikumpulkan</TabsTrigger>
            <TabsTrigger value="graded">Sudah Dinilai</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {assignments.length > 0 ? (
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <AssignmentItem 
                    key={assignment.id}
                    assignment={assignment}
                    isExpanded={expandedItem === assignment.id}
                    onToggle={() => toggleExpand(assignment.id)}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    formatDate={formatDate}
                    onOpenSubmissionDialog={openSubmissionDialog}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada tugas yang ditemukan</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending">
            {pendingAssignments.length > 0 ? (
              <div className="space-y-4">
                {pendingAssignments.map((assignment) => (
                  <AssignmentItem 
                    key={assignment.id}
                    assignment={assignment}
                    isExpanded={expandedItem === assignment.id}
                    onToggle={() => toggleExpand(assignment.id)}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    formatDate={formatDate}
                    onOpenSubmissionDialog={openSubmissionDialog}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Tidak ada tugas yang belum dikumpulkan</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="submitted">
            {submittedAssignments.length > 0 ? (
              <div className="space-y-4">
                {submittedAssignments.map((assignment) => (
                  <AssignmentItem 
                    key={assignment.id}
                    assignment={assignment}
                    isExpanded={expandedItem === assignment.id}
                    onToggle={() => toggleExpand(assignment.id)}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    formatDate={formatDate}
                    onOpenSubmissionDialog={openSubmissionDialog}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Belum ada tugas yang dikumpulkan</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="graded">
            {gradedAssignments.length > 0 ? (
              <div className="space-y-4">
                {gradedAssignments.map((assignment) => (
                  <AssignmentItem 
                    key={assignment.id}
                    assignment={assignment}
                    isExpanded={expandedItem === assignment.id}
                    onToggle={() => toggleExpand(assignment.id)}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    formatDate={formatDate}
                    onOpenSubmissionDialog={openSubmissionDialog}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Belum ada tugas yang dinilai</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Submission Dialog */}
        <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Kumpulkan Tugas</DialogTitle>
              <DialogDescription>
                {currentAssignment && (
                  <span className="text-sm text-gray-500">
                    {currentAssignment.title} - Tenggat: {formatDate(currentAssignment.dueDate)}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            
            {submitSuccess && (
              <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <AlertDescription className="flex flex-col">
                  <span className="font-medium">Berhasil!</span>
                  <span>Tugas berhasil dikumpulkan.</span>
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4 py-4">
              {/* File Upload Section */}
              <div className="space-y-2">
                <Label htmlFor="fileUpload" className="font-medium">Unggah File Tugas <span className="text-red-500">*</span></Label>
                <div className={`border-2 border-dashed rounded-lg p-4 ${submitError ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
                  <Input
                    id="fileUpload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
                  >
                    {submissionForm.selectedFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <File className={`h-8 w-8 ${submissionForm.selectedFile.size > 10 * 1024 * 1024 ? 'text-red-500' : 'text-[#DAA625]'}`} />
                        <span className="text-sm font-medium">
                          {submissionForm.selectedFile.name}
                        </span>
                        <span className={`text-xs ${submissionForm.selectedFile.size > 10 * 1024 * 1024 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                          {(submissionForm.selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          {submissionForm.selectedFile.size > 10 * 1024 * 1024 && ' (Melebihi batas!)'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Klik untuk mengunggah atau seret file kesini
                        </span>
                        <span className="text-xs text-gray-400">
                          Ukuran maksimum: 10MB
                        </span>
                      </div>
                    )}
                  </label>
                </div>
                {submitError && (
                  <p className="text-xs text-red-500 mt-1">{submitError}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Format yang didukung: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, ZIP, RAR, JPG, PNG</p>
              </div>
              
              {/* Comment/Description Section */}
              <div className="space-y-2">
                <Label htmlFor="submissionText">Komentar atau Deskripsi (Opsional)</Label>
                <Textarea
                  id="submissionText"
                  placeholder="Tambahkan komentar atau deskripsi untuk pengumpulan tugas Anda..."
                  value={submissionForm.submissionText}
                  onChange={(e) => setSubmissionForm({
                    ...submissionForm,
                    submissionText: e.target.value
                  })}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={closeSubmissionDialog}
                disabled={submitting}
              >
                <X className="h-4 w-4 mr-2" />
                Batal
              </Button>
              <Button 
                className="bg-[#DAA625] hover:bg-[#b88d1c]"
                onClick={handleSubmit}
                disabled={submitting || !!(submissionForm.selectedFile && submissionForm.selectedFile.size > 10 * 1024 * 1024)}
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-b-transparent"></span>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Kirimkan Tugas
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

interface AssignmentItemProps {
  assignment: ClassAssignment;
  isExpanded: boolean;
  onToggle: () => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  formatDate: (dateString: string) => string;
  onOpenSubmissionDialog: (assignment: ClassAssignment) => void;
}

function AssignmentItem({ 
  assignment, 
  isExpanded, 
  onToggle, 
  getStatusColor, 
  getStatusIcon,
  formatDate,
  onOpenSubmissionDialog
}: AssignmentItemProps) {
  return (
    <div 
      className={`border rounded-lg transition-all ${isExpanded ? 'border-[#DAA625]/50' : 'border-gray-200'}`}
    >
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-[#DAA625]" />
          <div>
            <h4 className="font-medium text-gray-800">{assignment.title}</h4>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>Tenggat: {formatDate(assignment.dueDate)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(assignment.status)}>
            <span className="flex items-center gap-1">
              {getStatusIcon(assignment.status)}
              {assignment.status === 'submitted' ? 'Dikumpulkan' : 
               assignment.status === 'not-submitted' ? 'Belum Dikumpulkan' : 'Dinilai'}
            </span>
          </Badge>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="pt-3 border-t border-gray-100">
            <p className="text-gray-700 mb-4">{assignment.description}</p>
            
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Poin: {assignment.points}</p>
              {assignment.grade !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Nilai</span>
                    <span className="text-sm font-medium">{assignment.grade}/{assignment.points}</span>
                  </div>
                  <Progress 
                    value={(assignment.grade / assignment.points) * 100} 
                    className="h-2 bg-gray-100"
                  />
                </div>
              )}
            </div>
            
            {assignment.feedback && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Feedback:</p>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{assignment.feedback}</p>
              </div>
            )}
            
            {assignment.attachments && assignment.attachments.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">File yang dikirimkan:</p>
                <div className="space-y-2">
                  {assignment.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-[#DAA625]" />
                        <span className="text-sm">{attachment.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{attachment.size}</span>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Unduh
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {assignment.status === 'not-submitted' && (
              <>
                <Button 
                  className="bg-[#DAA625] hover:bg-[#b88d1c]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSubmissionDialog(assignment);
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Kumpulkan Tugas
                </Button>
              </>
            )}
            
            {assignment.status === 'submitted' && !assignment.grade && (
              <Link href={`/dashboard-student/assignments/edit/${assignment.id}`}>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Perbarui Pengumpulan
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
