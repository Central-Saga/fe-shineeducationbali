"use client";

import ProgramList from "@/components/ui-admin/program/ProgramList";

export default function ProgramPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Katalog Program</h2>
          <p className="text-muted-foreground">
            Kelola daftar program pembelajaran yang tersedia
          </p>
        </div>
      </div>
      {/* Komponen ProgramList akan ditambahkan di sini */}
      <ProgramList />
    </div>
  );
}
