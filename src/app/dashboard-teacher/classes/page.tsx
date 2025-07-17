import { ClassesDashboard } from "@/components/ui-teacher/classes/ClassesDashboard";

export default function ClassesPage() {
  return <ClassesDashboard />;
}

// Redirecting teacher schedule page to classes with schedule tab
export const dynamic = 'force-dynamic';
