'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { subjects, Material, Subject, SubTopic, Topic } from '@/data/data-student/academy-materials';

const MathSubjectInterface = () => {
  const [activeTab, setActiveTab] = useState('followed');
  const [selectedSubject, setSelectedSubject] = useState<Subject>(subjects[0]);
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [expandedSubtopics, setExpandedSubtopics] = useState<string[]>([]);
  const router = useRouter();

  // Helper function to toggle expanded topics
  const toggleTopic = (topicId: number) => {
    if (expandedTopics.includes(topicId)) {
      setExpandedTopics(expandedTopics.filter(id => id !== topicId));
    } else {
      setExpandedTopics([...expandedTopics, topicId]);
    }
  };

  // Helper function to toggle expanded subtopics
  const toggleSubtopic = (subtopicId: string) => {
    if (expandedSubtopics.includes(subtopicId)) {
      setExpandedSubtopics(expandedSubtopics.filter(id => id !== subtopicId));
    } else {
      setExpandedSubtopics([...expandedSubtopics, subtopicId]);
    }
  };

  // Function to toggle subtopic completion status
  const toggleSubtopicCompletion = (e: React.MouseEvent, subtopicId: string) => {
    e.stopPropagation(); // Prevent the subtopic from expanding/collapsing
    
    // Update the subject copy
    const updatedSubject = { ...selectedSubject };
    
    // Find and update the subtopic
    updatedSubject.topics.forEach(topic => {
      topic.subtopics.forEach(subtopic => {
        if (subtopic.id === subtopicId) {
          subtopic.isCompleted = !subtopic.isCompleted;
        }
      });
    });
    
    // Update state
    setSelectedSubject(updatedSubject);
    
    // In a real application, you would also send this update to a backend
    console.log(`Subtopic ${subtopicId} completion status toggled`);
  };

  // Helper function to handle material click - navigate to detail page
  const handleMaterialClick = (material: Material) => {
    router.push(`/dashboard-student/academy/material/${material.id}`);
  };

  // Calculate progress for a topic
  const calculateProgress = (topic: Topic) => {
    const completedSubtopics = topic.subtopics.filter(subtopic => subtopic.isCompleted).length;
    const totalSubtopics = topic.subtopics.length;
    return totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;
  };

  // Render file icon based on type
  const renderFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'video':
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3.586l2.707-2.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 9.586V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto bg-gray-50 min-h-screen pb-16 max-w-[2560px]">
      {/* Enhanced Hero Section with Custom Colors - More Compact */}
      <div className="bg-gradient-to-r from-[#C40503] to-[#C40503]/90 text-white relative overflow-hidden pt-8 pb-14">
        {/* Custom Wave Background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="#DAA625" fillOpacity="0.5" d="M0,288L60,261.3C120,235,240,181,360,181.3C480,181,600,235,720,245.3C840,256,960,224,1080,186.7C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" fillOpacity="0.2" d="M0,160L60,138.7C120,117,240,75,360,90.7C480,107,600,181,720,208C840,235,960,213,1080,186.7C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#DAA625] rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white leading-tight">Akademi <span className="text-[#DAA625] drop-shadow-sm">Belajar</span></h1>
              <p className="text-sm md:text-base mb-5 text-white/90 max-w-2xl">Lanjutkan pembelajaran Anda dengan materi terbaru yang telah dirancang khusus untuk membantu Anda menguasai setiap materi.</p>
              
              <div className="flex flex-wrap gap-2.5">
                <button className="bg-[#DAA625] hover:bg-[#DAA625]/90 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lanjutkan Belajar
                </button>
                <button className="border border-white/50 hover:border-white bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1.5 transition-all backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Jadwal Kelas
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/30 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#DAA625] rounded-lg flex items-center justify-center text-white text-xl shadow-md">
                    {selectedSubject.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedSubject.name}</h3>
                    <p className="text-white/80 text-xs">Anda telah menyelesaikan <span className="text-[#DAA625] font-bold">{selectedSubject.progress}%</span> materi</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-[#DAA625] to-[#DAA625]/80 rounded-full" 
                      style={{ width: `${selectedSubject.progress}%`, transition: 'width 1s ease-in-out' }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2.5 border-t border-white/30">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full border-2 border-white/70 overflow-hidden shadow">
                      <div className="w-full h-full bg-gray-300"></div>
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-white/70 overflow-hidden shadow">
                      <div className="w-full h-full bg-gray-300"></div>
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-white/70 overflow-hidden flex items-center justify-center bg-[#DAA625] text-white text-xs shadow font-bold">
                      +3
                    </div>
                  </div>
                  
                  <button className="bg-white text-[#C40503] px-3.5 py-1.5 rounded-lg font-medium text-xs hover:bg-white/90 transition-all shadow flex items-center gap-1.5">
                    <span>Lanjutkan</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Header Tabs - More Compact */}
      <div className="mx-6 -mt-7 mb-6 relative z-20">
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex border border-gray-100 max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('followed')}
            className={`flex-1 py-2 px-3 text-xs font-medium transition-all duration-300 ${
              activeTab === 'followed'
                ? 'bg-[#C40503] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-center items-center gap-1.5">
              <div className={`flex items-center justify-center w-6 h-6 rounded-md ${
                activeTab === 'followed' ? 'bg-white/20' : 'bg-[#C40503]/10'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${
                  activeTab === 'followed' ? 'text-white' : 'text-[#C40503]'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span>Kelas yang Diikuti</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 px-3 text-xs font-medium transition-all duration-300 ${
              activeTab === 'completed'
                ? 'bg-[#C40503] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-center items-center gap-1.5">
              <div className={`flex items-center justify-center w-6 h-6 rounded-md ${
                activeTab === 'completed' ? 'bg-white/20' : 'bg-[#C40503]/10'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${
                  activeTab === 'completed' ? 'text-white' : 'text-[#C40503]'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>Kelas yang Diselesaikan</span>
            </div>
          </button>
        </div>
      </div>

      {/* Subject List - Horizontal Scrollable Layout */}
      <div className="px-6 mb-8 max-w-[2560px] mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <div className="w-7 h-7 bg-[#C40503]/10 rounded-lg flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#C40503]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span>Mata Pelajaran</span>
          </h2>
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button className="px-2.5 py-1 bg-white shadow-sm rounded-md text-gray-700 text-xs font-medium">Semua</button>
            <button className="px-2.5 py-1 hover:bg-white/50 rounded-md text-gray-600 text-xs">Terbaru</button>
            <button className="px-2.5 py-1 hover:bg-white/50 rounded-md text-gray-600 text-xs">Favorit</button>
          </div>
        </div>
        
        {/* Horizontal Scrollable Subject Cards */}
        <div className="relative">
          {/* Optional scroll indicators */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
          
          {/* Scrollable container with snap points */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-thin scrollbar-thumb-[#C40503]/20 scrollbar-track-gray-100">
            {subjects.map((subject) => (
              <div 
                key={subject.id}
                className={`bg-white rounded-xl shadow-sm border transition-all snap-start w-[220px] flex-shrink-0 cursor-pointer overflow-hidden ${
                  selectedSubject.id === subject.id 
                  ? 'border-[#C40503] ring-1 ring-[#C40503]/20' 
                  : 'border-gray-200 hover:border-[#DAA625]/40 hover:shadow'
                }`}
                onClick={() => setSelectedSubject(subject)}
              >
                <div className="p-3">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="bg-gradient-to-br from-[#C40503] to-[#C40503]/80 w-10 h-10 flex items-center justify-center rounded-lg shadow-sm text-white text-xl flex-shrink-0">
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-800">{subject.name}</h3>
                      <p className="text-gray-500 text-xs line-clamp-1">{subject.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">Progress</span>
                      <span className="text-xs font-bold text-[#C40503]">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-1 overflow-hidden shadow-inner">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-[#C40503] to-[#DAA625]" 
                        style={{ width: `${subject.progress}%`, transition: 'width 1s ease-in-out' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      subject.status === 'Selesai' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-[#DAA625]/20 text-[#DAA625]'
                    }`}>
                      {subject.status}
                    </span>
                    <button className="bg-[#C40503]/10 hover:bg-[#C40503]/20 text-[#C40503] py-0.5 px-2 rounded-lg text-[10px] font-medium flex items-center gap-1 transition-all">
                      <span>Lanjutkan</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Subject Detail Section - More Compact Modern UI */}
      <div className="bg-white mx-8 rounded-xl shadow-md border border-gray-200 overflow-hidden mb-10 max-w-[2560px]">
        <div className="bg-gradient-to-r from-[#C40503] to-[#C40503]/90 text-white px-5 py-5 relative">
          <div className="absolute inset-0 overflow-hidden">
            {/* Custom background pattern */}
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full opacity-10">
              <defs>
                <pattern id="diagonalPattern" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="6" height="6" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonalPattern)" />
            </svg>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#DAA625] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 translate-x-1/4 opacity-10"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="text-2xl bg-white/20 backdrop-blur-sm p-3 rounded-xl shadow-md border border-white/30 mb-2 md:mb-0">
                {selectedSubject.icon}
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">{selectedSubject.name}</h3>
                  <span className="bg-[#DAA625] text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md inline-flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{selectedSubject.progress}% Selesai</span>
                  </span>
                </div>
                <p className="text-white/90 text-xs mt-1.5 max-w-3xl leading-relaxed">{selectedSubject.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          {selectedSubject.topics.map((topic) => (
            <div 
              key={topic.id} 
              className={`mb-4 last:mb-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all ${
                expandedTopics.includes(topic.id) ? 'ring-1 ring-[#C40503]/20' : 'hover:shadow'
              }`}
            >
              <div 
                className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-3.5 transition-colors" 
                onClick={() => toggleTopic(topic.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`min-w-[45px] h-[45px] rounded-xl flex items-center justify-center text-white font-bold text-base shadow-md ${
                    calculateProgress(topic) === 100 
                      ? 'bg-gradient-to-br from-green-500 to-green-600' 
                      : 'bg-gradient-to-br from-[#C40503] to-[#C40503]/80'
                  }`}>
                    {topic.id}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-gray-800 mb-1">{topic.title}</h4>
                    <div className="flex items-center">
                      <div className="w-40 bg-gray-200 rounded-full h-1.5 mr-2 shadow-inner overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full ${
                            calculateProgress(topic) === 100 
                              ? 'bg-gradient-to-r from-green-500 to-green-400' 
                              : 'bg-gradient-to-r from-[#C40503] to-[#DAA625]'
                          }`} 
                          style={{ width: `${calculateProgress(topic)}%`, transition: 'width 1.2s ease-in-out' }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-600">{calculateProgress(topic)}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    calculateProgress(topic) === 100 
                      ? 'bg-green-100 text-green-700' 
                      : calculateProgress(topic) > 0
                        ? 'bg-[#DAA625]/20 text-[#DAA625]'
                        : 'bg-gray-100 text-gray-700'
                  }`}>
                    {calculateProgress(topic) === 100 ? 'Selesai' : calculateProgress(topic) > 0 ? 'Sedang Berjalan' : 'Belum Dimulai'}
                  </span>
                  <div className={`w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm ${expandedTopics.includes(topic.id) ? 'rotate-180 bg-[#C40503]/10' : ''}`}>
                    <svg 
                      className={`w-3.5 h-3.5 ${expandedTopics.includes(topic.id) ? 'text-[#C40503]' : 'text-gray-600'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {expandedTopics.includes(topic.id) && (
                <div className="bg-gray-50 px-4 py-4 border-t border-gray-100">
                  <div className="space-y-3">
                    {topic.subtopics.map((subtopic) => (
                      <div 
                        key={subtopic.id} 
                        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:border-[#C40503]/30 transition-all"
                      >
                        <div 
                          className="flex items-center justify-between cursor-pointer p-3 hover:bg-gray-50 transition-colors"
                          onClick={() => toggleSubtopic(subtopic.id)}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                              subtopic.isCompleted 
                                ? 'bg-gradient-to-br from-green-500 to-green-600' 
                                : 'bg-gradient-to-br from-[#C40503] to-[#C40503]/80'
                            }`}>
                              <div className="w-4 h-4 text-white">
                                {subtopic.isCompleted ? (
                                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                  </svg>
                                ) : (
                                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-gray-800 mb-0.5">{subtopic.title}</h5>
                              <p className="text-gray-500 text-xs">
                                <span className="font-medium">{subtopic.materials.length}</span> materi pembelajaran tersedia
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div 
                              className={`relative w-7 h-7 rounded-lg border-2 cursor-pointer shadow-sm flex items-center justify-center ${
                                subtopic.isCompleted 
                                  ? 'bg-green-500 border-green-500' 
                                  : 'border-gray-300 hover:border-[#C40503] hover:bg-gray-50'
                              } transition-all`}
                              onClick={(e) => toggleSubtopicCompletion(e, subtopic.id)}
                            >
                              {subtopic.isCompleted && (
                                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                              )}
                            </div>
                            <div className={`w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 shadow-sm transition-all duration-300 hover:bg-gray-200 ${expandedSubtopics.includes(subtopic.id) ? 'rotate-180 bg-[#C40503]/10' : ''}`}>
                              <svg 
                                className={`w-3.5 h-3.5 ${expandedSubtopics.includes(subtopic.id) ? 'text-[#C40503]' : 'text-gray-600'}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        {expandedSubtopics.includes(subtopic.id) && (
                          <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h5 className="font-bold text-sm text-gray-800 flex items-center">
                                <div className="w-6 h-6 bg-[#C40503]/10 rounded-lg flex items-center justify-center mr-2">
                                  <svg className="w-3.5 h-3.5 text-[#C40503]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                </div>
                                Materi Pembelajaran
                              </h5>
                              <div className="flex gap-2">
                                <span className="text-[10px] font-bold text-[#C40503] bg-[#C40503]/10 px-2 py-1 rounded-lg flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  </svg>
                                  {subtopic.materials.length} materi
                                </span>
                                <button className="text-[10px] font-bold text-[#DAA625] bg-[#DAA625]/10 px-2 py-1 rounded-lg flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                  </svg>
                                  Filter
                                </button>
                              </div>
                            </div>
                            
                            <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
                              {subtopic.materials.map((material) => (
                                <div 
                                  key={material.id}
                                  className="flex items-center justify-between p-2.5 bg-white rounded-lg hover:bg-gray-50 transition-all cursor-pointer border border-gray-200 hover:border-[#C40503] shadow-sm hover:shadow group"
                                  onClick={() => handleMaterialClick(material)}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                                      material.fileType === 'pdf' ? 'bg-red-100' :
                                      material.fileType === 'video' ? 'bg-blue-100' :
                                      material.fileType === 'image' ? 'bg-green-100' :
                                      'bg-gray-100'
                                    } shadow-sm`}>
                                      <svg className={`w-4 h-4 ${
                                        material.fileType === 'pdf' ? 'text-red-600' :
                                        material.fileType === 'video' ? 'text-blue-600' :
                                        material.fileType === 'image' ? 'text-green-600' :
                                        'text-gray-600'
                                      }`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h5 className="font-bold text-xs text-gray-800 group-hover:text-[#C40503] transition-colors">{material.title}</h5>
                                      <div className="flex flex-wrap items-center mt-0.5 gap-1.5">
                                        <p className="text-[10px] text-gray-500">{material.uploadDate}</p>
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm ${
                                          material.fileType === 'pdf' ? 'bg-red-100 text-red-700' :
                                          material.fileType === 'video' ? 'bg-blue-100 text-blue-700' :
                                          material.fileType === 'image' ? 'bg-green-100 text-green-700' :
                                          'bg-gray-100 text-gray-700'
                                        }`}>
                                          {material.fileType.toUpperCase()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center group-hover:bg-[#C40503] transition-all shadow-sm border border-gray-100 group-hover:border-[#C40503]">
                                    <svg 
                                      className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24" 
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathSubjectInterface;
