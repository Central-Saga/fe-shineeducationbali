export type CertificateTemplateStatus = "active" | "draft" | "archived";

export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  courseType: "ENGLISH" | "COMPUTER" | "CODING";
  status: CertificateTemplateStatus;
  thumbnail: string;
  templateUrl: string;
  usageCount: number;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  updatedAt: string;
  updatedBy: {
    id: string;
    name: string;
    role: string;
  };
}
