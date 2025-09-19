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

// Data assignment sudah dipindahkan ke src/data/data-student/classes/assignment-data.ts
// File ini sekarang hanya berisi data materi saja
