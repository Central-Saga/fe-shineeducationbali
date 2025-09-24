export interface AdminClass {
  id: string;
  class_name: string;
  subject: string; // Kategori program (contoh: "Matematika", "Bahasa Inggris", "Komputer")
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
  course_name: string;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED" | "DRAFT";
}

export const adminClasses: AdminClass[] = [
  {
    id: "1",
    class_name: "Matematika SMA Kelas A",
    subject: "Matematika",
    level: "SMA/SMK",
    program_name: "Matematika SMA",
    program_id: "prog-sma-001",
    schedule: "Senin, Rabu, Jumat",
    time_start: "08:00",
    time_end: "09:30",
    capacity: 30,
    current_enrollment: 25,
    teacher_name: "Dr. Ahmad Fauzi",
    teacher_id: "T001",
    course_name: "Kalkulus dan Aljabar Linear",
    status: "ACTIVE"
  },
  {
    id: "2",
    class_name: "Komputer SMK Kelas B",
    subject: "Komputer",
    level: "SMA/SMK",
    program_name: "Komputer SMK",
    program_id: "prog-smk-001",
    schedule: "Selasa, Kamis",
    time_start: "10:00",
    time_end: "11:30",
    capacity: 25,
    current_enrollment: 20,
    teacher_name: "Rudi Hartono, S.Kom",
    teacher_id: "T002",
    course_name: "Dasar Pemrograman Python",
    status: "ACTIVE"
  },
  {
    id: "3",
    class_name: "Bahasa Inggris SMA Kelas C",
    subject: "Bahasa Inggris",
    level: "SMA/SMK",
    program_name: "Bahasa Inggris SMA",
    program_id: "prog-sma-002",
    schedule: "Senin, Rabu",
    time_start: "08:00",
    time_end: "09:30",
    capacity: 25,
    current_enrollment: 22,
    teacher_name: "Sarah Johnson, M.Ed",
    teacher_id: "T003",
    course_name: "English for Academic Purposes",
    status: "ACTIVE"
  },
  {
    id: "4",
    class_name: "Matematika SMP Kelas D",
    subject: "Matematika",
    level: "SMP",
    program_name: "Matematika SMP",
    program_id: "prog-smp-001",
    schedule: "Selasa, Kamis",
    time_start: "13:00",
    time_end: "14:30",
    capacity: 20,
    current_enrollment: 18,
    teacher_name: "Budi Santoso, S.Pd",
    teacher_id: "T004",
    course_name: "Aljabar Dasar dan Geometri",
    status: "COMPLETED"
  },
  {
    id: "5",
    class_name: "IPA SMP Kelas E",
    subject: "IPA",
    level: "SMP",
    program_name: "IPA SMP",
    program_id: "prog-smp-002",
    schedule: "Senin, Rabu, Jumat",
    time_start: "09:00",
    time_end: "11:00",
    capacity: 25,
    current_enrollment: 20,
    teacher_name: "Dr. Siti Aminah",
    teacher_id: "T005",
    course_name: "Fisika dan Kimia Dasar",
    status: "ACTIVE"
  },
  {
    id: "6",
    class_name: "Bahasa Indonesia SMA Kelas F",
    subject: "Bahasa Indonesia",
    level: "SMA/SMK",
    program_name: "Bahasa Indonesia SMA",
    program_id: "prog-sma-003",
    schedule: "Selasa, Kamis",
    time_start: "14:00",
    time_end: "15:30",
    capacity: 30,
    current_enrollment: 28,
    teacher_name: "Prof. Dr. Bambang Sutrisno",
    teacher_id: "T006",
    course_name: "Sastra Indonesia Modern",
    status: "ACTIVE"
  },
  {
    id: "7",
    class_name: "Fisika SMA Kelas G",
    subject: "Fisika",
    level: "SMA/SMK",
    program_name: "Fisika SMA",
    program_id: "prog-sma-004",
    schedule: "Senin, Rabu",
    time_start: "10:00",
    time_end: "12:00",
    capacity: 25,
    current_enrollment: 23,
    teacher_name: "Dr. Ir. Hendra Wijaya",
    teacher_id: "T007",
    course_name: "Mekanika dan Termodinamika",
    status: "ACTIVE"
  },
  {
    id: "8",
    class_name: "Kimia SMA Kelas H",
    subject: "Kimia",
    level: "SMA/SMK",
    program_name: "Kimia SMA",
    program_id: "prog-sma-005",
    schedule: "Selasa, Kamis",
    time_start: "13:00",
    time_end: "15:00",
    capacity: 20,
    current_enrollment: 18,
    teacher_name: "Dr. Dra. Rina Sari",
    teacher_id: "T008",
    course_name: "Kimia Organik dan Anorganik",
    status: "DRAFT"
  },
  {
    id: "9",
    class_name: "Sejarah SMA Kelas I",
    subject: "Sejarah",
    level: "SMA/SMK",
    program_name: "Sejarah SMA",
    program_id: "prog-sma-006",
    schedule: "Jumat",
    time_start: "08:00",
    time_end: "10:00",
    capacity: 30,
    current_enrollment: 26,
    teacher_name: "Drs. Agus Supriyanto",
    teacher_id: "T009",
    course_name: "Sejarah Indonesia Modern",
    status: "ACTIVE"
  },
  {
    id: "10",
    class_name: "Geografi SMA Kelas J",
    subject: "Geografi",
    level: "SMA/SMK",
    program_name: "Geografi SMA",
    program_id: "prog-sma-007",
    schedule: "Senin, Rabu",
    time_start: "15:00",
    time_end: "16:30",
    capacity: 25,
    current_enrollment: 24,
    teacher_name: "S.Pd. Dewi Kartika",
    teacher_id: "T010",
    course_name: "Geografi Fisik dan Manusia",
    status: "ACTIVE"
  }
];
