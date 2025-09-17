import { Student } from "@/types/student";
import { apiRequest } from "../api";

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
      educationLevel: "SMA",
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
    return apiRequest<Student[]>("GET", "/api/v1/students");
  }

  async getStudentById(id: string): Promise<Student | null> {
    return apiRequest<Student | null>("GET", `/api/v1/students/${id}`);
  }

  async createStudent(
    student: Omit<Student, "id" | "enrollmentDate" | "packages" | "placements">
  ): Promise<Student> {
    return apiRequest<Student>("POST", "/api/v1/students", student);
  }

  async updateStudent(
    id: string,
    data: Partial<Omit<Student, "id" | "enrollmentDate">>
  ): Promise<Student> {
    return apiRequest<Student>("PUT", `/api/v1/students/${id}`, data);
  }

  async deleteStudent(id: string): Promise<void> {
    return apiRequest<void>("DELETE", `/api/v1/students/${id}`);
  }

  async enrollInPackage(
    studentId: string,
    packageId: string
  ): Promise<Student> {
    return apiRequest<Student>("POST", `/api/v1/students/${studentId}/enroll`, { packageId });
  }

  async updatePlacement(
    studentId: string,
    placement: Student["placements"][0]
  ): Promise<Student> {
    return apiRequest<Student>("PUT", `/api/v1/students/${studentId}/placement`, placement);
  }
}

export const studentService = new StudentService();
