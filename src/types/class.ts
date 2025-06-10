export interface Class {
  id: string;
  name: string;
  type: "offline" | "online";
  subject: string;
  grade: string;
  capacity: number;
  currentStudents: number;
  teacher: string;
  schedule: ClassSchedule[];
  students: StudentInClass[];
  createdAt: string;
  updatedAt: string;
}

export interface ClassSchedule {
  id: string;
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
}

export interface StudentInClass {
  studentId: string;
  name: string;
  packageId: string;
  packageName: string;
  joinDate: string;
  status: "active" | "completed" | "cancelled";
}

export interface ClassPlacement {
  id: string;
  studentId: string;
  classId: string;
  placementDate: string;
  packageId: string;
  status: "active" | "completed" | "cancelled";
  notes?: string;
}
