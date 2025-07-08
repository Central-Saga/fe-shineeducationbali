"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { 
  Shield, 
  Heart, 
  GraduationCap, 
  Trophy, 
  Gift, 
  Calendar, 
  Clock, 
  Users, 
  Coffee, 
  Briefcase,
  CreditCard,
  FileText,
  Check,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for benefits
const benefitsData = {
  health: {
    title: "Asuransi Kesehatan",
    icon: <Heart className="h-6 w-6 text-red-600" />,
    description: "Perlindungan kesehatan komprehensif untuk Anda dan keluarga",
    details: [
      "Pertanggungan hingga Rp 100 juta per tahun",
      "Mencakup rawat inap, rawat jalan, dan gigi",
      "Berlaku di semua rumah sakit rekanan",
      "Termasuk pertanggungan untuk pasangan dan hingga 2 anak"
    ],
    status: "active",
    coverage: "100%",
    provider: "Prudential Indonesia",
    policyNumber: "HLTH-78923-4552",
    validUntil: new Date(2026, 3, 30)
  },
  education: {
    title: "Tunjangan Pendidikan",
    icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
    description: "Dukungan finansial untuk pengembangan profesional dan akademik",
    details: [
      "Biaya pendidikan lanjutan hingga Rp 10 juta per tahun",
      "Penggantian biaya seminar dan workshop",
      "Program sertifikasi profesional",
      "Akses ke platform pembelajaran online premium"
    ],
    status: "active",
    budget: "Rp 10.000.000 / tahun",
    used: "Rp 3.500.000",
    remaining: "Rp 6.500.000",
    expiry: new Date(2025, 11, 31)
  },
  retirement: {
    title: "Program Pensiun",
    icon: <Shield className="h-6 w-6 text-green-600" />,
    description: "Jaminan masa depan melalui program pensiun dan tabungan jangka panjang",
    details: [
      "Kontribusi sekolah sebesar 5% dari gaji pokok",
      "Opsi kontribusi tambahan dari karyawan",
      "Investasi dikelola oleh manajer investasi profesional",
      "Penarikan dana tersedia setelah 5 tahun masa kerja"
    ],
    status: "active",
    contribution: "5% dari gaji pokok",
    balance: "Rp 28.500.000",
    startDate: new Date(2020, 8, 1)
  },
  bonus: {
    title: "Bonus & Insentif",
    icon: <Trophy className="h-6 w-6 text-amber-600" />,
    description: "Penghargaan berbasis kinerja dan pencapaian target",
    details: [
      "Bonus tahunan berdasarkan evaluasi kinerja",
      "Insentif kuartalan untuk pencapaian target kelas",
      "Bonus spesial untuk prestasi siswa di kompetisi",
      "Penghargaan guru teladan bulanan"
    ],
    status: "active",
    lastBonus: "Rp 3.200.000",
    lastBonusDate: new Date(2025, 5, 30),
    bonusCriteria: "Berdasarkan evaluasi kinerja dan pencapaian target"
  },
  leave: {
    title: "Cuti & Libur",
    icon: <Calendar className="h-6 w-6 text-purple-600" />,
    description: "Kebijakan cuti yang fleksibel untuk keseimbangan hidup dan kerja",
    details: [
      "12 hari cuti tahunan",
      "14 hari cuti sakit",
      "3 hari cuti personal",
      "Cuti melahirkan dan cuti penting lainnya sesuai ketentuan"
    ],
    status: "active",
    annualLeave: "12 hari / tahun",
    usedLeave: "5 hari",
    remainingLeave: "7 hari",
    resetDate: new Date(2025, 11, 31)
  },
  meal: {
    title: "Tunjangan Makan",
    icon: <Coffee className="h-6 w-6 text-yellow-700" />,
    description: "Tunjangan untuk kebutuhan makan harian",
    details: [
      "Tunjangan makan Rp 30.000 per hari kerja",
      "Disediakan melalui voucher elektronik",
      "Berlaku di seluruh merchant rekanan",
      "Diberikan setiap awal bulan"
    ],
    status: "active",
    dailyAllowance: "Rp 30.000 / hari",
    monthlyAllowance: "Rp 600.000 / bulan",
    distribution: "Awal bulan melalui voucher elektronik"
  },
  transport: {
    title: "Tunjangan Transportasi",
    icon: <Briefcase className="h-6 w-6 text-gray-600" />,
    description: "Tunjangan untuk biaya transportasi harian",
    details: [
      "Tunjangan transportasi Rp 25.000 per hari kerja",
      "Total Rp 500.000 per bulan",
      "Dibayarkan bersama dengan gaji bulanan",
      "Berlaku tanpa perlu bukti pengeluaran"
    ],
    status: "active",
    dailyAllowance: "Rp 25.000 / hari",
    monthlyAllowance: "Rp 500.000 / bulan",
    distribution: "Bersama dengan gaji bulanan"
  },
  family: {
    title: "Tunjangan Keluarga",
    icon: <Users className="h-6 w-6 text-teal-600" />,
    description: "Dukungan tambahan untuk keluarga guru",
    details: [
      "Tunjangan pasangan Rp 300.000 per bulan",
      "Tunjangan anak Rp 200.000 per anak (maks. 2 anak)",
      "Paket asuransi kesehatan keluarga",
      "Program beasiswa untuk anak guru berprestasi"
    ],
    status: "active",
    spouseAllowance: "Rp 300.000 / bulan",
    childAllowance: "Rp 200.000 / anak (maks. 2 anak)",
    totalMonthly: "Rp 700.000 / bulan"
  }
};

