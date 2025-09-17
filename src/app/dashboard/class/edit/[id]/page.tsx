"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Contoh data kelas untuk simulasi fetching dari API
const dummyClassData = {
  id: "c1",
  title: "Aljabar Linear",
  subject: "Matematika",
  schedule: "Senin, Rabu, Jumat",
  time: "08:00 - 09:30",
  room: "Ruang Belajar 101",
  teacher: "Budi Santoso",
  groupLink: "http://localhost:3000/dashboard-teacher/classes/c1",
  description: "Pengenalan konsep aljabar linear dan aplikasinya. Kelas ini akan fokus pada pemahaman dasar tentang matriks, determinan, dan sistem persamaan linear.",
  status: "active"
};

export default function EditClassPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const classId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    subject: "",
    schedule: "",
    time: "",
    room: "",
    teacher: "",
    groupLink: "",
    description: "",
    status: "active"
  });

  useEffect(() => {
    // Fetch class data
    const fetchClassData = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/v1/classes/${classId}`);
        // if (!response.ok) throw new Error('Failed to fetch class data');
        // const data = await response.json();
        
        // Simulate API fetch with dummy data
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = { ...dummyClassData, id: classId };
        
        setFormData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching class data:', error);
        alert('Gagal memuat data kelas. Silakan coba lagi.');
        router.push('/dashboard/class');
      }
    };

    fetchClassData();
  }, [classId, router]);

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
      // In a real app, you would update via an API
      // const response = await fetch(`/api/v1/classes/${classId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update class');
      // }
      
      // Simulate API call
      console.log('Class data updated:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to class list
      router.push('/dashboard/class');
      router.refresh(); // Refresh the page to show the updated class
      
    } catch (error) {
      console.error('Error updating class:', error);
      alert('Gagal memperbarui kelas. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // List of teacher options (replace with actual data fetching)
  const teachers = [
    { id: "1", name: "Budi Santoso" },
    { id: "2", name: "Ani Wijaya" },
    { id: "3", name: "Dedi Permana" },
    { id: "4", name: "Siti Nurhaliza" }
  ];

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-[#C40503] border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data kelas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/class">
          <Button variant="outline" size="sm" className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit Kelas</h1>
      </div>

      <Card>
        <CardHeader className="bg-[#C40503]/5 border-b">
          <CardTitle className="text-lg text-[#C40503]">Data Kelas</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Judul Kelas <span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul kelas"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Mata Pelajaran <span className="text-red-500">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Masukkan mata pelajaran"
                  required
                />
              </div>
            </div>

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
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Waktu <span className="text-red-500">*</span>
                </label>
                <Input
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="Contoh: 08:00 - 09:30"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="room" className="block text-sm font-medium text-gray-700">
                  Lokasi/Ruangan <span className="text-red-500">*</span>
                </label>
                <Input
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  placeholder="Contoh: Ruang Belajar 101"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">
                  Pengajar <span className="text-red-500">*</span>
                </label>
                <Select 
                  onValueChange={(value) => handleSelectChange('teacher', value)}
                  value={formData.teacher}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pengajar" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.name}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="groupLink" className="block text-sm font-medium text-gray-700">
                Link Grup
              </label>
              <Input
                id="groupLink"
                name="groupLink"
                value={formData.groupLink}
                onChange={handleChange}
                placeholder="Masukkan link grup kelas (WhatsApp, MS Teams, dll)"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Deskripsi Kelas
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi kelas"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                onValueChange={(value) => handleSelectChange('status', value)}
                value={formData.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
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
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
