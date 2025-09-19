"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, RefreshCw } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { UserSubscription } from '@/data/data-student/subscription-data';

interface SubscriptionDetailsProps {
  userSubscription: UserSubscription;
  planName: string;
}

export function SubscriptionDetails({ userSubscription, planName }: SubscriptionDetailsProps) {
  // Calculate days remaining
  const endDate = new Date(userSubscription.endDate);
  const today = new Date();
  const totalDays = (endDate.getTime() - new Date(userSubscription.startDate).getTime()) / (1000 * 3600 * 24);
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));
  const progressPercentage = Math.max(0, Math.min(100, ((totalDays - daysRemaining) / totalDays) * 100));
  
  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-[#DAA625]" />
            <span>Detail Langganan</span>
          </div>
          <Badge className={
            userSubscription.status === 'active'
              ? 'bg-green-500 hover:bg-green-600'
              : userSubscription.status === 'expired'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
          }>
            {userSubscription.status === 'active' ? 'Aktif' :
             userSubscription.status === 'expired' ? 'Kadaluarsa' : 'Dibatalkan'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Paket {planName}</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Periode Langganan</span>
                  <span className="font-medium">{daysRemaining} hari tersisa</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatDate(userSubscription.startDate)}</span>
                  <span>{formatDate(userSubscription.endDate)}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <RefreshCw className="h-4 w-4 mr-2 text-[#C40503]" />
                    Perpanjangan Otomatis
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="toggle" 
                      id="autoRenew" 
                      checked={userSubscription.autoRenew}
                      readOnly
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                    />
                    <label 
                      htmlFor="autoRenew" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        userSubscription.autoRenew ? 'bg-[#C40503]' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Langganan Anda akan diperpanjang secara otomatis pada {formatDate(userSubscription.nextPaymentDate)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4 md:border-t-0 md:border-l md:pl-6 md:pt-0">
            <h3 className="text-lg font-semibold mb-4">Detail Pembayaran</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Metode Pembayaran</span>
                <span className="font-medium">{userSubscription.paymentMethod}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Pembayaran Terakhir</span>
                <span className="font-medium">{formatDate(userSubscription.lastPaymentDate)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Pembayaran Berikutnya</span>
                <span className="font-medium">{formatDate(userSubscription.nextPaymentDate)}</span>
              </div>
              
              {userSubscription.status === 'active' && (
                <div className="pt-4">
                  <button className="w-full bg-[#C40503] text-white py-2 rounded hover:bg-[#a60402] transition-colors">
                    Ubah Metode Pembayaran
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Invoice History */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Riwayat Tagihan</h3>
          
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userSubscription.invoiceHistory.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(invoice.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(invoice.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : invoice.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }>
                        {invoice.status === 'paid' ? 'Lunas' :
                         invoice.status === 'pending' ? 'Menunggu' : 'Gagal'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#C40503] hover:text-[#a60402]">
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
