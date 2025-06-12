export interface IssuedCertificate {
  id: string;
  templateId: string;
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  expiryDate?: string;
  status: "valid" | "expired" | "revoked";
  certificateNumber: string;
  metadata: {
    grade?: string;
    completionDate: string;
    issuedBy: string;
    signature: string;
  };
}

export const issuedCertificates: IssuedCertificate[] = [
  {
    id: "CERT001",
    templateId: "1",
    studentId: "STD001",
    studentName: "Kadek Ayu Putri",
    courseName: "English Intermediate Level",
    issueDate: "2025-05-15",
    expiryDate: "2027-05-15",
    status: "valid",
    certificateNumber: "SHINE-2025-001",
    metadata: {
      grade: "A",
      completionDate: "2025-05-15",
      issuedBy: "Mrs. Sarah Johnson",
      signature: "/signatures/sarah-johnson.png",
    },
  },
  {
    id: "CERT002",
    templateId: "2",
    studentId: "STD002",
    studentName: "I Made Wirawan",
    courseName: "Advanced Mathematics",
    issueDate: "2025-06-01",
    expiryDate: "2027-06-01",
    status: "valid",
    certificateNumber: "SHINE-2025-002",
    metadata: {
      grade: "A+",
      completionDate: "2025-06-01",
      issuedBy: "Mr. John Smith",
      signature: "/signatures/john-smith.png",
    },
  },
  {
    id: "CERT003",
    templateId: "3",
    studentId: "STD003",
    studentName: "Ni Putu Devi",
    courseName: "Basic Programming",
    issueDate: "2025-04-20",
    status: "valid",
    certificateNumber: "SHINE-2025-003",
    metadata: {
      grade: "B+",
      completionDate: "2025-04-20",
      issuedBy: "Mr. David Wilson",
      signature: "/signatures/david-wilson.png",
    },
  },
];
