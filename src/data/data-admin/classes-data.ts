export interface AdminClass {
  id: string;
  class_name: string;
  level: string; // Jenjang pendidikan (SD, SMP, SMA/SMK)
  program_name: string; // Nama program lengkap
  program_id: string; // ID program untuk referensi
  schedule: string;
  time_start: string;
  time_end: string;
  capacity: number;
  current_enrollment: number;
  teacher_name: string;
  teacher_id: string;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED" | "DRAFT";
}

export const adminClasses: AdminClass[] = [
  {
    id: "1",
    class_name: "Matematika SMA Kelas A",
    level: "SMA/SMK",
    program_name: "Matematika Dasar",
    program_id: "2",
    schedule: "Senin, Rabu, Jumat",
    time_start: "08:00",
    time_end: "09:30",
    capacity: 30,
    current_enrollment: 25,
    teacher_name: "Dr. Ahmad Fauzi",
    teacher_id: "T001",
    status: "ACTIVE"
  },
  {
    id: "2",
    class_name: "Programming Dasar Kelas B",
    level: "SMA/SMK",
    program_name: "Programming Dasar",
    program_id: "4",
    schedule: "Selasa, Kamis",
    time_start: "10:00",
    time_end: "11:30",
    capacity: 25,
    current_enrollment: 20,
    teacher_name: "Rudi Hartono, S.Kom",
    teacher_id: "T002",
    status: "ACTIVE"
  },
  {
    id: "3",
    class_name: "Bahasa Inggris Dasar Kelas C",
    level: "UMUM",
    program_name: "Bahasa Inggris Dasar",
    program_id: "1",
    schedule: "Senin, Rabu",
    time_start: "08:00",
    time_end: "09:30",
    capacity: 25,
    current_enrollment: 22,
    teacher_name: "Sarah Johnson, M.Ed",
    teacher_id: "T003",
    status: "ACTIVE"
  },
  {
    id: "4",
    class_name: "Matematika Dasar Kelas D",
    level: "SD",
    program_name: "Matematika Dasar",
    program_id: "2",
    schedule: "Selasa, Kamis",
    time_start: "13:00",
    time_end: "14:30",
    capacity: 20,
    current_enrollment: 18,
    teacher_name: "Budi Santoso, S.Pd",
    teacher_id: "T004",
    status: "COMPLETED"
  },
  {
    id: "5",
    class_name: "Calistung Kelas E",
    level: "SD",
    program_name: "Calistung (Baca Tulis Hitung)",
    program_id: "3",
    schedule: "Senin, Rabu, Jumat",
    time_start: "09:00",
    time_end: "11:00",
    capacity: 25,
    current_enrollment: 20,
    teacher_name: "Dr. Siti Aminah",
    teacher_id: "T005",
    status: "ACTIVE"
  },
  {
    id: "6",
    class_name: "Bahasa Inggris Menengah Kelas F",
    level: "SMA/SMK",
    program_name: "Bahasa Inggris Menengah",
    program_id: "6",
    schedule: "Selasa, Kamis",
    time_start: "14:00",
    time_end: "15:30",
    capacity: 30,
    current_enrollment: 28,
    teacher_name: "Prof. Dr. Bambang Sutrisno",
    teacher_id: "T006",
    status: "ACTIVE"
  },
  {
    id: "7",
    class_name: "Matematika Lanjutan Kelas G",
    level: "SMP",
    program_name: "Matematika Lanjutan",
    program_id: "5",
    schedule: "Senin, Rabu",
    time_start: "10:00",
    time_end: "12:00",
    capacity: 25,
    current_enrollment: 23,
    teacher_name: "Dr. Ir. Hendra Wijaya",
    teacher_id: "T007",
    status: "ACTIVE"
  },
  {
    id: "8",
    class_name: "Programming Dasar Kelas H",
    level: "SMA/SMK",
    program_name: "Programming Dasar",
    program_id: "4",
    schedule: "Selasa, Kamis",
    time_start: "13:00",
    time_end: "15:00",
    capacity: 20,
    current_enrollment: 18,
    teacher_name: "Dr. Dra. Rina Sari",
    teacher_id: "T008",
    status: "DRAFT"
  },
  {
    id: "9",
    class_name: "Bahasa Inggris Dasar Kelas I",
    level: "UMUM",
    program_name: "Bahasa Inggris Dasar",
    program_id: "1",
    schedule: "Jumat",
    time_start: "08:00",
    time_end: "10:00",
    capacity: 30,
    current_enrollment: 26,
    teacher_name: "Drs. Agus Supriyanto",
    teacher_id: "T009",
    status: "ACTIVE"
  },
  {
    id: "10",
    class_name: "Matematika Dasar Kelas J",
    level: "SD",
    program_name: "Matematika Dasar",
    program_id: "2",
    schedule: "Senin, Rabu",
    time_start: "15:00",
    time_end: "16:30",
    capacity: 25,
    current_enrollment: 24,
    teacher_name: "S.Pd. Dewi Kartika",
    teacher_id: "T010",
    status: "ACTIVE"
  }
];
