export type EducationLevel = "TK" | "SD" | "SMP" | "SMA/SMK" | "UMUM";

export interface Student {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  educationLevel: EducationLevel;
  address: string;
  parentName: string;
  parentPhone: string;
  status: "active" | "inactive";
  enrollmentDate: string;
  profilePhoto?: string;
  packages: StudentPackage[];
  placements: StudentPlacement[];
}

export interface StudentPackage {
  id: string;
  name: string;
  type: "regular" | "private";
  programs: {
    id: string;
    name: string;
    level?: EducationLevel;
    schedule: string;
    teacher?: string;
  }[];
  duration: number; // in months
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "cancelled";
  price: number;
}

export interface StudentPlacement {
  id: string;
  studentId: string;
  classId: string;
  className: string;
  packageId: string;
  placementDate: string;
  status: "active" | "completed" | "cancelled";
  notes?: string;
}
