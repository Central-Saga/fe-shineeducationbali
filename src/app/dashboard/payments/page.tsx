"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui-admin/layout/Header";
import { DollarSign, Package, Users, CreditCard, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";

export default function PaymentsPage() {
  const paymentModules = [
    {
      title: "Transaksi",
      description: "Kelola semua transaksi pembayaran",
      href: "/dashboard/payments/transactions",
      icon: <CreditCard className="h-8 w-8" />,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      stats: "1,234 transaksi",
    },
    {
      title: "Gaji Guru",
      description: "Kelola gaji dan pembayaran untuk guru",
      href: "/dashboard/payments/teacher-salary",
      icon: <Users className="h-8 w-8" />,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      stats: "45 guru",
    },
    {
      title: "Paket Program",
      description: "Kelola paket program yang dibeli siswa",
      href: "/dashboard/payments/student-packages",
      icon: <Package className="h-8 w-8" />,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      stats: "567 paket",
    },
  ];

  const quickStats = [
    {
      title: "Total Revenue",
      value: "Rp 125,000,000",
      description: "Bulan ini",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      color: "bg-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Payments",
      value: "23",
      description: "Menunggu pembayaran",
      icon: <Calendar className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Growth Rate",
      value: "+12.5%",
      description: "Dari bulan lalu",
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <Header
      header={{
        title: "Payment Management",
        description: "Kelola semua aspek pembayaran dan keuangan",
      }}
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md">
              <div className={`h-1 w-full ${stat.color}`}></div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                    <span className={`inline-block h-2 w-2 rounded-full ${stat.color}`}></span>
                    {stat.description}
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Payment Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentModules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${module.bgColor}`}>
                    <div className={`${module.color} text-white`}>
                      {module.icon}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {module.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    {module.stats}
                  </div>
                  <Link href={module.href}>
                    <Button className="w-full" variant="outline">
                      Kelola {module.title}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Transaksi dan pembayaran terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Pembayaran gaji guru</p>
                    <p className="text-xs text-gray-500">John Smith - Rp 5,500,000</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 jam yang lalu</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Paket program baru</p>
                    <p className="text-xs text-gray-500">Ayu Putri - English Basic Package</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">4 jam yang lalu</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Pembayaran pending</p>
                    <p className="text-xs text-gray-500">Made Wirawan - Computer Premium Package</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">6 jam yang lalu</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
}
