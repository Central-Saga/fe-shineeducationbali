// import { NextResponse } from "next/server";
// import { z } from "zod";
// import { auth } from "@/lib/auth";
// import prisma from "@/lib/prisma";

// const certificateSchema = z.object({
//   studentId: z.string(),
//   title: z.string(),
//   description: z.string().optional(),
//   type: z.enum(["COURSE_COMPLETION", "ACHIEVEMENT", "PARTICIPATION"]),
//   templateId: z.string().optional(),
//   metadata: z.record(z.any()).optional(),
// });

// export async function GET() {
//   try {
//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const certificates = await prisma.certificate.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(certificates);
//   } catch (error) {
//     console.error("[CERTIFICATES_GET]", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const session = await auth();
//     if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const json = await request.json();
//     const body = certificateSchema.parse(json);

//     const certificate = await prisma.certificate.create({
//       data: {
//         ...body,
//         issueDate: new Date().toISOString(),
//       },
//     });

//     return NextResponse.json(certificate);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ error: error.errors }, { status: 400 });
//     }

//     console.error("[CERTIFICATES_POST]", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
