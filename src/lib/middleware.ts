import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authMiddleware(request: NextRequest) {
  try {
    const token = request.cookies.get("access_token")?.value;
    const pathname = request.nextUrl.pathname;

    // Define public paths that can be accessed without login
    const publicPaths = [
      "/auth/login",
      "/auth/register",
      "/",
      "/program",
      "/about",
      "/blog",
      "/kontak",
    ];

    // Define paths that require authentication and authorization
    const protectedPaths: Record<string, string[]> = {
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

    // Check for public paths
    if (publicPaths.includes(pathname)) {
      if (token) {
        const userData = request.cookies.get("data_pengguna")?.value;
        if (userData) {
          const user = JSON.parse(userData);
          if (
            user.role.includes("Super Admin") ||
            user.role.includes("Admin")
          ) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
          }
        }
      }
      return NextResponse.next();
    }

    // Check for protected paths
    const isProtectedPath = Object.keys(protectedPaths).some((path) =>
      pathname.startsWith(path)
    );

    if (isProtectedPath) {
      // If no token, redirect to login
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      // Check user data from cookies
      const userData = request.cookies.get("data_pengguna")?.value;
      if (!userData) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      try {
        const user = JSON.parse(userData);
        const requiredRoles = Object.entries(protectedPaths).find(([path]) =>
          pathname.startsWith(path)
        )?.[1];

        // If user doesn't have required role, redirect to home
        if (
          requiredRoles &&
          !requiredRoles.some((role) => user.role.includes(role))
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
