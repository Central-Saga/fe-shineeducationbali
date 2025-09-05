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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2,
  Download,
  FileText,
  BarChart3,
  TrendingUp,
  Award,
  Calculator
} from "lucide-react";

interface GradeCategory {
  id: string;
  name: string;
  description: string;
  weight: number;
  programId: string;
}

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  materialId: string;
  materialName: string;
  assignmentId?: string;
  assignmentName?: string;
  gradeCategoryId: string;
  gradeCategoryName: string;
  score: number;
  maxScore: number;
  inputDate: string;
  notes?: string;
}

interface GradeManagementProps {
  grades: Grade[];
  gradeCategories: GradeCategory[];
  students: Array<{ id: string; name: string; classId: string; className: string }>;
  materials: Array<{ id: string; name: string; programId: string }>;
  assignments: Array<{ id: string; name: string; classId: string }>;
  onAddGrade: (grade: Omit<Grade, 'id' | 'inputDate'>) => void;
  onEditGrade: (id: string, grade: Partial<Grade>) => void;
  onDeleteGrade: (id: string) => void;
}

export function GradeManagement({ 
  grades, 
  gradeCategories,
  students,
  materials,
  assignments,
  onAddGrade, 
  onEditGrade, 
  onDeleteGrade 
}: GradeManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [activeTab, setActiveTab] = useState("grades");

  // Form state for adding/editing grades
  const [formData, setFormData] = useState({
    studentId: "",
    classId: "",
    materialId: "",
    assignmentId: "",
    gradeCategoryId: "",
    score: "",
    maxScore: "100",
    notes: ""
  });

  // Filter grades based on search and filters
  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grade.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grade.assignmentName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === "all" || grade.classId === classFilter;
    const matchesCategory = categoryFilter === "all" || grade.gradeCategoryId === categoryFilter;
    
    return matchesSearch && matchesClass && matchesCategory;
  });

  // Get unique classes for filter
  const classes = [...new Set(grades.map(g => ({ id: g.classId, name: g.className })))];

  // Calculate statistics
  const totalGrades = grades.length;
  const averageScore = grades.length > 0 ? Math.round(grades.reduce((acc, g) => acc + g.score, 0) / grades.length) : 0;
  const highPerformers = grades.filter(g => g.score >= 85).length;
  const lowPerformers = grades.filter(g => g.score < 70).length;

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return "text-green-600 font-semibold";
    if (percentage >= 70) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const getGradeBadge = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return <Badge className="bg-green-100 text-green-800">A</Badge>;
    if (percentage >= 80) return <Badge className="bg-green-100 text-green-800">A-</Badge>;
    if (percentage >= 75) return <Badge className="bg-yellow-100 text-yellow-800">B+</Badge>;
    if (percentage >= 70) return <Badge className="bg-yellow-100 text-yellow-800">B</Badge>;
    if (percentage >= 65) return <Badge className="bg-yellow-100 text-yellow-800">B-</Badge>;
    if (percentage >= 60) return <Badge className="bg-orange-100 text-orange-800">C+</Badge>;
    if (percentage >= 55) return <Badge className="bg-orange-100 text-orange-800">C</Badge>;
    if (percentage >= 50) return <Badge className="bg-orange-100 text-orange-800">C-</Badge>;
    return <Badge className="bg-red-100 text-red-800">D</Badge>;
  };

  const handleAddGrade = () => {
    if (!formData.studentId || !formData.gradeCategoryId || !formData.score) return;
    
    const student = students.find(s => s.id === formData.studentId);
    const material = materials.find(m => m.id === formData.materialId);
    const assignment = assignments.find(a => a.id === formData.assignmentId);
    const category = gradeCategories.find(c => c.id === formData.gradeCategoryId);
    
    if (!student || !category) return;
    
    const newGrade = {
      studentId: formData.studentId,
      studentName: student.name,
      classId: formData.classId,
      className: student.className,
      materialId: formData.materialId,
      materialName: material?.name || "",
      assignmentId: formData.assignmentId || undefined,
      assignmentName: assignment?.name || undefined,
      gradeCategoryId: formData.gradeCategoryId,
      gradeCategoryName: category.name,
      score: parseInt(formData.score),
      maxScore: parseInt(formData.maxScore),
      notes: formData.notes
    };
    
    onAddGrade(newGrade);
    setFormData({
      studentId: "",
      classId: "",
      materialId: "",
      assignmentId: "",
      gradeCategoryId: "",
      score: "",
      maxScore: "100",
      notes: ""
    });
    setIsAddDialogOpen(false);
  };

  const handleEditGrade = (grade: Grade) => {
    setEditingGrade(grade);
    setFormData({
      studentId: grade.studentId,
      classId: grade.classId,
      materialId: grade.materialId,
      assignmentId: grade.assignmentId || "",
      gradeCategoryId: grade.gradeCategoryId,
      score: grade.score.toString(),
      maxScore: grade.maxScore.toString(),
      notes: grade.notes || ""
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateGrade = () => {
    if (!editingGrade || !formData.studentId || !formData.gradeCategoryId || !formData.score) return;
    
    onEditGrade(editingGrade.id, {
      score: parseInt(formData.score),
      maxScore: parseInt(formData.maxScore),
      notes: formData.notes
    });
    
    setEditingGrade(null);
    setIsEditDialogOpen(false);
  };

  // Group grades by student for summary view
  const studentSummary = students.map(student => {
    const studentGrades = grades.filter(g => g.studentId === student.id);
    const averageScore = studentGrades.length > 0 
      ? Math.round(studentGrades.reduce((acc, g) => acc + g.score, 0) / studentGrades.length)
      : 0;
    const totalGrades = studentGrades.length;
    
    return {
      ...student,
      averageScore,
      totalGrades,
      grades: studentGrades
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C40503]">Manajemen Nilai</h1>
          <p className="text-gray-600">Kelola dan input nilai siswa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-[#C40503]">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#C40503] hover:bg-[#A60000]">
                <Plus className="h-4 w-4 mr-2" />
                Input Nilai
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Input Nilai Baru</DialogTitle>
                <DialogDescription>
                  Tambahkan nilai untuk siswa
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="student">Siswa</Label>
                    <Select value={formData.studentId} onValueChange={(value) => {
                      const student = students.find(s => s.id === value);
                      setFormData({...formData, studentId: value, classId: student?.classId || ""});
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih siswa" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map(student => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} - {student.className}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Kategori Nilai</Label>
                    <Select value={formData.gradeCategoryId} onValueChange={(value) => setFormData({...formData, gradeCategoryId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeCategories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="assignment">Tugas (Opsional)</Label>
                    <Select value={formData.assignmentId} onValueChange={(value) => setFormData({...formData, assignmentId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tugas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tidak ada tugas</SelectItem>
                        {assignments.filter(a => a.classId === formData.classId).map(assignment => (
                          <SelectItem key={assignment.id} value={assignment.id}>
                            {assignment.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="score">Nilai</Label>
                    <Input
                      id="score"
                      type="number"
                      value={formData.score}
                      onChange={(e) => setFormData({...formData, score: e.target.value})}
                      placeholder="Masukkan nilai"
                      min="0"
                      max={formData.maxScore}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxScore">Nilai Maksimal</Label>
                    <Input
                      id="maxScore"
                      type="number"
                      value={formData.maxScore}
                      onChange={(e) => setFormData({...formData, maxScore: e.target.value})}
                      placeholder="100"
                      min="1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Catatan</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Catatan tambahan (opsional)"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddGrade}>
                  Simpan Nilai
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Nilai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#C40503]">{totalGrades}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Rata-rata Nilai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#DAA625]">{averageScore}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Siswa Berprestasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{highPerformers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Perlu Perhatian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowPerformers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grades" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Daftar Nilai
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Ringkasan Siswa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-4">
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
                      placeholder="Cari berdasarkan nama siswa, materi, atau tugas..."
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
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {gradeCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grades Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Nilai ({filteredGrades.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Siswa</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Materi/Tugas</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-center">Nilai</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead>Tanggal Input</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell className="font-medium">{grade.studentName}</TableCell>
                      <TableCell>{grade.className}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{grade.materialName}</div>
                          {grade.assignmentName && (
                            <div className="text-sm text-gray-500">{grade.assignmentName}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{grade.gradeCategoryName}</TableCell>
                      <TableCell className="text-center">
                        <span className={getGradeColor(grade.score, grade.maxScore)}>
                          {grade.score}/{grade.maxScore}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getGradeBadge(grade.score, grade.maxScore)}
                      </TableCell>
                      <TableCell>
                        {new Date(grade.inputDate).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditGrade(grade)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteGrade(grade.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredGrades.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        Tidak ada nilai yang sesuai dengan filter
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Nilai Siswa</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Siswa</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead className="text-center">Total Nilai</TableHead>
                    <TableHead className="text-center">Rata-rata</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentSummary.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.className}</TableCell>
                      <TableCell className="text-center">{student.totalGrades}</TableCell>
                      <TableCell className="text-center">
                        <span className={getGradeColor(student.averageScore, 100)}>
                          {student.averageScore}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getGradeBadge(student.averageScore, 100)}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.averageScore >= 85 ? (
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        ) : student.averageScore >= 70 ? (
                          <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Need Improvement</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Nilai</DialogTitle>
            <DialogDescription>
              Ubah nilai siswa
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-score">Nilai</Label>
                <Input
                  id="edit-score"
                  type="number"
                  value={formData.score}
                  onChange={(e) => setFormData({...formData, score: e.target.value})}
                  placeholder="Masukkan nilai"
                  min="0"
                  max={formData.maxScore}
                />
              </div>
              <div>
                <Label htmlFor="edit-maxScore">Nilai Maksimal</Label>
                <Input
                  id="edit-maxScore"
                  type="number"
                  value={formData.maxScore}
                  onChange={(e) => setFormData({...formData, maxScore: e.target.value})}
                  placeholder="100"
                  min="1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-notes">Catatan</Label>
              <Input
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Catatan tambahan (opsional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUpdateGrade}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
