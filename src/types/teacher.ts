export type EducationLevel = "SD" | "SMP" | "SMA";
export type TeacherStatus = "ACTIVE" | "INACTIVE";

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePhoto: string | null;
  subjects: string[];
  educationLevel: EducationLevel[];
  status: TeacherStatus;
  specialization: string[];
  yearsOfExperience: number;
  certifications: string[];
  schedule: {
    [key: string]: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
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
