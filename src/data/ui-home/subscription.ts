interface SubscriptionPlan {
  name: string;
  price: string;
  duration: string;
  features: string[];
}

interface Facility {
  title: string;
  description: string;
  icon: string;
}

interface EducationLevel {
  level: string;
  price: string;
  emoji: string;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Paket Bulanan",
    price: "55.000",
    duration: "1 Bulan",
    features: [
      "Start From IDR 55.000",
      "Durasi 1 Bulan",
      "4 kali pertemuan",
      "Konsultasi via WhatsApp",
      "Akses materi online",
    ],
  },
  {
    name: "Paket Cerdas",
    price: "150.000",
    duration: "3 Bulan",
    features: [
      "Start From IDR 150.000",
      "Durasi 3 Bulan",
      "3 mata pelajaran",
      "Konsultasi offline & online",
      "Akses penuh materi digital",
      "Free trial 1 minggu",
    ],
  },
  {
    name: "Paket Triwulanan",
    price: "165.000",
    duration: "3 Bulan",
    features: [
      "Start From IDR 165.000",
      "Durasi 3 Bulan",
      "12 kali pertemuan",
      "Konsultasi prioritas",
      "Akses penuh platform",
      "Modul eksklusif",
    ],
  },
];

export const facilities: Facility[] = [
  {
    title: "Ruang Kelas Ber-AC",
    description: "Ruang kelas ber-AC yang bersih dan nyaman.",
    icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4 M12 3v18",
  },
  {
    title: "Akses Wi-Fi Gratis",
    description: "Akses Wi-Fi gratis untuk mendukung pembelajaran digital.",
    icon: "M5 12a7 7 0 1114 0 7 7 0 01-14 0z M12 5v14 M5 12h14",
  },
  {
    title: "Teknologi Modern",
    description: "Proyektor dan teknologi modern di setiap kelas.",
    icon: "M2 3h20v14H2z M8 21h8 M12 17v4",
  },
  {
    title: "Area Diskusi",
    description: "Area diskusi yang santai dan inspiratif.",
    icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
  },
  {
    title: "Bimbingan Privat",
    description: "Layanan bimbingan belajar privat tambahan.",
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  {
    title: "Parkir Luas & Aman",
    description: "Parkir luas dan aman untuk kendaraan siswa.",
    icon: "M4 16v4h16v-4M4 20h16 M2 12l1.5-6h17L22 12M6 18h.01M18 18h.01",
  },
  {
    title: "Toilet Bersih",
    description: "Toilet bersih yang selalu terawat.",
    icon: "M9 12l2 2 4-4M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    title: "Ruang Tunggu Orang Tua",
    description: "Ruang tunggu orang tua yang nyaman.",
    icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22v-4h6v4",
  },
];

export const educationLevels: EducationLevel[] = [
  { level: "TK - SD", price: "IDR 100.000", emoji: "🎓" },
  { level: "SMP", price: "IDR 100.000", emoji: "📚" },
  { level: "SMA", price: "IDR 125.000", emoji: "🎯" },
  { level: "UMUM", price: "IDR 200.000", emoji: "✨" },
];
