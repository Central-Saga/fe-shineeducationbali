export interface Program {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  level: 'beginner' | 'intermediate' | 'advanced';
  educationLevel: 'SD' | 'SMP' | 'SMA/SMK' | 'UMUM';
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const programsData: Program[] = [
  {
    id: "1",
    name: "Bahasa Inggris Dasar",
    description: "Program pembelajaran bahasa Inggris untuk pemula dengan fokus pada grammar dan vocabulary dasar",
    duration: 12,
    level: "beginner",
    educationLevel: "UMUM",
    category: "Bahasa",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "2", 
    name: "Matematika Dasar",
    description: "Program pembelajaran matematika dasar untuk siswa SD dan SMP",
    duration: 16,
    level: "beginner",
    educationLevel: "SD",
    category: "Matematika",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "3",
    name: "Calistung (Baca Tulis Hitung)",
    description: "Program pembelajaran dasar membaca, menulis, dan berhitung untuk anak usia dini",
    duration: 20,
    level: "beginner", 
    educationLevel: "SD",
    category: "Dasar",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "4",
    name: "Programming Dasar",
    description: "Program pembelajaran programming untuk pemula dengan bahasa Python",
    duration: 24,
    level: "beginner",
    educationLevel: "SMA/SMK",
    category: "Teknologi",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "5",
    name: "Matematika Lanjutan",
    description: "Program matematika untuk siswa SMP dengan materi aljabar dan geometri",
    duration: 18,
    level: "intermediate",
    educationLevel: "SMP",
    category: "Matematika",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "6",
    name: "Bahasa Inggris Menengah",
    description: "Program bahasa Inggris untuk level menengah dengan fokus pada conversation",
    duration: 14,
    level: "intermediate",
    educationLevel: "SMA/SMK",
    category: "Bahasa",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  }
];

