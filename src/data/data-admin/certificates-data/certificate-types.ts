import { EducationLevel } from "@/types/student";

export type CourseType = "ENGLISH" | "COMPUTER" | "CODING";

export interface CertificateType {
  id: string;
  name: string;
  courseType: CourseType;
  description: string;
  levels: EducationLevel[]; // SD, SMP, SMA yang dapat mengambil kursus ini
  templateId: string;
  validityPeriod: number; // in months
  metadata: {
    requiredFields: string[];
    allowsExpiry: boolean;
    requiresSignature: boolean;
    requiresGrade: boolean;
  };
}

export const certificateTypes: CertificateType[] = [
  // Sertifikat Kursus Bahasa Inggris
  {
    id: "CERT_ENGLISH_BASIC",
    name: "Sertifikat Kursus Bahasa Inggris - Basic",
    courseType: "ENGLISH",
    description: "Sertifikat penyelesaian kursus Bahasa Inggris tingkat dasar",
    levels: ["SD", "SMP", "SMA"],
    templateId: "tpl-english-basic",
    validityPeriod: 24, // 2 years
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "course_level",
        "completion_date",
        "certificate_id",
        "grade",
        "hours_completed",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: true,
    },
  },
  {
    id: "CERT_ENGLISH_INTERMEDIATE",
    name: "Sertifikat Kursus Bahasa Inggris - Intermediate",
    courseType: "ENGLISH",
    description: "Sertifikat penyelesaian kursus Bahasa Inggris tingkat menengah",
    levels: ["SMP", "SMA"],
    templateId: "tpl-english-intermediate",
    validityPeriod: 24,
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "course_level",
        "completion_date",
        "certificate_id",
        "grade",
        "hours_completed",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: true,
    },
  },
  {
    id: "CERT_ENGLISH_ADVANCED",
    name: "Sertifikat Kursus Bahasa Inggris - Advanced",
    courseType: "ENGLISH",
    description: "Sertifikat penyelesaian kursus Bahasa Inggris tingkat lanjut",
    levels: ["SMA"],
    templateId: "tpl-english-advanced",
    validityPeriod: 24,
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "course_level",
        "completion_date",
        "certificate_id",
        "grade",
        "hours_completed",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: true,
    },
  },

  // Sertifikat Kursus Komputer
  {
    id: "CERT_COMPUTER_BASIC",
    name: "Sertifikat Kursus Komputer - Basic",
    courseType: "COMPUTER",
    description: "Sertifikat penyelesaian kursus Komputer tingkat dasar",
    levels: ["SD", "SMP", "SMA"],
    templateId: "tpl-computer-basic",
    validityPeriod: 24,
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "course_level",
        "completion_date",
        "certificate_id",
        "grade",
        "skills_mastered",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: true,
    },
  },
  {
    id: "CERT_COMPUTER_INTERMEDIATE",
    name: "Sertifikat Kursus Komputer - Intermediate",
    courseType: "COMPUTER",
    description: "Sertifikat penyelesaian kursus Komputer tingkat menengah",
    levels: ["SMP", "SMA"],
    templateId: "tpl-computer-intermediate",
    validityPeriod: 24,
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "course_level",
        "completion_date",
        "certificate_id",
        "grade",
        "skills_mastered",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: true,
    },
  },
  {
    id: "CERT_COMPUTER_ADVANCED",
    name: "Sertifikat Kursus Komputer - Advanced",
    courseType: "COMPUTER",
    description: "Sertifikat penyelesaian kursus Komputer tingkat lanjut",
    levels: ["SMA"],
    templateId: "tpl-computer-advanced",
    validityPeriod: 24,
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "course_level",
        "completion_date",
        "certificate_id",
        "grade",
        "skills_mastered",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: true,
    },
  },

  // Sertifikat Kursus Matematika
  {
    id: "CERT_MATH_BASIC",
    name: "Sertifikat Kursus Matematika - Basic",
    courseType: "CODING",
    description: "Sertifikat penyelesaian kursus Matematika tingkat dasar",
    levels: ["SD", "SMP", "SMA"],
    templateId: "tpl-math-basic",
    validityPeriod: 24,
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "course_level",
        "completion_date",
        "certificate_id",
        "grade",
        "topics_mastered",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: true,
    },
  },
  {
    id: "CERT_MATH_INTERMEDIATE",
    name: "Sertifikat Kursus Matematika - Intermediate",
    courseType: "CODING",
    description: "Sertifikat penyelesaian kursus Matematika tingkat menengah",
    levels: ["SMP", "SMA"],
    templateId: "tpl-math-intermediate",
    validityPeriod: 24,
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "course_level",
        "completion_date",
        "certificate_id",
        "grade",
        "topics_mastered",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: true,
    },
  },
  {
    id: "CERT_MATH_ADVANCED",
    name: "Sertifikat Kursus Matematika - Advanced",
    courseType: "CODING",
    description: "Sertifikat penyelesaian kursus Matematika tingkat lanjut",
    levels: ["SMA"],
    templateId: "tpl-math-advanced",
    validityPeriod: 24,
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "course_level",
        "completion_date",
        "certificate_id",
        "grade",
        "topics_mastered",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: true,
    },
  },

  // Sertifikat Prestasi
  {
    id: "CERT_ACHIEVEMENT",
    name: "Sertifikat Prestasi",
    courseType: "COMPUTER",
    description: "Sertifikat untuk pencapaian atau prestasi khusus",
    levels: ["SD", "SMP", "SMA"],
    templateId: "tpl-achievement",
    validityPeriod: 0, // tidak ada kadaluarsa
    metadata: {
      requiredFields: [
        "student_name",
        "education_level",
        "achievement_type",
        "achievement_date",
        "certificate_id",
        "achievement_details",
      ],
      allowsExpiry: false,
      requiresSignature: true,
      requiresGrade: false,
    },
  },
];
