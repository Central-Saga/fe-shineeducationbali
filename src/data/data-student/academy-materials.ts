// Dummy data for student academy materials
export interface Material {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'video' | 'image' | 'document';
  uploadedBy: string;
  uploadDate: string;
  thumbnailUrl?: string;
}

export interface SubTopic {
  id: string;
  title: string;
  materials: Material[];
  isCompleted: boolean;
}

export interface Topic {
  id: number;
  title: string;
  subtopics: SubTopic[];
  completed: number;
  totalMaterials: number;
}

export interface Subject {
  id: string;
  name: string;
  status: string;
  icon: string;
  progress: number;
  description: string;
  topics: Topic[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  duration: string;
  startDate: string;
  endDate: string;
  materials: Material[];
  instructor: string;
  instructorAvatar: string;
}

export const subjects: Subject[] = [
  {
    id: 'mat-001',
    name: 'Matematika',
    status: 'Belum Selesai',
    icon: '📐',
    progress: 65,
    description: 'Mata pelajaran yang mempelajari tentang logika, bentuk, susunan, besaran, dan konsep-konsep yang saling berhubungan',
    topics: [
      {
        id: 1,
        title: 'Aljabar Linear',
        completed: 1,
        totalMaterials: 5,
        subtopics: [
          {
            id: 'mat-st-001',
            title: 'Aljabar Linear',
            isCompleted: true,
            materials: [
              {
                id: 'mat-001-01',
                title: 'Pengenalan Aljabar Linear',
                description: 'Materi dasar tentang definisi dan aplikasi aljabar linear dalam matematika',
                fileUrl: '/materials/matematika/aljabar-linear-intro.pdf',
                fileType: 'pdf',
                uploadedBy: 'Budi Santoso, S.Pd',
                uploadDate: '2025-06-15',
                thumbnailUrl: '/materials/thumbnails/aljabar-linear-thumb.jpg'
              },
              {
                id: 'mat-001-02',
                title: 'Video: Menyelesaikan Persamaan Linear',
                description: 'Tutorial video tentang teknik menyelesaikan persamaan linear sederhana',
                fileUrl: '/materials/matematika/aljabar-linear-video.mp4',
                fileType: 'video',
                uploadedBy: 'Budi Santoso, S.Pd',
                uploadDate: '2025-06-17',
                thumbnailUrl: '/materials/thumbnails/aljabar-video-thumb.jpg'
              }
            ]
          },
          {
            id: 'mat-st-002',
            title: 'Persamaan',
            isCompleted: false,
            materials: [
              {
                id: 'mat-002-01',
                title: 'Dasar Persamaan Linear',
                description: 'Dokumen berisi materi tentang persamaan linear dan aplikasinya',
                fileUrl: '/materials/matematika/persamaan-linear.pdf',
                fileType: 'pdf',
                uploadedBy: 'Budi Santoso, S.Pd',
                uploadDate: '2025-06-18',
                thumbnailUrl: '/materials/thumbnails/persamaan-linear-thumb.jpg'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Aljabar Linear Tingkat Lanjut',
        completed: 0,
        totalMaterials: 3,
        subtopics: [
          {
            id: 'mat-st-003',
            title: 'Aljabar Linear Lanjutan',
            isCompleted: false,
            materials: [
              {
                id: 'mat-003-01',
                title: 'Matriks dan Determinan',
                description: 'Penjelasan tentang matriks, operasi dasar, dan cara menghitung determinan',
                fileUrl: '/materials/matematika/matriks-determinan.pdf',
                fileType: 'pdf',
                uploadedBy: 'Siti Aisyah, M.Pd',
                uploadDate: '2025-06-20',
                thumbnailUrl: '/materials/thumbnails/matrix-thumb.jpg'
              }
            ]
          },
          {
            id: 'mat-st-004',
            title: 'Persamaan Lanjutan',
            isCompleted: false,
            materials: [
              {
                id: 'mat-004-01',
                title: 'Sistem Persamaan Linear',
                description: 'Materi tentang sistem persamaan linear dan metode penyelesaiannya',
                fileUrl: '/materials/matematika/sistem-persamaan.pdf',
                fileType: 'pdf',
                uploadedBy: 'Siti Aisyah, M.Pd',
                uploadDate: '2025-06-22',
                thumbnailUrl: '/materials/thumbnails/sistem-persamaan-thumb.jpg'
              }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Kalkulus Dasar',
        completed: 0,
        totalMaterials: 4,
        subtopics: [
          {
            id: 'mat-st-005',
            title: 'Turunan',
            isCompleted: false,
            materials: [
              {
                id: 'mat-005-01',
                title: 'Pengantar Kalkulus',
                description: 'Pengenalan dasar tentang kalkulus dan aplikasinya',
                fileUrl: '/materials/matematika/pengantar-kalkulus.pdf',
                fileType: 'pdf',
                uploadedBy: 'Ahmad Rizki, M.Sc',
                uploadDate: '2025-06-25',
                thumbnailUrl: '/materials/thumbnails/kalkulus-thumb.jpg'
              }
            ]
          },
          {
            id: 'mat-st-006',
            title: 'Integral',
            isCompleted: false,
            materials: [
              {
                id: 'mat-006-01',
                title: 'Dasar-Dasar Integral',
                description: 'Materi dasar tentang integral dan aplikasinya',
                fileUrl: '/materials/matematika/dasar-integral.pdf',
                fileType: 'pdf',
                uploadedBy: 'Ahmad Rizki, M.Sc',
                uploadDate: '2025-06-27',
                thumbnailUrl: '/materials/thumbnails/integral-thumb.jpg'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        title: 'Statistika',
        completed: 0,
        totalMaterials: 3,
        subtopics: [
          {
            id: 'mat-st-007',
            title: 'Statistika Deskriptif',
            isCompleted: false,
            materials: [
              {
                id: 'mat-007-01',
                title: 'Pengantar Statistika',
                description: 'Materi dasar statistika dan pengolahan data',
                fileUrl: '/materials/matematika/pengantar-statistika.pdf',
                fileType: 'pdf',
                uploadedBy: 'Dina Puspita, S.Si',
                uploadDate: '2025-06-30',
                thumbnailUrl: '/materials/thumbnails/statistika-thumb.jpg'
              }
            ]
          },
          {
            id: 'mat-st-008',
            title: 'Probabilitas',
            isCompleted: false,
            materials: [
              {
                id: 'mat-008-01',
                title: 'Dasar-dasar Probabilitas',
                description: 'Materi tentang peluang dan distribusi probabilitas',
                fileUrl: '/materials/matematika/probabilitas.pdf',
                fileType: 'pdf',
                uploadedBy: 'Dina Puspita, S.Si',
                uploadDate: '2025-07-02',
                thumbnailUrl: '/materials/thumbnails/probabilitas-thumb.jpg'
              }
            ]
          }
        ]
      },
      {
        id: 5,
        title: 'Geometri',
        completed: 0,
        totalMaterials: 2,
        subtopics: [
          {
            id: 'mat-st-009',
            title: 'Geometri Bidang',
            isCompleted: false,
            materials: [
              {
                id: 'mat-009-01',
                title: 'Dasar Geometri Bidang',
                description: 'Materi tentang bentuk dan sifat objek dalam bidang datar',
                fileUrl: '/materials/matematika/geometri-bidang.pdf',
                fileType: 'pdf',
                uploadedBy: 'Rani Wijaya, M.Pd',
                uploadDate: '2025-07-05',
                thumbnailUrl: '/materials/thumbnails/geometri-thumb.jpg'
              }
            ]
          },
          {
            id: 'mat-st-010',
            title: 'Geometri Ruang',
            isCompleted: false,
            materials: [
              {
                id: 'mat-010-01',
                title: 'Pengenalan Geometri Ruang',
                description: 'Materi tentang bentuk dan sifat objek dalam ruang tiga dimensi',
                fileUrl: '/materials/matematika/geometri-ruang.pdf',
                fileType: 'pdf',
                uploadedBy: 'Rani Wijaya, M.Pd',
                uploadDate: '2025-07-07',
                thumbnailUrl: '/materials/thumbnails/geometri-ruang-thumb.jpg'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'eng-001',
    name: 'Bahasa Inggris',
    status: 'Belum Selesai',
    icon: '🔤',
    progress: 45,
    description: 'Mata pelajaran yang mempelajari bahasa internasional untuk komunikasi global',
    topics: [
      {
        id: 1,
        title: 'Grammar Basics',
        completed: 1,
        totalMaterials: 3,
        subtopics: [
          {
            id: 'eng-st-001',
            title: 'Tenses',
            isCompleted: true,
            materials: [
              {
                id: 'eng-001-01',
                title: 'Basic Tenses in English',
                description: 'Introduction to basic English tenses',
                fileUrl: '/materials/english/basic-tenses.pdf',
                fileType: 'pdf',
                uploadedBy: 'Sarah Johnson, M.Ed',
                uploadDate: '2025-06-10',
                thumbnailUrl: '/materials/thumbnails/tenses-thumb.jpg'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sci-001',
    name: 'Ilmu Pengetahuan Alam',
    status: 'Belum Selesai',
    icon: '🔬',
    progress: 30,
    description: 'Mata pelajaran yang mempelajari tentang fenomena alam dan hubungannya',
    topics: [
      {
        id: 1,
        title: 'Dasar Fisika',
        completed: 0,
        totalMaterials: 4,
        subtopics: [
          {
            id: 'sci-st-001',
            title: 'Mekanika',
            isCompleted: false,
            materials: [
              {
                id: 'sci-001-01',
                title: 'Hukum Newton',
                description: 'Penjelasan tentang hukum gerak Newton',
                fileUrl: '/materials/ipa/hukum-newton.pdf',
                fileType: 'pdf',
                uploadedBy: 'Dr. Agus Setiawan',
                uploadDate: '2025-06-12',
                thumbnailUrl: '/materials/thumbnails/newton-thumb.jpg'
              }
            ]
          }
        ]
      }
    ]
  }
];

export const programs: Program[] = [
  {
    id: 'prog-001',
    name: 'Program Persiapan Olimpiade Matematika',
    description: 'Program khusus untuk siswa yang ingin mengikuti kompetisi Olimpiade Matematika tingkat nasional dan internasional.',
    icon: '🏆',
    progress: 25,
    duration: '3 bulan',
    startDate: '2025-07-01',
    endDate: '2025-09-30',
    instructor: 'Prof. Andi Wijaya, Ph.D',
    instructorAvatar: '/teachers/andi-wijaya.jpg',
    materials: [
      {
        id: 'prog-001-mat-01',
        title: 'Strategi Pemecahan Masalah Olimpiade',
        description: 'Materi tentang berbagai strategi untuk memecahkan soal olimpiade matematika',
        fileUrl: '/materials/programs/olimpiade-strategi.pdf',
        fileType: 'pdf',
        uploadedBy: 'Prof. Andi Wijaya, Ph.D',
        uploadDate: '2025-06-28',
        thumbnailUrl: '/materials/thumbnails/olimpiade-thumb.jpg'
      },
      {
        id: 'prog-001-mat-02',
        title: 'Aljabar Olimpiade',
        description: 'Pendalaman materi aljabar untuk persiapan olimpiade',
        fileUrl: '/materials/programs/olimpiade-aljabar.pdf',
        fileType: 'pdf',
        uploadedBy: 'Prof. Andi Wijaya, Ph.D',
        uploadDate: '2025-06-29',
        thumbnailUrl: '/materials/thumbnails/olimpiade-aljabar-thumb.jpg'
      },
      {
        id: 'prog-001-mat-03',
        title: 'Video Tutorial Olimpiade Matematika',
        description: 'Tutorial penyelesaian soal-soal olimpiade matematika tahun lalu',
        fileUrl: '/materials/programs/olimpiade-tutorial.mp4',
        fileType: 'video',
        uploadedBy: 'Prof. Andi Wijaya, Ph.D',
        uploadDate: '2025-06-30',
        thumbnailUrl: '/materials/thumbnails/olimpiade-video-thumb.jpg'
      }
    ]
  },
  {
    id: 'prog-002',
    name: 'Program Intensif Bahasa Inggris',
    description: 'Program percepatan kemampuan berbahasa Inggris untuk persiapan studi di luar negeri.',
    icon: '🌎',
    progress: 10,
    duration: '6 bulan',
    startDate: '2025-08-01',
    endDate: '2026-01-31',
    instructor: 'Jessica Lawrence, M.A.',
    instructorAvatar: '/teachers/jessica-lawrence.jpg',
    materials: [
      {
        id: 'prog-002-mat-01',
        title: 'English for Academic Purposes',
        description: 'Materi bahasa Inggris untuk keperluan akademik',
        fileUrl: '/materials/programs/english-academic.pdf',
        fileType: 'pdf',
        uploadedBy: 'Jessica Lawrence, M.A.',
        uploadDate: '2025-07-20',
        thumbnailUrl: '/materials/thumbnails/english-academic-thumb.jpg'
      }
    ]
  }
];
