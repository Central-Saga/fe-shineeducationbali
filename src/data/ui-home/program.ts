interface ProgramItem {
  id: number;
  title: string;
  description: string;
  image: string;
  level: string;
}

export const programItems: ProgramItem[] = [
  {
    id: 1,
    title: "Bahasa Inggris",
    description:
      "Program belajar yang dirancang khusus untuk membantu siswa memahami materi pelajaran dengan lebih baik.",
    image: "/picprogram/bahasainggris.png",
    level: "SD - SMP - SMA/K",
  },
  {
    id: 2,
    title: "Persiapan UTBK",
    description:
      "Program intensif untuk mempersiapkan siswa menghadapi Ujian Tulis Berbasis Komputer (UTBK).",
    image: "/picprogram/matematika.png",
    level: "SMA/K",
  },
  {
    id: 3,
    title: "Konsultasi Akademik",
    description:
      "Layanan konsultasi untuk membantu siswa mengatasi kesulitan dalam belajar dan perencanaan akademik.",
    image: "/picprogram/coding.png",
    level: "SD - SMP - SMA/K - UMUM",
  },
  {
    id: 4,
    title: "Program Beasiswa",
    description:
      "Informasi dan panduan lengkap tentang berbagai program beasiswa yang tersedia.",
    image: "/picprogram/calistung.png",
    level: "SMA/K - UMUM",
  },
];
