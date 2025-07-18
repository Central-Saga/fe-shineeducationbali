import { Student } from "@/types/student";

class StudentService {
  private students: Student[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "081234567890",
      educationLevel: "SMP",
      address: "Jl. Contoh No. 1",
      parentName: "Jane Doe",
      parentPhone: "081234567891",
      status: "active",
      enrollmentDate: "2025-01-01",
      packages: [
        {
          id: "pkg1",
          name: "Paket Reguler SMP",
          type: "regular",
          courses: [
            {
              id: "c1",
              name: "Matematika",
              level: "SMP",
              schedule: "Senin & Rabu, 14:00-15:30",
              teacher: "Pak Budi",
            },
            {
              id: "c2",
              name: "IPA",
              level: "SMP",
              schedule: "Selasa & Kamis, 14:00-15:30",
              teacher: "Bu Ani",
            },
            {
              id: "c3",
              name: "Bahasa Inggris",
              level: "SMP",
              schedule: "Jumat, 14:00-16:00",
              teacher: "Mr. John",
            },
          ],
          duration: 6,
          startDate: "2025-01-01",
          endDate: "2025-06-30",
          status: "active",
          price: 1500000,
        },
      ],
      placements: [
        {
          id: "pl1",
          studentId: "1",
          classId: "c1",
          className: "7A",
          packageId: "pkg1",
          placementDate: "2025-01-01",
          status: "active",
        },
      ],
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "081234567892",
      educationLevel: "SD",
      address: "Jl. Contoh No. 2",
      parentName: "John Smith",
      parentPhone: "081234567893",
      status: "active",
      enrollmentDate: "2025-01-02",
      packages: [
        {
          id: "pkg2",
          name: "Paket Premium SD",
          type: "private",
          courses: [
            {
              id: "c4",
              name: "Matematika",
              level: "SD",
              schedule: "Senin & Rabu, 14:00-15:30",
              teacher: "Bu Sarah",
            },
            {
              id: "c5",
              name: "IPA",
              level: "SD",
              schedule: "Selasa & Kamis, 14:00-15:30",
              teacher: "Pak Deni",
            },
          ],
          duration: 12,
          startDate: "2025-01-02",
          endDate: "2025-12-31",
          status: "active",
          price: 2500000,
        },
      ],
      placements: [],
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@example.com",
      phoneNumber: "081234567894",
      educationLevel: "SMA/SMK",
      address: "Jl. Contoh No. 3",
      parentName: "Alice Wilson",
      parentPhone: "081234567895",
      status: "inactive",
      enrollmentDate: "2024-12-01",
      packages: [],
      placements: [],
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      phoneNumber: "081234567896",
      educationLevel: "UMUM",
      address: "Jl. Contoh No. 4",
      parentName: "Bob Brown",
      parentPhone: "081234567897",
      status: "active",
      enrollmentDate: "2025-01-03",
      packages: [],
      placements: [],
    },
  ];

  async getStudents(): Promise<Student[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.students;
  }

  async getStudentById(id: string): Promise<Student | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.students.find((s) => s.id === id) || null;
  }

  async createStudent(
    student: Omit<Student, "id" | "enrollmentDate" | "packages" | "placements">
  ): Promise<Student> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newStudent = {
      id: Math.random().toString(36).substr(2, 9),
      enrollmentDate: new Date().toISOString(),
      packages: [],
      placements: [],
      ...student,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  async updateStudent(
    id: string,
    data: Partial<Omit<Student, "id" | "enrollmentDate">>
  ): Promise<Student> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    const index = this.students.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.students[index] = {
        ...this.students[index],
        ...data,
      };
      return this.students[index];
    }
    throw new Error("Student not found");
  }

  async deleteStudent(id: string): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    const index = this.students.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
      return;
    }
    throw new Error("Student not found");
  }

  async enrollInPackage(
    studentId: string,
    packageId: string
  ): Promise<Student> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const student = await this.getStudentById(studentId);
    if (!student) throw new Error("Student not found");
    const newPackage: Student["packages"][0] = {
      id: packageId,
      name: "Package Name",
      type: "regular",
      courses: [
        {
          id: "c6",
          name: "Matematika",
          level: "SMP",
          schedule: "Senin & Rabu, 14:00-15:30",
          teacher: "Pak Budi",
        },
      ],
      duration: 6,
      startDate: new Date().toISOString(),
      endDate: new Date(
        Date.now() + 6 * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      status: "active",
      price: 1500000,
    };

    return this.updateStudent(studentId, {
      packages: [...student.packages, newPackage],
    });
  }

  async updatePlacement(
    studentId: string,
    placement: Student["placements"][0]
  ): Promise<Student> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    const student = await this.getStudentById(studentId);
    if (!student) throw new Error("Student not found");

    const existingPlacementIndex = student.placements.findIndex(
      (p) => p.classId === placement.classId
    );

    const updatedPlacements = [...student.placements];
    if (existingPlacementIndex >= 0) {
      updatedPlacements[existingPlacementIndex] = placement;
    } else {
      updatedPlacements.push(placement);
    }

    return this.updateStudent(studentId, {
      placements: updatedPlacements,
    });
  }
}

export const studentService = new StudentService();
