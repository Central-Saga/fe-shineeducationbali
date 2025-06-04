interface ProgramItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const programItems: ProgramItem[] = [
  {
    id: 1,
    title: "Program Bimbingan Belajar",
    description:
      "Program belajar yang dirancang khusus untuk membantu siswa memahami materi pelajaran dengan lebih baik.",
    icon: "/icons/book.svg",
  },
  {
    id: 2,
    title: "Persiapan UTBK",
    description:
      "Program intensif untuk mempersiapkan siswa menghadapi Ujian Tulis Berbasis Komputer (UTBK).",
    icon: "/icons/pencil.svg",
  },
  {
    id: 3,
    title: "Konsultasi Akademik",
    description:
      "Layanan konsultasi untuk membantu siswa mengatasi kesulitan dalam belajar dan perencanaan akademik.",
    icon: "/icons/lightbulb.svg",
  },
  {
    id: 4,
    title: "Program Beasiswa",
    description:
      "Informasi dan panduan lengkap tentang berbagai program beasiswa yang tersedia.",
    icon: "/icons/graduation.svg",
  },
];
