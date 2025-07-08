'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Material, subjects } from '@/data/data-student/academy-materials';
import Link from 'next/link';
import Image from 'next/image';

export default function MaterialDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showFileInput, setShowFileInput] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [relatedMaterials, setRelatedMaterials] = useState<Material[]>([]);
  const [savedToPlaylist, setSavedToPlaylist] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<{show: boolean, message: string}>({show: false, message: ''});

  // State to store breadcrumb information
  const [breadcrumb, setBreadcrumb] = useState<{
    subject: string;
    topic: string;
    subtopic: string;
  }>({
    subject: '',
    topic: '',
    subtopic: ''
  });

  useEffect(() => {
    // Find the material with the specified ID
    if (params.id) {
      const materialId = Array.isArray(params.id) ? params.id[0] : params.id;
      
      // Show loading state while finding the material
      setLoading(true);
      
      try {
        // Search for the material in all subjects
        let foundMaterial: Material | null = null;
        let foundRelatedMaterials: Material[] = [];
        let breadcrumbInfo = { subject: '', topic: '', subtopic: '' };
        
        // Search through the subjects for the material with the given ID
        subjects.forEach(subject => {
          subject.topics.forEach(topic => {
            topic.subtopics.forEach(subtopic => {
              const found = subtopic.materials.find(mat => mat.id === materialId);
              if (found) {
                foundMaterial = found;
                // Find related materials from the same subtopic
                foundRelatedMaterials = subtopic.materials.filter(mat => mat.id !== materialId);
                
                // Set breadcrumb info
                breadcrumbInfo = {
                  subject: subject.name,
                  topic: topic.title,
                  subtopic: subtopic.title
                };
              }
            });
          });
        });
        
        if (foundMaterial) {
          setMaterial(foundMaterial);
          setRelatedMaterials(foundRelatedMaterials);
          setBreadcrumb(breadcrumbInfo);
          
          // Check if material is already in playlist (from localStorage in a real app)
          const playlistItems = JSON.parse(localStorage.getItem('savedPlaylist') || '[]');
          setSavedToPlaylist(playlistItems);
          
          // Simulate time remaining calculation - in a real app, you'd calculate this from the deadline
          const calculateTimeRemaining = () => {
            // For demo purposes we'll just set a fixed time
            setTimeRemaining('3 hari 6 jam');
          };
          
          calculateTimeRemaining();
          // In a real app, you might refresh this periodically:
          // const timer = setInterval(calculateTimeRemaining, 60000);
          // return () => clearInterval(timer);
        } else {
          // Material not found - handle gracefully
          console.error(`Material with ID ${materialId} not found`);
          // We'll show the not found UI through the conditional rendering
        }
      } catch (error) {
        console.error("Error finding material:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [params.id]);

  // Validate submission before sending
  const validateSubmission = (): boolean => {
    // Clear previous validation errors
    setValidationError(null);
    
    // Check if at least one field is filled
    if (!studentAnswer.trim() && !selectedFile) {
      setValidationError('Silakan masukkan jawaban atau unggah berkas.');
      return false;
    }
    
    // Validate file size (10MB limit)
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setValidationError('Ukuran file melebihi batas maksimum 10MB.');
      return false;
    }
    
    // Validate file type
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'txt'];
      
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        setValidationError(`Format file tidak didukung. Format yang didukung: ${allowedExtensions.join(', ')}`);
        return false;
      }
    }
    
    return true;
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSubmission()) {
      return;
    }
    
    // Show submitting state
    setSubmissionStatus('submitting');
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, you would send the data to an API
      console.log('Submitting answer:', studentAnswer);
      console.log('Submitted file:', selectedFile);
      
      // Show success message and update status
      setSubmissionStatus('success');
      setHasSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmissionStatus('idle');
      }, 3000);
    }, 1500);
  };

  // Function to save material to playlist with localStorage persistence
  const toggleSaveToPlaylist = (materialId: string, materialTitle: string) => {
    try {
      // Get current playlist from localStorage
      const currentPlaylist = JSON.parse(localStorage.getItem('savedPlaylist') || '[]');
      
      if (savedToPlaylist.includes(materialId)) {
        // Remove from playlist
        const updatedPlaylist = currentPlaylist.filter((id: string) => id !== materialId);
        localStorage.setItem('savedPlaylist', JSON.stringify(updatedPlaylist));
        setSavedToPlaylist(updatedPlaylist);
        
        // Show toast message
        setShowToast({
          show: true,
          message: `"${materialTitle.substring(0, 20)}${materialTitle.length > 20 ? '...' : ''}" dihapus dari playlist`
        });
      } else {
        // Add to playlist
        const updatedPlaylist = [...currentPlaylist, materialId];
        localStorage.setItem('savedPlaylist', JSON.stringify(updatedPlaylist));
        setSavedToPlaylist(updatedPlaylist);
        
        // Show toast message
        setShowToast({
          show: true,
          message: `"${materialTitle.substring(0, 20)}${materialTitle.length > 20 ? '...' : ''}" ditambahkan ke playlist`
        });
      }
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast({show: false, message: ''});
      }, 3000);
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  // Function to render content based on file type
  const renderContent = () => {
    if (!material) return null;

    // Determine material content type for improved handling
    const isAssignment = material.title.toLowerCase().includes('tugas') || 
                         material.title.toLowerCase().includes('assignment');
    const isQuiz = material.title.toLowerCase().includes('quiz') || 
                   material.title.toLowerCase().includes('kuis');
    const isDocument = material.fileType === 'pdf' || material.fileType === 'document';

    // Light view for documents, quizzes, assignments - focused on download rather than preview
    if ((isDocument && (isAssignment || isQuiz)) || material.fileType === 'document') {
      return (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-6">
            <div className="mr-5 bg-red-50 p-3 rounded-xl">
              {isQuiz ? (
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              ) : isAssignment ? (
                <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">
                {isQuiz ? 'Kuis' : isAssignment ? 'Tugas' : 'Dokumen'} - {material.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {isQuiz ? 'Selesaikan kuis ini untuk mengukur pemahamanmu' : 
                 isAssignment ? 'Kerjakan tugas ini dan kumpulkan tepat waktu' : 
                 'Pelajari dokumen ini dengan seksama'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-50"></div>
            
            <div className="relative flex flex-col items-center text-center mb-6 z-10">
              {isQuiz ? (
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : isAssignment ? (
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {isQuiz ? 'Kuis Siap Dikerjakan' : 
                 isAssignment ? 'Tugas Perlu Dikerjakan' : 
                 'Dokumen Siap Diunduh'}
              </h4>
              <p className="text-gray-600 max-w-md mb-6">
                {isQuiz ? 'Unduh kuis ini dan kerjakan sesuai petunjuk. Jangan lupa untuk mengunggah jawaban sebelum batas waktu.' : 
                 isAssignment ? 'Unduh tugas ini dan kerjakan dengan teliti. Kumpulkan jawaban melalui form pengumpulan di samping.' : 
                 'Dokumen ini berisi materi penting untuk pembelajaran Anda. Unduh dan pelajari dengan seksama.'}
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <a 
                  href={material.fileUrl} 
                  download
                  className="inline-flex items-center px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Unduh {isQuiz ? 'Kuis' : isAssignment ? 'Tugas' : 'Dokumen'}</span>
                </a>
                
                <a 
                  href={material.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Buka di Tab Baru</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Information cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start space-x-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700">Batas Waktu</h5>
                <p className="text-sm text-gray-500">01 Januari 2025, 23:59 WIB</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start space-x-3">
              <div className="bg-amber-50 p-2 rounded-lg">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700">Status</h5>
                <p className="text-sm text-red-500">{hasSubmitted ? 'Menunggu Penilaian' : 'Belum Dikumpulkan'}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start space-x-3">
              <div className="bg-green-50 p-2 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700">Jenis</h5>
                <p className="text-sm text-gray-500">
                  {isQuiz ? 'Kuis Penilaian' : isAssignment ? 'Tugas Individu' : 'Dokumen Pembelajaran'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Full preview for other content types
    switch (material.fileType) {
      case 'pdf':
        return (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                Dokumen PDF
              </h3>
              <a 
                href={material.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Buka di Tab Baru
              </a>
            </div>
            <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200 overflow-hidden shadow-md">
              <iframe 
                src={material.fileUrl} 
                className="w-full h-full"
                title={material.title}
                style={{minHeight: "500px"}}
              >
                Peramban Anda tidak mendukung tampilan PDF. <a href={material.fileUrl}>Unduh PDF</a>.
              </iframe>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Video Pembelajaran
              </h3>
              <a 
                href={material.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Buka di Tab Baru
              </a>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center rounded-lg overflow-hidden shadow-md">
              <video 
                controls 
                className="w-full h-full"
                poster={material.thumbnailUrl}
              >
                <source src={material.fileUrl} type="video/mp4" />
                Peramban Anda tidak mendukung tampilan video.
              </video>
            </div>
            <div className="mt-4 bg-white p-3 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Petunjuk menonton:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Gunakan kontrol pemutaran untuk jeda, lanjutkan, atau atur volume</li>
                <li>Klik ikon layar penuh untuk menonton dalam mode layar penuh</li>
                <li>Untuk mengunduh video, gunakan tombol Unduh Materi di bawah</li>
              </ul>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Gambar Ilustrasi
              </h3>
              <a 
                href={material.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Buka di Tab Baru
              </a>
            </div>
            <div className="bg-white flex items-center justify-center rounded-lg overflow-hidden shadow-md p-2 border border-gray-200">
              <img 
                src={material.fileUrl} 
                alt={material.title} 
                className="max-w-full max-h-[500px] rounded-lg object-contain"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button 
                className="text-sm flex items-center text-gray-600 hover:text-red-600 transition-colors"
                onClick={() => window.open(material.fileUrl, '_blank')}
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Lihat Gambar Ukuran Penuh
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                Dokumen
              </h3>
            </div>
            <div className="aspect-[16/9] bg-white flex items-center justify-center rounded-lg border border-gray-200 p-8">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-500 mb-4">Tipe dokumen tidak didukung untuk pratinjau.</p>
                <a 
                  href={material.fileUrl} 
                  download
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Unduh Dokumen</span>
                </a>
              </div>
            </div>
          </div>
        );
    }
  };

  // Function to render related materials with enhanced UI
  const renderRelatedMaterials = () => {
    if (relatedMaterials.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-6-8h6M9 20h6M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          </svg>
          <p className="text-sm">Tidak ada materi terkait</p>
          <p className="text-xs text-gray-400 mt-1">Semua materi untuk subtopik ini sudah ditampilkan</p>
        </div>
      );
    }

    // Group materials by file type for better organization
    const groupedMaterials = {
      pdf: relatedMaterials.filter(mat => mat.fileType === 'pdf'),
      video: relatedMaterials.filter(mat => mat.fileType === 'video'),
      image: relatedMaterials.filter(mat => mat.fileType === 'image'),
      other: relatedMaterials.filter(mat => !['pdf', 'video', 'image'].includes(mat.fileType))
    };

    return (
      <div className="space-y-4">
        {Object.entries(groupedMaterials).map(([type, materials]) => {
          if (materials.length === 0) return null;
          
          return (
            <div key={type} className="space-y-2">
              {materials.length > 0 && (
                <div className="flex items-center space-x-2 mb-1">
                  {type === 'pdf' && (
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {type === 'video' && (
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                  {type === 'image' && (
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  )}
                  {type === 'other' && (
                    <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="text-xs font-medium text-gray-600 uppercase">
                    {type === 'pdf' ? 'Dokumen PDF' : 
                     type === 'video' ? 'Video' : 
                     type === 'image' ? 'Gambar' : 'Dokumen Lain'}
                  </span>
                </div>
              )}
              
              {materials.map((relatedMaterial) => (
                <div 
                  key={relatedMaterial.id} 
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-red-200 hover:shadow-sm transition-all cursor-pointer relative group"
                >
                  <div 
                    className="flex-1 flex items-center space-x-3"
                    onClick={() => router.push(`/dashboard-student/academy/material/${relatedMaterial.id}`)}
                  >
                    <div className="flex-shrink-0">
                      {relatedMaterial.fileType === 'pdf' && (
                        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {relatedMaterial.fileType === 'video' && (
                        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                      {relatedMaterial.fileType === 'image' && (
                        <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{relatedMaterial.title}</p>
                      <p className="text-xs text-gray-500">{relatedMaterial.uploadDate}</p>
                    </div>
                  </div>
                  
                  {/* Save to playlist button */}
                  <button 
                    onClick={() => toggleSaveToPlaylist(relatedMaterial.id, relatedMaterial.title)}
                    className={`flex-shrink-0 p-1.5 rounded-full transition-colors ${
                      savedToPlaylist.includes(relatedMaterial.id) 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                    title={savedToPlaylist.includes(relatedMaterial.id) ? "Hapus dari Playlist" : "Simpan ke Playlist"}
                  >
                    {savedToPlaylist.includes(relatedMaterial.id) ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat materi...</p>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Materi Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Maaf, materi yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Link href="/dashboard-student/academy" className="inline-block px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Kembali ke Halaman Akademi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notification with enhanced animation */}
      {showToast.show && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-out shadow-xl">
          <div className="bg-gray-800 bg-opacity-85 text-white px-4 py-3 rounded-lg flex items-center space-x-3 max-w-md backdrop-blur-sm animate-slide-in-right">
            {savedToPlaylist.includes(material?.id || '') ? (
              <svg className="w-5 h-5 flex-shrink-0 text-red-400 animate-gentle-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-sm">{showToast.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Kembali</span>
          </button>
        </div>
        
        {/* Enhanced Header with Wave Background */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-6 rounded-xl shadow-md mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image 
              src="/backgrounds/wave-header.svg" 
              alt="Background Pattern" 
              fill
              style={{ objectFit: 'cover' }} 
            />
          </div>
          <div className="relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex mb-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-red-100">
                <li>
                  <Link href="/dashboard-student/academy" className="hover:text-white">
                    Akademi
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/dashboard-student/academy" className="hover:text-white">
                    {breadcrumb.subject}
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/dashboard-student/academy" className="hover:text-white">
                    {breadcrumb.topic}
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-medium">{breadcrumb.subtopic}</span>
                </li>
              </ol>
            </nav>
            
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{material.title}</h1>
              
              <button 
                onClick={() => toggleSaveToPlaylist(material.id, material.title)}
                className={`p-2 rounded-full transition-colors ${
                  savedToPlaylist.includes(material.id) 
                    ? 'bg-white text-red-600' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
                title={savedToPlaylist.includes(material.id) ? "Hapus dari Playlist" : "Simpan ke Playlist"}
              >
                {savedToPlaylist.includes(material.id) ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-sm text-red-100 mt-1">Diunggah oleh: {material.uploadedBy} • {material.uploadDate}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="p-6">
                <div className="mb-8">
                  <h2 className="font-medium text-lg text-gray-800 mb-3">Deskripsi</h2>
                  <div className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p>{material.description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Integrated Sidebar with Tabs */}
              <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Detail Materi</h2>
                  <div className="flex items-center">
                    {/* Add to playlist button */}
                    <button
                      onClick={() => toggleSaveToPlaylist(material.id, material.title)}
                      className={`ml-auto p-1.5 rounded-full transition-colors ${
                        savedToPlaylist.includes(material.id)
                          ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                          : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                      }`}
                      title={savedToPlaylist.includes(material.id) ? "Hapus dari Playlist" : "Simpan ke Playlist"}
                      aria-label={savedToPlaylist.includes(material.id) ? "Hapus dari Playlist" : "Simpan ke Playlist"}
                    >
                      {savedToPlaylist.includes(material.id) ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Tabs Navigation */}
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-3 px-4 text-center text-sm font-medium ${
                    !hasSubmitted ? 'text-red-600 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Pengumpulan
                </button>
                <button
                  className={`flex-1 py-3 px-4 text-center text-sm font-medium ${
                    hasSubmitted ? 'text-red-600 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Status
                </button>
              </div>
              
              {/* Integrated Content Area */}
              <div className="p-5">
                {/* Assignment Submission Form */}
                {!hasSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5 relative">
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="studentAnswer" className="text-sm font-medium text-gray-700">
                          Jawaban Anda
                        </label>
                        <span className="text-xs text-gray-500">
                          {studentAnswer.length ? `${studentAnswer.length} karakter` : 'Belum ada jawaban'}
                        </span>
                      </div>
                      <textarea
                        id="studentAnswer"
                        rows={5}
                        className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          !studentAnswer.trim() && validationError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Tulis jawaban Anda di sini..."
                        value={studentAnswer}
                        onChange={(e) => setStudentAnswer(e.target.value)}
                      ></textarea>
                      {!studentAnswer.trim() && validationError && (
                        <p className="mt-1 text-xs text-red-500">Mohon isi jawaban atau unggah berkas</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Lampiran Berkas
                        </label>
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Maksimum 10MB
                        </span>
                      </div>
                      
                      {!showFileInput ? (
                        <button
                          type="button"
                          onClick={() => setShowFileInput(true)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Tambah Berkas</span>
                        </button>
                      ) : (
                        <div className={`border rounded-lg ${validationError && !studentAnswer.trim() && !selectedFile ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
                          <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
                            <div className="flex items-center space-x-2">
                              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              <span className="text-sm">Berkas</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setShowFileInput(false);
                                setSelectedFile(null);
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div className="p-4">
                            <label className="block w-full">
                              <div className={`flex flex-col items-center justify-center py-6 bg-gray-50 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                                selectedFile ? 'border-green-200' : (validationError && !studentAnswer.trim() ? 'border-red-200' : 'border-gray-200')
                              }`}>
                                {selectedFile ? (
                                  <>
                                    <svg className="w-8 h-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                      {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-sm text-gray-500 mb-1">
                                      Klik untuk memilih berkas
                                    </p>
                                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, JPG, PNG</p>
                                  </>
                                )}
                              </div>
                              <input 
                                type="file" 
                                className="hidden" 
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt" 
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  
                    {/* Status Section integrated in the submission form */}
                    <div className="mb-5 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-700">Status Pengajuan</h3>
                        <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full">
                          Belum Dikumpulkan
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Jatuh Tempo:</span>
                          <span className="font-medium text-gray-700">01 Januari 2025, 23:59 WIB</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Sisa Waktu:</span>
                          <span className="font-medium text-red-600">{timeRemaining}</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submissionStatus === 'submitting'}
                      className={`w-full py-3 px-4 font-medium rounded-lg text-white transition-colors ${
                        submissionStatus === 'submitting' 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {submissionStatus === 'submitting' ? (
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Mengirim...</span>
                        </div>
                      ) : (
                        'Kirimkan Tugas'
                      )}
                    </button>
                    
                    {submissionStatus === 'success' && (
                      <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <p>Tugas berhasil dikirimkan!</p>
                        </div>
                      </div>
                    )}
                    
                    {validationError && (
                      <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p>{validationError}</p>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  /* Submitted Status View */
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">Tugas Telah Dikumpulkan</h3>
                      <p className="text-gray-500 text-sm">Tugas Anda telah berhasil dikumpulkan dan sedang menunggu penilaian dari pengajar.</p>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className="text-sm font-medium text-yellow-600">Menunggu Penilaian</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Waktu Pengumpulan:</span>
                        <span className="text-sm font-medium text-gray-700">28 Desember 2024, 14:35 WIB</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Jatuh Tempo:</span>
                        <span className="text-sm font-medium text-gray-700">01 Januari 2025, 23:59 WIB</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-600">Status Pengumpulan:</span>
                        <span className="text-sm font-medium text-green-600">Tepat Waktu</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-5">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        File yang Dikumpulkan
                      </h4>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <svg className="w-8 h-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">tugas_matematika.pdf</p>
                          <p className="text-xs text-gray-500">2.4 MB • Dokumen PDF</p>
                        </div>
                        <a href="#" className="text-red-600 hover:text-red-800">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      className="w-full py-3 px-4 font-medium rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                      onClick={() => setHasSubmitted(false)}
                    >
                      Lihat Form Pengumpulan
                    </button>
                  </div>
                )}
                
                {/* Teacher Info and Related Materials Accordion */}
                <div className="mt-6 space-y-2">
                  <details className="group bg-white rounded-lg overflow-hidden border border-gray-200">
                    <summary className="flex justify-between items-center cursor-pointer p-4">
                      <h3 className="font-medium text-gray-800 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Informasi Pengajar
                      </h3>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 pt-0 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-gray-800 font-medium">{material?.uploadedBy || "Pengajar"}</h3>
                          <p className="text-xs text-gray-500">Guru Matematika</p>
                          <div className="mt-2 flex space-x-2">
                            <button className="text-xs flex items-center justify-center px-2 py-1 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                              Tanya
                            </button>
                            <button className="text-xs flex items-center justify-center px-2 py-1 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Profil
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                  
                  <details className="group bg-white rounded-lg overflow-hidden border border-gray-200">
                    <summary className="flex justify-between items-center cursor-pointer p-4">
                      <h3 className="font-medium text-gray-800 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Materi Terkait ({relatedMaterials.length})
                      </h3>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 pt-0 border-t border-gray-100">
                      {renderRelatedMaterials()}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