// Mock data for recent benefits
const recentBenefitsActivity = [
  {
    id: "BEN001",
    type: "health",
    title: "Klaim Asuransi Kesehatan",
    description: "Penggantian biaya pemeriksaan gigi",
    amount: "Rp 450.000",
    date: new Date(2025, 6, 10),
    status: "approved"
  },
  {
    id: "BEN002",
    type: "education",
    title: "Tunjangan Pendidikan",
    description: "Biaya workshop pengembangan kurikulum",
    amount: "Rp 1.200.000",
    date: new Date(2025, 5, 22),
    status: "approved"
  },
  {
    id: "BEN003",
    type: "education",
    title: "Tunjangan Pendidikan",
    description: "Biaya kursus bahasa Inggris online",
    amount: "Rp 2.300.000",
    date: new Date(2025, 3, 5),
    status: "approved"
  },
  {
    id: "BEN004",
    type: "bonus",
    title: "Bonus Kuartalan",
    description: "Bonus kuartal 2 - pencapaian target kelas",
    amount: "Rp 1.500.000",
    date: new Date(2025, 5, 30),
    status: "approved"
  },
  {
    id: "BEN005",
    type: "health",
    title: "Klaim Asuransi Kesehatan",
    description: "Penggantian biaya obat resep",
    amount: "Rp 320.000",
    date: new Date(2025, 4, 17),
    status: "approved"
  }
];

