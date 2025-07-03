"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Book, 
  File, 
  FileText, 
  Filter, 
  MoreVertical, 
  Plus, 
  Search, 
  Upload 
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import data
import { materialsData } from "@/data/data-teacher/materials/materials-data";

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Get unique classes from materials data
  const classes = [...new Set(materialsData.map(material => material.className))];
  
  // Get unique material types
  const types = [...new Set(materialsData.map(material => material.type))];

  // Filter materials data
  const filteredMaterials = materialsData.filter(material => {
    let match = true;
    
    // Filter by search query
    if (searchQuery) {
      match = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Filter by class
    if (classFilter !== "all") {
      match = match && (material.className === classFilter);
    }
    
    // Filter by material type
    if (typeFilter !== "all") {
      match = match && (material.type === typeFilter);
    }
    
    return match;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Materi Pembelajaran
        </h1>
        <Button className="bg-[#C40503] hover:bg-[#A60000]">
          <Plus className="mr-3 h-4 w-4" />
          Tambah Materi
        </Button>
      </div>

      {/* Material Type Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white p-1 gap-2 border rounded-md shadow-sm">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm"
            onClick={() => setTypeFilter("all")}
          >
            Semua
          </TabsTrigger>
          {types.map(type => (
            <TabsTrigger 
              key={type}
              value={type.toLowerCase()} 
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm"
              onClick={() => setTypeFilter(type)}
            >
              {type === "document" ? "Dokumen" : 
               type === "video" ? "Video" : 
               type === "presentation" ? "Presentasi" : 
               type === "quiz" ? "Kuis" : type}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Book className="mr-3 h-5 w-5 text-[#C40503]" /> 
                Daftar Materi
              </CardTitle>
              <CardDescription>
                Kelola semua materi pembelajaran Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Cari materi pembelajaran..."
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
                      {classes.map((className) => (
                        <SelectItem key={className} value={className}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Materials Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Judul Materi</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Mata Pelajaran</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.title}</TableCell>
                        <TableCell>{material.className}</TableCell>
                        <TableCell>{material.subject}</TableCell>
                        <TableCell>
                          {material.type === "document" && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Dokumen
                            </Badge>
                          )}
                          {material.type === "video" && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              Video
                            </Badge>
                          )}
                          {material.type === "presentation" && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Presentasi
                            </Badge>
                          )}
                          {material.type === "quiz" && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              Kuis
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(material.uploadedDate).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredMaterials.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                          Tidak ada materi yang sesuai dengan filter
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <p className="text-sm text-gray-500">
                Menampilkan {filteredMaterials.length} dari {materialsData.length} materi
              </p>
              <Button variant="outline" className="text-[#C40503]">
                <Upload className="mr-2 h-4 w-4" />
                Upload Materi Baru
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Other tabs content will be identical to "all" but with filtering applied */}
        {types.map(type => (
          <TabsContent key={type} value={type.toLowerCase()} className="mt-6">
            {/* This content is managed by the filter state, so we don't need duplicated content */}
          </TabsContent>
        ))}
      </Tabs>

      {/* Material Card Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMaterials.slice(0, 6).map(material => (
          <Card key={material.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-2 bg-[#C40503]"></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base font-medium">{material.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {material.subject} • {material.className}
                  </CardDescription>
                </div>
                {material.type === "document" && (
                  <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <File className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                {material.type === "video" && (
                  <div className="h-8 w-8 bg-red-50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C40503" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                )}
                {material.type === "presentation" && (
                  <div className="h-8 w-8 bg-amber-50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA625" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  </div>
                )}
                {material.type === "quiz" && (
                  <div className="h-8 w-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-500 line-clamp-2">{material.description}</p>
            </CardContent>
            <CardFooter className="pb-3 flex justify-between items-center border-t mt-2 pt-2">
              <div className="text-xs text-gray-500">
                {new Date(material.uploadedDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
              <Button variant="outline" size="sm" className="h-8">
                Lihat Detail
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredMaterials.length > 6 && (
        <div className="flex justify-center">
          <Button variant="outline" className="mx-auto">
            Lihat Semua Materi
          </Button>
        </div>
      )}
    </div>
  );
}
