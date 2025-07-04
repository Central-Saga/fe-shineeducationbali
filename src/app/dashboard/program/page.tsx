"use client";

import ProgramList from "@/components/ui-admin/program/ProgramList";
import { Search, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProgramPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Katalog Program
          </h2>
          <p className="text-gray-500 mt-1">
            Kelola daftar program pembelajaran yang tersedia
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input 
              placeholder="Cari program..." 
              className="pl-10 w-full md:w-64" 
            />
          </div>
          <Button className="bg-[#C40503] hover:bg-[#A60000] text-white">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Program
          </Button>
        </div>
      </div>
      <ProgramList />
    </div>
  );
}
