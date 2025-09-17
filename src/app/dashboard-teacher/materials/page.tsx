"use client";

import { MaterialManagement } from "@/components/ui-teacher/materials/MaterialManagement";

export default function MaterialsPage() {
  // Mock data - in real app, this would come from API
  const materials = [
    {
      id: "1",
      title: "Pengenalan Grammar Dasar",
      description: "Materi pembelajaran tentang dasar-dasar grammar bahasa Inggris",
      type: "document" as const,
      programId: "1",
      programName: "Bahasa Inggris Dasar",
      filePath: "/materials/grammar-basic.pdf",
      fileSize: 2048000,
      uploadDate: "2025-06-15",
      status: "active" as const,
      downloadCount: 45,
      tags: ["grammar", "dasar", "bahasa inggris"]
    },
    {
      id: "2",
      title: "Video Tutorial Pronunciation",
      description: "Video pembelajaran cara pengucapan yang benar",
      type: "video" as const,
      programId: "1",
      programName: "Bahasa Inggris Dasar",
      filePath: "/materials/pronunciation-tutorial.mp4",
      fileSize: 15728640,
      uploadDate: "2025-06-20",
      status: "active" as const,
      downloadCount: 32,
      tags: ["pronunciation", "video", "tutorial"]
    },
    {
      id: "3",
      title: "Latihan Soal UTS",
      description: "Kumpulan latihan soal untuk persiapan UTS",
      type: "assignment" as const,
      programId: "1",
      programName: "Bahasa Inggris Dasar",
      filePath: "/materials/uts-practice.pdf",
      fileSize: 1024000,
      uploadDate: "2025-06-25",
      status: "active" as const,
      downloadCount: 28,
      tags: ["latihan", "uts", "soal"]
    }
  ];

  const programs = [
    { id: "1", name: "Bahasa Inggris Dasar" },
    { id: "2", name: "Matematika Dasar" },
    { id: "3", name: "Coding Pemula" }
  ];

  const handleAddMaterial = (material: any) => {
    console.log("Add material:", material);
    // API call to add material
  };

  const handleEditMaterial = (id: string, material: any) => {
    console.log("Edit material:", id, material);
    // API call to edit material
  };

  const handleDeleteMaterial = (id: string) => {
    console.log("Delete material:", id);
    // API call to delete material
  };

  const handleViewMaterial = (id: string) => {
    console.log("View material:", id);
    // Navigate to material detail or open preview
  };

  return (
    <MaterialManagement
      materials={materials}
      programs={programs}
      onAddMaterial={handleAddMaterial}
      onEditMaterial={handleEditMaterial}
      onDeleteMaterial={handleDeleteMaterial}
      onViewMaterial={handleViewMaterial}
    />
  );
}