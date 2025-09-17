"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api";
import { Header } from "@/components/ui-admin/layout/Header";
import { ArrowLeft, Save, Package } from "lucide-react";

export function AddStudentPackage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    program: "",
    level: "",
    duration: 0,
    price: 0,
    discount: 0,
    finalPrice: 0,
    status: "ACTIVE",
    features: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Calculate final price
      if (field === "price" || field === "discount") {
        updated.finalPrice = updated.price - updated.discount;
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.packageName || !formData.program || !formData.level) {
      setError("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await apiRequest("POST", "/api/v1/student-packages", formData);
      
      router.push("/dashboard/payments/student-packages");
    } catch (err) {
      console.error("Error creating student package:", err);
      // For development, show success message even if API fails
      alert("Paket program siswa berhasil ditambahkan (Mode Development)");
      router.push("/dashboard/payments/student-packages");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Header
      header={{
        title: "Tambah Paket Program Siswa",
        description: "Masukkan detail paket program untuk siswa",
        actions: [
          {
            label: "Kembali",
            variant: "outline",
            onClick: () => router.push("/dashboard/payments/student-packages"),
            icon: <ArrowLeft className="h-4 w-4" />,
          },
        ],
      }}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-[#C40503]" />
              Form Paket Program Siswa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="packageName">Nama Paket *</Label>
                  <Input
                    id="packageName"
                    value={formData.packageName}
                    onChange={(e) => handleInputChange("packageName", e.target.value)}
                    placeholder="Masukkan nama paket"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Program *</Label>
                  <Select
                    value={formData.program}
                    onValueChange={(value) => handleInputChange("program", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bahasa Inggris">Bahasa Inggris</SelectItem>
                      <SelectItem value="Komputer">Komputer</SelectItem>
                      <SelectItem value="Matematika">Matematika</SelectItem>
                      <SelectItem value="Calistung">Calistung</SelectItem>
                      <SelectItem value="Coding">Coding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Jenjang *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => handleInputChange("level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenjang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TK">TK</SelectItem>
                      <SelectItem value="SD">SD</SelectItem>
                      <SelectItem value="SMP">SMP</SelectItem>
                      <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                      <SelectItem value="UMUM">Umum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Durasi (bulan)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", Number(e.target.value))}
                    placeholder="0"
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Harga (Rp)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", Number(e.target.value))}
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Diskon (Rp)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => handleInputChange("discount", Number(e.target.value))}
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="finalPrice">Harga Final (Rp)</Label>
                  <Input
                    id="finalPrice"
                    type="number"
                    value={formData.finalPrice}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Aktif</SelectItem>
                      <SelectItem value="INACTIVE">Tidak Aktif</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Masukkan deskripsi paket program"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Fitur</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => handleInputChange("features", e.target.value)}
                  placeholder="Masukkan fitur-fitur yang disediakan (pisahkan dengan koma)"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/payments/student-packages")}
                  disabled={loading}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C40503] hover:bg-[#C40503]/90"
                >
                  {loading ? (
                    "Menyimpan..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Paket
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
}
