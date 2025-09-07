"use client";

import React from 'react';
import { PricingCard } from "@/components/ui-student/subscription/PricingCard";
import { SubscriptionDetails } from "@/components/ui-student/subscription/SubscriptionDetails";
import { FAQSection } from "@/components/ui-student/subscription/FAQSection";
import { subscriptionPlans, currentSubscription } from "@/data/data-student/subscription-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Calendar, BookOpen, Users, Award, Zap, Headphones, Star } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#C40503]/10 rounded-lg">
              <CreditCard className="h-6 w-6 text-[#C40503]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Langganan</h1>
          </div>
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
          <div className="bg-[#C40503] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Akses Semua Kursus</h3>
            <p className="text-white/80">
              Dapatkan akses ke semua kursus dan materi pembelajaran tanpa batasan.
            </p>
          </div>
          
          <div className="bg-[#DAA625] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Kelas Live Premium</h3>
            <p className="text-white/80">
              Ikuti kelas live interaktif bersama instruktur berpengalaman.
            </p>
          </div>
          
          <div className="bg-[#DAA521] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sertifikat Resmi</h3>
            <p className="text-white/80">
              Dapatkan sertifikat resmi setelah menyelesaikan kursus.
            </p>
          </div>
          
          <div className="bg-[#C40503] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Bimbingan Guru Pribadi</h3>
            <p className="text-white/80">
              Konsultasi dan bimbingan langsung dari guru profesional.
            </p>
          </div>
          
          <div className="bg-[#DAA625] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Akses Lebih Cepat</h3>
            <p className="text-white/80">
              Akses konten terbaru lebih dulu sebelum pengguna lain.
            </p>
          </div>
          
          <div className="bg-[#DAA521] p-6 rounded-lg text-white">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Headphones className="h-6 w-6" />
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
      <div className="bg-[#C40503] rounded-lg overflow-hidden p-6 md:p-8 text-white">
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
              <button className="bg-[#DAA521] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b78d1f] border border-white/20 transition-colors">
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
    </div>
  );
}
