export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  packages: StudentPackage[];
  placements: StudentPlacement[];
}

export interface StudentPackage {
  id: string;
  name: string;
  type: "offline" | "online";
  subjects: string[];
  duration: number; // in months
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "cancelled";
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
