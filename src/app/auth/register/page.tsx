"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
    noTelepon: "",
    alamat: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.konfirmasiPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    const registrationData = {
      ...formData,
      role: "student",
    };

    try {
      // TODO: Send registration data to API
      console.log("Register attempt:", registrationData);
      router.push("/auth/login");
    } catch (err) {
      setError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="/pichome/logo.png"
              alt="Shine Education Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            Daftar Sebagai Murid
          </CardTitle>
          <CardDescription className="text-center">
            Form pendaftaran ini khusus untuk calon murid Shine Education. Untuk
            Staff/Pengajar silahkan hubungi admin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="namaLengkap">Nama Lengkap</Label>
              <Input
                id="namaLengkap"
                name="namaLengkap"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan alamat email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="noTelepon">Nomor Telepon</Label>
              <Input
                id="noTelepon"
                name="noTelepon"
                type="tel"
                placeholder="Masukkan nomor telepon"
                value={formData.noTelepon}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alamat">Alamat</Label>
              <Textarea
                id="alamat"
                name="alamat"
                placeholder="Masukkan alamat lengkap"
                value={formData.alamat}
                onChange={handleChange}
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="konfirmasiPassword">Konfirmasi Password</Label>
              <Input
                id="konfirmasiPassword"
                name="konfirmasiPassword"
                type="password"
                placeholder="Masukkan ulang password"
                value={formData.konfirmasiPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="text-[#C40503] text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#C40503] hover:bg-[#C40503]/90"
            >
              Daftar Sebagai Murid
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center">
            <span className="text-muted-foreground">Sudah punya akun? </span>
            <Link
              href="/auth/login"
              className="font-medium text-[#C40503] hover:text-[#C40503]/90"
            >
              Masuk di sini
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
