import { Catalog, Material } from '@/types/material';

// Sample materials for reuse
const sampleMaterials: Material[] = [
  {
    id: 'mat-001-01',
    title: 'Pengenalan Bahasa Inggris Dasar',
    description: 'Materi dasar tentang pengenalan bahasa Inggris untuk pemula',
    fileUrl: '/materials/english/basic-intro.pdf',
    fileType: 'pdf',
    uploadedBy: 'Sarah Johnson, M.Ed',
    uploadDate: '2025-06-15',
    thumbnailUrl: '/materials/thumbnails/english-basic-thumb.jpg',
    size: '2.4 MB',
    downloads: 45,
    isNew: true
  },
  {
    id: 'mat-001-02',
    title: 'Video: English Pronunciation',
    description: 'Tutorial video tentang pengucapan bahasa Inggris yang benar',
    fileUrl: '/materials/english/pronunciation-guide.mp4',
    fileType: 'video',
    uploadedBy: 'Sarah Johnson, M.Ed',
    uploadDate: '2025-06-17',
    thumbnailUrl: '/materials/thumbnails/pronunciation-thumb.jpg',
    duration: '15:20',
    downloads: 32
  },
  {
    id: 'mat-002-01',
    title: 'Pengenalan Matematika Dasar',
    description: 'Materi dasar tentang konsep matematika untuk tingkat dasar',
    fileUrl: '/materials/math/basic-math.pdf',
    fileType: 'pdf',
    uploadedBy: 'Budi Santoso, S.Pd',
    uploadDate: '2025-06-18',
    thumbnailUrl: '/materials/thumbnails/math-basic-thumb.jpg',
    size: '3.1 MB',
    downloads: 56
  },
  {
    id: 'mat-003-01',
    title: 'Fisika Dasar: Gerak dan Gaya',
    description: 'Penjelasan tentang konsep dasar gerak dan gaya dalam fisika',
    fileUrl: '/materials/physics/motion-force.pdf',
    fileType: 'pdf',
    uploadedBy: 'Dr. Ahmad Fauzi',
    uploadDate: '2025-06-20',
    thumbnailUrl: '/materials/thumbnails/physics-thumb.jpg',
    size: '4.2 MB',
    downloads: 38,
    isNew: true
  },
  {
    id: 'mat-004-01',
    title: 'Kimia: Tabel Periodik',
    description: 'Materi tentang tabel periodik unsur dan sifat-sifatnya',
    fileUrl: '/materials/chemistry/periodic-table.pdf',
    fileType: 'pdf',
    uploadedBy: 'Siti Aisyah, M.Pd',
    uploadDate: '2025-06-22',
    thumbnailUrl: '/materials/thumbnails/chemistry-thumb.jpg',
    size: '2.8 MB',
    downloads: 42
  }
];

