"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, subMonths } from 'date-fns';
import { id } from 'date-fns/locale';
import { Download, FileText, DollarSign, CreditCard, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";

// Mock data for salary slip
const generateMockSalary = (month: number, year: number) => {
  const baseAmount = 5000000; // Base salary Rp 5,000,000
  
  // Generate consistent random variations
  const randomFactor = ((month * year) % 10) / 100; // 0% to 9% variation
  
  const baseSalary = baseAmount;
  const teachingAllowance = Math.round(1200000 * (1 + randomFactor));
  const positionAllowance = 750000;
  const transportAllowance = 500000;
  const mealAllowance = 600000;
  
  const grossSalary = baseSalary + teachingAllowance + positionAllowance + transportAllowance + mealAllowance;
  
  const taxDeduction = Math.round(grossSalary * 0.05);
  const insuranceDeduction = 150000;
  const otherDeductions = 0;
  
  const totalDeductions = taxDeduction + insuranceDeduction + otherDeductions;
  const netSalary = grossSalary - totalDeductions;
  
  const isPaid = new Date(year, month) < new Date();
  
  return {
    month,
    year,
    paymentDate: isPaid ? format(new Date(year, month, 28), 'dd MMMM yyyy', { locale: id }) : '-',
    status: isPaid ? 'paid' : 'upcoming',
    earnings: {
      baseSalary,
      teachingAllowance,
      positionAllowance,
      transportAllowance,
      mealAllowance,
      totalEarnings: grossSalary
    },
    deductions: {
      taxDeduction,
      insuranceDeduction,
      otherDeductions,
      totalDeductions
    },
    netSalary
  };
};

// Generate salary data for the past 12 months
const generateSalaryHistory = () => {
  const history = [];
  const today = new Date();
  
  for (let i = 0; i < 12; i++) {
    const date = subMonths(today, i);
    const month = date.getMonth();
    const year = date.getFullYear();
    
    history.push({
      id: `SAL-${year}${(month + 1).toString().padStart(2, '0')}`,
      date: new Date(year, month, 1),
      ...generateMockSalary(month, year)
    });
  }
  
  return history;
};

const salaryHistory = generateSalaryHistory();

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default function PayslipPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'yyyy-MM'));
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState<{
    id: string;
    month: number;
    year: number;
    date: Date;
    paymentDate?: string;
    basicSalary: number;
    allowances: { type: string; amount: number }[];
    deductions: { type: string; amount: number }[];
    netSalary: number;
    totalAllowances: number;
    totalDeductions: number;
    status: string;
  } | null>(null);
  
  const handleViewPayslip = (payslip: any) => {
    // Convert the payslip data to the expected format
    const convertedPayslip = {
      id: payslip.id,
      month: payslip.month,
      year: payslip.year,
      date: payslip.date,
      paymentDate: payslip.paymentDate,
      basicSalary: payslip.earnings.baseSalary,
      allowances: [
        { type: 'Tunjangan Mengajar', amount: payslip.earnings.teachingAllowance },
        { type: 'Tunjangan Jabatan', amount: payslip.earnings.positionAllowance },
        { type: 'Tunjangan Transport', amount: payslip.earnings.transportAllowance },
        { type: 'Tunjangan Makan', amount: payslip.earnings.mealAllowance }
      ],
      deductions: [
        { type: 'Pajak Penghasilan', amount: payslip.deductions.taxDeduction },
        { type: 'BPJS Kesehatan', amount: payslip.deductions.healthInsurance },
        { type: 'BPJS Ketenagakerjaan', amount: payslip.deductions.employmentInsurance },
        { type: 'Potongan Lainnya', amount: payslip.deductions.otherDeductions }
      ],
      netSalary: payslip.netSalary,
      totalAllowances: payslip.earnings.totalEarnings - payslip.earnings.baseSalary,
      totalDeductions: payslip.deductions.totalDeductions,
      status: payslip.status
    };
    setSelectedPayslip(convertedPayslip);
    setIsDetailsOpen(true);
  };
  
  const handleDownloadPayslip = () => {
    // In a real app, this would trigger a PDF download
    alert('Slip gaji akan diunduh sebagai PDF');
  };
  
  const [year, month] = selectedMonth.split('-').map(Number);
  const filteredHistory = salaryHistory.filter(
    item => item.year === year && item.month === month - 1
  );
  
  const latestPayslip = salaryHistory[0];
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Slip Gaji</h1>
        <p className="text-gray-500 mb-6">Lihat dan unduh slip gaji bulanan Anda</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Slip Gaji Terakhir</CardTitle>
                <CardDescription>
                  {format(latestPayslip.date, 'MMMM yyyy', { locale: id })}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => handleViewPayslip(latestPayslip)}
              >
                <span className="sr-only">Lihat Detail</span>
                <FileText className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Status</div>
                    <Badge
                      className={
                        latestPayslip.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }
                    >
                      {latestPayslip.status === 'paid' ? 'Dibayarkan' : 'Akan Datang'}
                    </Badge>
                  </div>
                  {latestPayslip.status === 'paid' && (
                    <div className="text-xs text-gray-500 mt-1">
                      Dibayarkan pada {latestPayslip.paymentDate}
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-baseline justify-between mb-4">
                    <div className="text-2xl font-bold">{formatCurrency(latestPayslip.netSalary)}</div>
                    <div className="text-sm text-gray-500">Gaji Bersih</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Pendapatan</div>
                      <div className="text-lg font-semibold text-green-600">
                        {formatCurrency(latestPayslip.earnings.totalEarnings)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Potongan</div>
                      <div className="text-lg font-semibold text-red-600">
                        {formatCurrency(latestPayslip.deductions.totalDeductions)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="text-blue-600"
                    onClick={() => handleDownloadPayslip()}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Unduh Slip Gaji
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Tunjangan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Tunjangan Mengajar</div>
                  <div className="text-sm text-gray-500">
                    Berdasarkan jam mengajar
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Tunjangan Jabatan</div>
                  <div className="text-sm text-gray-500">
                    Berdasarkan posisi
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="font-medium">Tunjangan Lainnya</div>
                  <div className="text-sm text-gray-500">
                    Transportasi & makan
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Arsip Slip Gaji</CardTitle>
              <div className="w-48">
                <Select
                  value={selectedMonth}
                  onValueChange={setSelectedMonth}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    {salaryHistory.map((item) => (
                      <SelectItem
                        key={`${item.year}-${item.month + 1}`}
                        value={`${item.year}-${(item.month + 1).toString().padStart(2, '0')}`}
                      >
                        {format(item.date, 'MMMM yyyy', { locale: id })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Tanggal Bayar</TableHead>
                  <TableHead>Gaji Kotor</TableHead>
                  <TableHead>Potongan</TableHead>
                  <TableHead>Gaji Bersih</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        {format(item.date, 'MMMM yyyy', { locale: id })}
                      </TableCell>
                      <TableCell>{item.paymentDate}</TableCell>
                      <TableCell>{formatCurrency(item.earnings.totalEarnings)}</TableCell>
                      <TableCell>{formatCurrency(item.deductions.totalDeductions)}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(item.netSalary)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }
                        >
                          {item.status === 'paid' ? 'Dibayarkan' : 'Akan Datang'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewPayslip(item)}
                          >
                            Detail
                          </Button>
                          {item.status === 'paid' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadPayslip()}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      Tidak ada data slip gaji untuk periode ini
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payslip Detail Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detail Slip Gaji</DialogTitle>
            <DialogDescription>
              {selectedPayslip && (
                <>
                  {format(selectedPayslip.date, 'MMMM yyyy', { locale: id })} • ID: {selectedPayslip.id}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayslip && (
            <div className="space-y-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Shine Education</h3>
                  <p className="text-sm text-gray-500">Slip Gaji Guru</p>
                </div>
                <Badge
                  className={
                    selectedPayslip.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }
                >
                  {selectedPayslip.status === 'paid' ? 'Dibayarkan' : 'Akan Datang'}
                </Badge>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Pendapatan</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gaji Pokok</span>
                    <span>{formatCurrency(selectedPayslip.basicSalary)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tunjangan Mengajar</span>
                    <span>{formatCurrency(selectedPayslip.allowances[0]?.amount || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tunjangan Jabatan</span>
                    <span>{formatCurrency(selectedPayslip.allowances[1]?.amount || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tunjangan Transportasi</span>
                    <span>{formatCurrency(selectedPayslip.allowances[2]?.amount || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tunjangan Makan</span>
                    <span>{formatCurrency(selectedPayslip.allowances[3]?.amount || 0)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-dashed pt-2 mt-2">
                    <span>Total Pendapatan</span>
                    <span className="text-green-600">{formatCurrency(selectedPayslip.basicSalary + selectedPayslip.totalAllowances)}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Potongan</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pajak Penghasilan</span>
                    <span>{formatCurrency(selectedPayslip.deductions[0]?.amount || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Asuransi Kesehatan</span>
                    <span>{formatCurrency(selectedPayslip.deductions[1]?.amount || 0)}</span>
                  </div>
                  {selectedPayslip.deductions[3]?.amount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Potongan Lainnya</span>
                      <span>{formatCurrency(selectedPayslip.deductions[3]?.amount || 0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold border-t border-dashed pt-2 mt-2">
                    <span>Total Potongan</span>
                    <span className="text-red-600">{formatCurrency(selectedPayslip.totalDeductions)}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Gaji Bersih</span>
                  <span className="text-xl font-bold">{formatCurrency(selectedPayslip.netSalary)}</span>
                </div>
                {selectedPayslip.status === 'paid' && (
                  <div className="text-sm text-gray-500 mt-2">
                    Dibayarkan pada {selectedPayslip.paymentDate}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedPayslip && selectedPayslip.status === 'paid' && (
              <Button onClick={handleDownloadPayslip}>
                <Download className="mr-2 h-4 w-4" />
                Unduh PDF
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
