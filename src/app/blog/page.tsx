"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui-home/Navbar";
import Footer from "@/components/ui-home/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DynamicBackground, FloatingBubbles } from "@/components/animations/BackgroundAnimations";
import { Search } from "lucide-react";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "5 Cara Efektif Membantu Anak Belajar Membaca",
    excerpt: "Temukan metode-metode terbaik untuk mendukung kemampuan membaca anak sejak dini dan membuat proses belajar menjadi lebih menyenangkan.",
    image: "/pichome/hero-section.JPG",
    category: "Parenting",
    date: "28 Juni 2025",
    author: "Putu Aditya"
  },
  {
    id: 2,
    title: "Mengenal Program Calistung untuk Anak Usia Dini",
    excerpt: "Apa itu program Calistung? Kapan waktu yang tepat untuk memulai dan bagaimana penerapan yang benar untuk anak-anak prasekolah.",
    image: "/picprogram/calistung.png",
    category: "Program",
    date: "21 Juni 2025",
    author: "Made Dewi"
  },
  {
    id: 3,
    title: "Pentingnya Pembelajaran Matematika yang Menyenangkan",
    excerpt: "Bagaimana mengubah persepsi anak tentang matematika dari mata pelajaran yang menakutkan menjadi mata pelajaran yang menyenangkan.",
    image: "/picprogram/matematika.png",
    category: "Pendidikan",
    date: "15 Juni 2025",
    author: "Nyoman Surya"
  },
  {
    id: 4,
    title: "Perkembangan Teknologi dalam Pendidikan Modern",
    excerpt: "Peran teknologi dalam transformasi metode pembelajaran dan bagaimana hal tersebut mempengaruhi perkembangan siswa di era digital.",
    image: "/picprogram/coding.png",
    category: "Teknologi",
    date: "10 Juni 2025",
    author: "Wayan Teknologi"
  },
  {
    id: 5,
    title: "Tips Memilih Program Bimbingan Belajar yang Tepat",
    excerpt: "Panduan lengkap untuk orangtua dalam memilih program bimbingan belajar yang sesuai dengan kebutuhan dan gaya belajar anak.",
    image: "/pichome/hero-section.JPG",
    category: "Tips",
    date: "5 Juni 2025",
    author: "Ketut Pendidik"
  },
  {
    id: 6,
    title: "Mengajarkan Bahasa Inggris pada Anak Sejak Dini",
    excerpt: "Strategi dan manfaat memperkenalkan bahasa Inggris pada anak usia dini untuk mempersiapkan mereka menghadapi era globalisasi.",
    image: "/picprogram/bahasainggris.png",
    category: "Bahasa",
    date: "1 Juni 2025",
    author: "Made English"
  }
];

// Blog categories
const categories = ["Semua", "Parenting", "Program", "Pendidikan", "Teknologi", "Tips", "Bahasa"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = blogPosts.filter(post => {
    // Filter by category
    const categoryMatch = activeCategory === "Semua" || post.category === activeCategory;
    
    // Filter by search query
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <main className="min-h-screen relative">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <DynamicBackground />
        <FloatingBubbles />
      </div>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
                Blog & Artikel
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Informasi, tips, dan pengetahuan seputar pendidikan dan perkembangan anak
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C40503] to-[#DAA625] mx-auto mb-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1 text-sm rounded-full transition-all ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-[#C40503] to-[#DAA625] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-600">Tidak ada artikel yang ditemukan.</h3>
              <p className="mt-2 text-gray-500">Silakan coba kata kunci lain atau ubah kategori.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="relative h-52">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-[#C40503] hover:bg-white">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>Oleh {post.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="link" className="p-0 h-auto text-[#C40503] hover:text-[#DAA625]">
                        Baca Selengkapnya →
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dapatkan Artikel Terbaru
              </h2>
              <p className="text-gray-600 mb-6">
                Berlangganan newsletter kami untuk mendapatkan update artikel, tips pendidikan, dan informasi program terbaru dari Shine Education.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Alamat email Anda"
                  className="rounded-full"
                />
                <Button className="bg-gradient-to-r from-[#C40503] to-[#DAA625] text-white rounded-full hover:opacity-90 min-w-[120px]">
                  Langganan
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
