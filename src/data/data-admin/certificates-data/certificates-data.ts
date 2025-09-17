import { Certificate } from "@/types/certificate";

export const certificatesData: Certificate[] = [
  {
    id: "CERT0001",
    studentId: "SSW0001081",
    studentName: "Kadek Ayu Putri",
    courseId: "CRS001",
    courseName: "Bahasa Inggris Level Intermediate",
    issueDate: "2025-05-15",
    certificateNumber: "SE/2025/001",
    status: "issued",
    grade: "A",
    teacherName: "Ni Kadek Dewi",
    validUntil: "2027-05-15",
    type: "COURSE_COMPLETION",
    signedBy: "Dr. I Made Sudiana, M.Pd",
    previewUrl: "/certificates/preview/CERT0001.pdf",
    recipientName: "Kadek Ayu Putri",
    metadata: {
      achievementDetails: "Completed with Excellence",
      score: 92
    }
  },
  {
    id: "CERT0002", 
    studentId: "SSW0001082",
    studentName: "I Made Wirawan",
    courseId: "CRS002",
    courseName: "Matematika Advanced",
    issueDate: "2025-04-20",
    certificateNumber: "SE/2025/002",
    status: "issued",
    grade: "A-",
    teacherName: "I Made Wijaya",
    validUntil: "2027-04-20",
    type: "ACHIEVEMENT",
    signedBy: "Dr. I Made Sudiana, M.Pd",
    previewUrl: "/certificates/preview/CERT0002.pdf",
    metadata: {
      achievementDetails: "Mathematics Competition Winner",
      rank: 1
    }
  },
  {
    id: "CERT0003",
    studentId: "SSW0001083",
    studentName: "Ni Putu Devi",
    courseId: "CRS003",
    courseName: "Computer Science Basic",
    issueDate: "2025-06-01",
    certificateNumber: "SE/2025/003",
    status: "pending",
    grade: "B+",
    teacherName: "I Putu Surya",
    validUntil: "2027-06-01",
    type: "PARTICIPATION",
    signedBy: "Dr. I Made Sudiana, M.Pd",
    previewUrl: "/certificates/preview/CERT0003.pdf",
    metadata: {
      eventName: "Coding Workshop 2025",
      duration: "40 hours"
    }
  }
];