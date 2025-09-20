"use client";

import { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/ui-home/Navbar";
import Footer from "@/components/ui-home/Footer";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import { DynamicBackground, FloatingBubbles } from "@/components/animations/BackgroundAnimations";
import { Badge } from "@/components/ui/badge";

// Job vacancy data
const vacancyData = [
  {
    id: 1,
    title: "Guru Bahasa Inggris",
    location: "Denpasar, Bali",
    type: "Full-time",
    postedDate: "28 Juni 2025",
    endDate: "28 Juli 2025",
    requirements: [
      "Sarjana Pendidikan Bahasa Inggris atau setara",
      "Pengalaman mengajar minimal 1 tahun",
      "Sertifikasi TEFL/TESOL merupakan nilai tambah",
      "Memiliki kemampuan komunikasi yang baik",
      "Kreatif dan inovatif dalam mengajar",
      "Sabar dalam menghadapi anak-anak"
    ],
    responsibilities: [
      "Menyiapkan dan menyampaikan materi pembelajaran Bahasa Inggris",
      "Melakukan evaluasi kemajuan siswa secara berkala",
      "Membuat laporan perkembangan siswa",
      "Berpartisipasi dalam kegiatan sekolah",
      "Mengikuti pelatihan pengembangan profesional"
    ],
    benefits: [
      "Gaji kompetitif",
      "Tunjangan kesehatan",
      "Pelatihan berkelanjutan",
      "Lingkungan kerja yang nyaman"
    ],
    description: "Kami mencari guru Bahasa Inggris yang bersemangat dan berdedikasi untuk bergabung dengan tim kami. Anda akan bertanggung jawab untuk mengajar siswa dari berbagai tingkat usia dengan metode yang menyenangkan dan efektif."
  },
  {
    id: 2,
    title: "Staff Administrasi",
    location: "Kuta, Bali",
    type: "Full-time",
    postedDate: "30 Juni 2025",
    endDate: "30 Juli 2025",
    requirements: [
      "Minimal lulusan D3/S1 jurusan apapun",
      "Menguasai Microsoft Office",
      "Teliti dan memiliki kemampuan administrasi yang baik",
      "Memiliki kemampuan komunikasi yang baik",
      "Dapat bekerja dalam tim"
    ],
    responsibilities: [
      "Mengelola pendaftaran siswa baru",
      "Menjaga dan mengatur dokumentasi",
      "Menangani komunikasi dengan orang tua siswa",
      "Membantu dalam pengaturan jadwal",
      "Mengelola inventaris kantor"
    ],
    benefits: [
      "Gaji kompetitif",
      "Tunjangan kesehatan",
      "Lingkungan kerja yang nyaman",
      "Jam kerja reguler"
    ],
    description: "Kami mencari staff administrasi yang terorganisir dan efisien untuk mengelola operasional harian di kantor kami. Posisi ini membutuhkan ketelitian tinggi dan kemampuan multi-tasking yang baik."
  },
  {
    id: 3,
    title: "Guru Matematika",
    location: "Denpasar, Bali",
    type: "Part-time",
    postedDate: "1 Juli 2025",
    endDate: "1 Agustus 2025",
    requirements: [
      "Sarjana Matematika atau Pendidikan Matematika",
      "Pengalaman mengajar minimal 1 tahun",
      "Memahami kurikulum nasional",
      "Mampu menjelaskan konsep matematika dengan mudah",
      "Sabar dan tekun dalam mengajar"
    ],
    responsibilities: [
      "Mengajar matematika untuk siswa SD hingga SMA",
      "Menyiapkan materi pembelajaran yang sesuai dengan tingkat siswa",
      "Melakukan evaluasi kemajuan siswa",
      "Memberikan tugas dan latihan yang sesuai",
      "Membantu siswa yang kesulitan dalam memahami konsep"
    ],
    benefits: [
      "Gaji per jam yang kompetitif",
      "Jadwal fleksibel",
      "Pengembangan karir",
      "Lingkungan belajar yang kondusif"
    ],
    description: "Bergabunglah dengan tim kami sebagai guru matematika paruh waktu. Kami mencari individu yang dapat membantu siswa memahami dan mencintai matematika melalui pendekatan pengajaran yang efektif dan menyenangkan."
  },
  {
    id: 4,
    title: "Marketing Executive",
    location: "Kuta, Bali",
    type: "Full-time",
    postedDate: "3 Juli 2025",
    endDate: "3 Agustus 2025",
    requirements: [
      "Sarjana Marketing atau bidang terkait",
      "Pengalaman marketing minimal 1 tahun",
      "Keterampilan komunikasi yang sangat baik",
      "Kreatif dan inovatif",
      "Menguasai media sosial dan digital marketing",
      "Kemampuan analisis data"
    ],
    responsibilities: [
      "Mengembangkan dan melaksanakan strategi marketing",
      "Mengelola kampanye pemasaran digital",
      "Membuat konten untuk media sosial dan website",
      "Melakukan analisis pasar dan kompetitor",
      "Berkoordinasi dengan tim untuk meningkatkan brand awareness"
    ],
    benefits: [
      "Gaji kompetitif plus bonus performa",
      "Tunjangan kesehatan",
      "Lingkungan kerja yang dinamis",
      "Peluang pengembangan karir"
    ],
    description: "Kami mencari Marketing Executive yang energik dan kreatif untuk membantu kami mengembangkan dan menjalankan strategi pemasaran yang efektif. Posisi ini ideal bagi individu yang bersemangat tentang pemasaran pendidikan dan ingin berkontribusi pada pertumbuhan institusi kami."
  }
];

export default function JobVacanciesPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

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
              <span className="text-[#C40001]">
                Lowongan
              </span> <span className="text-[#DAA625]">Kerja</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Bergabunglah dengan tim kami dan jadilah bagian dari perjalanan mencerdaskan generasi penerus bangsa.
            </p>
            <div className="w-24 h-1 bg-[#C40001] mx-auto mb-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 bg-gray-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vacancyData.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={`
                      ${job.type === 'Full-time' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                    `}>
                      {job.type}
                    </Badge>
                    <div className="text-sm text-gray-500">
                      Ditutup: {job.endDate}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{job.location}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Kualifikasi:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-[#C40503] mr-2">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li className="text-sm text-gray-500 italic">
                          +{job.requirements.length - 3} kualifikasi lainnya
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-xs text-gray-500">
                      Diposting: {job.postedDate}
                    </span>
                    <Button 
                      onClick={() => setSelectedJob(job.id)}
                      className="bg-[#C40001] hover:opacity-90 text-white"
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Bergabung dengan Shine Education?
            </h2>
            <p className="text-gray-600">
              Bekerja bersama kami memberikan kesempatan untuk tumbuh dan berkembang dalam lingkungan yang mendukung
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-[#C40503]/10 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#C40503]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Pengembangan Karir</h3>
              <p className="text-gray-600">
                Kami menawarkan jalur pengembangan karir yang jelas dan kesempatan pelatihan berkelanjutan untuk semua karyawan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-[#DAA625]/10 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#DAA625]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tim yang Supportif</h3>
              <p className="text-gray-600">
                Bekerja dalam lingkungan kolaboratif dengan rekan kerja yang bersemangat dan saling mendukung.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Work-Life Balance</h3>
              <p className="text-gray-600">
                Kami menghargai keseimbangan antara pekerjaan dan kehidupan pribadi dengan menawarkan jadwal yang fleksibel dan kebijakan yang berpihak pada karyawan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-16 bg-gray-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-[#C40001] rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-10"
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Siap Bergabung dengan Tim Kami?
                </h2>
                <p className="text-white/90 mb-6">
                  Kirimkan lamaran Anda sekarang dan jadilah bagian dari perjalanan kami mencerdaskan generasi masa depan.
                </p>
                <Link href="/job-applications">
                  <Button className="bg-white text-[#C40503] hover:bg-gray-100">
                    Kirim Lamaran Sekarang
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="hidden md:block relative"
              >
                <div className="absolute inset-0 bg-white/10">
                  <div className="h-full w-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-white opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className={`
                    mb-2 ${vacancyData.find(job => job.id === selectedJob)?.type === 'Full-time' ? 
                    'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                  `}>
                    {vacancyData.find(job => job.id === selectedJob)?.type}
                  </Badge>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {vacancyData.find(job => job.id === selectedJob)?.title}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center text-gray-500 mt-2 mb-6">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">{vacancyData.find(job => job.id === selectedJob)?.location}</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi Pekerjaan</h3>
                  <p className="text-gray-600">
                    {vacancyData.find(job => job.id === selectedJob)?.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Kualifikasi</h3>
                  <ul className="space-y-2">
                    {vacancyData.find(job => job.id === selectedJob)?.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#C40503] mr-2">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tanggung Jawab</h3>
                  <ul className="space-y-2">
                    {vacancyData.find(job => job.id === selectedJob)?.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#C40503] mr-2">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefit</h3>
                  <ul className="space-y-2">
                    {vacancyData.find(job => job.id === selectedJob)?.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#C40503] mr-2">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Diposting: {vacancyData.find(job => job.id === selectedJob)?.postedDate}</p>
                      <p className="text-sm text-gray-500">Ditutup: {vacancyData.find(job => job.id === selectedJob)?.endDate}</p>
                    </div>
                    <Link href="/job-applications">
                      <Button className="bg-white text-[#C40001] hover:bg-gray-100">
                        Lamar Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      <Footer />
    </main>
  );
}
