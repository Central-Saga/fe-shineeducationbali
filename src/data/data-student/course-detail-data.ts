import { Course } from "./academy-data";

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: 'video' | 'quiz' | 'assignment' | 'reading';
  status: 'completed' | 'in-progress' | 'not-started';
  videoUrl?: string;
  materialUrl?: string;
  quizCount?: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
  totalDuration: number;
  completedLessons: number;
}

export interface CourseDetailData extends Course {
  objectives: string[];
  prerequisites: string[];
  modules: CourseModule[];
  instructorBio: string;
  instructorExperience: string;
  reviews: {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
    avatar?: string;
  }[];
  averageRating: number;
  totalRatings: number;
  totalStudents: number;
  lastUpdated: string;
  certificateAvailable: boolean;
  currentLessonUrl?: string;
  firstLessonId?: string;
  materialsUrl?: string;
}

export const courseDetailData: CourseDetailData[] = [
  {
    id: '1',
    title: 'Matematika Dasar',
    category: 'Matematika',
    description: 'Pengenalan konsep dasar matematika untuk tingkat sekolah dasar. Kursus ini dirancang untuk membantu siswa memahami konsep-konsep matematika fundamental dengan cara yang interaktif dan menyenangkan.',
    progress: 75,
    image: '/picprogram/matematika.png',
    totalLessons: 12,
    completedLessons: 9,
    instructor: 'Budi Santoso',
    status: 'enrolled',
    objectives: [
      'Memahami konsep dasar penjumlahan, pengurangan, perkalian, dan pembagian',
      'Mengenal pecahan dan desimal',
      'Menyelesaikan soal matematika sederhana',
      'Mengembangkan keterampilan berpikir logis',
      'Mengaplikasikan konsep matematika dalam kehidupan sehari-hari'
    ],
    prerequisites: [
      'Tidak ada prasyarat khusus',
      'Kemampuan membaca dan menulis angka'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Pengenalan Angka dan Operasi Dasar',
        description: 'Memahami konsep angka dan operasi matematika dasar',
        order: 1,
        totalDuration: 120,
        completedLessons: 5,
        lessons: [
          {
            id: 'l1',
            title: 'Pengenalan Angka 1-100',
            description: 'Belajar mengenal dan menulis angka dari 1 hingga 100',
            duration: 15,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/matematika/pengenalan-angka.mp4'
          },
          {
            id: 'l2',
            title: 'Penjumlahan Dasar',
            description: 'Belajar konsep penjumlahan dengan angka 1-10',
            duration: 20,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/matematika/penjumlahan-dasar.mp4'
          },
          {
            id: 'l3',
            title: 'Pengurangan Dasar',
            description: 'Belajar konsep pengurangan dengan angka 1-10',
            duration: 20,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/matematika/pengurangan-dasar.mp4'
          },
          {
            id: 'l4',
            title: 'Latihan Penjumlahan dan Pengurangan',
            description: 'Latihan soal penjumlahan dan pengurangan sederhana',
            duration: 15,
            type: 'quiz',
            status: 'completed',
            quizCount: 10
          },
          {
            id: 'l5',
            title: 'Penjumlahan dan Pengurangan Lanjutan',
            description: 'Belajar penjumlahan dan pengurangan dengan angka yang lebih besar',
            duration: 25,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/matematika/penjumlahan-pengurangan-lanjutan.mp4'
          },
          {
            id: 'l6',
            title: 'Tugas Penerapan',
            description: 'Tugas untuk menerapkan konsep penjumlahan dan pengurangan dalam kehidupan sehari-hari',
            duration: 25,
            type: 'assignment',
            status: 'in-progress'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Perkalian dan Pembagian',
        description: 'Memahami konsep perkalian dan pembagian dasar',
        order: 2,
        totalDuration: 150,
        completedLessons: 4,
        lessons: [
          {
            id: 'l7',
            title: 'Pengenalan Perkalian',
            description: 'Belajar konsep perkalian sebagai penjumlahan berulang',
            duration: 25,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/matematika/pengenalan-perkalian.mp4'
          },
          {
            id: 'l8',
            title: 'Tabel Perkalian 1-10',
            description: 'Menghafal dan memahami tabel perkalian 1 sampai 10',
            duration: 30,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/matematika/tabel-perkalian.mp4'
          },
          {
            id: 'l9',
            title: 'Latihan Perkalian',
            description: 'Latihan soal perkalian sederhana',
            duration: 20,
            type: 'quiz',
            status: 'completed',
            quizCount: 15
          },
          {
            id: 'l10',
            title: 'Pengenalan Pembagian',
            description: 'Belajar konsep pembagian sebagai kebalikan dari perkalian',
            duration: 25,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/matematika/pengenalan-pembagian.mp4'
          },
          {
            id: 'l11',
            title: 'Latihan Pembagian',
            description: 'Latihan soal pembagian sederhana',
            duration: 20,
            type: 'quiz',
            status: 'not-started',
            quizCount: 10
          },
          {
            id: 'l12',
            title: 'Penerapan Perkalian dan Pembagian',
            description: 'Tugas untuk menerapkan perkalian dan pembagian dalam masalah sehari-hari',
            duration: 30,
            type: 'assignment',
            status: 'not-started'
          }
        ]
      },
      {
        id: 'm3',
        title: 'Pecahan dan Desimal',
        description: 'Pengenalan konsep pecahan dan angka desimal',
        order: 3,
        totalDuration: 180,
        completedLessons: 0,
        lessons: [
          {
            id: 'l13',
            title: 'Pengenalan Pecahan',
            description: 'Memahami konsep pecahan sebagai bagian dari keseluruhan',
            duration: 30,
            type: 'video',
            status: 'not-started',
            videoUrl: '/videos/matematika/pengenalan-pecahan.mp4'
          },
          {
            id: 'l14',
            title: 'Penjumlahan dan Pengurangan Pecahan',
            description: 'Belajar cara menjumlahkan dan mengurangkan pecahan',
            duration: 35,
            type: 'video',
            status: 'not-started',
            videoUrl: '/videos/matematika/operasi-pecahan.mp4'
          },
          {
            id: 'l15',
            title: 'Latihan Pecahan',
            description: 'Latihan soal operasi pecahan',
            duration: 25,
            type: 'quiz',
            status: 'not-started',
            quizCount: 10
          },
          {
            id: 'l16',
            title: 'Pengenalan Desimal',
            description: 'Memahami konsep angka desimal dan hubungannya dengan pecahan',
            duration: 30,
            type: 'video',
            status: 'not-started',
            videoUrl: '/videos/matematika/pengenalan-desimal.mp4'
          },
          {
            id: 'l17',
            title: 'Operasi Desimal',
            description: 'Belajar operasi penjumlahan, pengurangan, perkalian, dan pembagian dengan desimal',
            duration: 35,
            type: 'video',
            status: 'not-started',
            videoUrl: '/videos/matematika/operasi-desimal.mp4'
          },
          {
            id: 'l18',
            title: 'Latihan Desimal',
            description: 'Latihan soal operasi dengan angka desimal',
            duration: 25,
            type: 'quiz',
            status: 'not-started',
            quizCount: 10
          }
        ]
      }
    ],
    instructorBio: 'Budi Santoso adalah seorang guru matematika berpengalaman dengan lebih dari 10 tahun mengajar di tingkat sekolah dasar. Beliau memiliki pendekatan yang menyenangkan dan interaktif dalam mengajar matematika.',
    instructorExperience: 'S2 Pendidikan Matematika dari Universitas Indonesia, Pengalaman mengajar di 5 sekolah dasar terkemuka, Penulis 3 buku matematika untuk anak-anak',
    reviews: [
      {
        id: 'r1',
        user: 'Diana Putri',
        rating: 5,
        comment: 'Kursus yang sangat bagus untuk anak-anak! Penjelasannya jelas dan mudah dipahami.',
        date: '2025-06-15'
      },
      {
        id: 'r2',
        user: 'Ahmad Rizal',
        rating: 4,
        comment: 'Anak saya jadi lebih suka matematika setelah mengikuti kursus ini. Materinya menarik dengan contoh-contoh yang relevan.',
        date: '2025-06-10'
      },
      {
        id: 'r3',
        user: 'Siti Nurhaliza',
        rating: 5,
        comment: 'Pak Budi menjelaskan dengan sangat baik dan sabar. Highly recommended!',
        date: '2025-06-05'
      }
    ],
    averageRating: 4.7,
    totalRatings: 45,
    totalStudents: 128,
    lastUpdated: '2025-06-01',
    certificateAvailable: true,
    currentLessonUrl: '/videos/matematika/pengenalan-angka.mp4',
    firstLessonId: 'l1',
    materialsUrl: '/materials/matematika/'
  },
  {
    id: '2',
    title: 'Bahasa Inggris Pemula',
    category: 'Bahasa Inggris',
    description: 'Belajar dasar-dasar bahasa Inggris untuk percakapan sehari-hari. Kursus ini akan membantu Anda membangun fondasi yang kuat dalam pemahaman dan penggunaan bahasa Inggris.',
    progress: 40,
    image: '/picprogram/bahasainggris.png',
    totalLessons: 15,
    completedLessons: 6,
    instructor: 'Sarah Johnson',
    status: 'enrolled',
    objectives: [
      'Memahami dasar-dasar tata bahasa Inggris',
      'Membangun kosakata untuk percakapan sehari-hari',
      'Mengembangkan kemampuan mendengarkan dan berbicara',
      'Memahami frasa dan ungkapan umum dalam bahasa Inggris',
      'Berkomunikasi dalam situasi sehari-hari menggunakan bahasa Inggris'
    ],
    prerequisites: [
      'Tidak ada prasyarat khusus',
      'Kemampuan membaca dan menulis'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Perkenalan dan Salam',
        description: 'Belajar cara memperkenalkan diri dan salam dalam bahasa Inggris',
        order: 1,
        totalDuration: 90,
        completedLessons: 4,
        lessons: [
          {
            id: 'l1',
            title: 'Salam dan Perkenalan',
            description: 'Belajar ungkapan untuk menyapa dan memperkenalkan diri',
            duration: 20,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/english/greetings-introductions.mp4'
          },
          {
            id: 'l2',
            title: 'Alfabet dan Pengucapan',
            description: 'Mempelajari alfabet bahasa Inggris dan cara pengucapannya',
            duration: 15,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/english/alphabet-pronunciation.mp4'
          },
          {
            id: 'l3',
            title: 'Percakapan Dasar',
            description: 'Praktik percakapan dasar perkenalan',
            duration: 25,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/english/basic-conversations.mp4'
          },
          {
            id: 'l4',
            title: 'Latihan Perkenalan',
            description: 'Latihan untuk memperkenalkan diri dalam bahasa Inggris',
            duration: 15,
            type: 'quiz',
            status: 'completed',
            quizCount: 8
          },
          {
            id: 'l5',
            title: 'Tugas Rekaman',
            description: 'Merekam diri sendiri memperkenalkan diri dalam bahasa Inggris',
            duration: 15,
            type: 'assignment',
            status: 'not-started'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Kosakata Sehari-hari',
        description: 'Mempelajari kosakata untuk situasi sehari-hari',
        order: 2,
        totalDuration: 120,
        completedLessons: 2,
        lessons: [
          {
            id: 'l6',
            title: 'Angka dan Tanggal',
            description: 'Belajar angka, hari, bulan, dan cara menyatakan tanggal',
            duration: 25,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/english/numbers-dates.mp4'
          },
          {
            id: 'l7',
            title: 'Warna dan Bentuk',
            description: 'Belajar nama warna dan bentuk dalam bahasa Inggris',
            duration: 20,
            type: 'video',
            status: 'completed',
            videoUrl: '/videos/english/colors-shapes.mp4'
          },
          {
            id: 'l8',
            title: 'Anggota Keluarga',
            description: 'Belajar kosakata terkait anggota keluarga',
            duration: 20,
            type: 'video',
            status: 'not-started',
            videoUrl: '/videos/english/family-members.mp4'
          },
          {
            id: 'l9',
            title: 'Benda-benda di Rumah',
            description: 'Belajar nama benda-benda yang ada di rumah',
            duration: 25,
            type: 'video',
            status: 'not-started',
            videoUrl: '/videos/english/household-items.mp4'
          },
          {
            id: 'l10',
            title: 'Latihan Kosakata',
            description: 'Latihan untuk mengingat kosakata yang sudah dipelajari',
            duration: 30,
            type: 'quiz',
            status: 'not-started',
            quizCount: 20
          }
        ]
      },
      {
        id: 'm3',
        title: 'Tata Bahasa Dasar',
        description: 'Mempelajari tata bahasa dasar dalam bahasa Inggris',
        order: 3,
        totalDuration: 150,
        completedLessons: 0,
        lessons: [
          {
            id: 'l11',
            title: 'To Be (am, is, are)',
            description: 'Mempelajari penggunaan to be dalam kalimat',
            duration: 30,
            type: 'video',
            status: 'not-started',
            videoUrl: '/videos/english/to-be-verbs.mp4'
          },
          {
            id: 'l12',
            title: 'Simple Present Tense',
            description: 'Belajar simple present tense dan penggunaannya',
            duration: 35,
            type: 'video',
            status: 'not-started',
            videoUrl: '/videos/english/simple-present.mp4'
          },
          {
            id: 'l13',
            title: 'Latihan Simple Present',
            description: 'Latihan membuat kalimat simple present',
            duration: 25,
            type: 'quiz',
            status: 'not-started',
            quizCount: 15
          },
          {
            id: 'l14',
            title: 'Present Continuous',
            description: 'Belajar present continuous tense dan penggunaannya',
            duration: 30,
            type: 'video',
            status: 'not-started',
            videoUrl: '/videos/english/present-continuous.mp4'
          },
          {
            id: 'l15',
            title: 'Tugas Akhir',
            description: 'Menulis paragraf pendek tentang aktivitas sehari-hari',
            duration: 30,
            type: 'assignment',
            status: 'not-started'
          }
        ]
      }
    ],
    instructorBio: 'Sarah Johnson adalah seorang native speaker dari Amerika dengan pengalaman mengajar bahasa Inggris lebih dari 8 tahun. Beliau memiliki pendekatan yang komunikatif dan praktis dalam pengajaran bahasa.',
    instructorExperience: 'S2 Pengajaran Bahasa Inggris dari Harvard University, TEFL dan TESOL bersertifikat, Pengalaman mengajar di berbagai negara termasuk Jepang dan Indonesia',
    reviews: [
      {
        id: 'r1',
        user: 'Bambang Suryanto',
        rating: 5,
        comment: 'Kursus yang sangat bagus untuk pemula! Ms. Sarah mengajar dengan cara yang menyenangkan.',
        date: '2025-06-20'
      },
      {
        id: 'r2',
        user: 'Lina Wijaya',
        rating: 4,
        comment: 'Saya bisa belajar bahasa Inggris dengan lebih mudah melalui kursus ini. Sangat direkomendasikan!',
        date: '2025-06-12'
      },
      {
        id: 'r3',
        user: 'Rudi Hartono',
        rating: 5,
        comment: 'Kursus terbaik untuk pemula. Materinya disusun dengan sangat baik dan mudah diikuti.',
        date: '2025-06-08'
      }
    ],
    averageRating: 4.8,
    totalRatings: 56,
    totalStudents: 215,
    lastUpdated: '2025-06-10',
    certificateAvailable: true,
    currentLessonUrl: '/videos/english/greetings-introductions.mp4',
    firstLessonId: 'l1',
    materialsUrl: '/materials/english/'
  }
];

// Function to get course detail by ID
export const getCourseDetail = (id: string): CourseDetailData | undefined => {
  return courseDetailData.find(course => course.id === id);
};
