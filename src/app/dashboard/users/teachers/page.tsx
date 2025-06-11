import { Metadata } from "next";
import { TeacherList } from "@/components/ui-admin/users/TeacherList";

export const metadata: Metadata = {
  title: "Manajemen Guru | Shine Education",
  description: "Kelola data guru dan penugasan mengajar",
};

export default function TeachersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <TeacherList />
    </div>
  );
}
