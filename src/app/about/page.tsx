"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/ui-home/Navbar";
import Footer from "@/components/ui-home/Footer";
import { DynamicBackground, FloatingBubbles } from "@/components/animations/BackgroundAnimations";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Putu Aditya",
      role: "Founder & CEO",
      image: "/public/pichome/logo.png", // Replace with actual image
      bio: "Berpengalaman lebih dari 15 tahun dalam dunia pendidikan dan memiliki visi untuk memberikan pendidikan berkualitas yang dapat diakses oleh semua kalangan."
    },
    {
      name: "Made Dewi",
      role: "Academic Director",
      image: "/public/pichome/logo.png", // Replace with actual image
      bio: "Lulusan S2 Pendidikan dengan pengalaman mengajar selama 10 tahun di berbagai institusi pendidikan terkemuka."
    },
    {
      name: "Nyoman Surya",
      role: "Head of Curriculum",
      image: "/public/pichome/logo.png", // Replace with actual image
      bio: "Spesialis pengembangan kurikulum yang fokus pada metode pembelajaran yang efektif dan menyenangkan untuk berbagai tingkat usia."
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Berdirinya Shine Education",
      description: "Shine Education didirikan dengan tujuan memberikan pendidikan berkualitas dengan pendekatan yang menyenangkan."
    },
    {
      year: "2019",
      title: "Pembukaan Cabang Pertama",
      description: "Membuka cabang pertama di Denpasar dan melayani lebih dari 100 siswa dalam tahun pertama."
    },
    {
      year: "2021",
      title: "Perluasan Program",
      description: "Menambah berbagai program baru termasuk kelas coding dan matematika tingkat lanjut."
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description: "Mengembangkan platform pembelajaran online untuk menjangkau siswa di seluruh Bali."
    },
    {
      year: "2025",
      title: "Ekspansi Regional",
      description: "Membuka cabang baru di beberapa kota di Indonesia dan memperluas jangkauan layanan pendidikan."
    }
  ];

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
                Tentang
              </span> Kami
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Mengenal lebih dekat Shine Education dan perjalanan kami dalam mencerdaskan generasi penerus bangsa.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C40503] to-[#DAA625] mx-auto mb-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/pichome/hero-section.JPG"
                  alt="Shine Education Story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Cerita Kami
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Shine Education didirikan pada tahun 2018 dengan visi untuk menghadirkan pendidikan berkualitas yang dapat diakses oleh semua kalangan. Berawal dari sebuah ruangan kecil di Denpasar dengan hanya 15 siswa, kini kami telah berkembang menjadi institusi pendidikan yang dipercaya oleh ratusan keluarga di Bali.
                </p>
                <p>
                  Filosofi pendidikan kami berlandaskan pada keyakinan bahwa setiap anak memiliki potensi unik yang perlu dieksplorasi dan dikembangkan. Kami tidak hanya fokus pada pencapaian akademik, tetapi juga pembentukan karakter dan keterampilan hidup yang esensial.
                </p>
                <p>
                  Nama &quot;Shine&quot; dipilih karena kami percaya bahwa pendidikan adalah cahaya yang dapat menerangi masa depan. Melalui program-program inovatif dan pendekatan pembelajaran yang menyenangkan, kami berusaha membantu setiap siswa untuk bersinar dengan potensi terbaik mereka.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
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
              Visi & Misi
            </h2>
            <p className="text-gray-600">
              Landasan dan tujuan yang memandu setiap langkah kami dalam memberikan layanan pendidikan terbaik
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <div className="w-16 h-16 rounded-full bg-[#C40503]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#C40503]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Visi</h3>
              <p className="text-gray-600">
                Menjadi institusi pendidikan terdepan yang menghasilkan generasi unggul, kreatif, dan berkarakter, yang siap menghadapi tantangan global melalui pendekatan pembelajaran yang inovatif dan menyenangkan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <div className="w-16 h-16 rounded-full bg-[#DAA625]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#DAA625]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Misi</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#DAA625] mr-2">•</span>
                  <span>Menyelenggarakan program pendidikan berkualitas yang disesuaikan dengan kebutuhan dan minat siswa.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#DAA625] mr-2">•</span>
                  <span>Membangun lingkungan belajar yang kondusif, inspiratif, dan menyenangkan.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#DAA625] mr-2">•</span>
                  <span>Mengembangkan metode pembelajaran inovatif yang memadukan pendekatan tradisional dan modern.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#DAA625] mr-2">•</span>
                  <span>Membina karakter dan nilai-nilai positif dalam diri setiap siswa.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#DAA625] mr-2">•</span>
                  <span>Menjalin kerjasama dengan orangtua dan komunitas untuk mendukung perkembangan siswa.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-gray-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tim Kami
            </h2>
            <p className="text-gray-600">
              Kenali para profesional berdedikasi yang bekerja keras di balik layar untuk memberikan pendidikan terbaik
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#C40503] font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
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
              Perjalanan Kami
            </h2>
            <p className="text-gray-600">
              Jejak langkah kami dalam membangun dan mengembangkan Shine Education hingga saat ini
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 ml-4 md:ml-0 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#C40503] to-[#DAA625]"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`relative flex flex-col ${
                      index % 2 === 0 
                        ? 'md:flex-row' 
                        : 'md:flex-row-reverse'
                    } md:gap-8 items-start`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 ml-4 md:ml-0 transform md:-translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-[#C40503] z-10"></div>
                    
                    {/* Year */}
                    <div className={`pl-12 md:pl-0 md:w-1/2 ${
                      index % 2 === 0 
                        ? 'md:text-right md:pr-8' 
                        : 'md:text-left md:pl-8'
                    }`}>
                      <span className="inline-block px-4 py-1 bg-gradient-to-r from-[#C40503] to-[#DAA625] text-white font-bold rounded-full mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                    
                    {/* Empty Space for Alignment */}
                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#C40503] to-[#DAA625] rounded-xl p-8 md:p-12 shadow-xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Hubungi Kami
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/90 max-w-2xl mx-auto mb-8"
            >
              Tertarik untuk mengetahui lebih lanjut tentang Shine Education? Jangan ragu untuk menghubungi kami untuk informasi lebih detail.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button className="bg-white text-[#C40503] hover:bg-gray-100 font-bold py-3 px-6 rounded-full">
                Hubungi Kami
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-full">
                Kunjungi Kami
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
