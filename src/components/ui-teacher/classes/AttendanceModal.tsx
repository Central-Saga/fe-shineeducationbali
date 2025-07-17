"use client";

import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ClassStudentMapping } from '@/data/data-teacher/class-student-map';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'unrecorded';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: any; // Data kelas
  studentData: ClassStudentMapping | undefined;
  onSave: (attendanceData: any) => void;
}

export function AttendanceModal({ isOpen, onClose, classData, studentData, onSave }: AttendanceModalProps) {
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, AttendanceStatus>>({});
  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

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
  }, [studentData]);

  // Update summary ketika data kehadiran berubah
  const updateSummary = (records: Record<string, AttendanceStatus>) => {
    const total = studentData?.students.length || 0;
    const present = Object.values(records).filter(status => status === 'present').length;
    const absent = Object.values(records).filter(status => status === 'absent').length;
    const late = Object.values(records).filter(status => status === 'late').length;

    setSummary({ total, present, absent, late });
  };

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
    }));

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex flex-wrap items-center gap-2">
            <span>Kehadiran Kelas</span>
            <span className="text-[#C40503]">{classData.title}</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {classData.date && new Date(classData.date).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })} | {classData.timeStart} - {classData.timeEnd}
          </DialogDescription>
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
              <TabsTrigger value="checkbox" className="flex-1">Mode Centang</TabsTrigger>
              <TabsTrigger value="bulk" className="flex-1">Tampilan Kelompok</TabsTrigger>
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
            
            <TabsContent value="checkbox">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studentData.students
                  .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between border p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 w-6 text-xs md:text-sm">{index + 1}.</span>
                      <span className="font-medium text-xs md:text-sm truncate max-w-[120px]" title={student.name}>{student.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-1">
                        <Checkbox 
                          id={`present-${student.id}`} 
                          checked={attendanceRecords[student.id] === 'present'}
                          onCheckedChange={() => handleAttendanceChange(student.id, 'present')}
                          className="h-3 w-3 md:h-4 md:w-4 text-green-600 border-green-400 data-[state=checked]:bg-green-600"
                        />
                        <Label htmlFor={`present-${student.id}`} className="text-green-600 text-xs">H</Label>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Checkbox 
                          id={`absent-${student.id}`} 
                          checked={attendanceRecords[student.id] === 'absent'}
                          onCheckedChange={() => handleAttendanceChange(student.id, 'absent')}
                          className="h-3 w-3 md:h-4 md:w-4 text-red-600 border-red-400 data-[state=checked]:bg-red-600"
                        />
                        <Label htmlFor={`absent-${student.id}`} className="text-red-600 text-xs">A</Label>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Checkbox 
                          id={`late-${student.id}`} 
                          checked={attendanceRecords[student.id] === 'late'}
                          onCheckedChange={() => handleAttendanceChange(student.id, 'late')}
                          className="h-3 w-3 md:h-4 md:w-4 text-yellow-600 border-yellow-400 data-[state=checked]:bg-yellow-500"
                        />
                        <Label htmlFor={`late-${student.id}`} className="text-yellow-600 text-xs">T</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="bulk">
              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-medium">Manajemen Kehadiran Kelompok</h3>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-green-600 hover:bg-green-50"
                        onClick={() => markAll('present')}
                      >
                        Semua Hadir
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-yellow-600 hover:bg-yellow-50"
                        onClick={() => markAll('late')}
                      >
                        Semua Terlambat
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md pl-8"
                      placeholder="Cari siswa berdasarkan nama..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="h-4 w-4 absolute left-2.5 top-3 text-gray-400" />
                    {searchTerm && (
                      <button 
                        className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                        onClick={() => setSearchTerm('')}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Kolom Hadir */}
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-green-700 flex items-center">
                        <Check className="h-4 w-4 mr-2" /> 
                        Hadir ({Object.values(attendanceRecords).filter(status => status === 'present').length})
                      </h3>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {studentData.students
                        .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((student) => (
                        <div 
                          key={`present-${student.id}`}
                          className={`p-2 text-sm border rounded-md flex items-center justify-between cursor-pointer transition-colors
                            ${attendanceRecords[student.id] === 'present' 
                              ? 'bg-green-100 border-green-200' 
                              : 'bg-white border-gray-200 hover:bg-green-50'}`}
                          onClick={() => handleAttendanceChange(student.id, 'present')}
                        >
                          <span className="truncate mr-2">{student.name}</span>
                          {attendanceRecords[student.id] === 'present' && (
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Kolom Terlambat */}
                  <div className="border rounded-lg p-4 bg-yellow-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-yellow-700 flex items-center">
                        <Clock className="h-4 w-4 mr-2" /> 
                        Terlambat ({Object.values(attendanceRecords).filter(status => status === 'late').length})
                      </h3>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {studentData.students
                        .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((student) => (
                        <div 
                          key={`late-${student.id}`}
                          className={`p-2 text-sm border rounded-md flex items-center justify-between cursor-pointer transition-colors
                            ${attendanceRecords[student.id] === 'late' 
                              ? 'bg-yellow-100 border-yellow-200' 
                              : 'bg-white border-gray-200 hover:bg-yellow-50'}`}
                          onClick={() => handleAttendanceChange(student.id, 'late')}
                        >
                          <span className="truncate mr-2">{student.name}</span>
                          {attendanceRecords[student.id] === 'late' && (
                            <Clock className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Kolom Tidak Hadir */}
                  <div className="border rounded-lg p-4 bg-red-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-red-700 flex items-center">
                        <X className="h-4 w-4 mr-2" /> 
                        Tidak Hadir ({Object.values(attendanceRecords).filter(status => status === 'absent').length})
                      </h3>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {studentData.students
                        .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((student) => (
                        <div 
                          key={`absent-${student.id}`}
                          className={`p-2 text-sm border rounded-md flex items-center justify-between cursor-pointer transition-colors
                            ${attendanceRecords[student.id] === 'absent' 
                              ? 'bg-red-100 border-red-200' 
                              : 'bg-white border-gray-200 hover:bg-red-50'}`}
                          onClick={() => handleAttendanceChange(student.id, 'absent')}
                        >
                          <span className="truncate mr-2">{student.name}</span>
                          {attendanceRecords[student.id] === 'absent' && (
                            <X className="h-4 w-4 text-red-600 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <div className="font-medium text-blue-700 mb-2">Cara Penggunaan:</div>
                  <ul className="list-disc pl-5 text-blue-600 text-xs space-y-1">
                    <li>Klik nama siswa untuk memindahkannya ke kolom tersebut</li>
                    <li>Gunakan tombol "Semua Hadir" untuk menandai semua siswa sebagai hadir</li>
                    <li>Status terakhir yang akan disimpan saat menekan tombol "Simpan Kehadiran"</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSubmit} className="bg-[#C40503] hover:bg-[#a60402]">
            Simpan Kehadiran
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
