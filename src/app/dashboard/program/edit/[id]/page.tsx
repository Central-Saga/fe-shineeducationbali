import { EditProgram } from "@/components/ui-admin/program";

interface EditProgramPageProps {
  params: {
    id: string;
  };
}

export default function EditProgramPage({ params }: EditProgramPageProps) {
  return <EditProgram programId={params.id} />;
}
