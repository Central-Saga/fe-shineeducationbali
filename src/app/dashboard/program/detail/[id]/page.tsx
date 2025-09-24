import { ProgramDetail } from "@/components/ui-admin/program";

interface ProgramDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  return <ProgramDetail programId={params.id} />;
}