export default function BenefitsPage() {
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (benefitKey: string) => {
    setSelectedBenefit(benefitKey);
    setIsDetailsOpen(true);
  };

  const getBenefitIcon = (type: string) => {
    if (benefitsData[type as keyof typeof benefitsData]) {
      return benefitsData[type as keyof typeof benefitsData].icon;
    }
    return <Gift className="h-6 w-6 text-gray-600" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Aktif</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Tertunda</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Disetujui</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Ditolak</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Tunjangan & Manfaat</h1>
        <p className="text-gray-500 mb-6">Informasi tentang tunjangan dan manfaat yang Anda terima</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Tunjangan</CardTitle>
            <CardDescription>
              Tunjangan dan manfaat yang tersedia untuk Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(benefitsData).map(([key, benefit]) => (
                <Card 
                  key={key} 
                  className="border-l-4 hover:shadow-md transition-shadow"
                  style={{ borderLeftColor: key === 'health' ? '#ef4444' : key === 'education' ? '#2563eb' : key === 'retirement' ? '#16a34a' : key === 'bonus' ? '#d97706' : key === 'leave' ? '#9333ea' : '#6b7280' }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{benefit.title}</h3>
                        <p className="text-xs text-gray-500 mb-2">{benefit.description}</p>
                        <div className="flex justify-between items-center">
                          {getStatusBadge(benefit.status)}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDetails(key)}
                            className="text-xs h-7 hover:bg-gray-100"
                          >
                            Detail
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>
                Riwayat tunjangan dan klaim terbaru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBenefitsActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        {format(activity.date, 'dd MMM yyyy', { locale: id })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getBenefitIcon(activity.type)}
                          <span className="text-xs">{benefitsData[activity.type as keyof typeof benefitsData]?.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell className="font-medium">{activity.amount}</TableCell>
                      <TableCell>{getStatusBadge(activity.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Pembayaran</CardTitle>
              <CardDescription>
                Jadwal tunjangan yang akan datang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-green-500 pl-3 py-2 bg-green-50 rounded-r-md">
                <div className="text-sm font-medium">Gaji & Tunjangan Bulanan</div>
                <div className="text-xs text-gray-500">28 Juli 2025</div>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-3 py-2 bg-blue-50 rounded-r-md">
                <div className="text-sm font-medium">Bonus Kuartalan</div>
                <div className="text-xs text-gray-500">30 September 2025</div>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-3 py-2 bg-amber-50 rounded-r-md">
                <div className="text-sm font-medium">Tunjangan Pendidikan</div>
                <div className="text-xs text-gray-500">5 Agustus 2025</div>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-3 py-2 bg-purple-50 rounded-r-md">
                <div className="text-sm font-medium">Reset Cuti Tahunan</div>
                <div className="text-xs text-gray-500">31 Desember 2025</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Tanya Jawab Tunjangan</CardTitle>
            <CardDescription>
              Informasi umum terkait tunjangan dan manfaat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Bagaimana cara mengajukan klaim asuransi kesehatan?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Untuk mengajukan klaim asuransi kesehatan, silakan ikuti langkah berikut:
                  </p>
                  <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-600">
                    <li>Kumpulkan semua dokumen yang diperlukan (kuitansi asli, resep dokter, hasil lab)</li>
                    <li>Isi formulir klaim yang tersedia di bagian SDM atau unduh dari portal guru</li>
                    <li>Serahkan formulir beserta dokumen pendukung ke bagian SDM</li>
                    <li>Klaim akan diproses dalam 7-14 hari kerja</li>
                    <li>Dana penggantian akan ditransfer ke rekening gaji Anda</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Kapan tunjangan bonus tahunan dibayarkan?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Bonus tahunan biasanya dibayarkan pada bulan Juni setiap tahunnya, setelah proses evaluasi kinerja tahunan selesai dilakukan. Jumlah bonus ditentukan berdasarkan hasil evaluasi kinerja, pencapaian target, dan kontribusi Anda terhadap sekolah.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Bagaimana cara menggunakan tunjangan pendidikan?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Untuk menggunakan tunjangan pendidikan, ikuti prosedur berikut:
                  </p>
                  <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-600">
                    <li>Identifikasi program pengembangan profesional yang ingin diikuti</li>
                    <li>Ajukan permohonan ke kepala sekolah dengan mengisi formulir pengajuan tunjangan pendidikan</li>
                    <li>Setelah disetujui, Anda dapat membayar biaya terlebih dahulu</li>
                    <li>Serahkan bukti pembayaran dan sertifikat keikutsertaan untuk mendapatkan penggantian</li>
                    <li>Dana akan ditransfer dalam 14 hari kerja setelah dokumen lengkap diterima</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Apa yang termasuk dalam tunjangan keluarga?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Tunjangan keluarga mencakup:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                    <li>Tunjangan pasangan sebesar Rp 300.000 per bulan</li>
                    <li>Tunjangan anak sebesar Rp 200.000 per anak (maksimal untuk 2 anak)</li>
                    <li>Asuransi kesehatan keluarga untuk pasangan dan anak (hingga usia 21 tahun)</li>
                    <li>Program beasiswa untuk anak guru yang berprestasi</li>
                  </ul>
                  <p className="mt-2 text-gray-600">
                    Untuk mengaktifkan tunjangan ini, Anda perlu menyerahkan dokumen resmi seperti surat nikah dan akta kelahiran anak ke bagian SDM.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Bagaimana sistem program pensiun bekerja?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Program pensiun di Shine Education berjalan dengan sistem berikut:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                    <li>Sekolah memberikan kontribusi sebesar 5% dari gaji pokok Anda setiap bulan</li>
                    <li>Anda dapat menambahkan kontribusi sukarela dari gaji (opsional)</li>
                    <li>Dana dikelola oleh manajer investasi profesional untuk memaksimalkan pertumbuhan</li>
                    <li>Laporan tahunan akan diberikan untuk memantau pertumbuhan investasi</li>
                    <li>Dana dapat diakses setelah 5 tahun masa kerja atau saat pensiun</li>
                    <li>Penarikan dana sebelum masa pensiun akan dikenakan pajak sesuai peraturan</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* Benefit Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedBenefit && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <span className="mr-2">
                    {benefitsData[selectedBenefit as keyof typeof benefitsData].icon}
                  </span>
                  {benefitsData[selectedBenefit as keyof typeof benefitsData].title}
                </DialogTitle>
                <DialogDescription>
                  {benefitsData[selectedBenefit as keyof typeof benefitsData].description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex justify-between mb-4">
                  <Badge variant="outline" className="bg-gray-50">
                    Status: {benefitsData[selectedBenefit as keyof typeof benefitsData].status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                  </Badge>
                  
                  {selectedBenefit === 'health' && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Coverage: {benefitsData.health.coverage}
                    </Badge>
                  )}
                  
                  {selectedBenefit === 'education' && (
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Sisa: {benefitsData.education.remaining}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Rincian Manfaat</h4>
                    <ul className="space-y-2">
                      {benefitsData[selectedBenefit as keyof typeof benefitsData].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedBenefit === 'health' && (
                    <div className="bg-gray-50 p-3 rounded-md space-y-2">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium">Informasi Polis</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm pl-6">
                        <div className="text-gray-500">Provider:</div>
                        <div>{benefitsData.health.provider}</div>
                        <div className="text-gray-500">Nomor Polis:</div>
                        <div>{benefitsData.health.policyNumber}</div>
                        <div className="text-gray-500">Berlaku Hingga:</div>
                        <div>{format(benefitsData.health.validUntil, 'dd MMMM yyyy', { locale: id })}</div>
                      </div>
                    </div>
                  )}
                  
                  {selectedBenefit === 'education' && (
                    <div className="bg-gray-50 p-3 rounded-md space-y-2">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium">Penggunaan Tunjangan</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm pl-6">
                        <div className="text-gray-500">Total Budget:</div>
                        <div>{benefitsData.education.budget}</div>
                        <div className="text-gray-500">Telah Digunakan:</div>
                        <div>{benefitsData.education.used}</div>
                        <div className="text-gray-500">Sisa:</div>
                        <div>{benefitsData.education.remaining}</div>
                        <div className="text-gray-500">Berlaku Hingga:</div>
                        <div>{format(benefitsData.education.expiry, 'dd MMMM yyyy', { locale: id })}</div>
                      </div>
                      <div className="mt-2 pl-6">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: '35%' }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          35% dari budget telah digunakan
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedBenefit === 'retirement' && (
                    <div className="bg-gray-50 p-3 rounded-md space-y-2">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium">Informasi Dana Pensiun</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm pl-6">
                        <div className="text-gray-500">Kontribusi:</div>
                        <div>{benefitsData.retirement.contribution}</div>
                        <div className="text-gray-500">Saldo Saat Ini:</div>
                        <div>{benefitsData.retirement.balance}</div>
                        <div className="text-gray-500">Tanggal Mulai:</div>
                        <div>{format(benefitsData.retirement.startDate, 'dd MMMM yyyy', { locale: id })}</div>
                      </div>
                    </div>
                  )}
                  
                  {selectedBenefit === 'bonus' && (
                    <div className="bg-gray-50 p-3 rounded-md space-y-2">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium">Informasi Bonus</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm pl-6">
                        <div className="text-gray-500">Bonus Terakhir:</div>
                        <div>{benefitsData.bonus.lastBonus}</div>
                        <div className="text-gray-500">Tanggal:</div>
                        <div>{format(benefitsData.bonus.lastBonusDate, 'dd MMMM yyyy', { locale: id })}</div>
                        <div className="text-gray-500">Kriteria:</div>
                        <div>{benefitsData.bonus.bonusCriteria}</div>
                      </div>
                    </div>
                  )}
                  
                  {selectedBenefit === 'leave' && (
                    <div className="bg-gray-50 p-3 rounded-md space-y-2">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium">Informasi Cuti</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm pl-6">
                        <div className="text-gray-500">Jatah Cuti Tahunan:</div>
                        <div>{benefitsData.leave.annualLeave}</div>
                        <div className="text-gray-500">Telah Digunakan:</div>
                        <div>{benefitsData.leave.usedLeave}</div>
                        <div className="text-gray-500">Sisa Cuti:</div>
                        <div>{benefitsData.leave.remainingLeave}</div>
                        <div className="text-gray-500">Reset Pada:</div>
                        <div>{format(benefitsData.leave.resetDate, 'dd MMMM yyyy', { locale: id })}</div>
                      </div>
                      <div className="mt-2 pl-6">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            style={{ width: '42%' }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          42% dari jatah cuti telah digunakan
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(selectedBenefit === 'meal' || selectedBenefit === 'transport' || selectedBenefit === 'family') && (
                    <div className="bg-gray-50 p-3 rounded-md space-y-2">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium">Rincian Tunjangan</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm pl-6">
                        {selectedBenefit === 'meal' && (
                          <>
                            <div className="text-gray-500">Tunjangan Harian:</div>
                            <div>{benefitsData.meal.dailyAllowance}</div>
                            <div className="text-gray-500">Total Bulanan:</div>
                            <div>{benefitsData.meal.monthlyAllowance}</div>
                            <div className="text-gray-500">Distribusi:</div>
                            <div>{benefitsData.meal.distribution}</div>
                          </>
                        )}
                        
                        {selectedBenefit === 'transport' && (
                          <>
                            <div className="text-gray-500">Tunjangan Harian:</div>
                            <div>{benefitsData.transport.dailyAllowance}</div>
                            <div className="text-gray-500">Total Bulanan:</div>
                            <div>{benefitsData.transport.monthlyAllowance}</div>
                            <div className="text-gray-500">Distribusi:</div>
                            <div>{benefitsData.transport.distribution}</div>
                          </>
                        )}
                        
                        {selectedBenefit === 'family' && (
                          <>
                            <div className="text-gray-500">Tunjangan Pasangan:</div>
                            <div>{benefitsData.family.spouseAllowance}</div>
                            <div className="text-gray-500">Tunjangan Anak:</div>
                            <div>{benefitsData.family.childAllowance}</div>
                            <div className="text-gray-500">Total Bulanan:</div>
                            <div>{benefitsData.family.totalMonthly}</div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Tutup
                </Button>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Lihat Kebijakan Lengkap
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
