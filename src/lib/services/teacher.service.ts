import { Teacher, TeacherFormData } from "@/types/teacher";
import { apiRequest } from "../api";

// Dummy data untuk guru
// const dummyTeachers: Teacher[] = [
//   {
//     id: "TCH001",
//     name: "I Made Wijaya",
//     email: "made.wijaya@shineeducation.com",
//     phoneNumber: "081234567890",
//     subjects: ["Matematika", "Fisika"],
//     educationLevel: ["SMP", "SMA/SMK"],
//     status: "ACTIVE",
//     specialization: ["Matematika", "Fisika"],
//     yearsOfExperience: 8,
//     qualification: "S1 Pendidikan Matematika",
//     dateOfBirth: "1985-05-15",
//     address: "Jl. Gajah Mada No. 123, Tabanan",
//     emergencyContact: "+6281234567890",
//     bankAccount: "1234567890",
//     salary: 5000000,
//     joinDate: "2020-01-15",
//     schedule: {
//       monday: ["08:00-12:00", "13:00-17:00"],
//       tuesday: ["08:00-12:00"],
//       wednesday: ["13:00-17:00"],
//       thursday: ["08:00-12:00", "13:00-17:00"],
//       friday: ["08:00-12:00"],
//     },
//   },
//   {
//     id: "TCH002",
//     name: "Ni Kadek Sari",
//     email: "kadek.sari@shineeducation.com",
//     phoneNumber: "081345678901",
//     subjects: ["Bahasa Indonesia", "Bahasa Inggris"],
//     educationLevel: ["SD", "SMP"],
//     status: "ACTIVE",
//     specialization: ["Bahasa", "Sastra"],
//     yearsOfExperience: 6,
//     qualification: "S1 Pendidikan Bahasa Indonesia",
//     dateOfBirth: "1987-08-22",
//     address: "Jl. Diponegoro No. 456, Tabanan",
//     emergencyContact: "+6281345678901",
//     bankAccount: "2345678901",
//     salary: 4500000,
//     joinDate: "2021-03-10",
//     schedule: {
//       monday: ["08:00-12:00"],
//       tuesday: ["08:00-12:00", "13:00-17:00"],
//       thursday: ["08:00-12:00"],
//       friday: ["13:00-17:00"],
//     },
//   },
//   {
//     id: "TCH003",
//     name: "I Putu Surya",
//     email: "putu.surya@shineeducation.com",
//     phoneNumber: "081456789012",
//     subjects: ["IPA", "Biologi", "Kimia"],
//     educationLevel: ["SMP", "SMA/SMK"],
//     status: "ACTIVE",
//     specialization: ["Sains", "Biologi", "Kimia"],
//     yearsOfExperience: 4,
//     qualification: "S1 Pendidikan Biologi",
//     dateOfBirth: "1989-11-30",
//     address: "Jl. Sudirman No. 789, Tabanan",
//     emergencyContact: "+6281456789012",
//     bankAccount: "3456789012",
//     salary: 4200000,
//     joinDate: "2022-06-01",
//     schedule: {
//       tuesday: ["08:00-12:00"],
//       wednesday: ["08:00-12:00", "13:00-17:00"],
//       thursday: ["13:00-17:00"],
//       friday: ["08:00-12:00"],
//       saturday: ["08:00-12:00"],
//     },
//   },
//   {
//     id: "TCH004",
//     name: "Ni Luh Dewi",
//     email: "luh.dewi@shineeducation.com",
//     phoneNumber: "081567890123",
//     subjects: ["IPS", "Sejarah", "Geografi"],
//     educationLevel: ["SMP", "SMA/SMK"],
//     status: "INACTIVE",
//     specialization: ["Sosial", "Sejarah"],
//     yearsOfExperience: 3,
//     qualification: "S1 Pendidikan Sejarah",
//     dateOfBirth: "1990-02-14",
//     address: "Jl. Kartini No. 321, Tabanan",
//     emergencyContact: "+6281567890123",
//     bankAccount: "4567890123",
//     salary: 4000000,
//     joinDate: "2023-01-20",
//     schedule: {
//       wednesday: ["08:00-12:00"],
//       friday: ["13:00-17:00"],
//     },
//   },
// ];

class TeacherService {
  private apiUrl = "/api/v1/teachers";

  async getTeachers(): Promise<Teacher[]> {
    return apiRequest<Teacher[]>("GET", this.apiUrl);
  }

  async getTeacherById(id: string): Promise<Teacher> {
    return apiRequest<Teacher>("GET", `${this.apiUrl}/${id}`);
  }

  async createTeacher(data: TeacherFormData): Promise<Teacher> {
    return apiRequest<Teacher>("POST", this.apiUrl, data);
  }

  async updateTeacher(
    id: string,
    data: Partial<TeacherFormData>
  ): Promise<Teacher> {
    return apiRequest<Teacher>("PUT", `${this.apiUrl}/${id}`, data);
  }

  async deleteTeacher(id: string): Promise<void> {
    return apiRequest<void>("DELETE", `${this.apiUrl}/${id}`);
  }
}

export const teacherService = new TeacherService();