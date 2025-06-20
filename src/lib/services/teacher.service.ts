import { Teacher, TeacherFormData } from "@/types/teacher";

// Dummy data untuk guru
const dummyTeachers: Teacher[] = [
  {
    id: "TCH001",
    name: "I Made Wijaya",
    email: "made.wijaya@shineeducation.com",
    phoneNumber: "081234567890",
    profilePhoto: null,
    subjects: ["Matematika", "Fisika"],
    educationLevel: ["SMP", "SMA"],
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
    profilePhoto: null,
    subjects: ["Bahasa Inggris"],
    educationLevel: ["SD", "SMP", "SMA"],
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
    profilePhoto: null,
    subjects: ["IPA", "Biologi", "Kimia"],
    educationLevel: ["SMP", "SMA"],
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
    profilePhoto: null,
    subjects: ["Bahasa Indonesia", "Sastra"],
    educationLevel: ["SD", "SMP", "SMA"],
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
    profilePhoto: null,
    subjects: ["IPS", "Sejarah", "Geografi"],
    educationLevel: ["SMP", "SMA"],
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
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyTeachers;
  }

  async getTeacherById(id: string): Promise<Teacher> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const teacher = dummyTeachers.find((teacher) => teacher.id === id);
    if (!teacher) throw new Error("Failed to fetch teacher");
    return teacher;
  }

  async createTeacher(data: TeacherFormData): Promise<Teacher> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newId = String(
      Math.max(...dummyTeachers.map((t) => parseInt(t.id.slice(3)))) + 1
    ).padStart(3, "0");
    const newTeacher: Teacher = {
      ...data,
      id: `TCH${newId}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dummyTeachers.push(newTeacher);
    return newTeacher;
  }

  async updateTeacher(id: string, data: TeacherFormData): Promise<Teacher> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = dummyTeachers.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Teacher not found");

    dummyTeachers[index] = {
      ...dummyTeachers[index],
      ...data,
      updatedAt: new Date(),
    };
    return dummyTeachers[index];
  }

  async deleteTeacher(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const index = dummyTeachers.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Teacher not found");
    dummyTeachers.splice(index, 1);
  }
}

export const teacherService = new TeacherService();
