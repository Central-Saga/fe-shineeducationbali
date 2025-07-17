export interface ClassMaterial {
  id: string;
  title: string;
  type?: string;
  url?: string;
}

export interface TeacherClassSession {
  id: string;
  title: string;
  subject: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  description: string;
  studentCount: number;
  completionProgress: number;
  materials: (string | ClassMaterial)[];
  meetingLink?: string;
  recordingUrl?: string;
  scheduleId?: string; // ID untuk menghubungkan dengan jadwal
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
        title: 'Aljabar Linear',
        subject: 'Matematika',
        date: '2025-07-15',
        timeStart: '08:00',
        timeEnd: '09:30',
        location: 'Ruang Belajar 101',
        description: 'Pengenalan konsep aljabar linear dan aplikasinya. Kelas ini akan fokus pada pemahaman dasar tentang matriks, determinan, dan sistem persamaan linear.',
        studentCount: 25,
        completionProgress: 35,
        materials: [
          'Modul Aljabar Linear',
          'Presentasi Matriks dan Operasinya',
          'Latihan Soal Aljabar Linear'
        ],
        meetingLink: 'https://zoom.us/j/123456789',
        status: 'upcoming',
        assignments: [
          {
            id: 'a1',
            title: 'Tugas Aljabar Linear Pertemuan 1',
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
        title: 'Dasar Pemrograman',
        subject: 'Informatika',
        date: '2025-07-15',
        timeStart: '10:00',
        timeEnd: '11:30',
        location: 'Lab Komputer 1',
        description: 'Pengenalan dasar pemrograman dengan Python. Siswa akan belajar sintaks dasar, struktur data, dan algoritma sederhana.',
        studentCount: 20,
        completionProgress: 40,
        materials: [
          'Modul Pengantar Python',
          'Contoh Kode Program',
          'Latihan Pemrograman Dasar'
        ],
        meetingLink: 'https://zoom.us/j/987654321',
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
        title: 'Sastra Inggris',
        subject: 'Bahasa Inggris',
        date: '2025-07-16',
        timeStart: '08:00',
        timeEnd: '09:30',
        location: 'Ruang Bahasa 2',
        description: 'Membahas karya-karya sastra klasik bahasa Inggris. Siswa akan menganalisis puisi dan prosa dari berbagai periode.',
        studentCount: 22,
        completionProgress: 50,
        materials: [
          'Kumpulan Puisi Shakespeare',
          'Analisis Karya Sastra Inggris',
          'Panduan Menulis Esai Sastra'
        ],
        meetingLink: 'https://zoom.us/j/111222333',
        status: 'upcoming',
        assignments: [
          {
            id: 'a3',
            title: 'Analisis Puisi Shakespeare',
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
        title: 'Fisika Dasar',
        subject: 'Fisika',
        date: '2025-07-10',
        timeStart: '13:00',
        timeEnd: '14:30',
        location: 'Lab Fisika',
        description: 'Kelas ini telah membahas konsep dasar mekanika Newton dan hukum gerak. Siswa telah melakukan eksperimen praktis.',
        studentCount: 18,
        completionProgress: 100,
        materials: [
          'Modul Mekanika Newton',
          'Laporan Praktikum Fisika',
          'Latihan Soal Hukum Gerak'
        ],
        recordingUrl: 'https://shineeducation.com/recordings/fisika-dasar-10072025',
        status: 'completed',
        assignments: [
          {
            id: 'a4',
            title: 'Laporan Praktikum Mekanika',
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
        title: 'Kimia Organik',
        subject: 'Kimia',
        date: '2025-07-11',
        timeStart: '09:00',
        timeEnd: '11:00',
        location: 'Lab Kimia',
        description: 'Kelas sedang berlangsung saat ini. Pembahasan tentang senyawa hidrokarbon dan reaksi organik.',
        studentCount: 20,
        completionProgress: 65,
        materials: [
          'Modul Kimia Organik',
          'Tabel Periodik Unsur',
          'Panduan Praktikum Kimia Organik'
        ],
        meetingLink: 'https://zoom.us/j/444555666',
        status: 'ongoing',
        assignments: [
          {
            id: 'a5',
            title: 'Kuis Senyawa Hidrokarbon',
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
