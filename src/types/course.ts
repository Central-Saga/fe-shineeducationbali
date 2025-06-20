export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  categoryId: string;
  level: "SD" | "SMP" | "SMA" | "SMK" | "UMUM";
  duration: number; // dalam menit
  price: number;
  capacity: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface CourseMaterial {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: "DOCUMENT" | "VIDEO" | "QUIZ";
  content: string;
  order: number;
  status: "DRAFT" | "PUBLISHED";
}

export type CourseFormData = Omit<Course, "id" | "createdAt" | "updatedAt">;
export type CategoryFormData = Omit<CourseCategory, "id">;
export type MaterialFormData = Omit<CourseMaterial, "id">;
