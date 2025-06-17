"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import type { CertificateTemplate } from "@/types/template";
import { validateTemplateFile } from "@/lib/template-handlers";

// Interface tidak diperlukan lagi karena kita mengambil ID dari URL langsung

export default function EditTemplatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [template, setTemplate] = useState<CertificateTemplate | null>(null);
    // Get template ID from URL using usePathname
  const pathname = usePathname();
  const templateId = pathname?.split('/').pop();

  // Fetch template data
  useEffect(() => {
    if (!templateId) {
      toast.error("ID Template tidak valid");
      router.push("/dashboard/certificates/templates");
      return;
    }

    // TODO: Replace with actual API call
    const fetchTemplate = async () => {
      try {
        // For now, let's use mock data
        const mockTemplate: CertificateTemplate = {
          id: templateId,
          name: "Template Test",
          description: "Deskripsi template test",
          courseType: "ENGLISH",
          status: "active",
          thumbnail: "/certificates/english-basic-thumb.jpg",
          templateUrl: "/certificates/english-basic.pdf",
          usageCount: 0,
          createdAt: new Date().toISOString(),
          createdBy: {
            id: "ADMIN001",
            name: "Admin Test",
            role: "admin"
          },
          updatedAt: new Date().toISOString(),
          updatedBy: {
            id: "ADMIN001",
            name: "Admin Test",
            role: "admin"
          }
        };
        
        setTemplate(mockTemplate);
      } catch (error) {
        toast.error("Gagal memuat data template");
        router.push("/dashboard/certificates/templates");
      }
    };

    fetchTemplate();
  }, [templateId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("Template berhasil diperbarui");
      router.push("/dashboard/certificates/templates");
    } catch (error) {
      toast.error("Gagal memperbarui template");
    } finally {
      setIsLoading(false);
    }
  };

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold">Edit Template Sertifikat</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form Edit */}
        <Card>
          <CardHeader>
            <CardTitle>Detail Template</CardTitle>
            <CardDescription>
              Edit informasi template sertifikat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Template</Label>
                <Input 
                  id="name" 
                  defaultValue={template.name}
                  placeholder="Masukkan nama template" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseType">Jenis Kursus</Label>
                <Select defaultValue={template.courseType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kursus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENGLISH">Bahasa Inggris</SelectItem>
                    <SelectItem value="COMPUTER">Komputer</SelectItem>
                    <SelectItem value="CODING">Coding</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  defaultValue={template.description}
                  placeholder="Masukkan deskripsi template"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Update File Template</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="template"
                    type="file"
                    accept="image/*"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-black file:text-white hover:file:bg-gray-800"
                  />
                </div>
                <p className="text-sm text-gray-500">Biarkan kosong jika tidak ingin mengubah file template</p>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Batal
                </Button>
                <Button 
                  type="submit"
                  className="bg-black hover:bg-gray-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview Template</CardTitle>
            <CardDescription>
              Preview template saat ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <div className="aspect-[1.4] relative rounded-lg overflow-hidden">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium capitalize">{template.status}</span>
              </div>
              <div className="flex justify-between">
                <span>Digunakan:</span>
                <span className="font-medium">{template.usageCount}x</span>
              </div>
              <div className="flex justify-between">
                <span>Terakhir diubah:</span>
                <span className="font-medium">
                  {new Date(template.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Diubah oleh:</span>
                <span className="font-medium">{template.updatedBy.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
