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

class CertificateService {
  async getCertificates(): Promise<Certificate[]> {
    return apiRequest<Certificate[]>("GET", "/api/v1/certificates");
  }

  async getCertificate(id: string): Promise<Certificate> {
    return apiRequest<Certificate>("GET", `/api/v1/certificates/${id}`);
  }

  async getStudentCertificates(studentId: string): Promise<Certificate[]> {
    return apiRequest<Certificate[]>(
      "GET",
      `/api/v1/certificates/student/${studentId}`
    );
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
    return apiRequest<Certificate>("POST", "/api/v1/certificates", data);
  }
}

export const certificateService = new CertificateService();
