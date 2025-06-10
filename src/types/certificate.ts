export interface Certificate {
  id: string;
  studentId: string;
  recipientName: string; // Added recipient name
  title: string;
  description: string;
  previewUrl: string; // Added preview URL
  achievementDate: string;
  issueDate: string;
  validUntil?: string;
  status: "issued" | "draft" | "pending"; // Added status property
  type: "COURSE_COMPLETION" | "ACHIEVEMENT" | "PARTICIPATION";
  metadata: {
    courseId?: string;
    courseName?: string;
    grade?: string;
    achievementDetails?: string;
  };
  signedBy: {
    name: string;
    position: string;
    signature: string;
  };
  templateId: string;
  createdAt: string;
  updatedAt: string;
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
