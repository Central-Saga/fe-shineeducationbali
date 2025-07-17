// Dummy data materi untuk siswa
export const studentMaterials = [
  {
    id: 'm1',
    title: 'Modul Aljabar Linear',
    type: 'document',
    description: 'Buku pegangan untuk materi aljabar linear',
    fileUrl: '/materials/aljabar-linear.pdf',
    uploadDate: '2025-07-10',
    size: '2.4 MB',
    downloadCount: 42
  },
  {
    id: 'm2',
    title: 'Presentasi Matriks dan Operasinya',
    type: 'presentation',
    description: 'Slide presentasi tentang matriks dan operasinya',
    fileUrl: '/materials/matriks-slides.pptx',
    thumbnailUrl: '/materials/thumbnails/matriks-slides.jpg',
    uploadDate: '2025-07-10',
    size: '1.8 MB',
    downloadCount: 38
  },
  {
    id: 'm3',
    title: 'Latihan Soal Aljabar Linear',
    type: 'exercise',
    description: 'Kumpulan soal-soal latihan untuk aljabar linear',
    fileUrl: '/materials/latihan-aljabar-linear.pdf',
    uploadDate: '2025-07-12',
    size: '850 KB',
    downloadCount: 35
  }
];

// Dummy data tugas untuk siswa
export const studentAssignments = [
  {
    id: 'a1',
    title: 'Tugas Aljabar Linear Pertemuan 1',
    description: 'Kerjakan soal-soal berikut terkait materi matriks dan determinan. Buatlah penyelesaian step-by-step yang jelas untuk setiap soal.',
    dueDate: '2025-07-18',
    points: 100,
    status: 'not-submitted'
  },
  {
    id: 'a2',
    title: 'Tugas Aplikasi Aljabar Linear dalam Kehidupan',
    description: 'Buatlah sebuah esai singkat tentang penerapan aljabar linear dalam bidang yang Anda minati (teknologi, ekonomi, sains, dll). Minimal 500 kata dengan referensi.',
    dueDate: '2025-07-15',
    points: 100,
    status: 'submitted',
    submittedDate: '2025-07-14T15:30:00',
    attachments: [
      {
        id: 'att-1',
        name: 'Esai_Aplikasi_Aljabar_Linear.pdf',
        url: '#',
        size: '1.2 MB'
      }
    ]
  },
  {
    id: 'a3',
    title: 'Quiz Matriks dan Operasinya',
    description: 'Kerjakan soal-soal quiz tentang matriks dan operasinya dalam waktu 60 menit.',
    dueDate: '2025-07-10',
    points: 50,
    status: 'graded',
    submittedDate: '2025-07-10T09:45:00',
    grade: 45,
    feedback: 'Jawaban sangat baik, terutama pada soal operasi invers matriks. Untuk soal nomor 5, masih perlu sedikit perbaikan dalam langkah-langkah penyelesaian.',
    attachments: [
      {
        id: 'att-2',
        name: 'Quiz_Matriks_Jawaban.pdf',
        url: '#',
        size: '850 KB'
      }
    ]
  }
];
