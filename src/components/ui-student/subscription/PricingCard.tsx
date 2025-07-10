"use client";

import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from 'lucide-react';
import { Subscription } from '@/data/data-student/subscription-data';

interface PricingCardProps {
  plan: Subscription;
  isActive?: boolean;
}

export function PricingCard({ plan, isActive = false }: PricingCardProps) {
  // Format price with Indonesian Rupiah format
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(plan.price);

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${isActive ? 'ring-2 ring-[#C40503]' : ''} hover:shadow-lg`}>
      {plan.isPopular && (
        <div className="bg-[#DAA625] text-white text-xs font-bold uppercase tracking-wide py-1 text-center">
          Terpopuler
        </div>
      )}
      
      <CardContent className="pt-6 pb-4 px-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold">{formattedPrice}</span>
            <span className="text-gray-500 ml-1">/ bulan</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-[#C40503] mr-2 shrink-0 mt-0.5" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pb-6 px-6">
        <div className="w-full">
          {isActive ? (
            <div className="w-full flex flex-col gap-2">
              <Badge className="bg-green-500 hover:bg-green-600 self-center px-3 py-1">
                Aktif
              </Badge>
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Kelola Langganan
              </button>
            </div>
          ) : (
            <button 
              className={`w-full py-2 rounded-lg transition-colors ${
                plan.color === '#C40503'
                  ? 'bg-[#C40503] text-white hover:bg-[#a60402]'
                  : plan.color === '#DAA625'
                    ? 'bg-[#DAA625] text-white hover:bg-[#b78d1f]'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Pilih Paket
            </button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
