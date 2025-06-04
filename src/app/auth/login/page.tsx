"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Cek apakah email adalah superadmin
      if (email === "superadmin@example.com") {
        if (password === "password") {
          // Ganti dengan password yang sebenarnya atau gunakan sistem auth yang aman
          // Redirect ke dashboard admin
          router.push("/dashboard");
          return;
        }
      }

      // Implementasi login untuk user biasa
      // TODO: Implementasikan login dengan backend API
      const response = await loginUser(email, password);

      // Redirect berdasarkan role dari response API
      if (response.success) {
        router.push("/dashboard"); // atau halaman yang sesuai
      }
    } catch (err) {
      setError("Email atau password salah");
    }
  };

  // Fungsi dummy untuk login - ganti dengan implementasi sebenarnya
  const loginUser = async (email: string, password: string) => {
    // TODO: Implement actual API call
    return { success: false };
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/pichome/logo.png"
              alt="Shine Education Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Masuk ke Akun Anda
          </CardTitle>
          <CardDescription>
            Selamat datang kembali di Shine Education
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-sm text-red-500 text-center">{error}</div>
              )}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Masuk
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <div className="w-full text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link
              href="/auth/register"
              className="text-red-600 hover:text-red-500 font-medium"
            >
              Daftar di sini
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
