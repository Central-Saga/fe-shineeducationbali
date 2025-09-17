"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CertificateForm } from "@/components/ui-admin/certificates/certificate-form";
import type { CertificateFormData } from "@/components/ui-admin/certificates/certificate-form";

export default function IssueCertificatePage() {
  const router = useRouter();

  const handleSubmit = async (data: CertificateFormData) => {
    try {
      // TODO: Implement certificate creation
      console.log("Creating certificate:", data);
      router.push("/dashboard/certificates");
    } catch (error) {
      console.error("Failed to issue certificate:", error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold">Terbitkan Sertifikat Baru</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Sertifikat</CardTitle>
          <CardDescription>
            Isi informasi detail untuk menerbitkan sertifikat baru untuk siswa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CertificateForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
