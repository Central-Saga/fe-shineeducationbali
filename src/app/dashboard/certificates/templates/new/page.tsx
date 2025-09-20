"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  uploadTemplate,
  validateTemplateFile,
  type NewTemplateFormData,
} from "@/lib/template-handlers";

export default function NewTemplatePage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData] = useState<Partial<NewTemplateFormData>>({
    name: "",
    description: "",
    courseType: undefined,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold">Upload Template Sertifikat Baru</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form Input */}
        <Card>
          <CardHeader>
            <CardTitle>Detail Template</CardTitle>
            <CardDescription>
              Masukkan informasi untuk template sertifikat baru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Template</Label>
                <Input id="name" placeholder="Masukkan nama template" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseType">Jenis Kursus</Label>
                <Select>
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
                  placeholder="Masukkan deskripsi template"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">File Template</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="template"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-black file:text-white hover:file:bg-gray-800"
                  />
                </div>
              </div>{" "}
              <Button
                className="w-full bg-black hover:bg-gray-800"
                disabled={isLoading}
                onClick={async () => {
                  try {
                    setIsLoading(true);

                    // Validasi form
                    if (
                      !formData.name ||
                      !formData.description ||
                      !formData.courseType ||
                      !formData.templateFile
                    ) {
                      toast.error("Mohon lengkapi semua field");
                      return;
                    }

                    // Validasi file
                    const errorMsg = validateTemplateFile(
                      formData.templateFile
                    );
                    if (errorMsg) {
                      toast.error(errorMsg);
                      return;
                    }

                    // Upload template
                    await uploadTemplate(formData as NewTemplateFormData);
                    toast.success("Template berhasil diupload");

                    // Redirect ke halaman templates
                    router.push("/dashboard/certificates/templates");
                  } catch {
                    toast.error("Gagal mengupload template");
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Mengupload..." : "Upload Template"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview Template</CardTitle>
            <CardDescription>
              Preview template yang akan diupload
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              {imagePreview ? (
                <div className="aspect-[1.4] relative rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Template Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-[1.4] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center text-gray-500">
                    <Upload className="h-8 w-8 mx-auto mb-2" />
                    <p>Upload template untuk melihat preview</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <p>• Template akan disimpan dalam format gambar</p>
              <p>• Pastikan gambar memiliki resolusi yang baik</p>
              <p>• Ukuran file maksimal 5MB</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