// Catalog TK (Taman Kanak-kanak)
const catalogTK: Catalog = {
  id: 'catalog-tk',
  name: 'Catalog TK',
  level: 'TK',
  description: 'Program pembelajaran untuk anak usia dini',
  icon: '👶',
  programs: [
    {
      id: 'prog-tk-001',
      name: 'Calistung (Baca Tulis Hitung)',
      description: 'Program dasar untuk mengajarkan kemampuan membaca, menulis, dan berhitung pada anak usia dini',
      icon: '📚',
      progress: 45,
      duration: '6 bulan',
      startDate: '2025-07-01',
      endDate: '2025-12-31',
      instructor: 'Dewi Lestari, S.Pd',
      instructorAvatar: '/teachers/dewi-lestari.jpg',
      level: 'TK',
      materials: sampleMaterials.slice(0, 2),
      courses: [
        {
          id: 'course-tk-001',
          name: 'Mengenal Huruf dan Angka',
          description: 'Kursus dasar pengenalan huruf dan angka untuk anak usia dini',
          icon: '🔤',
          progress: 50,
          instructor: 'Dewi Lestari, S.Pd',
          instructorAvatar: '/teachers/dewi-lestari.jpg',
          level: 'TK',
          category: 'Calistung',
          subjects: [
            {
              id: 'subj-tk-001',
              name: 'Pengenalan Huruf',
              status: 'Aktif',
              icon: '🔤',
              progress: 60,
              description: 'Belajar mengenal huruf A-Z dengan cara menyenangkan',
              level: 'TK',
              category: 'Membaca',
              topics: [
                {
                  id: 1,
                  title: 'Huruf Vokal',
                  completed: 3,
                  totalMaterials: 5,
                  subtopics: [
                    {
                      id: 'tk-st-001',
                      title: 'Mengenal Huruf Vokal',
                      isCompleted: true,
                      materials: sampleMaterials.slice(0, 1)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Catalog SD (Sekolah Dasar)
const catalogSD: Catalog = {
  id: 'catalog-sd',
  name: 'Catalog SD',
  level: 'SD',
  description: 'Program pembelajaran untuk siswa tingkat Sekolah Dasar',
  icon: '🏫',
  programs: [
    {
      id: 'prog-sd-001',
      name: 'Matematika SD',
      description: 'Program matematika dasar untuk siswa SD',
      icon: '🔢',
      progress: 30,
      duration: '12 bulan',
      startDate: '2025-07-01',
      endDate: '2026-06-30',
      instructor: 'Budi Santoso, S.Pd',
      instructorAvatar: '/teachers/budi-santoso.jpg',
      level: 'SD',
      materials: sampleMaterials.slice(2, 3),
      courses: [
        {
          id: 'course-sd-001',
          name: 'Matematika Dasar',
          description: 'Kursus dasar matematika untuk siswa SD',
          icon: '➕',
          progress: 35,
          instructor: 'Budi Santoso, S.Pd',
          instructorAvatar: '/teachers/budi-santoso.jpg',
          level: 'SD',
          category: 'Matematika',
          subjects: [
            {
              id: 'subj-sd-001',
              name: 'Bilangan Bulat',
              status: 'Aktif',
              icon: '🔢',
              progress: 40,
              description: 'Belajar operasi dasar bilangan bulat',
              level: 'SD',
              category: 'Matematika',
              topics: [
                {
                  id: 1,
                  title: 'Penjumlahan dan Pengurangan',
                  completed: 2,
                  totalMaterials: 5,
                  subtopics: [
                    {
                      id: 'sd-st-001',
                      title: 'Penjumlahan Dasar',
                      isCompleted: true,
                      materials: sampleMaterials.slice(2, 3)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'prog-sd-002',
      name: 'Bahasa Inggris SD',
      description: 'Program pembelajaran bahasa Inggris untuk siswa SD',
      icon: '🔤',
      progress: 25,
      duration: '12 bulan',
      startDate: '2025-07-01',
      endDate: '2026-06-30',
      instructor: 'Sarah Johnson, M.Ed',
      instructorAvatar: '/teachers/sarah-johnson.jpg',
      level: 'SD',
      materials: sampleMaterials.slice(0, 2),
      courses: [
        {
          id: 'course-sd-002',
          name: 'English for Kids',
          description: 'Kursus bahasa Inggris dasar untuk anak-anak',
          icon: '🇬🇧',
          progress: 30,
          instructor: 'Sarah Johnson, M.Ed',
          instructorAvatar: '/teachers/sarah-johnson.jpg',
          level: 'SD',
          category: 'Bahasa Inggris',
          subjects: [
            {
              id: 'subj-sd-002',
              name: 'Vocabulary',
              status: 'Aktif',
              icon: '📝',
              progress: 35,
              description: 'Belajar kosakata dasar bahasa Inggris',
              level: 'SD',
              category: 'Bahasa Inggris',
              topics: [
                {
                  id: 1,
                  title: 'Fruits and Vegetables',
                  completed: 1,
                  totalMaterials: 3,
                  subtopics: [
                    {
                      id: 'sd-st-002',
                      title: 'Names of Fruits',
                      isCompleted: true,
                      materials: sampleMaterials.slice(0, 1)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Catalog SMP (Sekolah Menengah Pertama)
const catalogSMP: Catalog = {
  id: 'catalog-smp',
  name: 'Catalog SMP',
  level: 'SMP',
  description: 'Program pembelajaran untuk siswa tingkat Sekolah Menengah Pertama',
  icon: '📚',
  programs: [
    {
      id: 'prog-smp-001',
      name: 'Matematika SMP',
      description: 'Program matematika untuk siswa SMP',
      icon: '📊',
      progress: 40,
      duration: '12 bulan',
      startDate: '2025-07-01',
      endDate: '2026-06-30',
      instructor: 'Dr. Ahmad Fauzi',
      instructorAvatar: '/teachers/ahmad-fauzi.jpg',
      level: 'SMP',
      materials: sampleMaterials.slice(2, 3),
      courses: [
        {
          id: 'course-smp-001',
          name: 'Aljabar Dasar',
          description: 'Kursus aljabar dasar untuk siswa SMP',
          icon: '📐',
          progress: 45,
          instructor: 'Dr. Ahmad Fauzi',
          instructorAvatar: '/teachers/ahmad-fauzi.jpg',
          level: 'SMP',
          category: 'Matematika',
          subjects: [
            {
              id: 'subj-smp-001',
              name: 'Persamaan Linear',
              status: 'Aktif',
              icon: '📊',
              progress: 50,
              description: 'Belajar persamaan linear satu variabel',
              level: 'SMP',
              category: 'Matematika',
              topics: [
                {
                  id: 1,
                  title: 'Penyelesaian Persamaan Linear',
                  completed: 2,
                  totalMaterials: 4,
                  subtopics: [
                    {
                      id: 'smp-st-001',
                      title: 'Metode Substitusi',
                      isCompleted: true,
                      materials: sampleMaterials.slice(2, 3)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'prog-smp-002',
      name: 'IPA SMP',
      description: 'Program Ilmu Pengetahuan Alam untuk siswa SMP',
      icon: '🧪',
      progress: 35,
      duration: '12 bulan',
      startDate: '2025-07-01',
      endDate: '2026-06-30',
      instructor: 'Siti Aisyah, M.Pd',
      instructorAvatar: '/teachers/siti-aisyah.jpg',
      level: 'SMP',
      materials: sampleMaterials.slice(3, 5),
      courses: [
        {
          id: 'course-smp-002',
          name: 'Fisika Dasar',
          description: 'Kursus fisika dasar untuk siswa SMP',
          icon: '⚛️',
          progress: 30,
          instructor: 'Dr. Ahmad Fauzi',
          instructorAvatar: '/teachers/ahmad-fauzi.jpg',
          level: 'SMP',
          category: 'IPA',
          subjects: [
            {
              id: 'subj-smp-002',
              name: 'Mekanika',
              status: 'Aktif',
              icon: '⚙️',
              progress: 40,
              description: 'Belajar dasar-dasar mekanika',
              level: 'SMP',
              category: 'Fisika',
              topics: [
                {
                  id: 1,
                  title: 'Gerak Lurus',
                  completed: 1,
                  totalMaterials: 3,
                  subtopics: [
                    {
                      id: 'smp-st-002',
                      title: 'Gerak Lurus Beraturan',
                      isCompleted: true,
                      materials: sampleMaterials.slice(3, 4)
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'course-smp-003',
          name: 'Kimia Dasar',
          description: 'Kursus kimia dasar untuk siswa SMP',
          icon: '🧪',
          progress: 25,
          instructor: 'Siti Aisyah, M.Pd',
          instructorAvatar: '/teachers/siti-aisyah.jpg',
          level: 'SMP',
          category: 'IPA',
          subjects: [
            {
              id: 'subj-smp-003',
              name: 'Unsur dan Senyawa',
              status: 'Aktif',
              icon: '⚗️',
              progress: 30,
              description: 'Belajar unsur dan senyawa kimia',
              level: 'SMP',
              category: 'Kimia',
              topics: [
                {
                  id: 1,
                  title: 'Tabel Periodik',
                  completed: 1,
                  totalMaterials: 3,
                  subtopics: [
                    {
                      id: 'smp-st-003',
                      title: 'Pengenalan Tabel Periodik',
                      isCompleted: true,
                      materials: sampleMaterials.slice(4, 5)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Catalog SMA/SMK
const catalogSMA: Catalog = {
  id: 'catalog-sma',
  name: 'Catalog SMA/SMK',
  level: 'SMA/SMK',
  description: 'Program pembelajaran untuk siswa tingkat Sekolah Menengah Atas/Kejuruan',
  icon: '🎓',
  programs: [
    {
      id: 'prog-sma-001',
      name: 'Matematika SMA',
      description: 'Program matematika lanjutan untuk siswa SMA/SMK',
      icon: '📐',
      progress: 25,
      duration: '12 bulan',
      startDate: '2025-07-01',
      endDate: '2026-06-30',
      instructor: 'Dr. Ahmad Fauzi',
      instructorAvatar: '/teachers/ahmad-fauzi.jpg',
      level: 'SMA/SMK',
      materials: sampleMaterials.slice(2, 3),
      courses: [
        {
          id: 'course-sma-001',
          name: 'Kalkulus',
          description: 'Kursus kalkulus untuk siswa SMA',
          icon: '📊',
          progress: 30,
          instructor: 'Dr. Ahmad Fauzi',
          instructorAvatar: '/teachers/ahmad-fauzi.jpg',
          level: 'SMA/SMK',
          category: 'Matematika',
          subjects: [
            {
              id: 'subj-sma-001',
              name: 'Diferensial',
              status: 'Aktif',
              icon: '📈',
              progress: 35,
              description: 'Belajar turunan dalam kalkulus',
              level: 'SMA/SMK',
              category: 'Matematika',
              topics: [
                {
                  id: 1,
                  title: 'Konsep Turunan',
                  completed: 1,
                  totalMaterials: 4,
                  subtopics: [
                    {
                      id: 'sma-st-001',
                      title: 'Pengertian Turunan',
                      isCompleted: true,
                      materials: sampleMaterials.slice(2, 3)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'prog-sma-002',
      name: 'Bahasa Inggris SMA',
      description: 'Program bahasa Inggris lanjutan untuk siswa SMA/SMK',
      icon: '🔤',
      progress: 35,
      duration: '12 bulan',
      startDate: '2025-07-01',
      endDate: '2026-06-30',
      instructor: 'Sarah Johnson, M.Ed',
      instructorAvatar: '/teachers/sarah-johnson.jpg',
      level: 'SMA/SMK',
      materials: sampleMaterials.slice(0, 2),
      courses: [
        {
          id: 'course-sma-002',
          name: 'English for Academic Purposes',
          description: 'Kursus bahasa Inggris akademik untuk siswa SMA',
          icon: '📝',
          progress: 40,
          instructor: 'Sarah Johnson, M.Ed',
          instructorAvatar: '/teachers/sarah-johnson.jpg',
          level: 'SMA/SMK',
          category: 'Bahasa Inggris',
          subjects: [
            {
              id: 'subj-sma-002',
              name: 'Academic Writing',
              status: 'Aktif',
              icon: '✏️',
              progress: 45,
              description: 'Belajar menulis esai akademik dalam bahasa Inggris',
              level: 'SMA/SMK',
              category: 'Bahasa Inggris',
              topics: [
                {
                  id: 1,
                  title: 'Essay Structure',
                  completed: 2,
                  totalMaterials: 5,
                  subtopics: [
                    {
                      id: 'sma-st-002',
                      title: 'Introduction and Thesis Statement',
                      isCompleted: true,
                      materials: sampleMaterials.slice(0, 2)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'prog-smk-001',
      name: 'Komputer SMK',
      description: 'Program komputer untuk siswa SMK jurusan TI',
      icon: '💻',
      progress: 45,
      duration: '12 bulan',
      startDate: '2025-07-01',
      endDate: '2026-06-30',
      instructor: 'Rudi Hartono, S.Kom',
      instructorAvatar: '/teachers/rudi-hartono.jpg',
      level: 'SMA/SMK',
      materials: sampleMaterials.slice(0, 2),
      courses: [
        {
          id: 'course-smk-001',
          name: 'Dasar Pemrograman',
          description: 'Kursus pemrograman dasar untuk siswa SMK',
          icon: '👨‍💻',
          progress: 50,
          instructor: 'Rudi Hartono, S.Kom',
          instructorAvatar: '/teachers/rudi-hartono.jpg',
          level: 'SMA/SMK',
          category: 'Komputer',
          subjects: [
            {
              id: 'subj-smk-001',
              name: 'Algoritma',
              status: 'Aktif',
              icon: '📊',
              progress: 55,
              description: 'Belajar algoritma dan pemecahan masalah',
              level: 'SMA/SMK',
              category: 'Komputer',
              topics: [
                {
                  id: 1,
                  title: 'Pengenalan Algoritma',
                  completed: 3,
                  totalMaterials: 5,
                  subtopics: [
                    {
                      id: 'smk-st-001',
                      title: 'Definisi Algoritma',
                      isCompleted: true,
                      materials: sampleMaterials.slice(0, 1)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Catalog UMUM
const catalogUMUM: Catalog = {
  id: 'catalog-umum',
  name: 'Catalog Umum',
  level: 'UMUM',
  description: 'Program pembelajaran untuk umum',
  icon: '👥',
  programs: [
    {
      id: 'prog-umum-001',
      name: 'Bahasa Inggris Umum',
      description: 'Program bahasa Inggris untuk umum berbagai tingkat',
      icon: '🌎',
      progress: 20,
      duration: '6 bulan',
      startDate: '2025-07-01',
      endDate: '2025-12-31',
      instructor: 'Sarah Johnson, M.Ed',
      instructorAvatar: '/teachers/sarah-johnson.jpg',
      level: 'UMUM',
      materials: sampleMaterials.slice(0, 2),
      courses: [
        {
          id: 'course-umum-001',
          name: 'English for Beginners',
          description: 'Kursus bahasa Inggris dasar untuk pemula',
          icon: '🔤',
          progress: 25,
          instructor: 'Sarah Johnson, M.Ed',
          instructorAvatar: '/teachers/sarah-johnson.jpg',
          level: 'UMUM',
          category: 'Bahasa Inggris',
          subjects: [
            {
              id: 'subj-umum-001',
              name: 'Basic Conversation',
              status: 'Aktif',
              icon: '💬',
              progress: 30,
              description: 'Belajar percakapan dasar bahasa Inggris',
              level: 'UMUM',
              category: 'Bahasa Inggris',
              topics: [
                {
                  id: 1,
                  title: 'Greetings and Introductions',
                  completed: 1,
                  totalMaterials: 3,
                  subtopics: [
                    {
                      id: 'umum-st-001',
                      title: 'Saying Hello and Introducing Yourself',
                      isCompleted: true,
                      materials: sampleMaterials.slice(0, 2)
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const catalogs: Catalog[] = [
  catalogTK,
  catalogSD,
  catalogSMP,
  catalogSMA,
  catalogUMUM
];

export default catalogs;
