"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AddProgram() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 0,
    level: "",
    educationLevel: "",
    category: "",
    isActive: true
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
      // const response = await fetch('/api/v1/programs', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to create program');
      // }
      
      // Simulate API call
      console.log('Program data submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to program list
      router.push('/dashboard/program');
      router.refresh(); // Refresh the page to show the new program
      
    } catch (error) {
      console.error('Error creating program:', error);
      alert('Gagal membuat program baru. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/program">
          <Button variant="outline" size="sm" className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tambah Program Baru</h1>
      </div>

      <Card>
        <CardHeader className="bg-[#C40503]/5 border-b">
          <CardTitle className="text-lg text-[#C40503]">Data Program</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nama Program <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama program"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <Select 
                  onValueChange={(value) => handleSelectChange('category', value)}
                  value={formData.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bahasa">Bahasa</SelectItem>
                    <SelectItem value="Matematika">Matematika</SelectItem>
                    <SelectItem value="Dasar">Dasar</SelectItem>
                    <SelectItem value="Teknologi">Teknologi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Deskripsi Program <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi program"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Durasi (minggu) <span className="text-red-500">*</span>
                </label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Contoh: 12"
                  min="1"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                  Level Program <span className="text-red-500">*</span>
                </label>
                <Select 
                  onValueChange={(value) => handleSelectChange('level', value)}
                  value={formData.level}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Pemula</SelectItem>
                    <SelectItem value="intermediate">Menengah</SelectItem>
                    <SelectItem value="advanced">Lanjutan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">
                  Jenjang Pendidikan <span className="text-red-500">*</span>
                </label>
                <Select 
                  onValueChange={(value) => handleSelectChange('educationLevel', value)}
                  value={formData.educationLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenjang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SD">SD</SelectItem>
                    <SelectItem value="SMP">SMP</SelectItem>
                    <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                    <SelectItem value="UMUM">UMUM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Status Program
                </label>
                <Select
                  onValueChange={(value) => handleSelectChange('isActive', value)}
                  defaultValue="true"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Aktif</SelectItem>
                    <SelectItem value="false">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link href="/dashboard/program">
                <Button variant="outline" type="button">
                  Batal
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="bg-[#C40503] hover:bg-[#a60402] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Program'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
