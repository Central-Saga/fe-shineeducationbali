"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  FileText,
  Video,
  Image,
  BookOpen,
  Calendar,
  Clock
} from "lucide-react";

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'image' | 'link' | 'assignment';
  classId: string;
  className: string;
  teacherName: string;
  filePath?: string;
  fileSize?: number;
  uploadDate: string;
  downloadCount: number;
  tags: string[];
  isDownloaded?: boolean;
}

export default function StudentMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [materials, setMaterials] = useState<Material[]>([]);

  // Mock data - in real app, this would come from API based on student's enrolled classes
  useEffect(() => {
    const mockMaterials: Material[] = [
      {
        id: "1",
        title: "Pengenalan Grammar Dasar",
        description: "Materi pembelajaran tentang dasar-dasar grammar bahasa Inggris",
        type: "document",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        filePath: "/materials/grammar-basic.pdf",
        fileSize: 2048000,
        uploadDate: "2025-06-15",
        downloadCount: 45,
        tags: ["grammar", "dasar", "bahasa inggris"],
        isDownloaded: false
      },
      {
        id: "2",
        title: "Video Tutorial Pronunciation",
        description: "Video pembelajaran cara pengucapan yang benar",
        type: "video",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        filePath: "/materials/pronunciation-tutorial.mp4",
        fileSize: 15728640,
        uploadDate: "2025-06-20",
        downloadCount: 32,
        tags: ["pronunciation", "video", "tutorial"],
        isDownloaded: true
      },
      {
        id: "3",
        title: "Latihan Soal UTS",
        description: "Kumpulan latihan soal untuk persiapan UTS",
        type: "assignment",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        filePath: "/materials/uts-practice.pdf",
        fileSize: 1024000,
        uploadDate: "2025-06-25",
        downloadCount: 28,
        tags: ["latihan", "uts", "soal"],
        isDownloaded: false
      },
      {
        id: "4",
        title: "Materi Matematika Dasar",
        description: "Dasar-dasar matematika untuk pemula",
        type: "document",
        classId: "2",
        className: "Matematika A",
        teacherName: "Bu Siti",
        filePath: "/materials/math-basic.pdf",
        fileSize: 3072000,
        uploadDate: "2025-06-18",
        downloadCount: 38,
        tags: ["matematika", "dasar", "aljabar"],
        isDownloaded: true
      }
    ];
    setMaterials(mockMaterials);
  }, []);

  // Filter materials based on search and filters
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesClass = classFilter === "all" || material.classId === classFilter;
    const matchesType = typeFilter === "all" || material.type === typeFilter;
    
    return matchesSearch && matchesClass && matchesType;
  });

  // Get unique classes for filter
  const classes = [...new Set(materials.map(m => ({ id: m.classId, name: m.className })))];

  const getTypeIcon = (type: Material['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'assignment':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: Material['type']) => {
    const colors = {
      document: "bg-blue-100 text-blue-800",
      video: "bg-red-100 text-red-800",
      image: "bg-green-100 text-green-800",
      link: "bg-purple-100 text-purple-800",
      assignment: "bg-orange-100 text-orange-800"
    };
    return <Badge className={colors[type]}>{type}</Badge>;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "N/A";
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownload = (materialId: string) => {
    console.log("Download material:", materialId);
    // API call to download material
    // Update download count and mark as downloaded
    setMaterials(prev => prev.map(m => 
      m.id === materialId 
        ? { ...m, downloadCount: m.downloadCount + 1, isDownloaded: true }
        : m
    ));
  };

  const handleView = (materialId: string) => {
    console.log("View material:", materialId);
    // Open material preview or navigate to detail page
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C40503]">Materi Pembelajaran</h1>
          <p className="text-gray-600">Akses semua materi pembelajaran dari kelas yang Anda ikuti</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Materi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#C40503]">{materials.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sudah Didownload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {materials.filter(m => m.isDownloaded).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Download</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#DAA625]">
              {materials.reduce((acc, m) => acc + m.downloadCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Kelas Diikuti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {classes.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-[#C40503]" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari berdasarkan judul, deskripsi, atau tags..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-48">
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kelas</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-48">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="document">Dokumen</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Gambar</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                  <SelectItem value="assignment">Tugas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Materi ({filteredMaterials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materi</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Guru</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Ukuran</TableHead>
                <TableHead>Tanggal Upload</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(material.type)}
                      <div>
                        <div className="font-medium">{material.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {material.description}
                        </div>
                        {material.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {material.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {material.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{material.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{material.className}</TableCell>
                  <TableCell>{material.teacherName}</TableCell>
                  <TableCell>{getTypeBadge(material.type)}</TableCell>
                  <TableCell>{formatFileSize(material.fileSize)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(material.uploadDate).toLocaleDateString('id-ID')}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {material.isDownloaded ? (
                      <Badge className="bg-green-100 text-green-800">Sudah Didownload</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">Belum Didownload</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(material.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(material.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredMaterials.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Tidak ada materi yang sesuai dengan filter
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
