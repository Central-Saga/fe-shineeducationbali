"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, PenLine, BookOpen, Clock, Users, Calendar, TrendingUp } from "lucide-react";
import { programsData, Program } from "@/data/data-admin/program-data/program-data";

interface ProgramDetailProps {
  programId: string;
}

export function ProgramDetail({ programId }: ProgramDetailProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    // Fetch program details
    const fetchProgramDetails = async () => {
      // In a real app, you would fetch data from API
      // For now, simulate a fetch delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundProgram = programsData.find(p => p.id === programId);
      setProgram(foundProgram || null);
      setIsLoading(false);
    };

    fetchProgramDetails();
  }, [programId]);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-[#C40503] border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat detail program...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Program Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6">Program yang Anda cari tidak ditemukan.</p>
            <Link href="/dashboard/program">
              <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                Kembali ke Daftar Program
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return <Badge className="bg-green-100 text-green-700">Aktif</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-700">Tidak Aktif</Badge>;
    }
  };

  const getLevelBadge = (level: string) => {
    const getLevelBadgeColor = (level: string) => {
      switch (level) {
        case "beginner": return "bg-green-100 text-green-800 border-green-200";
        case "intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "advanced": return "bg-red-100 text-red-800 border-red-200";
        default: return "bg-gray-100 text-gray-800 border-gray-200";
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
      <Badge variant="outline" className={getLevelBadgeColor(level)}>
        {getLevelLabel(level)}
      </Badge>
    );
  };

  const getEducationLevelBadge = (educationLevel: string) => {
    const getEducationLevelBadgeColor = (level: string) => {
      switch (level) {
        case "SD": return "bg-blue-100 text-blue-800 border-blue-200";
        case "SMP": return "bg-purple-100 text-purple-800 border-purple-200";
        case "SMA/SMK": return "bg-indigo-100 text-indigo-800 border-indigo-200";
        case "UMUM": return "bg-gray-100 text-gray-800 border-gray-200";
        default: return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };

    return (
      <Badge variant="outline" className={getEducationLevelBadgeColor(educationLevel)}>
        {educationLevel}
      </Badge>
    );
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/dashboard/program">
            <Button variant="outline" size="sm" className="mr-4">
              <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{program.name}</h1>
            <p className="text-gray-500">{program.category} - {program.educationLevel}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/program/edit/${programId}`}>
            <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
              <PenLine className="h-4 w-4 mr-2" />
              Edit Program
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="bg-[#C40503]/5 border-b">
            <CardTitle className="text-lg text-[#C40503]">Detail Program</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi Program</h3>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-[#DAA625]" />
                  <div>
                    <p className="text-sm text-gray-500">Kategori</p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {program.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-[#C40503]" />
                  <div>
                    <p className="text-sm text-gray-500">Level Program</p>
                    {getLevelBadge(program.level)}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#DAA625]" />
                  <div>
                    <p className="text-sm text-gray-500">Jenjang Pendidikan</p>
                    {getEducationLevelBadge(program.educationLevel)}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#C40503]" />
                  <div>
                    <p className="text-sm text-gray-500">Durasi Program</p>
                    <p className="font-medium">{program.duration} minggu</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#C40503]/5 border-b">
            <CardTitle className="text-lg text-[#C40503]">Status & Informasi</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Status Program</span>
                  {getStatusBadge(program.isActive)}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Informasi Program</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID Program:</span>
                    <span className="font-medium">{program.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dibuat:</span>
                    <span className="font-medium">
                      {new Date(program.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Diperbarui:</span>
                    <span className="font-medium">
                      {new Date(program.updatedAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Opsi Lainnya</h4>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Lihat Materi Program
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Lihat Peserta Program
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Lihat Jadwal Program
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
