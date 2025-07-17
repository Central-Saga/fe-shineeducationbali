export interface ClassMaterial {
  id: string;
  title: string;
  type?: string;
  url?: string;
}

export interface ClassSession {
  id: string;
  title: string;
  subject: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  teacher: string;
  teacherAvatar?: string;
  location: string;
  description: string;
  materials: (string | ClassMaterial)[];
  meetingLink?: string;
  recordingUrl?: string;
  assignments?: {
    id: string;
    title: string;
    dueDate: string;
    status: 'submitted' | 'pending' | 'graded';
    score?: number;
  }[];
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface ClassSchedule {
  id: string;
  day: string;
  date: string;
  sessions: ClassSession[];
}

export const studentClasses: ClassSchedule[] = [
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
        teacher: 'Budi Santoso',
        location: 'Ruang Belajar 101',
        description: 'Pengenalan konsep aljabar linear dan aplikasinya',
        materials: ['Modul Aljabar Linear', 'Latihan Soal'],
        meetingLink: 'https://meet.example.com/aljabar-linear',
        assignments: [
          {
            id: 'a1',
            title: 'Tugas Aljabar Linear Pertemuan 1',
            dueDate: '2025-07-18',
            status: 'pending'
          }
        ],
        status: 'upcoming'
      },
      {
        id: 'c2',
        title: 'Grammar Dasar',
        subject: 'Bahasa Inggris',
        date: '2025-07-15',
        timeStart: '10:00',
        timeEnd: '11:30',
        teacher: 'Sarah Johnson',
        location: 'Ruang Belajar 102',
        description: 'Belajar tenses dan struktur kalimat dalam bahasa Inggris',
        materials: ['Modul Grammar', 'Worksheet'],
        meetingLink: 'https://meet.example.com/grammar-basics',
        assignments: [
          {
            id: 'a2',
            title: 'Grammar Exercise',
            dueDate: '2025-07-17',
            status: 'pending'
          }
        ],
        status: 'upcoming'
      }
    ]
  },
  {
    id: '2',
    day: 'Rabu',
    date: '2025-07-17',
    sessions: [
      {
        id: 'c3',
        title: 'Sistem Tubuh Manusia',
        subject: 'IPA',
        date: '2025-07-17',
        timeStart: '09:00',
        timeEnd: '10:30',
        teacher: 'Dewi Sartika',
        location: 'Laboratorium IPA',
        description: 'Pembelajaran tentang sistem organ tubuh manusia',
        materials: ['Modul Sistem Tubuh Manusia', 'Lembar Praktikum'],
        assignments: [
          {
            id: 'a3',
            title: 'Laporan Praktikum',
            dueDate: '2025-07-20',
            status: 'pending'
          }
        ],
        status: 'upcoming'
      }
    ]
  },
  {
    id: '3',
    day: 'Jumat',
    date: '2025-07-19',
    sessions: [
      {
        id: 'c4',
        title: 'Pengenalan Pemrograman Python',
        subject: 'Teknologi',
        date: '2025-07-19',
        timeStart: '13:00',
        timeEnd: '15:00',
        teacher: 'Andi Wijaya',
        location: 'Lab Komputer',
        description: 'Belajar dasar-dasar pemrograman Python',
        materials: ['Modul Python', 'Contoh Kode', 'Latihan'],
        assignments: [
          {
            id: 'a4',
            title: 'Proyek Mini Python',
            dueDate: '2025-07-26',
            status: 'pending'
          }
        ],
        status: 'upcoming'
      },
      {
        id: 'c5',
        title: 'Membaca dan Menulis',
        subject: 'Calistung',
        date: '2025-07-19',
        timeStart: '15:30',
        timeEnd: '17:00',
        teacher: 'Nina Hartati',
        location: 'Ruang Belajar 103',
        description: 'Latihan membaca dan menulis untuk tingkat dasar',
        materials: ['Buku Latihan Membaca', 'Lembar Latihan Menulis'],
        assignments: [
          {
            id: 'a5',
            title: 'Menulis Cerita Pendek',
            dueDate: '2025-07-22',
            status: 'pending'
          }
        ],
        status: 'upcoming'
      }
    ]
  }
];

export const pastClasses: ClassSession[] = [
  {
    id: 'pc1',
    title: 'Persamaan Kuadrat',
    subject: 'Matematika',
    date: '2025-07-08',
    timeStart: '08:00',
    timeEnd: '09:30',
    teacher: 'Budi Santoso',
    location: 'Ruang Belajar 101',
    description: 'Pembahasan tentang cara menyelesaikan persamaan kuadrat',
    materials: ['Modul Persamaan Kuadrat', 'Latihan Soal'],
    recordingUrl: 'https://recordings.example.com/persamaan-kuadrat',
    assignments: [
      {
        id: 'pa1',
        title: 'Tugas Persamaan Kuadrat',
        dueDate: '2025-07-10',
        status: 'graded',
        score: 85
      }
    ],
    status: 'completed'
  },
  {
    id: 'pc2',
    title: 'Vocabulary Building',
    subject: 'Bahasa Inggris',
    date: '2025-07-08',
    timeStart: '10:00',
    timeEnd: '11:30',
    teacher: 'Sarah Johnson',
    location: 'Ruang Belajar 102',
    description: 'Memperkaya kosakata bahasa Inggris',
    materials: ['Modul Vocabulary', 'Word List'],
    assignments: [
      {
        id: 'pa2',
        title: 'Vocabulary Quiz',
        dueDate: '2025-07-09',
        status: 'graded',
        score: 90
      }
    ],
    status: 'completed'
  },
  {
    id: 'pc3',
    title: 'Energi dan Perubahannya',
    subject: 'IPA',
    date: '2025-07-10',
    timeStart: '09:00',
    timeEnd: '10:30',
    teacher: 'Dewi Sartika',
    location: 'Laboratorium IPA',
    description: 'Pembahasan tentang konsep energi dan transformasinya',
    materials: ['Modul Energi', 'Lembar Eksperimen'],
    assignments: [
      {
        id: 'pa3',
        title: 'Laporan Eksperimen Energi',
        dueDate: '2025-07-13',
        status: 'submitted'
      }
    ],
    status: 'completed'
  }
];
