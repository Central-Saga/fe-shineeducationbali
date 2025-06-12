export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  html: string;
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

export const certificateTemplates: CertificateTemplate[] = [
  {
    id: "1",
    name: "Basic Completion Certificate",
    description: "A simple certificate of completion template",
    thumbnail: "/certificates/basic.png",
    html: `<div class="certificate basic">Certificate content here</div>`,
    status: "active",
    createdAt: "2025-01-01",
    lastModified: "2025-06-01",
    usageCount: 156,
    metadata: {
      dimensions: { width: 800, height: 600 },
      placeholders: [
        "{student_name}",
        "{course_name}",
        "{completion_date}",
        "{certificate_id}",
      ],
    },
  },
  {
    id: "2",
    name: "Advanced Achievement Certificate",
    description: "Professional certificate with advanced design",
    thumbnail: "/certificates/advanced.png",
    html: `<div class="certificate advanced">Certificate content here</div>`,
    status: "active",
    createdAt: "2025-02-15",
    lastModified: "2025-06-05",
    usageCount: 89,
    metadata: {
      dimensions: { width: 900, height: 600 },
      placeholders: [
        "{student_name}",
        "{course_name}",
        "{completion_date}",
        "{certificate_id}",
        "{grade}",
        "{instructor_name}",
      ],
      fonts: ["Montserrat", "Playfair Display"],
      background: "/certificates/backgrounds/advanced.png",
    },
  },
  {
    id: "3",
    name: "Professional Training Certificate",
    description: "Corporate style certificate template",
    thumbnail: "/certificates/professional.png",
    html: `<div class="certificate professional">Certificate content here</div>`,
    status: "draft",
    createdAt: "2025-06-01",
    lastModified: "2025-06-08",
    usageCount: 0,
    metadata: {
      dimensions: { width: 1000, height: 700 },
      placeholders: [
        "{participant_name}",
        "{training_program}",
        "{completion_date}",
        "{certificate_id}",
        "{hours_completed}",
        "{trainer_name}",
        "{company_name}",
      ],
      fonts: ["Roboto", "Lato"],
      background: "/certificates/backgrounds/professional.png",
    },
  },
];
