import { Class } from "@/types/class";
import { apiRequest } from "../api";

interface StudentPlacement {
  studentId: string;
  classId: string;
  placementDate: string;
  status: "active" | "inactive";
}

class ClassService {
  private classes: Class[] = [
    {
      id: "1",
      name: "Kelas A",
      subject: "Matematika",
      capacity: 20,
      currentStudents: 15,
      teacherId: "T1",
      schedule: "Senin & Rabu, 14:00-15:30",
      room: "R101",
      academicYear: "2025/2026",
      semester: 1,
      status: "active"
    },
    {
      id: "2",
      name: "Kelas B",
      subject: "Bahasa Inggris",
      capacity: 15,
      currentStudents: 10,
      teacherId: "T2",
      schedule: "Selasa & Kamis, 14:00-15:30",
      room: "R102",
      academicYear: "2025/2026",
      semester: 1,
      status: "active"
    }
  ];

  async getClasses(): Promise<Class[]> {
    return apiRequest<Class[]>("GET", "/api/v1/classes");
  }

  async getClassById(id: string): Promise<Class | null> {
    return apiRequest<Class | null>("GET", `/api/v1/classes/${id}`);
  }

  async bulkPlaceStudents(placements: StudentPlacement[]): Promise<void> {
    return apiRequest<void>("POST", "/api/v1/classes/bulk-place", { placements });
  }
}

export const classService = new ClassService();
