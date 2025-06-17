import { CertificateTemplate } from "@/types/template";

export const certificateTemplates: CertificateTemplate[] = [
  {
    id: "tpl-english-basic",
    name: "Sertifikat Bahasa Inggris Basic",
    description: "Template sertifikat untuk kursus Bahasa Inggris tingkat dasar",
    courseType: "ENGLISH",
    status: "active",
    thumbnail: "/certificates/english-basic-thumb.jpg",
    templateUrl: "/certificates/english-basic.pdf",
    usageCount: 156,
    createdAt: "2025-01-15T08:00:00Z",
    createdBy: {
      id: "ADMIN001",
      name: "Admin Utama",
      role: "super_admin"
    },
    updatedAt: "2025-06-01T10:30:00Z",
    updatedBy: {
      id: "ADMIN001",
      name: "Admin Utama",
      role: "super_admin"
    }
  },
  {
    id: "tpl-computer-basic",
    name: "Sertifikat Komputer Basic",
    description: "Template sertifikat untuk kursus Komputer tingkat dasar",
    courseType: "COMPUTER",
    status: "active",
    thumbnail: "/certificates/computer-basic-thumb.jpg",
    templateUrl: "/certificates/computer-basic.pdf",
    usageCount: 89,
    createdAt: "2025-01-15T08:00:00Z",
    createdBy: {
      id: "ADMIN001",
      name: "Admin Utama",
      role: "super_admin"
    },
    updatedAt: "2025-06-05T14:20:00Z",
    updatedBy: {
      id: "ADMIN002",
      name: "Admin Sertifikat",
      role: "certificate_admin"
    }
  },
  {
    id: "tpl-coding-basic",
    name: "Sertifikat Coding Basic",
    description: "Template sertifikat untuk kursus Coding tingkat dasar",
    courseType: "CODING",
    status: "draft",
    thumbnail: "/certificates/coding-basic-thumb.jpg",
    templateUrl: "/certificates/coding-basic.pdf",
    usageCount: 0,
    createdAt: "2025-06-08T09:15:00Z",
    createdBy: {
      id: "ADMIN002",
      name: "Admin Sertifikat",
      role: "certificate_admin"
    },
    updatedAt: "2025-06-08T09:15:00Z",
    updatedBy: {
      id: "ADMIN002",
      name: "Admin Sertifikat",
      role: "certificate_admin"
    }
  }
];
