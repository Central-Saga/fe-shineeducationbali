import { EditProgram } from "@/components/ui-admin/program";

interface EditProgramPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProgramPage({ params }: EditProgramPageProps) {
  const { id } = await params;
  return <EditProgram programId={id} />;
}
