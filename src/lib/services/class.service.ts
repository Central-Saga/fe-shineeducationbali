import { Class } from "@/types/class";

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
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.classes;
  }

  async getClassById(id: string): Promise<Class | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.classes.find(c => c.id === id) || null;
  }

  async bulkPlaceStudents(placements: StudentPlacement[]): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real application, this would update the database
    // For now, we'll just update the currentStudents count
    placements.forEach(placement => {
      const classIndex = this.classes.findIndex(c => c.id === placement.classId);
      if (classIndex !== -1) {
        this.classes[classIndex].currentStudents += 1;
      }
    });
  }
}

export const classService = new ClassService();
