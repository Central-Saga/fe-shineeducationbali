export interface Program {
  id: string;
  title: string;
  description: string;
  level: string; // e.g. "SD", "SMP", "SMA", "UMUM"
  image?: string;
  status: "ACTIVE" | "INACTIVE";
  courses: string[]; // course IDs or names
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  student_count: number;
  teacher_count: number;
  // Tambahan atribut lain sesuai kebutuhan workflow
}
