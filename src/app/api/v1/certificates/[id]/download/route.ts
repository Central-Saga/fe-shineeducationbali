// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import prisma from "@/lib/prisma";
// import { generateCertificatePDF } from "@/lib/pdf-generator";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const certificate = await prisma.certificate.findUnique({
//       where: { id: params.id },
//       include: { template: true },
//     });

//     if (!certificate) {
//       return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
//     }

//     // Check if user has access to this certificate
//     if (
//       session.user.role !== "SUPER_ADMIN" &&
//       session.user.role !== "ADMIN" &&
//       certificate.studentId !== session.user.id
//     ) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Generate PDF from certificate data and template
//     const pdfBuffer = await generateCertificatePDF(certificate);

//     const response = new NextResponse(pdfBuffer);
//     response.headers.set("Content-Type", "application/pdf");
//     response.headers.set(
//       "Content-Disposition",
//       `inline; filename="certificate-${certificate.id}.pdf"`
//     );

//     return response;
//   } catch (error) {
//     console.error("[CERTIFICATE_DOWNLOAD]", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
