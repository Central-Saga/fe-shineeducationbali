import { Metadata } from "next";
import { CourseList } from "@/components/ui-admin/courses/CourseList";

export const metadata: Metadata = {
  title: "Manajemen Kursus | Shine Education",
  description: "Kelola kursus, kategori, dan materi pembelajaran",
};

export default function CoursesPage() {
  return (
    <div className="flex-1 space-y-6 p-5 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#C40001]">
            Manajemen Kursus
          </h2>
          <p className="text-gray-500 mt-2">
            Kelola kursus, kategori, dan materi pembelajaran
          </p>
        </div>
      </div>
      <div className="flex-1">
        <CourseList />
      </div>
    </div>
  );
}
