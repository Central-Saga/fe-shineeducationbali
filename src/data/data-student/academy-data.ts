export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  progress: number;
  image: string;
  totalLessons: number;
  completedLessons: number;
  instructor: string;
  instructorAvatar?: string;
  status: 'enrolled' | 'completed' | 'not-started';
}

export const studentCourses: Course[] = [
  {
    id: '1',
    title: 'Matematika Dasar',
    category: 'Matematika',
    description: 'Pengenalan konsep dasar matematika untuk tingkat sekolah dasar.',
    progress: 75,
    image: '/picprogram/matematika.png',
    totalLessons: 12,
    completedLessons: 9,
    instructor: 'Budi Santoso',
    status: 'enrolled'
  },
  {
    id: '2',
    title: 'Bahasa Inggris Pemula',
    category: 'Bahasa Inggris',
    description: 'Belajar dasar-dasar bahasa Inggris untuk percakapan sehari-hari.',
    progress: 40,
    image: '/picprogram/bahasainggris.png',
    totalLessons: 15,
    completedLessons: 6,
    instructor: 'Sarah Johnson',
    status: 'enrolled'
  },
  {
    id: '3',
    title: 'Ilmu Pengetahuan Alam',
    category: 'IPA',
    description: 'Pengenalan konsep dasar ilmu alam dan lingkungan sekitar.',
    progress: 90,
    image: '/public/backgrounds/wave-header.svg',
    totalLessons: 10,
    completedLessons: 9,
    instructor: 'Dewi Sartika',
    status: 'enrolled'
  },
  {
    id: '4',
    title: 'Coding untuk Pemula',
    category: 'Teknologi',
    description: 'Belajar dasar-dasar coding dan pemrograman untuk pemula.',
    progress: 20,
    image: '/picprogram/coding.png',
    totalLessons: 20,
    completedLessons: 4,
    instructor: 'Andi Wijaya',
    status: 'enrolled'
  },
  {
    id: '5',
    title: 'Calistung',
    category: 'Dasar',
    description: 'Belajar membaca, menulis, dan berhitung untuk usia dini.',
    progress: 60,
    image: '/picprogram/calistung.png',
    totalLessons: 8,
    completedLessons: 5,
    instructor: 'Nina Hartati',
    status: 'enrolled'
  },
];

export const popularCourses: Course[] = [
  {
    id: '6',
    title: 'Matematika Lanjutan',
    category: 'Matematika',
    description: 'Pembelajaran matematika tingkat lanjut untuk persiapan ujian.',
    progress: 0,
    image: '/picprogram/matematika.png',
    totalLessons: 15,
    completedLessons: 0,
    instructor: 'Dr. Ahmad Wijaya',
    status: 'not-started'
  },
  {
    id: '7',
    title: 'English for Business',
    category: 'Bahasa Inggris',
    description: 'Kursus bahasa Inggris untuk komunikasi bisnis profesional.',
    progress: 0,
    image: '/picprogram/bahasainggris.png',
    totalLessons: 12,
    completedLessons: 0,
    instructor: 'Emma Thompson',
    status: 'not-started'
  },
  {
    id: '8',
    title: 'Pengenalan Robotika',
    category: 'Teknologi',
    description: 'Belajar dasar-dasar robotika dan elektronika sederhana.',
    progress: 0,
    image: '/picprogram/coding.png',
    totalLessons: 18,
    completedLessons: 0,
    instructor: 'Rudi Teknologi',
    status: 'not-started'
  }
];
