"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function NewTemplateButton() {
  const router = useRouter();

  return (
    <Button
      className="bg-black hover:bg-gray-800"
      onClick={() => router.push("/dashboard/certificates/templates/new")}
    >
      <Plus className="w-4 h-4 mr-2" />
      Template Baru
    </Button>
  );
}
