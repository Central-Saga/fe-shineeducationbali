"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CourseFilterProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function CourseFilter({ onSearchChange, onCategoryChange, onStatusChange }: CourseFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Cari kursus..." 
          className="pl-10"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="Matematika">Matematika</SelectItem>
            <SelectItem value="Bahasa Inggris">Bahasa Inggris</SelectItem>
            <SelectItem value="IPA">Ilmu Pengetahuan Alam</SelectItem>
            <SelectItem value="Teknologi">Teknologi</SelectItem>
            <SelectItem value="Dasar">Dasar</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="enrolled">Sedang Dipelajari</SelectItem>
            <SelectItem value="completed">Selesai</SelectItem>
            <SelectItem value="not-started">Belum Dimulai</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
