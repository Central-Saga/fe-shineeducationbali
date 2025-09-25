import { ProgramDetail } from "@/components/ui-admin/program";

interface ProgramDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { id } = await params;
  return <ProgramDetail programId={id} />;
}
