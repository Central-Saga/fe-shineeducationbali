"use client";

import React, { useState, useEffect } from 'react';
import { teacherClasses } from '@/data/data-teacher/classes-data';
import { ClassCard } from '@/components/ui-teacher/classes/ClassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScheduleTab } from '@/components/ui-teacher/classes/ScheduleTab';

export function ClassesDashboard() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
  
  // State untuk modal buat kelas baru
  // const [newClassModalOpen, setNewClassModalOpen] = useState(false);
  
  // Check URL for tab parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['all', 'upcoming', 'ongoing', 'completed', 'schedule', 'calendar'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);
  
  
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
  const allLevels = new Set<string>();
  teacherClasses.forEach(schedule => {
    schedule.sessions.forEach(session => {
      allSubjects.add(session.subject);
      allLevels.add(session.level);
    });
  });
  const uniqueSubjects = Array.from(allSubjects);
  const uniqueLevels = Array.from(allLevels);
  
  // Filter classes based on search, subject, and level filter
  const filteredClasses = teacherClasses.map(schedule => ({
    ...schedule,
    sessions: schedule.sessions.filter(session => {
      const matchesSearch = searchQuery === '' || 
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        session.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.level.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSubject = filterSubject === 'all' || session.subject === filterSubject;
      const matchesLevel = filterLevel === 'all' || session.level === filterLevel;
      
      return matchesSearch && matchesSubject && matchesLevel;
    })
  })).filter(schedule => schedule.sessions.length > 0);
  
  // Separate sessions by status for tabs
  const allSessions = teacherClasses.flatMap(schedule => schedule.sessions);
  const upcomingSessions = allSessions.filter(session => session.status === 'upcoming');
  const ongoingSessions = allSessions.filter(session => session.status === 'ongoing');
  const completedSessions = allSessions.filter(session => session.status === 'completed');
  
  return (
    <div className="container py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-6 w-1.5 bg-[#C40503] rounded-full"></div>
            <h1 className="text-2xl font-bold text-[#C40503]">Kelas Saya</h1>
          </div>
          <p className="text-sm text-gray-600 ml-3.5 flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-[#C40503]" />
            {currentDate.toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
        
        {/* Button removed as teachers can't create classes directly - they're assigned by admin */}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input 
            placeholder="Cari kelas, program, atau jenjang..." 
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
                <SelectValue placeholder="Filter Kategori Program" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {uniqueSubjects.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-64">
          <Select value={filterLevel} onValueChange={setFilterLevel}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter Jenjang" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jenjang</SelectItem>
              {uniqueLevels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
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
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#C40503]/5 p-4 border-b">
              <h3 className="font-medium text-gray-800 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-[#C40503]" />
                Kalender Kelas Bulanan
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Tampilan kalender memudahkan Anda melihat semua jadwal kelas dalam format bulanan dan mengelola ketersediaan waktu
              </p>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                  <div key={day} className="text-xs font-medium text-gray-500 text-center py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const hasClass = allSessions.some(session => {
                    // Use schedule to determine if there's a class on this day
                    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
                    const dayName = dayNames[new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay()];
                    return session.schedule.includes(dayName);
                  });
                  
                  const hasUpcomingClass = upcomingSessions.some(session => {
                    // Use schedule to determine if there's an upcoming class on this day
                    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
                    const dayName = dayNames[new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay()];
                    return session.schedule.includes(dayName);
                  });
                  
                  const hasOngoingClass = ongoingSessions.some(session => {
                    // Use schedule to determine if there's an ongoing class on this day
                    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
                    const dayName = dayNames[new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay()];
                    return session.schedule.includes(dayName);
                  });
                  
                  return (
                    <div 
                      key={day} 
                      className={`relative aspect-square flex flex-col items-center justify-center rounded-md border ${
                        day === currentDate.getDate() 
                          ? 'border-[#C40503] bg-[#C40503]/5' 
                          : hasClass ? 'border-[#DAA625]/30 bg-[#DAA625]/5' : 'border-gray-200'
                      } ${day > 28 ? 'opacity-60' : ''} hover:bg-gray-50 transition-colors cursor-pointer`}
                    >
                      <span className={`text-sm ${day === currentDate.getDate() ? 'font-bold text-[#C40503]' : 'font-medium text-gray-700'}`}>
                        {day}
                      </span>
                      
                      {hasClass && (
                        <div className="flex gap-0.5 mt-1">
                          {hasUpcomingClass && <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>}
                          {hasOngoingClass && <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>}
                          {!hasUpcomingClass && !hasOngoingClass && <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>Akan Datang</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Berlangsung</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                  <span>Selesai</span>
                </div>
              </div>
            </div>
            
            <div className="border-t p-3 bg-gray-50">
              <div className="text-xs text-gray-500 italic text-center">
                Klik pada tanggal untuk melihat detail kelas pada hari tersebut
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-0">
          <ScheduleTab />
        </TabsContent>
      </Tabs>
      
      
      {/* Modal removed since teachers don't create classes */}
    </div>
  );
}
