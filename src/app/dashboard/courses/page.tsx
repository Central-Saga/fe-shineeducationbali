import { Metadata } from "next";
import { CourseList } from "@/components/ui-admin/courses/CourseList";

export const metadata: Metadata = {
  title: "Manajemen Kursus | Shine Education",
  description: "Kelola kursus, kategori, dan materi pembelajaran",
};

export default function CoursesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex-1">
        <CourseList />
      </div>
    </div>
  );
}
