export interface CatalogProgram {
  id: string;
  title: string;
  description: string;
  level: string;
  image: string;
  status: "ACTIVE" | "INACTIVE";
  programs: string[];
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  student_count: number;
  teacher_count: number;
}

export const catalogProgramsData: CatalogProgram[] = [
  {
    id: "1",
    title: "English Learning Program",
    description: "Program bahasa Inggris untuk semua jenjang.",
    level: "UMUM",
    image: "/picprogram/bahasainggris.png",
    status: "ACTIVE",
    programs: [
      "Basic English",
      "Intermediate English",
      "Advanced English",
    ],
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    created_at: "2024-07-01",
    updated_at: "2024-07-02",
    student_count: 120,
    teacher_count: 5,
  },
  {
    id: "2",
    title: "Mathematics Excellence Program",
    description: "Program Matematika untuk SD-SMP.",
    level: "SD/SMP",
    image: "/picprogram/matematika.png",
    status: "ACTIVE",
    programs: ["Matematika Dasar", "Matematika Lanjutan"],
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    created_at: "2024-07-01",
    updated_at: "2024-07-02",
    student_count: 80,
    teacher_count: 3,
  },
  {
    id: "3",
    title: "Science Discovery Program",
    description: "Program sains untuk anak-anak.",
    level: "SD",
    image: "/picprogram/science.png",
    status: "INACTIVE",
    programs: ["Science Basic"],
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    created_at: "2024-07-01",
    updated_at: "2024-07-02",
    student_count: 30,
    teacher_count: 2,
  },
  {
    id: "4",
    title: "Coding for Kids Program",
    description: "Program pembelajaran coding untuk anak-anak usia 8-15 tahun.",
    level: "SD/SMP",
    image: "/picprogram/coding.png",
    status: "ACTIVE",
    programs: [
      "Scratch Programming",
      "Python Basics",
      "Web Development",
    ],
    start_date: "2025-02-01",
    end_date: "2025-11-30",
    created_at: "2024-08-01",
    updated_at: "2024-08-02",
    student_count: 95,
    teacher_count: 4,
  },
  {
    id: "5",
    title: "Calistung Program",
    description: "Program membaca, menulis, dan berhitung untuk anak usia dini.",
    level: "TK",
    image: "/picprogram/calistung.png",
    status: "ACTIVE",
    programs: [
      "Membaca Dasar",
      "Menulis Dasar",
      "Berhitung Dasar",
    ],
    start_date: "2025-01-15",
    end_date: "2025-12-15",
    created_at: "2024-09-01",
    updated_at: "2024-09-02",
    student_count: 65,
    teacher_count: 3,
  },
  {
    id: "6",
    title: "Art & Creativity Program",
    description: "Program seni dan kreativitas untuk mengembangkan bakat anak.",
    level: "UMUM",
    image: "/picprogram/art.png",
    status: "ACTIVE",
    programs: [
      "Drawing & Painting",
      "Craft Making",
      "Digital Art",
    ],
    start_date: "2025-03-01",
    end_date: "2025-10-31",
    created_at: "2024-10-01",
    updated_at: "2024-10-02",
    student_count: 45,
    teacher_count: 2,
  },
];
