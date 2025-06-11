import {
  Course,
  CourseCategory,
  CourseMaterial,
  CourseFormData,
  CategoryFormData,
  MaterialFormData,
} from "@/types/course";

class CourseService {
  private apiUrl = "/api/v1/courses";

  // Course Management
  async getCourses(): Promise<Course[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok) throw new Error("Failed to fetch courses");
    return response.json();
  }

  async getCourseById(id: string): Promise<Course> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch course");
    return response.json();
  }

  async createCourse(data: CourseFormData): Promise<Course> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create course");
    return response.json();
  }

  async updateCourse(
    id: string,
    data: Partial<CourseFormData>
  ): Promise<Course> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update course");
    return response.json();
  }

  async deleteCourse(id: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete course");
  }

  // Category Management
  async getCategories(): Promise<CourseCategory[]> {
    const response = await fetch(`${this.apiUrl}/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  }

  async createCategory(data: CategoryFormData): Promise<CourseCategory> {
    const response = await fetch(`${this.apiUrl}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create category");
    return response.json();
  }

  async updateCategory(
    id: string,
    data: Partial<CategoryFormData>
  ): Promise<CourseCategory> {
    const response = await fetch(`${this.apiUrl}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update category");
    return response.json();
  }

  // Material Management
  async getMaterials(courseId: string): Promise<CourseMaterial[]> {
    const response = await fetch(`${this.apiUrl}/${courseId}/materials`);
    if (!response.ok) throw new Error("Failed to fetch materials");
    return response.json();
  }

  async createMaterial(
    courseId: string,
    data: MaterialFormData
  ): Promise<CourseMaterial> {
    const response = await fetch(`${this.apiUrl}/${courseId}/materials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create material");
    return response.json();
  }

  async updateMaterial(
    courseId: string,
    materialId: string,
    data: Partial<MaterialFormData>
  ): Promise<CourseMaterial> {
    const response = await fetch(
      `${this.apiUrl}/${courseId}/materials/${materialId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to update material");
    return response.json();
  }

  async reorderMaterials(
    courseId: string,
    materialIds: string[]
  ): Promise<void> {
    const response = await fetch(
      `${this.apiUrl}/${courseId}/materials/reorder`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materialIds }),
      }
    );
    if (!response.ok) throw new Error("Failed to reorder materials");
  }
}
