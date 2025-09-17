"use client";

import ProgramList from "@/components/ui-admin/program/ProgramList";
// import { Search, PlusCircle } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

export default function ProgramPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <ProgramList />
    </div>
  );
}
