import { apiRequest } from "../api";
import { Certificate, CertificateTemplate } from "@/types/certificate";

interface GenerateCertificateParams {
  templateId: string;
  studentId: string;
  courseId: string;
  metadata: {
    courseName: string;
    achievementDate: string;
    type: "COURSE_COMPLETION" | "ACHIEVEMENT";
  };
  signedBy: {
    id: string;
    name: string;
    position: string;
    signature: string;
  };
}

interface BatchCertificateRequest {
  templateId: string;
  courseId: string;
  studentIds: string[];
  metadata: {
    courseName: string;
    achievementDate: string;
    type: "COURSE_COMPLETION" | "ACHIEVEMENT";
  };
  signedBy: {
    id: string;
    name: string;
    position: string;
    signature: string;
  };
}

// Dummy data untuk sertifikat
const dummyCertificates: Certificate[] = [
  {
    id: "CERT001",
    studentId: "SSW0000966",
    studentName: "I Gede Wija Mahottama",
    courseId: "CRS001",
    courseName: "Bahasa Inggris - Advanced",
    issueDate: "2025-06-01",
    certificateNumber: "SE/2025/001",
    status: "issued",
    grade: "A",
    teacherName: "Ni Kadek Dewi",
    type: "COURSE_COMPLETION",
    signedBy: "Dr. I Made Sudiana, M.Pd",
  },
  {
    id: "CERT002",
    studentId: "SSW0001159",
    studentName: "Ni Kadek Nadine Aryawredi Maheswari",
    courseId: "CRS002",
    courseName: "Matematika SMP",
    issueDate: "2025-06-05",
    certificateNumber: "SE/2025/002",
    status: "issued",
    grade: "A-",
    teacherName: "I Made Wijaya",
    type: "COURSE_COMPLETION",
    signedBy: "Dr. I Made Sudiana, M.Pd",
  },
  {
    id: "CERT003",
    studentId: "SSW0001160",
    studentName: "I Putu Demas Pradnya Dinata",
    courseId: "CRS003",
    courseName: "IPA Terpadu",
    issueDate: "2025-06-10",
    certificateNumber: "SE/2025/003",
    status: "pending",
    grade: "B+",
    teacherName: "I Putu Surya",
    type: "ACHIEVEMENT",
    signedBy: "Dr. I Made Sudiana, M.Pd",
  },
  {
    id: "CERT004",
    studentId: "SSW0001166",
    studentName: "Ni Putu Cristal Aishwarya Putri",
    courseId: "CRS001",
    courseName: "Bahasa Inggris - Intermediate",
    issueDate: "2025-06-08",
    certificateNumber: "SE/2025/004",
    status: "issued",
    grade: "A",
    teacherName: "Ni Kadek Dewi",
    type: "COURSE_COMPLETION",
    signedBy: "Dr. I Made Sudiana, M.Pd",
  },
  {
    id: "CERT005",
    studentId: "SSW0001167",
    studentName: "Ni Kadek Aishwarya Artha Devani",
    courseId: "CRS004",
    courseName: "Bahasa Indonesia",
    issueDate: "2025-06-12",
    certificateNumber: "SE/2025/005",
    status: "pending",
    grade: "A-",
    teacherName: "Ni Made Sri",
    type: "PARTICIPATION",
    signedBy: "Dr. I Made Sudiana, M.Pd",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class CertificateService {
  async getCertificates(): Promise<Certificate[]> {
    try {
      await delay(1000); // Simulate network delay
      return dummyCertificates;
    } catch (error) {
      console.error("Error fetching certificates:", error);
      throw new Error("Failed to fetch certificates");
    }
  }

  async getCertificate(id: string): Promise<Certificate> {
    try {
      await delay(500);
      const certificate = dummyCertificates.find((cert) => cert.id === id);
      if (!certificate) throw new Error("Certificate not found");

      return certificate;
    } catch (error) {
      console.error(`Error fetching certificate ${id}:`, error);
      throw new Error("Failed to fetch certificate");
    }
  }

  async getStudentCertificates(studentId: string): Promise<Certificate[]> {
    try {
      await delay(500);
      return dummyCertificates.filter((cert) => cert.studentId === studentId);
    } catch (error) {
      console.error(
        `Error fetching certificates for student ${studentId}:`,
        error
      );
      throw new Error("Failed to fetch student certificates");
    }
  }

  async getTemplates(): Promise<CertificateTemplate[]> {
    return apiRequest<CertificateTemplate[]>(
      "GET",
      "/api/v1/certificates/templates"
    );
  }

  async getTemplate(id: string): Promise<CertificateTemplate> {
    return apiRequest<CertificateTemplate>(
      "GET",
      `/api/v1/certificates/templates/${id}`
    );
  }

  async generateCertificate(
    params: GenerateCertificateParams
  ): Promise<Certificate> {
    return apiRequest<Certificate>("POST", "/api/v1/certificates", params);
  }

  async generateBatchCertificates(
    params: BatchCertificateRequest
  ): Promise<Certificate[]> {
    return apiRequest<Certificate[]>(
      "POST",
      "/api/v1/certificates/batch",
      params
    );
  }

  async generatePDF(certificateId: string): Promise<Blob> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/certificates/${certificateId}/pdf`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate certificate PDF");
    }

    return response.blob();
  }

  async uploadSignature(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("signature", file);

    return apiRequest<{ url: string }>(
      "POST",
      "/api/v1/certificates/signatures/upload",
      formData,
      {
        headers: {
          // Don't set Content-Type here, let the browser set it with the boundary
        },
      }
    );
  }

  async downloadCertificate(certificateId: string): Promise<void> {
    try {
      const pdfBlob = await this.generatePDF(certificateId);
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate-${certificateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download certificate:", error);
      throw error;
    }
  }

  // Preview a certificate before generation
  async previewCertificate(params: GenerateCertificateParams): Promise<Blob> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/certificates/preview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate certificate preview");
    }

    return response.blob();
  }

  async createCertificate(
    data: Omit<Certificate, "id" | "createdAt" | "updatedAt">
  ): Promise<Certificate> {
    try {
      await delay(1000);
      const newId = String(dummyCertificates.length + 1).padStart(3, "0");
      const newCertNumber = `SE/2025/${newId}`;

      const newCertificate: Certificate = {
        ...data,
        id: `CERT${newId}`,
        certificateNumber: newCertNumber,
      };

      dummyCertificates.push(newCertificate);
      return newCertificate;
    } catch (error) {
      console.error("Error creating certificate:", error);
      throw new Error("Failed to create certificate");
    }
  }

  async updateCertificate(
    id: string,
    updates: Partial<Certificate>
  ): Promise<Certificate> {
    try {
      await delay(1000);
      const index = dummyCertificates.findIndex((cert) => cert.id === id);
      if (index === -1) throw new Error("Certificate not found");

      dummyCertificates[index] = { ...dummyCertificates[index], ...updates };
      return dummyCertificates[index];
    } catch (error) {
      console.error(`Error updating certificate ${id}:`, error);
      throw new Error("Failed to update certificate");
    }
  }

  async deleteCertificate(id: string): Promise<void> {
    try {
      await delay(1000);
      const index = dummyCertificates.findIndex((cert) => cert.id === id);
      if (index === -1) throw new Error("Certificate not found");
      dummyCertificates.splice(index, 1);
    } catch (error) {
      console.error(`Error deleting certificate ${id}:`, error);
      throw new Error("Failed to delete certificate");
    }
  }

  async issueCertificate(id: string): Promise<Certificate> {
    try {
      await delay(1000);
      const certificate = dummyCertificates.find((cert) => cert.id === id);
      if (!certificate) throw new Error("Certificate not found");

      certificate.status = "issued";
      certificate.issueDate = new Date().toISOString().split("T")[0];
      return certificate;
    } catch (error) {
      console.error(`Error issuing certificate ${id}:`, error);
      throw new Error("Failed to issue certificate");
    }
  }
}

export const certificateService = new CertificateService();
