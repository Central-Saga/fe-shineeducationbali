/**
 * This service handles PDF generation for certificates using a
 * separate backend API endpoint that uses barryvdh/dompdf.
 */

import { Certificate, CertificateTemplate } from "@/types/certificate";
import { certificateService } from "./certificate.service";

class PDFGeneratorService {
  private async fetchTemplate(
    templateId: string
  ): Promise<CertificateTemplate> {
    return certificateService.getTemplate(templateId);
  }

  private replacePlaceholders(
    template: string,
    certificate: Certificate
  ): string {
    const replacements = {
      "{type}":
        certificate.type === "COURSE_COMPLETION" ? "Completion" : "Achievement",
      "{studentName}": certificate.studentId, // Will be replaced with actual name
      "{courseName}": certificate.metadata.courseName || "",
      "{achievementDate}": new Date(
        certificate.achievementDate
      ).toLocaleDateString("id-ID"),
      "{signatureUrl}": certificate.signedBy.signature,
      "{signerName}": certificate.signedBy.name,
      "{signerPosition}": certificate.signedBy.position,
      "{certificateId}": certificate.id,
      "{issueDate}": new Date(certificate.issueDate).toLocaleDateString(
        "id-ID"
      ),
    };

    let html = template;
    for (const [key, value] of Object.entries(replacements)) {
      html = html.replace(new RegExp(key, "g"), value);
    }
    return html;
  }

  async generatePDF(certificate: Certificate): Promise<Blob> {
    try {
      return certificateService.generatePDF(certificate.id);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      throw error;
    }
  }

  async generateBatchPDFs(certificates: Certificate[]): Promise<Blob[]> {
    return Promise.all(certificates.map((cert) => this.generatePDF(cert)));
  }

  async previewCertificate(
    params: Parameters<typeof certificateService.previewCertificate>[0]
  ): Promise<Blob> {
    return certificateService.previewCertificate(params);
  }
}

export const pdfGenerator = new PDFGeneratorService();
