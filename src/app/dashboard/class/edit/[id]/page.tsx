import { use } from "react";
import { EditClasses } from "@/components/ui-admin/classes/EditClasses";

export default function EditClassPage({ params }: { params: Promise<{ id: string }> }) {
  const classId = use(params).id;
  
  return <EditClasses classId={classId} />;
}
