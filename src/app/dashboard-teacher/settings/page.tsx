"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { 
  Bell,
  Calendar,
  ChevronRight,
  Info,
  Key,
  Languages,
  Lock, 
  LogOut,
  Mail,
  Phone,
  Settings as SettingsIcon,
  Smartphone,
  User
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Import data
import { teacherSettings } from "@/data/data-teacher/settings/settings-data";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#C40503]">
        Pengaturan Akun
      </h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white p-1 gap-2 border rounded-md shadow-sm">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <User className="mr-3 h-4 w-4" /> 
            Profil
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-[#DAA625] data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <Bell className="mr-3 h-4 w-4" /> 
            Notifikasi
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <Lock className="mr-3 h-4 w-4" /> 
            Keamanan
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="data-[state=active]:bg-[#DAA625] data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            <SettingsIcon className="mr-3 h-4 w-4" /> 
            Preferensi
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Informasi Profil</CardTitle>
                <CardDescription>
                  Informasi dasar akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-28 w-28 mb-4">
                  <AvatarImage src={teacherSettings.account.avatar} alt={teacherSettings.account.name} />
                  <AvatarFallback>
                    {teacherSettings.account.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{teacherSettings.account.name}</h3>
                <p className="text-sm text-gray-500">{teacherSettings.account.role === "teacher" ? "Guru" : "Staff"}</p>
                <div className="mt-4 flex gap-4">
                  <Button variant="outline" size="sm">Ubah Foto</Button>
                  <Button variant="outline" size="sm" className="text-[#C40503]">Hapus</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Detail Akun</CardTitle>
                <CardDescription>
                  Update informasi personal Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" defaultValue={teacherSettings.account.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-500" />
                      <Input id="email" defaultValue={teacherSettings.account.email} />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-gray-500" />
                      <Input id="phone" defaultValue={teacherSettings.account.phone} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-date">Tanggal Bergabung</Label>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      <Input id="join-date" defaultValue={
                        new Date(teacherSettings.account.joinDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      } disabled />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input id="address" defaultValue={teacherSettings.account.address} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    defaultValue={teacherSettings.account.bio}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                <Button className="bg-[#C40503] hover:bg-[#A60000]">
                  Simpan Perubahan
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-sm md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Kelas yang Diajar</CardTitle>
                <CardDescription>
                  Daftar kelas yang Anda ajar saat ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teacherSettings.classes.map((cls) => (
                    <div key={cls.id} className="flex items-start gap-3 p-3 rounded-md border hover:border-[#C40503] transition-colors">
                      <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-[#C40503]">
                          {cls.name.substring(cls.name.length - 2)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{cls.name}</h4>
                        <p className="text-sm text-gray-500">{cls.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">{cls.schedule}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="text-[#C40503]">
                  Lihat Semua Jadwal <ChevronRight className="ml-2 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Pengaturan Notifikasi</CardTitle>
              <CardDescription>
                Kelola preferensi notifikasi Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Umum</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Notifikasi Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Terima notifikasi melalui email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      defaultChecked={teacherSettings.notifications.emailNotifications}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Notifikasi Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Terima notifikasi pada perangkat Anda
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      defaultChecked={teacherSettings.notifications.pushNotifications}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Tugas dan Penilaian</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="submission-notifications">Pengumpulan Tugas</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifikasi saat siswa mengumpulkan tugas
                      </p>
                    </div>
                    <Switch
                      id="submission-notifications"
                      defaultChecked={teacherSettings.notifications.notifyOnStudentSubmission}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="comment-notifications">Komentar</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifikasi saat ada komentar baru pada tugas
                      </p>
                    </div>
                    <Switch
                      id="comment-notifications"
                      defaultChecked={teacherSettings.notifications.notifyOnComment}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="grade-notifications">Publikasi Nilai</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifikasi saat nilai dipublikasikan
                      </p>
                    </div>
                    <Switch
                      id="grade-notifications"
                      defaultChecked={teacherSettings.notifications.notifyOnGradePublish}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Laporan Berkala</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily-digest">Ringkasan Harian</Label>
                      <p className="text-sm text-muted-foreground">
                        Terima laporan aktivitas harian
                      </p>
                    </div>
                    <Switch
                      id="daily-digest"
                      defaultChecked={teacherSettings.notifications.dailyDigest}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-report">Laporan Mingguan</Label>
                      <p className="text-sm text-muted-foreground">
                        Terima laporan perkembangan mingguan
                      </p>
                    </div>
                    <Switch
                      id="weekly-report"
                      defaultChecked={teacherSettings.notifications.weeklyReport}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button className="bg-[#DAA625] hover:bg-[#C09520]">
                Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Key className="mr-3 h-5 w-5 text-[#C40503]" />
                  Ubah Password
                </CardTitle>
                <CardDescription>
                  Update password akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Password Saat Ini</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                
                <p className="text-xs text-gray-500">
                  Password terakhir diubah pada: {
                    new Date(teacherSettings.security.lastPasswordChange).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  }
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                <Button className="bg-[#C40503] hover:bg-[#A60000]">
                  Update Password
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Smartphone className="mr-3 h-5 w-5 text-[#C40503]" />
                  Perangkat yang Login
                </CardTitle>
                <CardDescription>
                  Daftar perangkat yang login ke akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teacherSettings.security.loginDevices.map((device, index) => (
                  <div key={index} className="flex justify-between border-b pb-3">
                    <div className="space-y-1">
                      <p className="font-medium">{device.device}</p>
                      <p className="text-xs text-gray-500">
                        {device.location} • {
                          new Date(device.lastLogin).toLocaleString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })
                        }
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-[#C40503]">Logout</Button>
                  </div>
                ))}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-500">Tidak mengenali perangkat?</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-[#C40503]">Logout dari Semua Perangkat</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Lock className="mr-3 h-5 w-5 text-[#C40503]" />
                  Autentikasi Dua Faktor
                </CardTitle>
                <CardDescription>
                  Tambahkan lapisan keamanan tambahan untuk akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Aktifkan Autentikasi Dua Faktor</Label>
                    <p className="text-sm text-muted-foreground">
                      Tambahkan verifikasi tambahan saat login
                    </p>
                  </div>
                  <Switch
                    id="2fa"
                    defaultChecked={teacherSettings.security.twoFactorEnabled}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Status: {teacherSettings.security.twoFactorEnabled ? 
                    "Aktif" : "Tidak Aktif"}
                </p>
                <Button className="bg-[#C40503] hover:bg-[#A60000]">
                  Konfigurasi 2FA
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <LogOut className="mr-3 h-5 w-5 text-red-600" />
                  Keluar dari Semua Sesi
                </CardTitle>
                <CardDescription>
                  Keluar dari semua sesi aktif dan perangkat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Gunakan opsi ini jika Anda curiga ada akses tidak sah ke akun Anda atau jika Anda lupa logout dari perangkat umum.
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar dari Semua Sesi
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences" className="mt-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Preferensi Tampilan</CardTitle>
              <CardDescription>
                Sesuaikan tampilan aplikasi sesuai preferensi Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Umum</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Bahasa</Label>
                    <div className="flex items-center">
                      <Languages className="mr-2 h-4 w-4 text-gray-500" />
                      <select 
                        id="language" 
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue={teacherSettings.preferences.language}
                      >
                        <option value="id">Bahasa Indonesia</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Zona Waktu</Label>
                    <select 
                      id="timezone" 
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue={teacherSettings.preferences.timezone}
                    >
                      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                      <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                      <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Tampilan</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`cursor-pointer border rounded-md p-2 text-center ${teacherSettings.preferences.theme === 'light' ? 'bg-gray-100 border-[#C40503]' : ''}`}>
                        <div className="h-12 bg-white border rounded-md mb-2"></div>
                        <span className="text-sm">Terang</span>
                      </div>
                      <div className={`cursor-pointer border rounded-md p-2 text-center ${teacherSettings.preferences.theme === 'dark' ? 'bg-gray-100 border-[#C40503]' : ''}`}>
                        <div className="h-12 bg-gray-900 border rounded-md mb-2"></div>
                        <span className="text-sm">Gelap</span>
                      </div>
                      <div className={`cursor-pointer border rounded-md p-2 text-center ${teacherSettings.preferences.theme === 'system' ? 'bg-gray-100 border-[#C40503]' : ''}`}>
                        <div className="h-12 bg-gray-100 border rounded-md mb-2"></div>
                        <span className="text-sm">Sistem</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dashboard-view">Tampilan Dashboard</Label>
                    <select 
                      id="dashboard-view" 
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue={teacherSettings.preferences.dashboardView}
                    >
                      <option value="compact">Kompak</option>
                      <option value="comfortable">Nyaman</option>
                      <option value="expanded">Luas</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="calendar-view">Tampilan Kalender Default</Label>
                    <select 
                      id="calendar-view" 
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue={teacherSettings.preferences.calendarDefaultView}
                    >
                      <option value="day">Hari</option>
                      <option value="week">Minggu</option>
                      <option value="month">Bulan</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button className="bg-[#DAA625] hover:bg-[#C09520]">
                Simpan Preferensi
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
