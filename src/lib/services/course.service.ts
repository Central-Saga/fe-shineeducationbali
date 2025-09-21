// import {
//   Course,
//   CourseCategory,
//   CourseMaterial,
//   CourseFormData,
//   CategoryFormData,
//   MaterialFormData,
// } from "@/types/course";
// import { apiRequest } from "../api";

// class CourseService {
//   private apiUrl = "/api/v1/courses";

//   // Course Management
//   async getCourses(): Promise<Course[]> {
//     return apiRequest<Course[]>("GET", this.apiUrl);
//   }

//   async getCourseById(id: string): Promise<Course> {
//     return apiRequest<Course>("GET", `${this.apiUrl}/${id}`);
//   }

//   async createCourse(data: CourseFormData): Promise<Course> {
//     return apiRequest<Course>("POST", this.apiUrl, data);
//   }

//   async updateCourse(
//     id: string,
//     data: Partial<CourseFormData>
//   ): Promise<Course> {
//     return apiRequest<Course>("PUT", `${this.apiUrl}/${id}`, data);
//   }

//   async deleteCourse(id: string): Promise<void> {
//     return apiRequest<void>("DELETE", `${this.apiUrl}/${id}`);
//   }

//   // Category Management
//   async getCategories(): Promise<CourseCategory[]> {
//     return apiRequest<CourseCategory[]>("GET", `${this.apiUrl}/categories`);
//   }

//   async createCategory(data: CategoryFormData): Promise<CourseCategory> {
//     return apiRequest<CourseCategory>("POST", `${this.apiUrl}/categories`, data);
//   }

//   async updateCategory(
//     id: string,
//     data: Partial<CategoryFormData>
//   ): Promise<CourseCategory> {
//     return apiRequest<CourseCategory>("PUT", `${this.apiUrl}/categories/${id}`, data);
//   }

//   // Material Management
//   async getMaterials(courseId: string): Promise<CourseMaterial[]> {
//     return apiRequest<CourseMaterial[]>("GET", `${this.apiUrl}/${courseId}/materials`);
//   }

//   async createMaterial(
//     courseId: string,
//     data: MaterialFormData
//   ): Promise<CourseMaterial> {
//     return apiRequest<CourseMaterial>("POST", `${this.apiUrl}/${courseId}/materials`, data);
//   }

//   async updateMaterial(
//     courseId: string,
//     materialId: string,
//     data: Partial<MaterialFormData>
//   ): Promise<CourseMaterial> {
//     return apiRequest<CourseMaterial>("PUT", `${this.apiUrl}/${courseId}/materials/${materialId}`, data);
//   }

//   async reorderMaterials(
//     courseId: string,
//     materialIds: string[]
//   ): Promise<void> {
//     return apiRequest<void>("PUT", `${this.apiUrl}/${courseId}/materials/reorder`, { materialIds });
//   }
// }
