
"use client";

import { ClassList } from "@/components/ui-admin/classes/ClassList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function ClassesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <ClassList />
    </div>
  );
}
