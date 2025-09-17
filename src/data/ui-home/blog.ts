interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Tips Sukses Menghadapi UTBK 2025",
    excerpt:
      "Pelajari strategi jitu dan tips terbaik untuk menghadapi UTBK dengan persiapan yang matang.",
    author: "Tim Shine Education",
    date: "1 Juni 2025",
    category: "Tips Belajar",
    image: "/pichome/hero-section.JPG",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Cara Efektif Belajar Matematika",
    excerpt:
      "Temukan metode pembelajaran matematika yang menyenangkan dan mudah dipahami.",
    author: "Prof. Sarah",
    date: "28 Mei 2025",
    category: "Matematika",
    image: "/pichome/hero-section.JPG",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Persiapan Masuk Perguruan Tinggi",
    excerpt:
      "Panduan lengkap mempersiapkan diri untuk masuk perguruan tinggi impian Anda.",
    author: "Dr. John Doe",
    date: "25 Mei 2025",
    category: "Perguruan Tinggi",
    image: "/pichome/hero-section.JPG",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Strategi Belajar Online yang Efektif",
    excerpt:
      "Tips dan trik untuk memaksimalkan pembelajaran online dari rumah.",
    author: "Tim Shine Education",
    date: "1 Juni 2025",
    category: "Tips Belajar",
    image: "/pichome/hero-section.JPG",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "Mempersiapkan Ujian Semester",
    excerpt:
      "Panduan lengkap untuk persiapan menghadapi ujian semester dengan percaya diri.",
    author: "Tim Shine Education",
    date: "1 Juni 2025",
    category: "Tips Belajar",
    image: "/pichome/hero-section.JPG",
    readTime: "5 min read",
  },
];
