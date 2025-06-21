"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TemplateSelect } from "@/components/ui-admin/certificates/template-select";

interface CertificateSettings {
  autoNumbering: boolean;
  prefixFormat: string;
  validityPeriod: string;
  requireSignature: boolean;
  allowBatchIssuance: boolean;
  notifyRecipients: boolean;
  defaultTemplate?: string;
}

export default function CertificateSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<CertificateSettings>({
    autoNumbering: true,
    prefixFormat: "SE/YYYY/",
    validityPeriod: "24",
    requireSignature: true,
    allowBatchIssuance: true,
    notifyRecipients: true,
  });

  const handleSave = () => {
    // TODO: Implement settings save
    console.log("Saving settings:", settings);
    router.push("/dashboard/certificates");
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold">Pengaturan Sertifikat</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Umum</CardTitle>
            <CardDescription>
              Konfigurasi pengaturan umum untuk penerbitan sertifikat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Penomoran Otomatis</Label>
                <p className="text-sm text-gray-500">
                  Aktifkan penomoran sertifikat secara otomatis
                </p>
              </div>
              <Switch
                checked={settings.autoNumbering}
                onCheckedChange={(checked: boolean) =>
                  setSettings({ ...settings, autoNumbering: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Format Prefix Nomor Sertifikat</Label>
              <Input
                value={settings.prefixFormat}
                onChange={(e) =>
                  setSettings({ ...settings, prefixFormat: e.target.value })
                }
                placeholder="Contoh: SE/YYYY/"
              />
              <p className="text-sm text-gray-500">
                Format: SE/YYYY/ menghasilkan SE/2025/001
              </p>
            </div>

            <div className="space-y-2">
              <Label>Masa Berlaku Default (Bulan)</Label>
              <Select
                value={settings.validityPeriod}
                onValueChange={(value: string) =>
                  setSettings({ ...settings, validityPeriod: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih masa berlaku" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 Bulan</SelectItem>
                  <SelectItem value="24">24 Bulan</SelectItem>
                  <SelectItem value="36">36 Bulan</SelectItem>
                  <SelectItem value="0">Tidak ada batas waktu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tanda Tangan Digital</Label>
                <p className="text-sm text-gray-500">
                  Wajibkan tanda tangan digital pada sertifikat
                </p>
              </div>
              <Switch
                checked={settings.requireSignature}
                onCheckedChange={(checked: boolean) =>
                  setSettings({ ...settings, requireSignature: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Penerbitan Massal</Label>
                <p className="text-sm text-gray-500">
                  Izinkan penerbitan sertifikat secara massal
                </p>
              </div>
              <Switch
                checked={settings.allowBatchIssuance}
                onCheckedChange={(checked: boolean) =>
                  setSettings({ ...settings, allowBatchIssuance: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Penerima</Label>
                <p className="text-sm text-gray-500">
                  Kirim notifikasi email saat sertifikat diterbitkan
                </p>
              </div>
              <Switch
                checked={settings.notifyRecipients}
                onCheckedChange={(checked: boolean) =>
                  setSettings({ ...settings, notifyRecipients: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Template Default</Label>{" "}
              <TemplateSelect
                useFormField={false}
                value={settings.defaultTemplate}
                onChange={(value) =>
                  setSettings({ ...settings, defaultTemplate: value })
                }
              />
              <p className="text-sm text-gray-500">
                Template yang akan digunakan secara default saat membuat
                sertifikat baru
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
          <Button
            onClick={handleSave}
            style={{ backgroundColor: "#C40503" }}
            className="hover:bg-[#a30402]"
          >
            Simpan Pengaturan
          </Button>
        </div>
      </div>
    </div>
  );
}
