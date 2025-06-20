import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseList } from "@/components/ui-admin/courses/CourseList";
import { CategoryList } from "@/components/ui-admin/courses/CategoryList";
import { MaterialList } from "@/components/ui-admin/courses/MaterialList";

export const metadata: Metadata = {
  title: "Manajemen Kursus | Shine Education",
  description: "Kelola kursus, kategori, dan materi pembelajaran",
};

export default function CoursesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Daftar Kursus</TabsTrigger>
          <TabsTrigger value="categories">Kategori</TabsTrigger>
          <TabsTrigger value="materials">Materi</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="space-y-4">
          <CourseList />
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <CategoryList />
        </TabsContent>{" "}
        <TabsContent value="materials" className="space-y-4">
          <MaterialList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
