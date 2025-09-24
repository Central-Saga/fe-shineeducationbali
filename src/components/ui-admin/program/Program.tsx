"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { programsData, Program } from "@/data/data-admin/program-data/program-data";

export function ProgramManagement() {
  const [programs] = useState<Program[]>(programsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Filter programs based on search and filters
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || program.level === levelFilter;
    const matchesCategory = categoryFilter === "all" || program.category === categoryFilter;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "beginner": return "Pemula";
      case "intermediate": return "Menengah";
      case "advanced": return "Lanjutan";
      default: return level;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Program</h1>
          <p className="text-gray-600 mt-1">Kelola program pembelajaran yang tersedia</p>
        </div>
        <Button className="bg-[#C40503] hover:bg-[#A00403] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Program
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter & Pencarian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari program..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Level</SelectItem>
                <SelectItem value="beginner">Pemula</SelectItem>
                <SelectItem value="intermediate">Menengah</SelectItem>
                <SelectItem value="advanced">Lanjutan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Bahasa">Bahasa</SelectItem>
                <SelectItem value="Matematika">Matematika</SelectItem>
                <SelectItem value="Dasar">Dasar</SelectItem>
                <SelectItem value="Teknologi">Teknologi</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Program</p>
                <p className="text-2xl font-bold text-gray-900">{programs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Program Aktif</p>
                <p className="text-2xl font-bold text-gray-900">
                  {programs.filter(p => p.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Filter className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kategori</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(programs.map(p => p.category)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Edit className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rata-rata Durasi</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(programs.reduce((acc, p) => acc + p.duration, 0) / programs.length)} minggu
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {program.name}
                  </CardTitle>
                  <CardDescription className="mt-1 text-gray-600">
                    {program.description}
                  </CardDescription>
                </div>
                <Badge 
                  variant={program.isActive ? "default" : "secondary"}
                  className={program.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                >
                  {program.isActive ? "Aktif" : "Tidak Aktif"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Program Details */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kategori:</span>
                  <span className="font-medium">{program.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Level:</span>
                  <Badge className={getLevelBadgeColor(program.level)}>
                    {getLevelLabel(program.level)}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durasi:</span>
                  <span className="font-medium">{program.duration} minggu</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Harga:</span>
                  <span className="font-medium text-[#C40503]">
                    Rp {program.price.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-3 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Lihat
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tidak ada program ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setLevelFilter("all");
                setCategoryFilter("all");
              }}
            >
              Reset Filter
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

