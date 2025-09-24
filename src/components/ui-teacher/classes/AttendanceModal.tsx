"use client";

import React, { useState, useEffect } from 'react';
import { Check, X, Clock, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClassStudentMapping } from '@/data/data-teacher/class-student-map';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | 'unrecorded';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: { 
    id: string; 
    name: string; 
    subject: string; 
    level?: string; 
    programId?: string; 
    schedule: string 
  };
  studentData: ClassStudentMapping | undefined;
  onSave: (attendanceData: { 
    classId: string;
    attendanceRecords: Record<string, AttendanceStatus>;
    summary: { total: number; present: number; absent: number; late: number; excused: number };
    students: { attendance: AttendanceStatus; id: string; name: string; }[];
  }) => void;
}

export function AttendanceModal({ isOpen, onClose, classData, studentData, onSave }: AttendanceModalProps) {
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceStatus>>({});
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    excused: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Update summary ketika data kehadiran berubah
  const updateSummary = React.useCallback((records: Record<string, AttendanceStatus>) => {
    const total = studentData?.students.length || 0;
    const present = Object.values(records).filter(status => status === 'present').length;
    const absent = Object.values(records).filter(status => status === 'absent').length;
    const late = Object.values(records).filter(status => status === 'late').length;
    const excused = Object.values(records).filter(status => status === 'excused').length;

    setSummary({ total, present, absent, late, excused });
  }, [studentData?.students.length]);

  // Inisialisasi data kehadiran dari data siswa
  useEffect(() => {
    if (studentData && studentData.students) {
      const initialAttendance: Record<string, AttendanceStatus> = {};
      
      studentData.students.forEach((student) => {
        initialAttendance[student.id] = student.attendance || 'unrecorded';
      });
      
      setAttendanceRecords(initialAttendance);
      updateSummary(initialAttendance);
    }
  }, [studentData, updateSummary]);

  // Handle perubahan status kehadiran
  const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
    const updatedRecords = { 
      ...attendanceRecords, 
      [studentId]: status 
    };
    
    setAttendanceRecords(updatedRecords);
    updateSummary(updatedRecords);
  };

  // Handle submit data kehadiran
  const handleSubmit = () => {
    const updatedStudents = studentData?.students.map(student => ({
      ...student,
      attendance: attendanceRecords[student.id]
    })) || [];

    onSave({
      classId: classData.id,
      attendanceRecords,
      summary,
      students: updatedStudents
    });
    
    onClose();
  };

  // Mark all students with a specific status
  const markAll = (status: AttendanceStatus) => {
    if (!studentData) return;

    const newRecords: Record<string, AttendanceStatus> = {};
    studentData.students.forEach(student => {
      newRecords[student.id] = status;
    });

    setAttendanceRecords(newRecords);
    updateSummary(newRecords);
  };

  if (!classData || !studentData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex flex-wrap items-center gap-2">
            <span>Kehadiran Kelas</span>
            <span className="text-[#C40001]">{classData.name}</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {classData.subject} - {classData.schedule}
          </DialogDescription>
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Jadwal:</span>
              <span>{classData.schedule}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium">Total Siswa: {summary.total}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">{summary.total}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors" onClick={() => markAll('present')}>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{summary.present}</div>
                <div className="text-xs text-green-500">Hadir</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors" onClick={() => markAll('absent')}>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{summary.absent}</div>
                <div className="text-xs text-red-500">Tidak Hadir</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors" onClick={() => markAll('late')}>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{summary.late}</div>
                <div className="text-xs text-yellow-500">Terlambat</div>
              </div>
            </div>
          </div>
          
          <div className="mb-4 text-xs text-center text-gray-500">
            Klik pada kotak jumlah untuk menandai semua siswa dengan status yang sama
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="list" className="flex-1">Daftar Siswa</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <div className="flex flex-col gap-4">
                <div className="flex justify-end space-x-2 mb-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => markAll('present')}
                  >
                    <Check className="h-4 w-4" />
                    <span>Semua Hadir</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                    onClick={() => markAll('late')}
                  >
                    <Clock className="h-4 w-4" />
                    <span>Semua Terlambat</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => markAll('absent')}
                  >
                    <X className="h-4 w-4" />
                    <span>Semua Tidak Hadir</span>
                  </Button>
                </div>
              
                <div className="overflow-auto max-h-[50vh]">
                  <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md pl-8"
                      placeholder="Cari siswa berdasarkan nama..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="h-4 w-4 absolute left-2.5 top-3 text-gray-400" />
                  </div>
                </div>
                
                <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow>
                        <TableHead className="w-[60px]">No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead className="text-center">Status Kehadiran</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentData.students
                        .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((student, index) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium py-2">{index + 1}</TableCell>
                          <TableCell className="py-2">{student.name}</TableCell>
                          <TableCell className="py-2">
                            <div className="flex justify-center gap-1">
                              <Button
                                size="sm"
                                variant={attendanceRecords[student.id] === 'present' ? 'default' : 'outline'}
                                className={`px-2 h-8 ${attendanceRecords[student.id] === 'present' 
                                  ? 'bg-green-600 hover:bg-green-700' 
                                  : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
                                onClick={() => handleAttendanceChange(student.id, 'present')}
                              >
                                <Check className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                <span className="text-xs md:text-sm">Hadir</span>
                              </Button>
                              <Button
                                size="sm"
                                variant={attendanceRecords[student.id] === 'absent' ? 'default' : 'outline'}
                                className={`px-2 h-8 ${attendanceRecords[student.id] === 'absent' 
                                  ? 'bg-red-600 hover:bg-red-700' 
                                  : 'text-red-600 hover:text-red-700 hover:bg-red-50'}`}
                                onClick={() => handleAttendanceChange(student.id, 'absent')}
                              >
                                <X className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                <span className="text-xs md:text-sm">Tidak</span>
                              </Button>
                              <Button
                                size="sm"
                                variant={attendanceRecords[student.id] === 'late' ? 'default' : 'outline'}
                                className={`px-2 h-8 ${attendanceRecords[student.id] === 'late' 
                                  ? 'bg-yellow-500 hover:bg-yellow-600' 
                                  : 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50'}`}
                                onClick={() => handleAttendanceChange(student.id, 'late')}
                              >
                                <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                <span className="text-xs md:text-sm">Telat</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSubmit} className="bg-[#C40001] hover:bg-[#A60000]">
            Simpan Kehadiran
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
