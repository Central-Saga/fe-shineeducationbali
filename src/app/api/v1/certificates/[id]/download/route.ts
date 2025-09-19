import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params;
    
    // Temporary mock implementation
    // TODO: Implement actual certificate download logic
    console.log("Certificate download requested for ID:", id);
    
    return NextResponse.json(
      { error: "Certificate download feature is under development" }, 
      { status: 501 }
    );
  } catch (error) {
    console.error("[CERTIFICATE_DOWNLOAD]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
