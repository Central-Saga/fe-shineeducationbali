"use client";

import { Overview } from "@/components/ui-admin/grades/Overview";
import { GradeTable } from "@/components/ui-admin/grades/GradeTable";
import { SubjectCards } from "@/components/ui-admin/grades/SubjectCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GradesPage() {
  return (
    <div className="space-y-6 p-5 md:p-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Manajemen Nilai
          </h1>
          <p className="text-gray-500 mt-2">Kelola nilai siswa dan penilaian akademik</p>
        </div>
      </div>

      {/* Overview Cards */}
      <Overview />

      {/* Grade Management Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="all"
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white px-6 py-2"
          >
            Daftar Nilai
          </TabsTrigger>
          <TabsTrigger 
            value="subjects"
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white px-6 py-2"
          >
            Per Mata Pelajaran
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <GradeTable />
        </TabsContent>

        <TabsContent value="subjects">
          <SubjectCards />
        </TabsContent>
      </Tabs>
    </div>
  );
}
