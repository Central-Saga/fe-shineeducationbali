"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, parse, subYears } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar as CalendarIcon, BarChart3, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Generate mock salary data for past years
const generateYearlyData = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < 5; i++) {
    const year = currentYear - i;
    
    // Base amounts with slight yearly increases
    const baseSalary = 5000000 + (i * 200000); // Rp 5,000,000 with yearly increases
    const teachingAllowance = 1200000 + (i * 100000);
    const positionAllowance = 750000 + (i * 50000);
    const transportAllowance = 500000;
    const mealAllowance = 600000;
    
    // Tax rate decreases slightly over time (showing career progression)
    const taxRate = 0.05 + (i * 0.002);
    
    // Calculate monthly data
    const monthlyData = [];
    for (let month = 0; month < 12; month++) {
      // Skip future months for current year
      if (year === currentYear && month > new Date().getMonth()) {
        continue;
      }
      
      // Add random variations per month (±5%)
      const variation = 0.95 + (Math.random() * 0.1);
      
      const monthlySalary = Math.round(baseSalary * variation);
      const monthlyTeaching = Math.round(teachingAllowance * variation);
      
      const grossSalary = monthlySalary + monthlyTeaching + positionAllowance + transportAllowance + mealAllowance;
      const tax = Math.round(grossSalary * taxRate);
      const insurance = 150000;
      const netSalary = grossSalary - tax - insurance;
      
      monthlyData.push({
        month,
        monthName: format(new Date(year, month, 1), 'MMMM', { locale: id }),
        grossSalary,
        netSalary,
        components: {
          baseSalary: monthlySalary,
          teachingAllowance: monthlyTeaching,
          positionAllowance,
          transportAllowance,
          mealAllowance,
        },
        deductions: {
          tax,
          insurance,
        }
      });
    }
    
    // Calculate yearly totals
    const yearlyGross = monthlyData.reduce((sum, m) => sum + m.grossSalary, 0);
    const yearlyNet = monthlyData.reduce((sum, m) => sum + m.netSalary, 0);
    const yearlyTax = monthlyData.reduce((sum, m) => sum + m.deductions.tax, 0);
    const yearlyInsurance = monthlyData.reduce((sum, m) => sum + m.deductions.insurance, 0);
    
    // Calculate averages
    const avgGross = Math.round(yearlyGross / monthlyData.length);
    const avgNet = Math.round(yearlyNet / monthlyData.length);
    
    years.push({
      year,
      monthlyData,
      totals: {
        gross: yearlyGross,
        net: yearlyNet,
        tax: yearlyTax,
        insurance: yearlyInsurance,
      },
      averages: {
        gross: avgGross,
        net: avgNet,
      }
    });
  }
  
  return years;
};

const salaryData = generateYearlyData();

