"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { programsData, Program } from "@/data/data-admin/program-data/program-data";

export function AddClasses() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    class_name: "",
    level: "",
    program_name: "",
    program_id: "",
    schedule: "",
    time_start: "",
    time_end: "",
    capacity: 0,
    current_enrollment: 0,
    teacher_name: "",
    teacher_id: "",
    status: "ACTIVE"
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your API call
      // const response = await fetch('/api/v1/classes', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to create class');
      // }
      
      // Simulate API call
      console.log('Class data submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to class list
      router.push('/dashboard/class');
      router.refresh(); // Refresh the page to show the new class
      
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Gagal membuat kelas baru. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/class">
          <Button variant="outline" size="sm" className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tambah Kelas Baru</h1>
      </div>

      <Card>
        <CardHeader className="bg-[#C40503]/5 border-b">
          <CardTitle className="text-lg text-[#C40503]">Data Kelas</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Informasi Dasar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="class_name" className="block text-sm font-medium text-gray-700">
                    Nama Kelas <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="class_name"
                    name="class_name"
                    value={formData.class_name}
                    onChange={handleChange}
                    placeholder="Masukkan nama kelas"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="program_id" className="block text-sm font-medium text-gray-700">
                    Pilih Program <span className="text-red-500">*</span>
                  </label>
                  <Select 
                    onValueChange={(value) => {
                      const selectedProgram = programsData.find((p: Program) => p.id === value);
                      if (selectedProgram) {
                        setFormData(prev => ({ 
                          ...prev, 
                          program_id: selectedProgram.id,
                          program_name: selectedProgram.name,
                          level: selectedProgram.educationLevel
                        }));
                      }
                    }}
                    value={formData.program_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programsData.map((program: Program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name} - {program.category} ({program.educationLevel})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Program Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Informasi Program</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Program Terpilih
                  </label>
                  <div className="p-3 bg-gray-50 rounded-md border">
                    {formData.program_name ? (
                      <div>
                        <p className="font-medium text-gray-900">{formData.program_name}</p>
                        <p className="text-sm text-gray-500">ID: {formData.program_id}</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">Pilih program terlebih dahulu</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Jenjang Pendidikan
                  </label>
                  <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                    {formData.level ? (
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span>
                        <span className="font-medium text-blue-900">{formData.level}</span>
                        <span className="text-sm text-blue-600">(Otomatis dari program)</span>
                      </div>
                    ) : (
                      <p className="text-blue-600">Pilih program untuk melihat jenjang</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Informasi Jadwal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                    Jadwal <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    placeholder="Contoh: Senin, Rabu, Jumat"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                    Kapasitas Kelas <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Contoh: 30"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="time_start" className="block text-sm font-medium text-gray-700">
                    Waktu Mulai <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="time_start"
                    name="time_start"
                    value={formData.time_start}
                    onChange={handleChange}
                    placeholder="Contoh: 08:00"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="time_end" className="block text-sm font-medium text-gray-700">
                    Waktu Selesai <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="time_end"
                    name="time_end"
                    value={formData.time_end}
                    onChange={handleChange}
                    placeholder="Contoh: 09:30"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Teacher Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Informasi Pengajar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700">
                    ID Pengajar <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="teacher_id"
                    name="teacher_id"
                    value={formData.teacher_id}
                    onChange={handleChange}
                    placeholder="Contoh: T001"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="teacher_name" className="block text-sm font-medium text-gray-700">
                    Nama Pengajar <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="teacher_name"
                    name="teacher_name"
                    value={formData.teacher_name}
                    onChange={handleChange}
                    placeholder="Masukkan nama pengajar"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Enrollment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Informasi Pendaftaran</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="current_enrollment" className="block text-sm font-medium text-gray-700">
                    Jumlah Siswa Terdaftar <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="current_enrollment"
                    name="current_enrollment"
                    type="number"
                    value={formData.current_enrollment}
                    onChange={handleChange}
                    placeholder="Contoh: 25"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status Kelas
                  </label>
                  <Select
                    onValueChange={(value) => handleSelectChange('status', value)}
                    defaultValue="ACTIVE"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Aktif</SelectItem>
                      <SelectItem value="INACTIVE">Tidak Aktif</SelectItem>
                      <SelectItem value="COMPLETED">Selesai</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>


            <div className="flex justify-end gap-3">
              <Link href="/dashboard/class">
                <Button variant="outline" type="button">
                  Batal
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="bg-[#C40503] hover:bg-[#a60402] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Kelas'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
