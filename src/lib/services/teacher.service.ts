import { Teacher, TeacherFormData } from "@/types/teacher";
import { apiRequest } from "../api";

// Dummy data untuk guru
const dummyTeachers: Teacher[] = [
  {
    id: "TCH001",
    name: "I Made Wijaya",
    email: "made.wijaya@shineeducation.com",
    phoneNumber: "081234567890",
    profilePhoto: "",
    subjects: ["Matematika", "Fisika"],
    educationLevel: ["SMP", "SMA/SMK"],
    status: "ACTIVE",
    specialization: ["Matematika", "Fisika"],
    yearsOfExperience: 5,
    certifications: ["Sertifikasi Guru Professional", "Master of Education"],
    schedule: {
      monday: ["08:00-10:00", "13:00-15:00"],
      wednesday: ["09:00-11:00", "14:00-16:00"],
      friday: ["10:00-12:00", "15:00-17:00"],
    },
  },
  {
    id: "TCH002",
    name: "Ni Kadek Dewi",
    email: "kadek.dewi@shineeducation.com",
    phoneNumber: "081345678901",
    profilePhoto: "",
    subjects: ["Bahasa Inggris"],
    educationLevel: ["SD", "SMP", "SMA/SMK"],
    status: "ACTIVE",
    specialization: ["English Literature", "TOEFL Preparation"],
    yearsOfExperience: 7,
    certifications: ["TOEFL Trainer", "Cambridge CELTA"],
    schedule: {
      tuesday: ["08:00-12:00"],
      thursday: ["13:00-17:00"],
      saturday: ["09:00-15:00"],
    },
  },
  {
    id: "TCH003",
    name: "I Putu Surya",
    email: "putu.surya@shineeducation.com",
    phoneNumber: "081456789012",
    profilePhoto: "",
    subjects: ["IPA", "Biologi", "Kimia"],
    educationLevel: ["SMP", "SMA/SMK"],
    status: "ACTIVE",
    specialization: ["Sains", "Biologi", "Kimia"],
    yearsOfExperience: 4,
    certifications: ["Master of Science Education"],
    schedule: {
      monday: ["10:00-14:00"],
      wednesday: ["13:00-17:00"],
      friday: ["08:00-12:00"],
    },
  },
  {
    id: "TCH004",
    name: "Ni Made Sri",
    email: "made.sri@shineeducation.com",
    phoneNumber: "081567890123",
    profilePhoto: "",
    subjects: ["Bahasa Indonesia", "Sastra"],
    educationLevel: ["SD", "SMP", "SMA/SMK"],
    status: "INACTIVE",
    specialization: ["Bahasa Indonesia", "Sastra Indonesia"],
    yearsOfExperience: 6,
    certifications: ["Magister Pendidikan Bahasa"],
    schedule: {
      tuesday: ["09:00-13:00"],
      thursday: ["14:00-18:00"],
    },
  },
  {
    id: "TCH005",
    name: "I Nyoman Putra",
    email: "nyoman.putra@shineeducation.com",
    phoneNumber: "081678901234",
    profilePhoto: "",
    subjects: ["IPS", "Sejarah", "Geografi"],
    educationLevel: ["SMP", "SMA/SMK"],
    status: "ACTIVE",
    specialization: ["Ilmu Sosial", "Sejarah", "Geografi"],
    yearsOfExperience: 8,
    certifications: ["Doktor Pendidikan Sejarah"],
    schedule: {
      wednesday: ["08:00-12:00"],
      friday: ["13:00-17:00"],
    },
  },
];

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

  async updateTeacher(id: string, data: TeacherFormData): Promise<Teacher> {
    return apiRequest<Teacher>("PUT", `${this.apiUrl}/${id}`, data);
  }

  async deleteTeacher(id: string): Promise<void> {
    return apiRequest<void>("DELETE", `${this.apiUrl}/${id}`);
  }
}

export const teacherService = new TeacherService();
