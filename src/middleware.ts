import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Definisi tipe untuk role yang valid
type UserRole = "Super Admin" | "Admin" | "Teacher" | "Student";

// Definisi tipe untuk protected routes
type ProtectedPath = "/dashboard" | "/dashboard-teacher" | "/dashboard-student";

// Mapping route ke role yang diizinkan
const rolePermissions: Record<ProtectedPath, UserRole[]> = {
  "/dashboard": ["Super Admin", "Admin"],
  "/dashboard-teacher": ["Teacher"],
  "/dashboard-student": ["Student"],
};

// Public paths yang tidak memerlukan autentikasi
const publicPaths = [
  "/auth/login",
  "/auth/register",
  "/",
  "/program",
  "/about",
  "/blog",
  "/kontak",
  "/_next",
  "/favicon.ico",
  "/img",
  "/api",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Debug log untuk tracking
  console.log("🔍 Checking path:", pathname);

  // Izinkan akses ke public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    console.log("✅ Public path, allowing access");
    return NextResponse.next();
  }

  // Cek token
  const token = request.cookies.get("access_token")?.value;
  if (!token) {
    console.log("❌ No token found, redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Cek data pengguna
  const userDataStr = request.cookies.get("data_pengguna")?.value;
  if (!userDataStr) {
    console.log("❌ No user data found, redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // Parse user data
    const userData = JSON.parse(userDataStr);
    const userRoles = Array.isArray(userData.role) ? userData.role : [userData.role];
    console.log("👤 User roles:", userRoles);

    // Cek apakah path butuh proteksi
    const protectedPath = Object.keys(rolePermissions).find((path) =>
      pathname.startsWith(path)
    ) as ProtectedPath | undefined;

    if (protectedPath) {
      const allowedRoles = rolePermissions[protectedPath];
      const hasPermission = allowedRoles.some((role) =>
        userRoles.includes(role)
      );

      console.log("🔒 Access check:", {
        path: protectedPath,
        required: allowedRoles,
        userRoles,
        granted: hasPermission,
      });

      if (!hasPermission) {
        console.log("⛔ Access denied, redirecting to home");
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    console.log("✅ Access granted");
    return NextResponse.next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|img).*)"],
};
