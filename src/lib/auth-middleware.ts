import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authMiddleware(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;
    const pathname = request.nextUrl.pathname;

    // Debug log
    console.log("Current path:", pathname);
    console.log("Token:", token);

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
      "/dashboard-student/materials": ["Student"],
    };

    // Jika path adalah jalur publik
    if (jalanPublik.includes(pathname)) {
      return NextResponse.next();
    }

    // Cek token untuk jalur terproteksi
    if (!token) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Ambil data pengguna dari cookie
    const dataPengguna = request.cookies.get("data_pengguna")?.value;
    if (!dataPengguna) {
      console.log("No user data found, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const pengguna = JSON.parse(dataPengguna);
      console.log("User data:", pengguna);
      console.log("Current path:", pathname);

      // Cek apakah path saat ini memerlukan otorisasi
      const matchingPath = Object.entries(jalanTerproteksi).find(([path]) =>
        pathname.startsWith(path)
      );

      if (matchingPath) {
        const [path, allowedRoles] = matchingPath;
        const hasPermission = allowedRoles.some((role) =>
          pengguna.peran.includes(role)
        );

        console.log("Path requires roles:", allowedRoles);
        console.log("User has roles:", pengguna.peran);
        console.log("Has permission:", hasPermission);

        if (!hasPermission) {
          console.log("User not authorized for this path");
          return NextResponse.redirect(new URL("/", request.url));
        }
      }

      return NextResponse.next();
    } catch (parseError) {
      console.error("Error parsing user data:", parseError);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
