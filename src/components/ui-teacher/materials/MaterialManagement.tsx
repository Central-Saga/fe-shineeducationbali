"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Upload,
  FileText,
  Video,
  Image,
  BookOpen,
  Calendar
} from "lucide-react";

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'image' | 'link' | 'assignment';
  programId: string;
  programName: string;
  filePath?: string;
  fileSize?: number;
  uploadDate: string;
  status: 'active' | 'inactive' | 'draft';
  downloadCount: number;
  tags: string[];
}

interface MaterialManagementProps {
  materials: Material[];
  programs: Array<{ id: string; name: string }>;
  onAddMaterial: (material: Omit<Material, 'id' | 'uploadDate' | 'downloadCount'>) => void;
  onEditMaterial: (id: string, material: Partial<Material>) => void;
  onDeleteMaterial: (id: string) => void;
  onViewMaterial: (id: string) => void;
}

export function MaterialManagement({ 
  materials, 
  programs,
  onAddMaterial, 
  onEditMaterial, 
  onDeleteMaterial, 
  onViewMaterial 
}: MaterialManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [programFilter, setProgramFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  // Form state for adding/editing materials
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "document" as Material['type'],
    programId: "",
    tags: "",
    file: null as File | null
  });

  // Filter materials based on search and filters
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesProgram = programFilter === "all" || material.programId === programFilter;
    const matchesType = typeFilter === "all" || material.type === typeFilter;
    
    return matchesSearch && matchesProgram && matchesType;
  });

  const getTypeIcon = (type: Material['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" aria-label="Document icon" />;
      case 'video':
        return <Video className="h-4 w-4" aria-label="Video icon" />;
      case 'image':
        return <Image className="h-4 w-4" aria-label="Image icon" />;
      case 'assignment':
        return <BookOpen className="h-4 w-4" aria-label="Assignment icon" />;
      default:
        return <FileText className="h-4 w-4" aria-label="File icon" />;
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

  const getStatusBadge = (status: Material['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Tidak Aktif</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "N/A";
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleAddMaterial = () => {
    if (!formData.title || !formData.programId) return;
    
    const program = programs.find(p => p.id === formData.programId);
    
    const newMaterial = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      programId: formData.programId,
      programName: program?.name || "",
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      status: 'active' as Material['status']
    };
    
    onAddMaterial(newMaterial);
    setFormData({
      title: "",
      description: "",
      type: "document",
      programId: "",
      tags: "",
      file: null
    });
    setIsAddDialogOpen(false);
  };

  const handleEditMaterial = (material: Material) => {
    setEditingMaterial(material);
    setFormData({
      title: material.title,
      description: material.description,
      type: material.type,
      programId: material.programId,
      tags: material.tags.join(', '),
      file: null
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateMaterial = () => {
    if (!editingMaterial || !formData.title || !formData.programId) return;
    
    onEditMaterial(editingMaterial.id, {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      programId: formData.programId,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    });
    
    setEditingMaterial(null);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C40503]">Manajemen Materi</h1>
          <p className="text-gray-600">Kelola materi pembelajaran untuk kelas Anda</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#C40503] hover:bg-[#A60000]">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Materi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Materi Baru</DialogTitle>
              <DialogDescription>
                Upload atau buat materi pembelajaran untuk siswa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Materi</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Masukkan judul materi"
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Deskripsi materi pembelajaran"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Jenis Materi</Label>
                  <Select value={formData.type} onValueChange={(value: Material['type']) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Dokumen</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="image">Gambar</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="assignment">Tugas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="program">Program</Label>
                  <Select value={formData.programId} onValueChange={(value) => setFormData({...formData, programId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map(program => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="tags">Tags (pisahkan dengan koma)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="contoh: matematika, aljabar, dasar"
                />
              </div>
              <div>
                <Label htmlFor="file">Upload File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Drag & drop file atau klik untuk upload</p>
                  <input
                    type="file"
                    className="hidden"
                    id="file"
                    onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                    aria-label="Upload file"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddMaterial}>
                Tambah Materi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            <CardTitle className="text-sm font-medium text-gray-500">Materi Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {materials.filter(m => m.status === 'active').length}
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
            <CardTitle className="text-sm font-medium text-gray-500">Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {programs.length}
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
              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Program</SelectItem>
                  {programs.map(program => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
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
                <TableHead>Program</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Ukuran</TableHead>
                <TableHead>Download</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Upload</TableHead>
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
                  <TableCell>{material.programName}</TableCell>
                  <TableCell>{getTypeBadge(material.type)}</TableCell>
                  <TableCell>{formatFileSize(material.fileSize)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{material.downloadCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(material.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(material.uploadDate).toLocaleDateString('id-ID')}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewMaterial(material.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditMaterial(material)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteMaterial(material.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Materi</DialogTitle>
            <DialogDescription>
              Ubah informasi materi pembelajaran
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Judul Materi</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Masukkan judul materi"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Deskripsi</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Deskripsi materi pembelajaran"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-type">Jenis Materi</Label>
                <Select value={formData.type} onValueChange={(value: Material['type']) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Dokumen</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="image">Gambar</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="assignment">Tugas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-program">Program</Label>
                <Select value={formData.programId} onValueChange={(value) => setFormData({...formData, programId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map(program => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-tags">Tags (pisahkan dengan koma)</Label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="contoh: matematika, aljabar, dasar"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUpdateMaterial}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
