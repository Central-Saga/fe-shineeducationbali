
"use client";

import { ClassList } from "@/components/ui-admin/classes/ClassList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function ClassesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Class Management
          </h2>
          <p className="text-gray-500 mt-1">
            Kelola kelas pembelajaran dan jadwal
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              placeholder="Cari kelas..." 
              className="pl-10 w-full md:w-64" 
            />
          </div>
          <Link href="/dashboard/class/add">
            <Button className="bg-[#C40503] hover:bg-[#A60000] text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Kelas
            </Button>
          </Link>
        </div>
      </div>
      <ClassList />
    </div>
  );
}
