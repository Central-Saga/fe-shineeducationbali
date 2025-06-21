import { CertificateHistory } from "@/types/certificate";

export const certificateRecords: CertificateHistory[] = [
  {
    id: "HIST001",
    certificateId: "CERT001",
    studentName: "Kadek Ayu Putri",
    type: "COURSE_COMPLETION",
    issueDate: "2025-05-15",
    issuedBy: "Admin Utama",
    status: "success",
  },
  {
    id: "HIST002",
    certificateId: "CERT002",
    studentName: "I Made Wirawan",
    type: "ACHIEVEMENT",
    issueDate: "2025-06-01",
    issuedBy: "Admin Sertifikat",
    status: "success",
  },
  {
    id: "HIST003",
    certificateId: "CERT003",
    studentName: "Ni Putu Devi",
    type: "COURSE_COMPLETION",
    issueDate: "2025-04-20",
    issuedBy: "Admin Utama",
    status: "success",
  },
];
