export interface ClassMaterial {
  id: string;
  title: string;
  type?: string;
  url?: string;
}

export interface TeacherClassSession {
  id: string;
  title: string; // Nama program (contoh: "Matematika SMA", "Bahasa Inggris SMA")
  subject: string; // Kategori program (contoh: "Matematika", "Bahasa Inggris", "Komputer")
  level: string; // Jenjang pendidikan (SD, SMP, SMA/SMK)
  programId: string; // ID program untuk referensi
  schedule: string; // Jadwal hari (contoh: "Senin, Rabu, Jumat")
  timeStart: string;
  timeEnd: string;
  description: string;
  studentCount: number; // Jumlah siswa yang terdaftar
  capacity: number; // Kapasitas maksimal kelas
  completionProgress: number; // Progress pembelajaran
  materials: (string | ClassMaterial)[];
  assignments?: {
    id: string;
    title: string;
    dueDate: string;
    status: 'completed' | 'ongoing' | 'pending';
    submissionCount?: number;
    totalStudents?: number;
  }[];
  attendanceRecord?: {
    total: number;
    present: number;
    absent: number;
    late: number;
  };
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface TeacherClassSchedule {
  id: string;
  day: string;
  date: string;
  sessions: TeacherClassSession[];
}

export const teacherClasses: TeacherClassSchedule[] = [
  {
    id: '1',
    day: 'Senin',
    date: '2025-07-15',
    sessions: [
      {
        id: 'c1',
        title: 'Matematika SMA',
        subject: 'Matematika',
        level: 'SMA/SMK',
        programId: 'prog-sma-001',
        schedule: 'Senin, Rabu, Jumat',
        timeStart: '08:00',
        timeEnd: '09:30',
        description: 'Program matematika lanjutan untuk siswa SMA/SMK. Kelas ini akan fokus pada pemahaman konsep kalkulus dan aljabar linear.',
        studentCount: 25,
        capacity: 30,
        completionProgress: 35,
        materials: [
          'Modul Kalkulus Dasar',
          'Presentasi Aljabar Linear',
          'Latihan Soal Matematika SMA'
        ],
        status: 'upcoming',
        assignments: [
          {
            id: 'a1',
            title: 'Tugas Kalkulus Pertemuan 1',
            dueDate: '2025-07-18',
            status: 'pending',
            submissionCount: 0,
            totalStudents: 25
          }
        ],
        attendanceRecord: {
          total: 25,
          present: 0,
          absent: 0,
          late: 0
        }
      },
      {
        id: 'c2',
        title: 'Komputer SMK',
        subject: 'Komputer',
        level: 'SMA/SMK',
        programId: 'prog-smk-001',
        schedule: 'Selasa, Kamis',
        timeStart: '10:00',
        timeEnd: '11:30',
        description: 'Program komputer untuk siswa SMK jurusan TI. Siswa akan belajar dasar pemrograman dengan Python dan algoritma.',
        studentCount: 20,
        capacity: 25,
        completionProgress: 40,
        materials: [
          'Modul Pengantar Python',
          'Contoh Kode Program',
          'Latihan Algoritma Dasar'
        ],
        status: 'upcoming',
        assignments: [
          {
            id: 'a2',
            title: 'Kuis Python Dasar',
            dueDate: '2025-07-17',
            status: 'pending',
            submissionCount: 0,
            totalStudents: 20
          }
        ],
        attendanceRecord: {
          total: 20,
          present: 0,
          absent: 0,
          late: 0
        }
      }
    ]
  },
  {
    id: '2',
    day: 'Selasa',
    date: '2025-07-16',
    sessions: [
      {
        id: 'c3',
        title: 'Bahasa Inggris SMA',
        subject: 'Bahasa Inggris',
        level: 'SMA/SMK',
        programId: 'prog-sma-002',
        schedule: 'Senin, Rabu',
        timeStart: '08:00',
        timeEnd: '09:30',
        description: 'Program bahasa Inggris lanjutan untuk siswa SMA/SMK. Fokus pada English for Academic Purposes dan Academic Writing.',
        studentCount: 22,
        capacity: 25,
        completionProgress: 50,
        materials: [
          'Modul Academic Writing',
          'Kumpulan Essay Samples',
          'Panduan Grammar Lanjutan'
        ],
        status: 'upcoming',
        assignments: [
          {
            id: 'a3',
            title: 'Essay Academic Writing',
            dueDate: '2025-07-20',
            status: 'pending',
            submissionCount: 0,
            totalStudents: 22
          }
        ],
        attendanceRecord: {
          total: 22,
          present: 0,
          absent: 0,
          late: 0
        }
      }
    ]
  },
  {
    id: '3',
    day: 'Rabu',
    date: '2025-07-10',
    sessions: [
      {
        id: 'c4',
        title: 'Matematika SMP',
        subject: 'Matematika',
        level: 'SMP',
        programId: 'prog-smp-001',
        schedule: 'Selasa, Kamis',
        timeStart: '13:00',
        timeEnd: '14:30',
        description: 'Program matematika untuk siswa SMP. Kelas ini telah membahas konsep aljabar dasar dan persamaan linear.',
        studentCount: 18,
        capacity: 20,
        completionProgress: 100,
        materials: [
          'Modul Aljabar Dasar',
          'Laporan Praktikum Matematika',
          'Latihan Soal Persamaan Linear'
        ],
        status: 'completed',
        assignments: [
          {
            id: 'a4',
            title: 'Laporan Praktikum Aljabar',
            dueDate: '2025-07-12',
            status: 'completed',
            submissionCount: 18,
            totalStudents: 18
          }
        ],
        attendanceRecord: {
          total: 18,
          present: 15,
          absent: 2,
          late: 1
        }
      }
    ]
  },
  {
    id: '4',
    day: 'Kamis',
    date: '2025-07-11',
    sessions: [
      {
        id: 'c5',
        title: 'IPA SMP',
        subject: 'IPA',
        level: 'SMP',
        programId: 'prog-smp-002',
        schedule: 'Senin, Rabu, Jumat',
        timeStart: '09:00',
        timeEnd: '11:00',
        description: 'Program IPA untuk siswa SMP. Kelas sedang berlangsung dengan pembahasan tentang fisika dan kimia dasar.',
        studentCount: 20,
        capacity: 25,
        completionProgress: 65,
        materials: [
          'Modul Fisika Dasar',
          'Modul Kimia Dasar',
          'Panduan Praktikum IPA'
        ],
        status: 'ongoing',
        assignments: [
          {
            id: 'a5',
            title: 'Kuis Fisika dan Kimia',
            dueDate: '2025-07-14',
            status: 'ongoing',
            submissionCount: 8,
            totalStudents: 20
          }
        ],
        attendanceRecord: {
          total: 20,
          present: 18,
          absent: 1,
          late: 1
        }
      }
    ]
  }
];
