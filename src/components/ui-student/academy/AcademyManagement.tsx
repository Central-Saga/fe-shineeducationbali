import React, { useState, useEffect } from 'react';
import { studentClasses } from '@/data/data-student/student-classes';
import "./floating-confetti.css";

// Enum for different views within the academy
enum AcademyView {
  MAIN = 'main',
  SUBJECT = 'subject',
  TASK = 'task'
}

interface AcademyManagementProps {
  initialView?: AcademyView;
  subjectId?: string;
  taskId?: string;
}

export function AcademyManagement({ 
  initialView = AcademyView.MAIN,
  subjectId,
  taskId 
}: AcademyManagementProps) {
  // State for navigation and active items
  const [currentView, setCurrentView] = useState<AcademyView>(initialView);
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(subjectId || null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(taskId || null);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  
  // State for subject data that can be modified (for progress tracking)
  const [subjectsData, setSubjectsData] = useState(studentClasses);

  // Navigation handlers
  const handleSubjectClick = (subjectId: string) => {
    setActiveSubjectId(subjectId);
    setCurrentView(AcademyView.SUBJECT);
  };

  const handleTaskClick = (taskId: string) => {
    setActiveTaskId(taskId);
    setCurrentView(AcademyView.TASK);
  };

  const handleBackToMain = () => {
    setCurrentView(AcademyView.MAIN);
    setActiveSubjectId(null);
  };

  const handleBackToSubject = () => {
    setCurrentView(AcademyView.SUBJECT);
    setActiveTaskId(null);
  };

  // Material completion handler
  const handleMaterialComplete = (sessionId: string, materialId: string, isCompleted: boolean) => {
    if (!activeSubjectId) return;
    
    // Create a deep copy of the subjects data
    const updatedSubjectsData = JSON.parse(JSON.stringify(subjectsData));
    
    // Find the subject
    const allSubjects = [
      ...updatedSubjectsData.activeSubjects,
      ...updatedSubjectsData.completedSubjects
    ];
    
    const subjectIndex = allSubjects.findIndex((s: any) => s.id === activeSubjectId);
    if (subjectIndex === -1) return;
    
    const subject = allSubjects[subjectIndex];
    
    // Find and update the material completion status
    const sessionIndex = subject.sessions.findIndex((s: any) => s.id === sessionId);
    if (sessionIndex === -1) return;
    
    const materialIndex = subject.sessions[sessionIndex].materials.findIndex(
      (m: any) => m.id === materialId
    );
    if (materialIndex === -1) return;
    
    subject.sessions[sessionIndex].materials[materialIndex].isCompleted = isCompleted;
    
    // Calculate if the session is completed
    const isSessionCompleted = subject.sessions[sessionIndex].materials.every(
      (m: any) => m.isCompleted
    );
    subject.sessions[sessionIndex].isCompleted = isSessionCompleted;
    
    // Calculate overall progress
    const totalMaterials = subject.sessions.reduce(
      (acc: number, session: any) => acc + session.materials.length, 0
    );
    
    const completedMaterials = subject.sessions.reduce(
      (acc: number, session: any) => acc + session.materials.filter((m: any) => m.isCompleted).length, 0
    );
    
    subject.progress = Math.round((completedMaterials / totalMaterials) * 100) || 0;
    
    // Check if all sessions are complete to mark subject as completed
    const isSubjectCompleted = subject.sessions.every((session: any) => session.isCompleted);
    
    // If subject status changes, move it between active and completed lists
    if (isSubjectCompleted && subject.status === 'active') {
      subject.status = 'completed';
      // Find and remove from active subjects
      const activeIndex = updatedSubjectsData.activeSubjects.findIndex((s: any) => s.id === subject.id);
      if (activeIndex !== -1) {
        const [removedSubject] = updatedSubjectsData.activeSubjects.splice(activeIndex, 1);
        updatedSubjectsData.completedSubjects.push(removedSubject);
      }
    } else if (!isSubjectCompleted && subject.status === 'completed') {
      subject.status = 'active';
      // Find and remove from completed subjects
      const completedIndex = updatedSubjectsData.completedSubjects.findIndex((s: any) => s.id === subject.id);
      if (completedIndex !== -1) {
        const [removedSubject] = updatedSubjectsData.completedSubjects.splice(completedIndex, 1);
        updatedSubjectsData.activeSubjects.push(removedSubject);
      }
    }
    
    setSubjectsData(updatedSubjectsData);
  };

  // Task completion handler
  const handleTaskComplete = (taskId: string, isCompleted: boolean) => {
    console.log(`Task ${taskId} marked as ${isCompleted ? 'completed' : 'incomplete'}`);
    
    if (isCompleted) {
      handleBackToSubject();
    }
  };

  // Render Main View (list of subjects)
  const renderMainView = () => {
    const subjects = activeTab === 'active' 
      ? subjectsData.activeSubjects 
      : subjectsData.completedSubjects;
    
    return (
      <>
        <div className="relative bg-gradient-to-r from-[#C40503] via-[#E5303D] to-[#DAA625] rounded-2xl mb-8 shadow-xl overflow-hidden">
          {/* Floating confetti animation - makes UI fun for children */}
          <FloatingConfetti />
          
          {/* Header Wave Background */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-24 opacity-30">
              <path fill="#FFFFFF" fillOpacity="1" d="M0,128L48,117.3C96,107,192,85,288,96C384,107,480,149,576,149.3C672,149,768,107,864,101.3C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          
          {/* Animated floating elements */}
          <div className="absolute top-0 right-0 opacity-40 animate-float-slow">
            <svg width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z" fill="white" />
              <path d="M12 5L5 9L12 13L19 9L12 5Z" fill="white" />
            </svg>
          </div>
          
          <div className="absolute bottom-10 left-10 opacity-40 animate-float">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" strokeWidth="3" />
            </svg>
          </div>
          
          <div className="absolute top-10 left-1/2 opacity-40 animate-pulse">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 3L11.5 6H9L11 9H8L5 12H21L18 9H15L17 6H14.5L12.5 3H9.5Z" />
            </svg>
          </div>

          <div className="relative z-10 p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg mr-5 border-4 border-white transform hover:scale-105 transition-transform duration-300">
                  <svg className="w-9 h-9 text-[#C40503]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z" />
                    <path d="M12 5L5 9L12 13L19 9L12 5Z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-white drop-shadow-lg tracking-wide">Academy</h1>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-white font-semibold drop-shadow-md">Level Pendidikan:</span>
                    <span className="text-sm bg-white text-[#C40503] ml-2 px-4 py-1 rounded-full font-bold shadow-md border-2 border-[#FFE4E4]">{subjectsData.studentLevel}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
                <div className="flex space-x-3 mb-4 md:mb-0 md:mr-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center border-2 border-white shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                    </svg>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center border-2 border-white shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8C6.9 2 6 2.9 6 4v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
                    </svg>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border-2 border-yellow-300 max-w-md shadow-lg">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-yellow-400 rounded-full shadow-sm">
                      <svg className="w-6 h-6 text-[#C40503]" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <span className="font-medium text-[#C40503] text-sm">Temukan materi pelajaran yang menarik dan selesaikan tugasmu dengan mudah!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for active/completed classes */}
        <div className="mb-8">
          <div className="flex p-3 bg-white rounded-2xl shadow-lg border-2 border-gray-100 relative">
            <button
              onClick={() => setActiveTab('active')}
              className={`relative flex-1 px-5 py-4 font-bold text-base rounded-xl transition-all transform ${
                activeTab === 'active' 
                  ? 'bg-gradient-to-r from-[#C40503] to-[#E5303D] text-white shadow-lg border-2 border-[#FFE4E4] scale-105 z-10' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                {activeTab === 'active' ? (
                  <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center mr-3 border-2 border-white">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-[#FFE4E4] rounded-full flex items-center justify-center mr-3 border border-[#FFB8B8]">
                    <svg className="w-6 h-6 text-[#C40503]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 3h6v2h-6V3zm4 16c.6 0 1-.4 1-1h-2c0 .6.4 1 1 1zm7-11v6c0 2.7-1.3 5-3.5 6H7.5C5.3 14 4 11.7 4 9V8c0-1.1.9-2 2-2h1V4c0-.6.4-1 1-1s1 .4 1 1v2h6V4c0-.6.4-1 1-1s1 .4 1 1v2h1c1.1 0 2 .9 2 2z" />
                    </svg>
                  </div>
                )}
                <span className="font-bold text-base">Kelas yang diikuti</span>
              </div>
              {activeTab === 'active' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor">
                    <polygon points="0,0 10,10 20,0" />
                  </svg>
                </div>
              )}
            </button>
            
            <div className="w-3"></div>
            
            <button
              onClick={() => setActiveTab('completed')}
              className={`relative flex-1 px-5 py-4 font-bold text-base rounded-xl transition-all transform ${
                activeTab === 'completed' 
                  ? 'bg-gradient-to-r from-[#C40503] to-[#E5303D] text-white shadow-lg border-2 border-[#FFE4E4] scale-105 z-10' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                {activeTab === 'completed' ? (
                  <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center mr-3 border-2 border-white">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-[#FFE4E4] rounded-full flex items-center justify-center mr-3 border border-[#FFB8B8]">
                    <svg className="w-6 h-6 text-[#C40503]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  </div>
                )}
                <span className="font-bold text-base">Kelas yang diselesaikan</span>
              </div>
              {activeTab === 'completed' && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="currentColor">
                    <polygon points="0,0 10,10 20,0" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
        
        {/* List of subjects */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <div 
                key={subject.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                {/* Top colorful banner */}
                <div className="h-3 bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
                
                <div className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#C40503] transition-colors">{subject.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1.5 bg-[#FFE4E4] text-[#C40503] text-xs font-bold rounded-full border border-[#FFB8B8]">
                            {subject.level}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-2 mb-3">
                        {subject.description || `Kelas ${subject.name} untuk tingkat ${subject.level}`}
                      </p>
                      
                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Pengajar: {subject.teacher}</span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 font-medium">Progress Pembelajaran</span>
                          <span className="font-semibold text-[#C40503]">{subject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${subject.progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-[#C40503] to-[#DAA625]'}`}
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                      <button 
                        onClick={() => handleSubjectClick(subject.id)}
                        className="px-5 py-2 bg-[#C40503] text-white text-sm font-medium rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>Ruang Belajar</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg border border-dashed border-gray-300 p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {activeTab === 'active' ? 'Wah, Belum Ada Kelas Aktif Nih!' : 'Belum Ada Kelas yang Diselesaikan'}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-4 text-base">
                {activeTab === 'active' 
                  ? 'Ayo mulai petualangan belajarmu! Silahkan hubungi guru atau admin untuk bergabung dengan kelas baru.' 
                  : 'Semangat! Selesaikan kelas yang sedang kamu ikuti, dan nanti akan muncul di sini sebagai prestasi belajarmu.'}
              </p>
              <div className="inline-block mx-auto bg-[#FFE4E4] text-[#C40503] px-4 py-2 rounded-full font-medium text-sm border border-[#C40503] border-opacity-20">
                {activeTab === 'active' ? 'Tanyakan ke Guru 👩‍🏫' : 'Ayo Semangat Belajar! 📚'}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  // Render Subject Detail View
  const renderSubjectDetail = () => {
    if (!activeSubjectId) return null;
    
    const allSubjects = [
      ...subjectsData.activeSubjects,
      ...subjectsData.completedSubjects
    ];
    
    const subject = allSubjects.find(s => s.id === activeSubjectId);
    
    if (!subject) {
      return (
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Mata Pelajaran Tidak Ditemukan</h3>
          <p className="text-gray-600">
            Maaf, mata pelajaran yang Anda cari tidak tersedia.
          </p>
          <button
            onClick={handleBackToMain}
            className="mt-4 px-4 py-2 bg-[#C40503] text-white rounded hover:bg-opacity-90"
          >
            Kembali ke Daftar Kelas
          </button>
        </div>
      );
    }
    
    return (
      <>
        <div className="mb-4 flex items-center">
          <button
            onClick={handleBackToMain}
            className="flex items-center text-[#C40503] font-medium hover:bg-red-50 py-1 px-2 rounded-md transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali</span>
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-[#C40503] to-[#DAA625] rounded-lg p-5 mb-6 text-white shadow-md">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h1 className="text-xl font-bold">{subject.name}</h1>
              </div>
              <div className="mt-1 flex items-center text-sm text-white opacity-80">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Pengajar: {subject.teacher}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 bg-white bg-opacity-20 p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progress Pembelajaran:</span>
                <span className="font-semibold">{subject.progress}%</span>
              </div>
              <div className="w-full md:w-48 bg-white bg-opacity-30 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full bg-white ${subject.progress === 100 ? 'bg-green-300' : ''}`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {subject.sessions.length > 0 ? (
          <div className="space-y-3">
            {subject.sessions.map((session) => (
              <div key={session.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div 
                  className={`p-4 cursor-pointer flex justify-between items-center transition-colors ${activeSessionId === session.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  onClick={() => {
                    // Toggle the accordion
                    const newActiveSessionId = session.id === activeSessionId ? null : session.id;
                    setActiveSessionId(newActiveSessionId);
                  }}
                >
                  <div className="flex items-center">
                    <div className={`w-7 h-7 mr-3 flex-shrink-0 rounded-full flex items-center justify-center ${session.isCompleted ? 'bg-green-500' : 'border-2 border-gray-200'}`}>
                      {session.isCompleted && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-medium">{session.title}</h3>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {session.materials.length} materi {session.isCompleted ? '· Selesai' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 transition-transform ${activeSessionId === session.id ? 'rotate-180' : ''}`}>
                    <svg 
                      className="w-4 h-4 text-gray-500"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Materials list */}
                {activeSessionId === session.id && (
                  <div className="border-t border-gray-100">
                    <div className="divide-y divide-gray-100">
                      {session.materials.map((material) => (
                        <div key={material.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3 pt-0.5">
                              <input
                                type="checkbox"
                                checked={!!material.isCompleted}
                                onChange={(e) => handleMaterialComplete(session.id, material.id, e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-[#C40503] focus:ring-[#DAA625] focus:ring-offset-0"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="text-gray-900 font-medium">{material.title}</h4>
                                {material.uploadDate && (
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md ml-2">
                                    {material.uploadDate}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-3">
                                {material.type === 'pdf' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-md">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    PDF
                                  </span>
                                )}
                                {material.type === 'video' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-md">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Video
                                  </span>
                                )}
                                {material.type === 'document' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-md">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Document
                                  </span>
                                )}
                                {material.type === 'task' && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-md">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Tugas
                                  </span>
                                )}
                              </div>
                              
                              <div className="mt-3">
                                {material.type === 'task' ? (
                                  <button
                                    onClick={() => handleTaskClick(material.id)}
                                    className="inline-flex items-center px-3 py-1.5 bg-[#C40503] bg-opacity-10 text-[#C40503] text-xs font-medium rounded-md hover:bg-opacity-20 transition-colors"
                                  >
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Lihat Tugas
                                  </button>
                                ) : (
                                  <a 
                                    href={material.fileUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 bg-[#C40503] bg-opacity-10 text-[#C40503] text-xs font-medium rounded-md hover:bg-opacity-20 transition-colors"
                                  >
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Lihat Materi
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-dashed border-gray-300 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Belum Ada Pertemuan</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Belum ada pertemuan yang dijadwalkan untuk kelas ini. Silahkan periksa kembali nanti.
            </p>
          </div>
        )}
      </>
    );
  };

  // Render Task Detail View
  const renderTaskDetail = () => {
    if (!activeTaskId) return null;
    
    // Mock task data - in a real app, this would come from your API
    const task = {
      id: activeTaskId,
      title: 'Tugas ' + activeTaskId,
      description: 'Silakan kerjakan tugas ini dengan cermat. Perhatikan batas waktu pengumpulan.',
      subjectName: 'Mata Pelajaran',
      sessionTitle: 'Pertemuan',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      createdAt: new Date().toISOString(),
      isCompleted: false,
      attachments: [
        {
          id: 'att-001',
          name: 'Instruksi Tugas.pdf',
          url: '#',
          uploadDate: new Date().toISOString()
        }
      ],
      submissions: [] as any[]
    };
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
      }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedFile) return;
      
      setIsSubmitting(true);
      
      // Mock submission - in a real app, you'd upload to your server
      setTimeout(() => {
        console.log('File submitted:', selectedFile.name);
        setSelectedFile(null);
        setIsSubmitting(false);
        
        // Show success message or update state
        alert('File submitted successfully');
      }, 1000);
    };
    
    const handleMarkComplete = () => {
      setIsCompleted(true);
      handleTaskComplete(activeTaskId, true);
    };
    
    // Calculate status based on deadline
    const deadlineDate = new Date(task.deadline);
    const now = new Date();
    const isOverdue = deadlineDate < now;
    let status = 'Aktif';
    let statusColor = 'bg-green-100 text-green-800';
    
    if (isOverdue) {
      status = 'Terlambat';
      statusColor = 'bg-red-100 text-red-800';
    } else if (isCompleted) {
      status = 'Selesai';
      statusColor = 'bg-blue-100 text-blue-800';
    }
    
    return (
      <>
        <div className="mb-4">
          <button
            onClick={handleBackToSubject}
            className="flex items-center text-[#C40503] font-medium hover:underline"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Detail Mata Pelajaran
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between flex-wrap items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
              {status}
            </span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center text-gray-600 mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Dibuat pada {new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Batas waktu: {new Date(task.deadline).toLocaleDateString()} {new Date(task.deadline).toLocaleTimeString()}</span>
            </div>
            
            <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
          </div>
          
          {task.attachments.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Lampiran</h2>
              <div className="space-y-2">
                {task.attachments.map(attachment => (
                  <div 
                    key={attachment.id} 
                    className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <svg className="w-8 h-8 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{attachment.name}</p>
                      <p className="text-xs text-gray-500">
                        Diunggah pada {new Date(attachment.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    <a 
                      href={attachment.url} 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pengumpulan Tugas</h2>
            
            {!isCompleted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input 
                    type="file" 
                    id="task-file" 
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  
                  <label htmlFor="task-file" className="cursor-pointer">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      Klik untuk pilih file atau tarik dan letakkan file di sini
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF, DOC, DOCX (Maks. 10MB)
                    </p>
                  </label>
                  
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md flex items-center">
                      <svg className="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-gray-900 font-medium">{selectedFile.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <button 
                    type="button"
                    onClick={handleMarkComplete}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Tandai Selesai
                  </button>
                  
                  <button 
                    type="submit"
                    disabled={!selectedFile || isSubmitting}
                    className={`px-4 py-2 bg-[#C40503] text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                      (!selectedFile || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Mengunggah...' : 'Unggah Tugas'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-green-800 mt-2">Tugas Telah Diselesaikan</h3>
                <p className="text-green-700 mt-1">
                  Anda telah menyelesaikan tugas ini. Terima kasih atas kerja kerasnya!
                </p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  // Component for floating confetti/stars animation
  const FloatingConfetti = () => {
    const [confettiElements, setConfettiElements] = useState<React.ReactNode[]>([]);
    
    useEffect(() => {
      const colors = ['#FFD700', '#FF6B6B', '#4BC0C0', '#9966CC', '#FF8C42', '#36A2EB'];
      const shapes = ['star-shape', 'circle-shape', 'triangle-shape', 'square-shape'];
      const animations = ['confetti--animation-slow', 'confetti--animation-medium', 'confetti--animation-fast'];
      
      const generateConfetti = (count: number) => {
        const elements = [];
        
        for (let i = 0; i < count; i++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const animation = animations[Math.floor(Math.random() * animations.length)];
          const left = `${Math.random() * 100}%`;
          const size = `${Math.random() * (15 - 5) + 5}px`;
          
          elements.push(
            <div 
              key={i}
              className={`confetti ${shape} ${animation}`} 
              style={{
                backgroundColor: color,
                left,
                width: size,
                height: size,
                opacity: Math.random() * 0.8 + 0.2,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          );
        }
        
        return elements;
      };
      
      setConfettiElements(generateConfetti(15));
    }, []);
    
    return <div className="confetti-container">{confettiElements}</div>;
  };

  return (
    <div className="bg-gray-50">
      <div className="container px-4 py-6 mx-auto max-w-7xl">
        {currentView === AcademyView.MAIN && renderMainView()}
        {currentView === AcademyView.SUBJECT && renderSubjectDetail()}
        {currentView === AcademyView.TASK && renderTaskDetail()}
      </div>
    </div>
  );
}

export { AcademyView };
