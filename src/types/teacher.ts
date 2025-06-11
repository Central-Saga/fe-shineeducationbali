export interface Teacher {
  id: string;
  nip: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  specialization: string[];
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
  updatedAt: Date;
}

export interface TeacherAssignment {
  id: string;
  teacherId: string;
  courseId: string;
  classId: string;
  academicYear: string;
  semester: number;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
}

export type TeacherFormData = Omit<Teacher, "id" | "createdAt" | "updatedAt">;
