"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, Clock, FileText, Users, Save } from "lucide-react";

export default function AttendanceSettingsPage() {
  const [settings, setSettings] = useState({
    autoMarkAbsent: true,
    lateThreshold: 15, // minutes
    requireDocumentUpload: true,
    allowTeacherSelfUpload: true,
    notificationEnabled: true,
    reportGeneration: "weekly",
    maxAbsentDays: 3,
  });

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Attendance Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Configure attendance system for teaching courses
          </p>
        </div>
        <Button onClick={handleSave} className="bg-[#C40503] hover:bg-[#a50402] text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#C40503]" />
              Pengaturan Umum
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-mark-absent">Otomatis Tandai Alpha</Label>
                <p className="text-sm text-gray-500">
                  Otomatis menandai siswa sebagai alpha jika tidak ada input kehadiran
                </p>
              </div>
              <Switch
                id="auto-mark-absent"
                checked={settings.autoMarkAbsent}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoMarkAbsent: checked })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="late-threshold">Batas Keterlambatan (menit)</Label>
              <Input
                id="late-threshold"
                type="number"
                value={settings.lateThreshold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    lateThreshold: parseInt(e.target.value) || 0,
                  })
                }
                className="w-32"
              />
              <p className="text-sm text-gray-500">
                Siswa dianggap terlambat jika masuk setelah batas waktu ini
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="require-document">Wajib Upload Dokumen</Label>
                <p className="text-sm text-gray-500">
                  Guru wajib mengupload dokumen kehadiran
                </p>
              </div>
              <Switch
                id="require-document"
                checked={settings.requireDocumentUpload}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireDocumentUpload: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Teacher Settings */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#DAA625]" />
              Pengaturan Guru
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="teacher-upload">Izinkan Upload Mandiri</Label>
                <p className="text-sm text-gray-500">
                  Guru dapat mengupload kehadiran sendiri
                </p>
              </div>
              <Switch
                id="teacher-upload"
                checked={settings.allowTeacherSelfUpload}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowTeacherSelfUpload: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifikasi Aktif</Label>
                <p className="text-sm text-gray-500">
                  Kirim notifikasi untuk kehadiran yang belum diinput
                </p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notificationEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, notificationEnabled: checked })
                }
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="max-absent">Maksimal Hari Alpha</Label>
              <Input
                id="max-absent"
                type="number"
                value={settings.maxAbsentDays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxAbsentDays: parseInt(e.target.value) || 0,
                  })
                }
                className="w-32"
              />
              <p className="text-sm text-gray-500">
                Maksimal hari alpha sebelum peringatan
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Report Settings */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Pengaturan Laporan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="report-generation">Frekuensi Laporan</Label>
              <select
                id="report-generation"
                value={settings.reportGeneration}
                onChange={(e) =>
                  setSettings({ ...settings, reportGeneration: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </select>
              <p className="text-sm text-gray-500">
                Frekuensi pembuatan laporan kehadiran otomatis
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Status Sistem</Label>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800 border-none">
                  Sistem Aktif
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-none">
                  Monitoring Real-time
                </Badge>
                <Badge className="bg-[#DAA625]/10 text-[#DAA625] border-none">
                  Auto Backup
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              Informasi Sistem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Siswa:</span>
                <span className="ml-2 font-medium">245</span>
              </div>
              <div>
                <span className="text-gray-500">Total Guru:</span>
                <span className="ml-2 font-medium">18</span>
              </div>
              <div>
                <span className="text-gray-500">Kelas Aktif:</span>
                <span className="ml-2 font-medium">12</span>
              </div>
              <div>
                <span className="text-gray-500">Dokumen Hari Ini:</span>
                <span className="ml-2 font-medium">15</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Terakhir Diperbarui</Label>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleString("id-ID")}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Versi Sistem</Label>
              <p className="text-sm text-gray-500">v2.1.0</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
