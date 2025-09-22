import { ClassesDashboard } from "@/components/ui-teacher/classes/ClassesManagement";

export default function ClassesPage() {
  return <ClassesDashboard />;
}

// Redirecting teacher schedule page to classes with schedule tab
export const dynamic = 'force-dynamic';
