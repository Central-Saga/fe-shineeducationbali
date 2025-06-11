export type CertificateStatus = "issued" | "draft" | "pending";
export type CertificateType = "course" | "achievement" | "completion";

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  certificateNumber: string;
  status: CertificateStatus;
  grade: string;
  teacherName: string;
  validUntil?: string;
  type: CertificateType;
  signedBy: string;
  metadata?: Record<string, any>; // Adding metadata property
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  html: string; // The HTML template with placeholders
  previewImageUrl: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "draft" | "archived";
  metadata: {
    placeholders: string[]; // Available placeholders in the template
    dimensions: {
      width: number;
      height: number;
    };
  };
}

export interface CertificateBatchRequest {
  templateId: string;
  students: {
    studentId: string;
    metadata: Certificate["metadata"];
  }[];
  type: Certificate["type"];
  signedBy: Certificate["signedBy"];
  achievementDate: string;
}
