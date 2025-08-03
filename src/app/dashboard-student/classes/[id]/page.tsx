// ...existing code...
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState as useReactState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClassDetail } from '@/data/data-student/class-detail-data';
import { ClassDetailHeader } from '@/components/ui-student/classes/class-detail/ClassDetailHeader';
import { ClassMaterials } from '@/components/ui-student/classes/class-detail/ClassMaterials';
import { ClassAssignments } from '@/components/ui-student/classes/class-detail/ClassAssignments';
import { ClassDiscussion } from '@/components/ui-student/classes/class-detail/ClassDiscussion';
import { ClassAnnouncements } from '@/components/ui-student/classes/class-detail/ClassAnnouncements';
import { ClassAttendance } from '@/components/ui-student/classes/class-detail/ClassAttendance';
import Link from 'next/link';
import { ChevronLeft, Clock, MapPin, User, BookOpen, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ClassDetailPage() {
  // Import dummy data dengan named exports
  // eslint-disable-next-line
  const { studentAssignments, studentMaterials } = require('@/data/data-student/student-materials-assignments');

  // State untuk search tugas & materi
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tugas & materi berdasarkan search
  const filteredAssignments = (studentAssignments ?? []).filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMaterials = (studentMaterials ?? []).filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Next.js 15+ params is a Promise, must unwrap with React.use()
  const paramsPromise = useParams();
  const [classId, setClassId] = useReactState('');
  useEffect(() => {
    let isMounted = true;
    Promise.resolve(paramsPromise).then(params => {
      if (!isMounted) return;
      if (params && typeof params.id === 'string') {
        setClassId(params.id);
      } else if (params && Array.isArray(params.id)) {
        setClassId(params.id[0]);
      }
    });
    return () => { isMounted = false; };
  }, [paramsPromise]);

  // Checkbox progress tugas & materi, simpan ke localStorage agar sinkron dengan ClassCard
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const totalItems = filteredAssignments.length + filteredMaterials.length;
  useEffect(() => {
    if (typeof window !== 'undefined' && classId) {
      const saved = localStorage.getItem('classProgress_' + classId);
      setCheckedItems(saved ? JSON.parse(saved) : []);
    }
  }, [classId]);
  const handleCheckItem = (id: string) => {
    setCheckedItems(prev => {
      const updated = prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id];
      if (typeof window !== 'undefined' && classId) {
        localStorage.setItem('classProgress_' + classId, JSON.stringify(updated));
      }
      return updated;
    });
  };
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [showAssignmentDetail, setShowAssignmentDetail] = useState(false);
  const classDetail = getClassDetail(classId);
  const [activeTab, setActiveTab] = useState('pertemuan');

  // Redirect or show error if class not found
  if (!classDetail) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Kelas tidak ditemukan</h1>
          <p className="text-gray-600 mb-6">
            Kelas dengan ID {classId} tidak ditemukan atau tidak tersedia.
          </p>
          <Link 
            href="/dashboard-student/classes"
            className="inline-flex items-center text-[#C40503] hover:underline"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Kelas
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.toLocaleDateString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-700">Akan Datang</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-700">Sedang Berlangsung</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700">Selesai</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>;
    }
  };


  // ...existing code...

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/dashboard-student/classes"
          className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Kelas
        </Link>
        
        {/* Class Card - similar to the screenshot */}
        <div className="border rounded-lg overflow-hidden mb-8 bg-[url('/public/backgrounds/wave-header.svg')] bg-cover bg-center bg-no-repeat">
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold">{classDetail.title}</h1>
                  {getStatusBadge(classDetail.status)}
                </div>
                <p className="text-gray-600 mb-3">{classDetail.subject}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#DAA625]" />
                <div>
                  <p className="text-sm text-gray-500">Waktu</p>
                  <p>{formatDate(classDetail.date)}, {classDetail.timeStart} - {classDetail.timeEnd}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#C40503]" />
                <div>
                  <p className="text-sm text-gray-500">Lokasi</p>
                  <p>{classDetail.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-[#DAA625]" />
                <div>
                  <p className="text-sm text-gray-500">Pengajar</p>
                  <p>{classDetail.instructor.name}</p>
                </div>
              </div>
              {/* Link diskusi join grup di atas kanan dengan icon */}
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#C40503]" />
                <div>
                  <p className="text-sm text-gray-500">Link Grup</p>
                  <a href="#" className="inline-flex items-center gap-1 text-[#C40503] underline text-sm font-medium" onClick={e => {e.preventDefault(); setShowDiscussion(true);}}>
                    Diskusi Join Grup
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-5">{classDetail.description}</p>
            {/* Link untuk melihat absensi siswa */}
            <div className="mt-4">
              <Link href={`/dashboard-student/classes/${classId}/attendance`} className="inline-block text-[#DAA625] font-semibold underline hover:text-[#C40503] transition-colors">
                Lihat Absensi Siswa di Kelas Ini
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Card Tugas & Materi */}
      {/* Gabungan Card Tugas & Materi dengan checkbox, inisialisasi setelah classId valid */}
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-7xl bg-white border border-[#f3bcbc] rounded-2xl shadow-lg p-6 flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-[#C40503] mb-2">Tugas & Materi Pembelajaran</h2>
          {/* Search Bar */}
          <div className="mb-4 flex items-center gap-2">
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#f3bcbc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C40503] text-gray-800 bg-white shadow"
              placeholder="Cari tugas atau materi..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Section Tugas */}
          <div>
            <h3 className="text-lg font-bold text-[#C40503] mb-2">Tugas dari Guru</h3>
            <ul className="space-y-4">
              {filteredAssignments.length === 0 && (
                <li className="text-gray-500 italic">Tidak ada tugas ditemukan.</li>
              )}
              {classId && filteredAssignments.map((assignment: any) => (
                <li key={assignment.id} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#f3bcbc] shadow-sm hover:shadow-md transition-shadow">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(assignment.id)}
                    onChange={() => handleCheckItem(assignment.id)}
                    className="accent-[#C40503] w-5 h-5 rounded focus:ring-[#C40503] mr-2"
                  />
                  <div className="flex-shrink-0 bg-[#fff7f7] rounded-lg p-3 flex items-center justify-center">
                    <FileText className="h-7 w-7 text-[#C40503]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-base text-[#C40503]">{assignment.title}</span>
                    </div>
                    <div className="text-gray-700 text-sm">{assignment.description}</div>
                  </div>
                  <Link href={`/dashboard-student/classes/${classId}/assignment-detail?id=${assignment.id}`}>
                    <button className="bg-[#C40503] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#a30402] transition-colors text-sm">Lihat Detail</button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Section Materi */}
          <div>
            <h3 className="text-lg font-bold text-[#DAA625] mb-2">Materi Pembelajaran</h3>
            <ul className="space-y-4">
              {filteredMaterials.length === 0 && (
                <li className="text-gray-500 italic">Tidak ada materi ditemukan.</li>
              )}
              {classId && filteredMaterials.map((material: any) => (
                <li key={material.id} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#f3e6bc] shadow-sm hover:shadow-md transition-shadow">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(material.id)}
                    onChange={() => handleCheckItem(material.id)}
                    className="accent-[#DAA625] w-5 h-5 rounded focus:ring-[#DAA625] mr-2"
                  />
                  <span className="font-bold text-base text-[#DAA625]">{material.title}</span>
                  <div className="text-gray-700 text-sm">{material.description}</div>
                  <a href={material.fileUrl} className="text-[#DAA625] underline text-sm font-semibold">Download Materi</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  {/* Simpan jumlah tugas & materi ke localStorage agar progress bar di ClassCard selalu sesuai */}

      {/* Modal/Tabel Diskusi Join Grup */}
      {showDiscussion && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-[#C40503] text-xl" onClick={() => setShowDiscussion(false)}>&times;</button>
            <h3 className="text-lg font-bold mb-4 text-[#C40503]">Diskusi Join Grup</h3>
            <table className="w-full mb-4 border">
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="p-2 border">Topik</th>
                  <th className="p-2 border">Link</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">Join Group WA</td>
                  <td className="p-2 border"><a href="https://chat.whatsapp.com/ET8gyUz70bGczSxmipYX6" target="_blank" rel="noopener" className="text-[#C40503] underline">WhatsApp Group</a></td>
                </tr>
                <tr>
                  <td className="p-2 border">Join Ms.Teams</td>
                  <td className="p-2 border"><span className="text-[#C40503]">ukypfjc</span></td>
                </tr>
              </tbody>
            </table>
            <div className="text-gray-700 text-sm">Semangat belajar! Silakan join grup WA dan Ms.Teams sesuai instruksi guru.</div>
          </div>
        </div>
      )}
    </div>
  );
}
