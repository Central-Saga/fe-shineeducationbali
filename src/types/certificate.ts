export type CertificateStatus = "issued" | "draft" | "pending";
export type CertificateType =
  | "COURSE_COMPLETION"
  | "ACHIEVEMENT"
  | "PARTICIPATION";

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
  previewUrl?: string;
  recipientName?: string; // For displaying recipient name differently from studentName if needed
  metadata?: Record<string, any>;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  html: string;
  thumbnail: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
  lastModified: string;
  usageCount: number;
  metadata: {
    dimensions: {
      width: number;
      height: number;
    };
    placeholders: string[];
    fonts?: string[];
    background?: string;
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
