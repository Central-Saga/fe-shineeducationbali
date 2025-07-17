"use client";

import React from 'react';
import { PricingCard } from "@/components/ui-student/subscription/PricingCard";
import { SubscriptionDetails } from "@/components/ui-student/subscription/SubscriptionDetails";
import { FAQSection } from "@/components/ui-student/subscription/FAQSection";
import { subscriptionPlans, currentSubscription } from "@/data/data-student/subscription-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Calendar } from "lucide-react";
import Image from 'next/image';

export default function SubscriptionPage() {
  // Find the current subscription plan
  const currentPlan = subscriptionPlans.find(plan => plan.id === currentSubscription.subscriptionId);
  
  // Dummy FAQ data
  const faqs = [
    {
      question: "Bagaimana cara mengganti paket langganan?",
      answer: "Anda dapat mengganti paket langganan di halaman pengaturan akun. Perubahan akan berlaku pada periode penagihan berikutnya."
    },
    {
      question: "Apakah saya dapat membatalkan langganan?",
      answer: "Ya, Anda dapat membatalkan langganan kapan saja. Pembatalan akan berlaku pada akhir periode penagihan saat ini."
    },
    {
      question: "Apakah saya masih memiliki akses ke kursus setelah membatalkan langganan?",
      answer: "Anda akan tetap memiliki akses ke kursus sampai akhir periode penagihan saat ini. Setelah itu, akses akan terbatas sesuai dengan paket yang tersedia untuk pengguna tanpa langganan."
    },
    {
      question: "Bagaimana cara mengaktifkan perpanjangan otomatis?",
      answer: "Perpanjangan otomatis dapat diaktifkan atau dinonaktifkan di halaman detail langganan. Cukup alihkan tombol 'Perpanjangan Otomatis' sesuai preferensi Anda."
    },
    {
      question: "Metode pembayaran apa yang diterima?",
      answer: "Kami menerima pembayaran melalui kartu kredit/debit, transfer bank, dan dompet digital seperti OVO, GoPay, dan DANA."
    },
    {
      question: "Bagaimana jika saya memiliki pertanyaan lain tentang langganan?",
      answer: "Silakan hubungi tim dukungan kami melalui email support@shineeducation.com atau chat langsung di aplikasi ini."
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Langganan</h1>
        <p className="text-gray-600">
          Kelola langganan Anda dan akses berbagai fitur premium
        </p>
      </div>
      
      {/* Current Subscription Details */}
      {currentPlan && (
        <SubscriptionDetails 
          userSubscription={currentSubscription} 
          planName={currentPlan.name} 
        />
      )}
      
      {/* Pricing Plans */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Paket Langganan</h2>
          
          <div>
            <Tabs defaultValue="monthly" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                <TabsTrigger value="quarterly">3 Bulan</TabsTrigger>
                <TabsTrigger value="yearly">Tahunan</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <PricingCard 
              key={plan.id} 
              plan={plan} 
              isActive={currentSubscription.subscriptionId === plan.id} 
            />
          ))}
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Manfaat Langganan Premium</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#C40503] to-[#e63e3c] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Akses Semua Kursus</h3>
            <p className="text-white/80">
              Dapatkan akses ke semua kursus dan materi pembelajaran tanpa batasan.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#DAA625] to-[#f3c14f] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Kelas Live Premium</h3>
            <p className="text-white/80">
              Ikuti kelas live interaktif bersama instruktur berpengalaman.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#C40503] to-[#DAA625] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
                <path d="M18 12c-1.1 0-2 .9-2 2s.9 2 2 2h2v-4h-2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Sertifikat Resmi</h3>
            <p className="text-white/80">
              Dapatkan sertifikat resmi setelah menyelesaikan kursus.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#DAA625] to-[#C40503] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Bimbingan Guru Pribadi</h3>
            <p className="text-white/80">
              Konsultasi dan bimbingan langsung dari guru profesional.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#C40503] to-[#e63e3c] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Akses Lebih Cepat</h3>
            <p className="text-white/80">
              Akses konten terbaru lebih dulu sebelum pengguna lain.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#DAA625] to-[#f3c14f] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Dukungan Prioritas</h3>
            <p className="text-white/80">
              Dapatkan bantuan lebih cepat dari tim dukungan kami.
            </p>
          </div>
        </div>
      </div>
      
      {/* Certificate Samples */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Contoh Sertifikat</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src="/certificates/achievement-thumb.jpg" 
                alt="Sertifikat Prestasi" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">Sertifikat Prestasi</h3>
              <p className="text-sm text-gray-600">Penghargaan untuk prestasi akademik</p>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src="/certificates/completion-thumb.jpg" 
                alt="Sertifikat Penyelesaian" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">Sertifikat Penyelesaian</h3>
              <p className="text-sm text-gray-600">Untuk menyelesaikan program pendidikan</p>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src="/certificates/participation-thumb.jpg" 
                alt="Sertifikat Partisipasi" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">Sertifikat Partisipasi</h3>
              <p className="text-sm text-gray-600">Penghargaan untuk partisipasi aktif</p>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image 
                src="/certificates/english-basic-thumb.jpg" 
                alt="Sertifikat Bahasa Inggris" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">Sertifikat Bahasa Inggris</h3>
              <p className="text-sm text-gray-600">Kemampuan bahasa Inggris dasar</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-12">
        <FAQSection faqs={faqs} />
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#C40503] to-[#DAA625] rounded-lg overflow-hidden p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tingkatkan Pengalaman Belajar Anda Sekarang
            </h2>
            <p className="text-white/90 mb-6 md:pr-6">
              Mulai perjalanan pembelajaran yang lebih baik dengan fitur premium dan konten eksklusif. Berlangganan sekarang dan dapatkan akses ke semua kursus dan materi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-[#C40503] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Lihat Semua Fitur
              </button>
              <button className="bg-[#DAA625] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b78d1f] border border-white/20 transition-colors">
                Hubungi Tim Penjualan
              </button>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-56 h-56">
              <svg className="animate-spin-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="15" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
                <path fill="none" stroke="white" strokeWidth="15" strokeDasharray="160 360" strokeLinecap="round" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">25%</div>
              <div className="absolute bottom-0 left-0 right-0 text-center text-sm font-medium">DISKON</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
