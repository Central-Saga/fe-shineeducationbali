"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  Calendar,
  Users,
  Clock
} from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  materialId: string;
  materialName: string;
  dueDate: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  totalStudents: number;
  submittedCount: number;
  createdDate: string;
}

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data - in real app, this would come from API
  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Latihan Grammar Chapter 1",
      description: "Kerjakan latihan grammar pada halaman 15-20",
      classId: "1",
      className: "Bahasa Inggris A",
      materialId: "1",
      materialName: "Grammar Dasar",
      dueDate: "2025-07-05",
      status: "active",
      totalStudents: 25,
      submittedCount: 18,
      createdDate: "2025-06-28"
    },
    {
      id: "2",
      title: "Essay Writing Practice",
      description: "Tulis essay 300 kata tentang pengalaman liburan",
      classId: "1",
      className: "Bahasa Inggris A",
      materialId: "2",
      materialName: "Writing Skills",
      dueDate: "2025-07-10",
      status: "active",
      totalStudents: 25,
      submittedCount: 12,
      createdDate: "2025-06-30"
    },
    {
      id: "3",
      title: "Vocabulary Quiz",
      description: "Quiz vocabulary dari chapter 3",
      classId: "2",
      className: "Bahasa Inggris B",
      materialId: "3",
      materialName: "Vocabulary Building",
      dueDate: "2025-07-03",
      status: "completed",
      totalStudents: 20,
      submittedCount: 20,
      createdDate: "2025-06-25"
    }
  ];

  const classes = [
    { id: "1", name: "Bahasa Inggris A" },
    { id: "2", name: "Bahasa Inggris B" },
    { id: "3", name: "Matematika A" }
  ];

  const materials = [
    { id: "1", name: "Grammar Dasar" },
    { id: "2", name: "Writing Skills" },
    { id: "3", name: "Vocabulary Building" }
  ];

  // Form state for adding assignments
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    classId: "",
    materialId: "",
    dueDate: ""
  });

  // Filter assignments based on search and filters
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === "all" || assignment.classId === classFilter;
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Selesai</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Dibatalkan</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getSubmissionRate = (submitted: number, total: number) => {
    return Math.round((submitted / total) * 100);
  };

  const getSubmissionColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handleAddAssignment = () => {
    if (!formData.title || !formData.classId || !formData.dueDate) return;
    
    console.log("Add assignment:", formData);
    // API call to add assignment
    
    setFormData({
      title: "",
      description: "",
      classId: "",
      materialId: "",
      dueDate: ""
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C40503]">Manajemen Tugas</h1>
          <p className="text-gray-600">Kelola tugas dan penilaian siswa</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#C40503] hover:bg-[#A60000]">
              <Plus className="h-4 w-4 mr-2" />
              Buat Tugas Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Buat Tugas Baru</DialogTitle>
              <DialogDescription>
                Buat tugas untuk siswa di kelas Anda
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Tugas</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Masukkan judul tugas"
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Deskripsi tugas dan instruksi"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="class">Kelas</Label>
                  <Select value={formData.classId} onValueChange={(value) => setFormData({...formData, classId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="material">Materi</Label>
                  <Select value={formData.materialId} onValueChange={(value) => setFormData({...formData, materialId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih materi" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map(material => (
                        <SelectItem key={material.id} value={material.id}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="dueDate">Tenggat Waktu</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddAssignment}>
                Buat Tugas
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Tugas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#C40503]">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tugas Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {assignments.filter(a => a.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Rata-rata Pengumpulan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#DAA625]">
              {Math.round(assignments.reduce((acc, a) => acc + getSubmissionRate(a.submittedCount, a.totalStudents), 0) / assignments.length)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tugas Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {assignments.filter(a => a.status === 'completed').length}
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
                  placeholder="Cari berdasarkan judul atau deskripsi..."
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="cancelled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Tugas ({filteredAssignments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tugas</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Materi</TableHead>
                <TableHead>Tenggat Waktu</TableHead>
                <TableHead className="text-center">Pengumpulan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => {
                const submissionRate = getSubmissionRate(assignment.submittedCount, assignment.totalStudents);
                const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status === 'active';
                
                return (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {assignment.description}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Dibuat: {new Date(assignment.createdDate).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{assignment.className}</TableCell>
                    <TableCell>{assignment.materialName}</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${isOverdue ? 'text-red-600' : ''}`}>
                        <Clock className="h-4 w-4 mr-1" />
                        <span className={isOverdue ? 'font-semibold' : ''}>
                          {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                        </span>
                        {isOverdue && <Badge className="ml-2 bg-red-100 text-red-800">Terlambat</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />
                        <span className={getSubmissionColor(submissionRate)}>
                          {assignment.submittedCount}/{assignment.totalStudents}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">({submissionRate}%)</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-800"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredAssignments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Tidak ada tugas yang sesuai dengan filter
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
