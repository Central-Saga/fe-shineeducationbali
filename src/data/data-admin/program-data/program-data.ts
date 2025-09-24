export interface Program {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  price: number;
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
    category: "Bahasa",
    price: 500000,
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
    category: "Matematika",
    price: 450000,
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
    category: "Dasar",
    price: 400000,
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
    category: "Teknologi",
    price: 750000,
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  }
];

