export interface Class {
  id: string;
  name: string;
  subject: string;
  capacity: number;
  currentStudents: number;
  teacherId?: string;
  schedule?: string;
  room?: string;
  academicYear: string;
  semester: number;
  status: "active" | "inactive";
}
