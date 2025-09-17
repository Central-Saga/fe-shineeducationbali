export interface CertificateCategory {
  id: string;
  name: string;
  description: string;
  defaultTemplate?: string; // templateId
  validityPeriod?: number; // in months, if applicable
  metadata: {
    requiredFields: string[];
    allowsExpiry: boolean;
    requiresSignature: boolean;
    requiresGrade: boolean;
  };
}

export const certificateCategories: CertificateCategory[] = [
  {
    id: "CAT001",
    name: "Course Completion",
    description: "Basic certificate for completing a course",
    defaultTemplate: "1",
    metadata: {
      requiredFields: [
        "student_name",
        "course_name",
        "completion_date",
        "certificate_id",
      ],
      allowsExpiry: false,
      requiresSignature: true,
      requiresGrade: false,
    },
  },
  {
    id: "CAT002",
    name: "Achievement Certificate",
    description: "Certificate for outstanding achievement in a course",
    defaultTemplate: "2",
    metadata: {
      requiredFields: [
        "student_name",
        "course_name",
        "completion_date",
        "certificate_id",
        "grade",
      ],
      allowsExpiry: false,
      requiresSignature: true,
      requiresGrade: true,
    },
  },
  {
    id: "CAT003",
    name: "Professional Training",
    description: "Certificate for professional development courses",
    defaultTemplate: "3",
    validityPeriod: 24,
    metadata: {
      requiredFields: [
        "participant_name",
        "training_program",
        "completion_date",
        "certificate_id",
        "hours_completed",
      ],
      allowsExpiry: true,
      requiresSignature: true,
      requiresGrade: false,
    },
  },
];
