"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Download, Search, FileText, Presentation, Video, 
  BookMarked, Filter, Calendar, User, Eye, ExternalLink 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dummy data untuk materi
const materialsData = [
  {
    id: 1,
    title: "Modul Aljabar Linear",
    description: "Panduan lengkap untuk memahami konsep aljabar linear dan aplikasinya dalam kehidupan sehari-hari.",
    type: "document",
    subject: "Matematika",
    teacher: "Budi Santoso",
    uploadDate: "2025-01-15",
    downloadCount: 45,
    fileSize: "2.5 MB",
    fileUrl: "#",
    thumbnailUrl: "/public/certificates/achievement-thumb.jpg",
    classId: "aljabar-linear-1",
    className: "Aljabar Linear"
  },
  {
    id: 2,
    title: "Presentasi Matriks dan Operasinya",
    description: "Slide presentasi tentang matriks, determinan, dan operasi-operasi yang dapat dilakukan pada matriks.",
    type: "presentation",
    subject: "Matematika",
    teacher: "Budi Santoso",
    uploadDate: "2025-01-14",
    downloadCount: 32,
    fileSize: "5.2 MB",
    fileUrl: "#",
    thumbnailUrl: "/public/certificates/completion-thumb.jpg",
    classId: "aljabar-linear-1",
    className: "Aljabar Linear"
  },
  {
    id: 3,
    title: "Video Tutorial Sistem Persamaan Linear",
    description: "Video pembelajaran tentang cara menyelesaikan sistem persamaan linear menggunakan metode eliminasi dan substitusi.",
    type: "video",
    subject: "Matematika",
    teacher: "Budi Santoso",
    uploadDate: "2025-01-13",
    downloadCount: 28,
    fileSize: "15.8 MB",
    fileUrl: "#",
    thumbnailUrl: "/public/certificates/english-basic-thumb.jpg",
    classId: "aljabar-linear-1",
    className: "Aljabar Linear"
  },
  {
    id: 4,
    title: "Latihan Soal Aljabar Linear",
    description: "Kumpulan soal latihan untuk mengasah kemampuan dalam menyelesaikan masalah aljabar linear.",
    type: "exercise",
    subject: "Matematika",
    teacher: "Budi Santoso",
    uploadDate: "2025-01-12",
    downloadCount: 67,
    fileSize: "1.8 MB",
    fileUrl: "#",
    thumbnailUrl: "/public/certificates/participation-thumb.jpg",
    classId: "aljabar-linear-1",
    className: "Aljabar Linear"
  },
  {
    id: 5,
    title: "Dasar-dasar Pemrograman Python",
    description: "Materi pengenalan bahasa pemrograman Python untuk pemula dengan contoh-contoh praktis.",
    type: "document",
    subject: "Pemrograman",
    teacher: "Siti Rahayu",
    uploadDate: "2025-01-11",
    downloadCount: 89,
    fileSize: "3.2 MB",
    fileUrl: "#",
    thumbnailUrl: "/public/certificates/achievement-thumb.jpg",
    classId: "python-basic-1",
    className: "Python Basic"
  },
  {
    id: 6,
    title: "Presentasi Struktur Data",
    description: "Slide presentasi tentang berbagai struktur data dalam pemrograman seperti array, list, dan dictionary.",
    type: "presentation",
    subject: "Pemrograman",
    teacher: "Siti Rahayu",
    uploadDate: "2025-01-10",
    downloadCount: 54,
    fileSize: "4.1 MB",
    fileUrl: "#",
    thumbnailUrl: "/public/certificates/completion-thumb.jpg",
    classId: "python-basic-1",
    className: "Python Basic"
  }
];

export default function MaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'presentation':
        return <Presentation className="h-5 w-5 text-orange-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'exercise':
        return <BookMarked className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'document':
        return 'Dokumen';
      case 'presentation':
        return 'Presentasi';
      case 'video':
        return 'Video';
      case 'exercise':
        return 'Latihan';
      default:
        return 'Lainnya';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-blue-100 text-blue-700';
      case 'presentation':
        return 'bg-orange-100 text-orange-700';
      case 'video':
        return 'bg-red-100 text-red-700';
      case 'exercise':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const filteredMaterials = materialsData.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || material.type === filterType;
    const matchesSubject = filterSubject === "all" || material.subject === filterSubject;
    
    return matchesSearch && matchesType && matchesSubject;
  });

  const subjects = [...new Set(materialsData.map(material => material.subject))];
  const types = [
    { value: "all", label: "Semua Tipe" },
    { value: "document", label: "Dokumen" },
    { value: "presentation", label: "Presentasi" },
    { value: "video", label: "Video" },
    { value: "exercise", label: "Latihan" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#DAA625]/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-[#DAA625]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Materi Pembelajaran</h1>
          </div>
          <p className="text-gray-600">Akses dan download semua materi pembelajaran dari kelas Anda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Materi</p>
                  <p className="text-2xl font-bold text-gray-900">{materialsData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Download className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Download</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {materialsData.reduce((sum, material) => sum + material.downloadCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BookMarked className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mata Pelajaran</p>
                  <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pengajar</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {[...new Set(materialsData.map(material => material.teacher))].length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari materi, mata pelajaran, atau pengajar..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      {filterType === "all" ? "Semua Tipe" : getTypeLabel(filterType)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {types.map((type) => (
                      <DropdownMenuItem
                        key={type.value}
                        onClick={() => setFilterType(type.value)}
                        className={filterType === type.value ? "bg-yellow-50" : ""}
                      >
                        {type.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {filterSubject === "all" ? "Semua Mata Pelajaran" : filterSubject}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setFilterSubject("all")}
                      className={filterSubject === "all" ? "bg-yellow-50" : ""}
                    >
                      Semua Mata Pelajaran
                    </DropdownMenuItem>
                    {subjects.map((subject) => (
                      <DropdownMenuItem
                        key={subject}
                        onClick={() => setFilterSubject(subject)}
                        className={filterSubject === subject ? "bg-yellow-50" : ""}
                      >
                        {subject}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getFileIcon(material.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
                      <Badge className={`mt-2 ${getTypeColor(material.type)}`}>
                        {getTypeLabel(material.type)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{material.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="h-4 w-4" />
                    <span>{material.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{material.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(material.uploadDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Download className="h-4 w-4" />
                    <span>{material.downloadCount} download • {material.fileSize}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={material.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-[#DAA625] hover:bg-[#b88d1c]">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </a>
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada materi ditemukan</h3>
              <p className="text-gray-600 mb-4">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                  setFilterSubject("all");
                }}
              >
                Reset Filter
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}