import { CertificateTemplate } from "@/types/template";

// Interface untuk data upload template baru
export interface NewTemplateFormData {
  name: string;
  description: string;
  courseType: "ENGLISH" | "COMPUTER" | "CODING";
  templateFile: File;
}

// Function untuk generate template ID
export function generateTemplateId(courseType: string): string {
  return `tpl-${courseType.toLowerCase()}-${Date.now()}`;
}

// Function untuk mock upload template
export async function uploadTemplate(
  formData: NewTemplateFormData
): Promise<CertificateTemplate> {
  // Simulasi network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Convert file ke URL untuk preview (dalam real app ini akan jadi URL dari storage)
  const templateUrl = URL.createObjectURL(formData.templateFile);
  const thumbnail = templateUrl; // Dalam real app ini akan jadi thumbnail yang dioptimasi

  // Buat template baru
  const newTemplate: CertificateTemplate = {
    id: generateTemplateId(formData.courseType),
    name: formData.name,
    description: formData.description,
    courseType: formData.courseType,
    status: "draft",
    thumbnail: thumbnail,
    templateUrl: templateUrl,
    usageCount: 0,
    createdAt: new Date().toISOString(),
    createdBy: {
      id: "ADMIN001", // Ini akan diambil dari user yang sedang login
      name: "Admin Utama",
      role: "super_admin",
    },
    updatedAt: new Date().toISOString(),
    updatedBy: {
      id: "ADMIN001",
      name: "Admin Utama",
      role: "super_admin",
    },
  };

  // Nanti di sini akan ada integrasi dengan backend API
  // await fetch('/api/templates', {
  //   method: 'POST',
  //   body: JSON.stringify(newTemplate)
  // });

  return newTemplate;
}

// Function untuk validasi file template
export function validateTemplateFile(file: File): string | null {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

  if (!ALLOWED_TYPES.includes(file.type)) {
    return "File harus berupa gambar (JPG atau PNG)";
  }

  if (file.size > MAX_SIZE) {
    return "Ukuran file maksimal 5MB";
  }

  return null;
}