export default function SalaryHistoryPage() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const yearData = salaryData.find(y => y.year === selectedYear) || salaryData[0];
  
  // Calculate year-on-year percentage changes
  const getYearOnYearChange = () => {
    const currentYearIndex = salaryData.findIndex(y => y.year === selectedYear);
    if (currentYearIndex < salaryData.length - 1) {
      const currentYear = salaryData[currentYearIndex];
      const previousYear = salaryData[currentYearIndex + 1];
      
      const grossChange = ((currentYear.averages.gross - previousYear.averages.gross) / previousYear.averages.gross) * 100;
      const netChange = ((currentYear.averages.net - previousYear.averages.net) / previousYear.averages.net) * 100;
      
      return {
        gross: grossChange.toFixed(1),
        net: netChange.toFixed(1)
      };
    }
    
    return { gross: '0.0', net: '0.0' };
  };
  
  const yearOnYearChange = getYearOnYearChange();
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Riwayat Gaji</h1>
        <p className="text-gray-500 mb-6">Lihat dan analisis riwayat pembayaran gaji Anda</p>
      </motion.div>

      <div className="flex justify-end mb-4">
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(parseInt(value))}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            {salaryData.map((year) => (
              <SelectItem key={year.year} value={year.year.toString()}>
                {year.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Gaji Kotor Rata-rata</CardTitle>
              <CardDescription>Per bulan di {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-3xl font-bold">
                  {formatCurrency(yearData.averages.gross)}
                </div>
                <div className="flex items-center mt-2">
                  {parseFloat(yearOnYearChange.gross) > 0 ? (
                    <>
                      <div className="bg-green-100 text-green-800 p-1 rounded-full mr-2">
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-green-600">
                        +{yearOnYearChange.gross}% dari tahun sebelumnya
                      </span>
                    </>
                  ) : parseFloat(yearOnYearChange.gross) < 0 ? (
                    <>
                      <div className="bg-red-100 text-red-800 p-1 rounded-full mr-2">
                        <ArrowDownRight className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-red-600">
                        {yearOnYearChange.gross}% dari tahun sebelumnya
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-500">
                      Tidak ada perubahan dari tahun sebelumnya
                    </span>
                  )}
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
            <CardHeader className="pb-2">
              <CardTitle>Gaji Bersih Rata-rata</CardTitle>
              <CardDescription>Per bulan di {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-3xl font-bold">
                  {formatCurrency(yearData.averages.net)}
                </div>
                <div className="flex items-center mt-2">
                  {parseFloat(yearOnYearChange.net) > 0 ? (
                    <>
                      <div className="bg-green-100 text-green-800 p-1 rounded-full mr-2">
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-green-600">
                        +{yearOnYearChange.net}% dari tahun sebelumnya
                      </span>
                    </>
                  ) : parseFloat(yearOnYearChange.net) < 0 ? (
                    <>
                      <div className="bg-red-100 text-red-800 p-1 rounded-full mr-2">
                        <ArrowDownRight className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-red-600">
                        {yearOnYearChange.net}% dari tahun sebelumnya
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-500">
                      Tidak ada perubahan dari tahun sebelumnya
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Pendapatan</CardTitle>
              <CardDescription>Keseluruhan di {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(yearData.totals.net)}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Gaji Kotor: {formatCurrency(yearData.totals.gross)}
              </div>
              <div className="text-sm text-gray-500">
                Total Pajak: {formatCurrency(yearData.totals.tax)}
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
            <CardTitle>Pembayaran Gaji Bulanan {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-[300px] w-full mb-6">
              {/* This is a placeholder for a chart. In a real app, you would use a charting library like Chart.js or Recharts */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Visualisasi grafik gaji bulanan akan ditampilkan di sini
                  </p>
                </div>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bulan</TableHead>
                  <TableHead>Gaji Pokok</TableHead>
                  <TableHead>Tunjangan Mengajar</TableHead>
                  <TableHead>Tunjangan Lain</TableHead>
                  <TableHead>Pajak</TableHead>
                  <TableHead>Gaji Bersih</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearData.monthlyData.map((month) => (
                  <TableRow key={month.month}>
                    <TableCell className="font-medium">{month.monthName}</TableCell>
                    <TableCell>{formatCurrency(month.components.baseSalary)}</TableCell>
                    <TableCell>{formatCurrency(month.components.teachingAllowance)}</TableCell>
                    <TableCell>
                      {formatCurrency(
                        month.components.positionAllowance +
                        month.components.transportAllowance +
                        month.components.mealAllowance
                      )}
                    </TableCell>
                    <TableCell>{formatCurrency(month.deductions.tax)}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(month.netSalary)}</TableCell>
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
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Analisis Komponen Gaji</CardTitle>
            <CardDescription>Komposisi rata-rata gaji bulanan di {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="composition">
              <TabsList className="mb-4">
                <TabsTrigger value="composition">Komposisi Gaji</TabsTrigger>
                <TabsTrigger value="trend">Tren Tahunan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="composition">
                <div className="relative h-[300px] w-full">
                  {/* This is a placeholder for a pie chart. In a real app, you would use a charting library */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Visualisasi diagram komposisi gaji akan ditampilkan di sini
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Pendapatan</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm">Gaji Pokok</div>
                          <div className="text-sm font-medium">
                            {formatCurrency(yearData.monthlyData[0].components.baseSalary)}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(yearData.monthlyData[0].components.baseSalary / yearData.monthlyData[0].grossSalary) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm">Tunjangan Mengajar</div>
                          <div className="text-sm font-medium">
                            {formatCurrency(yearData.monthlyData[0].components.teachingAllowance)}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(yearData.monthlyData[0].components.teachingAllowance / yearData.monthlyData[0].grossSalary) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm">Tunjangan Jabatan</div>
                          <div className="text-sm font-medium">
                            {formatCurrency(yearData.monthlyData[0].components.positionAllowance)}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${(yearData.monthlyData[0].components.positionAllowance / yearData.monthlyData[0].grossSalary) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm">Tunjangan Lainnya</div>
                          <div className="text-sm font-medium">
                            {formatCurrency(
                              yearData.monthlyData[0].components.transportAllowance +
                              yearData.monthlyData[0].components.mealAllowance
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-amber-600 h-2 rounded-full" 
                            style={{ 
                              width: `${((yearData.monthlyData[0].components.transportAllowance + yearData.monthlyData[0].components.mealAllowance) / yearData.monthlyData[0].grossSalary) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Potongan</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm">Pajak Penghasilan</div>
                          <div className="text-sm font-medium">
                            {formatCurrency(yearData.monthlyData[0].deductions.tax)}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${(yearData.monthlyData[0].deductions.tax / yearData.monthlyData[0].grossSalary) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm">Asuransi</div>
                          <div className="text-sm font-medium">
                            {formatCurrency(yearData.monthlyData[0].deductions.insurance)}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-rose-600 h-2 rounded-full" 
                            style={{ width: `${(yearData.monthlyData[0].deductions.insurance / yearData.monthlyData[0].grossSalary) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t mt-6">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm font-semibold">Gaji Bersih</div>
                          <div className="text-sm font-semibold">
                            {formatCurrency(yearData.monthlyData[0].netSalary)}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(yearData.monthlyData[0].netSalary / yearData.monthlyData[0].grossSalary) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trend">
                <div className="relative h-[300px] w-full">
                  {/* This is a placeholder for a line chart. In a real app, you would use a charting library */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Visualisasi grafik tren gaji tahunan akan ditampilkan di sini
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
