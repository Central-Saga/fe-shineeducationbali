"use client";

import { Overview } from "@/components/ui-admin/grades/Overview";
import { GradeTable } from "@/components/ui-admin/grades/GradeTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GradesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
        Manajemen Nilai
      </h1>

      {/* Overview Cards */}
      <Overview />

      {/* Grade Management Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Daftar Nilai</TabsTrigger>
          <TabsTrigger value="subjects">Per Mata Pelajaran</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <GradeTable />
        </TabsContent>

        <TabsContent value="subjects">
          {/* Ini akan diimplementasikan nanti untuk view per mata pelajaran */}
          <div className="text-center py-8 text-muted-foreground">
            Fitur tampilan per mata pelajaran akan segera hadir
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
