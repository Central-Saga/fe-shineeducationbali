"use client";

import React, { useState, useEffect } from 'react';
import { TeacherClassSchedule, teacherClasses, TeacherClassSession } from '@/data/data-teacher/classes-data';
import { ClassCard } from '@/components/ui-teacher/classes/ClassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Filter, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScheduleTab } from '@/components/ui-teacher/classes/ScheduleTab';
import { AttendanceModal } from '@/components/ui-teacher/classes/AttendanceModal';
import { getStudentsByClassId, ClassStudentMapping } from '@/data/data-teacher/class-student-map';

export function ClassesDashboard() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
  // State untuk modal kehadiran
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [selectedClassForAttendance, setSelectedClassForAttendance] = useState<TeacherClassSession | null>(null);
  const [studentAttendanceData, setStudentAttendanceData] = useState<ClassStudentMapping | undefined>(undefined);
  
  // Check URL for tab parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['all', 'upcoming', 'ongoing', 'completed', 'schedule', 'calendar'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);
  
  // Handler untuk memunculkan modal kehadiran
  const handleAttendanceClick = (session: TeacherClassSession) => {
    setSelectedClassForAttendance(session);
    // Ambil data siswa berdasarkan kelas
    const students = getStudentsByClassId(session.id);
    setStudentAttendanceData(students);
    setAttendanceModalOpen(true);
  };
  
  // Handler untuk menyimpan data kehadiran
  const handleSaveAttendance = (attendanceData: any) => {
    console.log("Menyimpan data kehadiran:", attendanceData);
    // Di sini Anda bisa mengirimkan data ke API atau menyimpannya ke state lokal
    // Untuk contoh ini kita hanya log ke console
    
    // Update attendance record in session data jika diperlukan
    // ...
    
    setAttendanceModalOpen(false);
  };
  
  const toggleExpand = (id: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(id)) {
      newExpandedItems.delete(id);
    } else {
      newExpandedItems.add(id);
    }
    setExpandedItems(newExpandedItems);
  };
  
  const currentDate = new Date();
  
  // Get unique subject list
  const allSubjects = new Set<string>();
  teacherClasses.forEach(schedule => {
    schedule.sessions.forEach(session => {
      allSubjects.add(session.subject);
    });
  });
  const uniqueSubjects = Array.from(allSubjects);
  
  // Filter classes based on search and subject filter
  const filteredClasses = teacherClasses.map(schedule => ({
    ...schedule,
    sessions: schedule.sessions.filter(session => {
      const matchesSearch = searchQuery === '' || 
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        session.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSubject = filterSubject === 'all' || session.subject === filterSubject;
      
      return matchesSearch && matchesSubject;
    })
  })).filter(schedule => schedule.sessions.length > 0);
  
  // Separate sessions by status for tabs
  const allSessions = teacherClasses.flatMap(schedule => schedule.sessions);
  const upcomingSessions = allSessions.filter(session => session.status === 'upcoming');
  const ongoingSessions = allSessions.filter(session => session.status === 'ongoing');
  const completedSessions = allSessions.filter(session => session.status === 'completed');
  
  return (
    <div className="container py-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelas Saya</h1>
          <p className="text-sm text-gray-600">{currentDate.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}</p>
        </div>
        
        <Button className="bg-[#C40503] hover:bg-[#a60402]">
          <Plus className="h-4 w-4 mr-2" />
          Buat Kelas Baru
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input 
            placeholder="Cari kelas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter Mata Pelajaran" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
              {uniqueSubjects.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 bg-gray-100 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-[#C40503]">Semua</TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-[#C40503]">
            <Clock className="h-4 w-4 mr-1 text-blue-600" />
            Akan Datang ({upcomingSessions.length})
          </TabsTrigger>
          <TabsTrigger value="ongoing" className="data-[state=active]:bg-white data-[state=active]:text-[#C40503]">
            <Clock className="h-4 w-4 mr-1 text-green-600" />
            Sedang Berlangsung ({ongoingSessions.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:text-[#C40503]">
            <Clock className="h-4 w-4 mr-1 text-gray-600" />
            Selesai ({completedSessions.length})
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-white data-[state=active]:text-[#C40503]">
            <Calendar className="h-4 w-4 mr-1 text-[#C40503]" />
            Jadwal
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-white data-[state=active]:text-[#C40503]">
            <Calendar className="h-4 w-4 mr-1" />
            Kalender
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {filteredClasses.length > 0 ? (
            <div className="space-y-6">
              {filteredClasses.map((schedule) => (
                <div key={schedule.id} className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-800">{schedule.day}, {new Date(schedule.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {schedule.sessions.map((session) => (
                      <ClassCard 
                        key={session.id} 
                        session={session} 
                        isExpanded={expandedItems.has(session.id)}
                        onToggle={() => toggleExpand(session.id)}
                        onAttendanceClick={handleAttendanceClick}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Tidak ada kelas yang ditemukan</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-0">
          {upcomingSessions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {upcomingSessions.map((session) => (
                <ClassCard 
                  key={session.id} 
                  session={session} 
                  isExpanded={expandedItems.has(session.id)}
                  onToggle={() => toggleExpand(session.id)}
                  onAttendanceClick={handleAttendanceClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Tidak ada kelas yang akan datang</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ongoing" className="mt-0">
          {ongoingSessions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {ongoingSessions.map((session) => (
                <ClassCard 
                  key={session.id} 
                  session={session} 
                  isExpanded={expandedItems.has(session.id)}
                  onToggle={() => toggleExpand(session.id)}
                  onAttendanceClick={handleAttendanceClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Tidak ada kelas yang sedang berlangsung</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          {completedSessions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {completedSessions.map((session) => (
                <ClassCard 
                  key={session.id} 
                  session={session} 
                  isExpanded={expandedItems.has(session.id)}
                  onToggle={() => toggleExpand(session.id)}
                  onAttendanceClick={handleAttendanceClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Tidak ada kelas yang telah selesai</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-0">
          <div className="bg-gray-50 border rounded-lg p-6 text-center">
            <p className="text-gray-500">Tampilan kalender akan segera tersedia</p>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-0">
          <ScheduleTab />
        </TabsContent>
      </Tabs>
      
      {/* Modal Kehadiran */}
      {selectedClassForAttendance && (
        <AttendanceModal 
          isOpen={attendanceModalOpen}
          onClose={() => setAttendanceModalOpen(false)}
          classData={selectedClassForAttendance}
          studentData={studentAttendanceData}
          onSave={handleSaveAttendance}
        />
      )}
    </div>
  );
}
