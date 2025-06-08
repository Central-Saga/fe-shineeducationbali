import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function verifyAuth(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;
    const pathname = request.nextUrl.pathname;

    // Debug log
    console.log("Verifying auth for path:", pathname);
    console.log("Token present:", !!token);

    // Definisi jalur publik yang bisa diakses tanpa login
    const jalanPublik = [
      "/auth/login",
      "/auth/register",
      "/",
      "/program",
      "/about",
      "/blog",
      "/kontak",
      "/_next",
      "/favicon.ico",
      "/api",
    ];

    // Cek jalur publik
    if (jalanPublik.some((path) => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Definisi jalur yang membutuhkan autentikasi dan otorisasi
    const jalanTerproteksi: Record<string, string[]> = {
      "/dashboard": ["Super Admin", "Admin"],
      "/dashboard/users": ["Super Admin"],
      "/dashboard/programs": ["Super Admin", "Admin"],
      "/master-data": ["Super Admin"],
      "/dashboard-teacher": ["Teacher"],
      "/dashboard-student": ["Student"],
      "/dashboard-student/classes": ["Student"],
      "/dashboard-student/assignments": ["Student"],
      "/dashboard-student/grades": ["Student"],
      "/dashboard-student/materials": ["Student"],
    };

    // Jika tidak ada token, redirect ke login
    if (!token) {
      console.log("No token, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Cek data pengguna
    const dataPenggunaStr = request.cookies.get("data_pengguna")?.value;
    if (!dataPenggunaStr) {
      console.log("No user data, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Parse dan verifikasi data pengguna
    const dataPengguna = JSON.parse(dataPenggunaStr);
    const currentPath = Object.keys(jalanTerproteksi).find((path) =>
      pathname.startsWith(path)
    );

    if (currentPath) {
      const allowedRoles = jalanTerproteksi[currentPath];
      const userHasPermission = allowedRoles.some((role) =>
        dataPengguna.peran.includes(role)
      );

      console.log("Auth check:", {
        path: currentPath,
        userRoles: dataPengguna.peran,
        requiredRoles: allowedRoles,
        hasPermission: userHasPermission,
      });

      if (!userHasPermission) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Auth verification error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
