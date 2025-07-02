
"use client";

import { ClassList } from "@/components/ui-admin/classes/ClassList";

export default function ClassesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Class Management</h2>
          <p className="text-muted-foreground">
            Kelola kelas pembelajaran dan jadwal
          </p>
        </div>
      </div>
      <ClassList />
    </div>
  );
}
