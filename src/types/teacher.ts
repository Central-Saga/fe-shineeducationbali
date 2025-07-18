export type EducationLevel = "SD" | "SMP" | "SMA/SMK";
export type TeacherStatus = "ACTIVE" | "INACTIVE";

export type TeacherFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  subjects: string[];
  educationLevel: EducationLevel[];
  status: TeacherStatus;
  specialization: string[];
  yearsOfExperience: number;
  certifications: string[];
  profilePhoto: string | null;
  schedule: Record<string, string[]>;
};

export type Teacher = TeacherFormData & {
  id: string;
};

export const defaultTeacherValues: TeacherFormData = {
  name: "",
  email: "",
  phoneNumber: "",
  subjects: [],
  educationLevel: [],
  specialization: [],
  yearsOfExperience: 0,
  certifications: [],
  status: "ACTIVE",
  profilePhoto: null,
  schedule: {},
};

export const defaultTeacherFormValues: TeacherFormData = {
  name: "",
  email: "",
  phoneNumber: "",
  subjects: [],
  educationLevel: [],
  specialization: [],
  yearsOfExperience: 0,
  certifications: [],
  status: "ACTIVE",
  profilePhoto: null,
  schedule: {},
};
