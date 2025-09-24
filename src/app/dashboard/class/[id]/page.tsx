import { use } from "react";
import { ClassDetails } from "@/components/ui-admin/classes/ClassDetails";

export default function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const classId = use(params).id;
  
  return <ClassDetails classId={classId} />;
}
