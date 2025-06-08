import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authMiddleware(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;
    const pathname = request.nextUrl.pathname;

    // Definisi jalur publik yang bisa diakses tanpa login
    const jalanPublik = [
      "/auth/login",
      "/auth/register",
      "/",
      "/program",
      "/about",
      "/blog",
      "/kontak",
    ];

    // Definisi jalur yang membutuhkan autentikasi dan otorisasi
    const jalanTerproteksi: Record<string, string[]> = {
      "/dashboard": ["Super Admin", "Admin"],
      "/dashboard/users": ["Super Admin"],
      "/dashboard/programs": ["Super Admin", "Admin"],
      "/master-data": ["Super Admin"],
      "/dashboard-teacher": ["Teacher"],
      "/dashboard-student": ["Student"],
      // Protected paths for teacher
      "/dashboard-teacher/schedule": ["Teacher"],
      "/dashboard-teacher/materials": ["Teacher"],
      "/dashboard-teacher/grades": ["Teacher"],
      // Protected paths for student
      "/dashboard-student/classes": ["Student"],
      "/dashboard-student/assignments": ["Student"],
      "/dashboard-student/grades": ["Student"],
    };

    // Pengecekan untuk jalur publik
    if (jalanPublik.includes(pathname)) {
      if (token) {
        const dataPengguna = request.cookies.get("data_pengguna")?.value;
        if (dataPengguna) {
          const pengguna = JSON.parse(dataPengguna);
          if (
            pengguna.peran.includes("Super Admin") ||
            pengguna.peran.includes("Admin")
          ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
          }
        }
      }
      return NextResponse.next();
    }

    // Pengecekan untuk jalur terproteksi
    const isJalanTerproteksi = Object.keys(jalanTerproteksi).some((path) =>
      pathname.startsWith(path)
    );

    if (isJalanTerproteksi) {
      // Jika tidak ada token, redirect ke login
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      // Cek data pengguna dari cookies
      const dataPengguna = request.cookies.get("data_pengguna")?.value;
      if (!dataPengguna) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      try {
        const pengguna = JSON.parse(dataPengguna);
        const peranDibutuhkan = Object.entries(jalanTerproteksi).find(
          ([path]) => pathname.startsWith(path)
        )?.[1];

        // Jika pengguna tidak memiliki peran yang dibutuhkan, redirect ke home
        if (
          peranDibutuhkan &&
          !peranDibutuhkan.some((peran) => pengguna.peran.includes(peran))
        ) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      } catch (parseError) {
        console.error("Error parsing user data:", parseError);
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
