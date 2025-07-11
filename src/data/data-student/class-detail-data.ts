import { ClassSession } from "./classes-data";

export interface ClassAttendee {
  id: string;
  name: string;
  avatar?: string;
  attendanceStatus?: 'present' | 'absent' | 'late';
}

export interface SessionAttendance {
  sessionId: string;
  sessionNumber: number;
  date: string;
  attendanceStatus: 'present' | 'absent' | 'late';
  notes?: string;
}

export interface StudentAttendance {
  studentId: string;
  studentName: string;
  avatar?: string;
  sessions: SessionAttendance[];
}

export interface ClassMaterial {
  id: string;
  title: string;
  type: 'document' | 'presentation' | 'video' | 'exercise' | 'other';
  description: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  uploadDate: string;
  size?: string;
  downloadCount: number;
}

export interface ClassAssignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: 'submitted' | 'not-submitted' | 'graded';
  submittedDate?: string;
  grade?: number;
  feedback?: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    size: string;
  }[];
}

export interface ClassDiscussionMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
  }[];
  replies?: {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    timestamp: string;
  }[];
}

export interface ClassDetailData {
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
  status: 'upcoming' | 'ongoing' | 'completed';
  meetingLink?: string;
  recordingUrl?: string;
  syllabus?: string; // Adding syllabus property
  instructor: {
    id: string;
    name: string;
    avatar?: string;
    subject: string;
    bio: string;
    contactInfo?: string;
  };
  attendees: ClassAttendee[];
  studentAttendance?: StudentAttendance; // Individual student attendance record
  attendanceSessions: {
    sessionId: string;
    sessionNumber: number;
    date: string;
    topic: string;
  }[];
  materials: ClassMaterial[];
  assignments: ClassAssignment[];
  discussion: ClassDiscussionMessage[];
  announcements: {
    id: string;
    title: string;
    content: string;
    date: string;
    isImportant?: boolean;
  }[];
}

export const classDetailData: ClassDetailData[] = [
  {
    id: 'c1',
    title: 'Aljabar Linear',
    subject: 'Matematika',
    date: '2025-07-15',
    timeStart: '08:00',
    timeEnd: '09:30',
    teacher: 'Budi Santoso',
    meetingLink: 'https://zoom.us/j/123456789',
    recordingUrl: 'https://shineeducation.com/recordings/c1-aljabar-linear',
    location: 'Ruang Belajar 101',
    description: 'Pengenalan konsep aljabar linear dan aplikasinya. Kelas ini akan fokus pada pemahaman dasar tentang matriks, determinan, dan sistem persamaan linear.',
    syllabus: 'Kelas Aljabar Linear ini akan membahas konsep dasar aljabar linear meliputi matriks, determinan, dan sistem persamaan linear. Siswa akan mempelajari aplikasi aljabar linear dalam kehidupan sehari-hari.',
    status: 'ongoing',
    attendanceSessions: [
      { sessionId: 's1', sessionNumber: 1, date: '2025-07-01', topic: 'Pengenalan Aljabar Linear' },
      { sessionId: 's2', sessionNumber: 2, date: '2025-07-08', topic: 'Matriks dan Operasinya' },
      { sessionId: 's3', sessionNumber: 3, date: '2025-07-15', topic: 'Determinan' },
      { sessionId: 's4', sessionNumber: 4, date: '2025-07-22', topic: 'Sistem Persamaan Linear' }
    ],
    studentAttendance: {
      studentId: 'std1',
      studentName: 'John Doe',
      avatar: undefined,
      sessions: [
        { sessionId: 's1', sessionNumber: 1, date: '2025-07-01', attendanceStatus: 'present', notes: 'Tepat waktu' },
        { sessionId: 's2', sessionNumber: 2, date: '2025-07-08', attendanceStatus: 'late', notes: 'Terlambat 10 menit' },
        { sessionId: 's3', sessionNumber: 3, date: '2025-07-15', attendanceStatus: 'present', notes: '' }
      ]
    },
    materials: [
      {
        id: 'm1',
        title: 'Modul Aljabar Linear',
        type: 'document',
        description: 'Buku pegangan untuk materi aljabar linear',
        fileUrl: '/materials/aljabar-linear.pdf',
        uploadDate: '2025-07-10',
        size: '2.4 MB',
        downloadCount: 42
      },
      {
        id: 'm2',
        title: 'Presentasi Matriks dan Operasinya',
        type: 'presentation',
        description: 'Slide presentasi tentang matriks dan operasinya',
        fileUrl: '/materials/matriks-slides.pptx',
        thumbnailUrl: '/materials/thumbnails/matriks-slides.jpg',
        uploadDate: '2025-07-10',
        size: '1.8 MB',
        downloadCount: 38
      },
      {
        id: 'm3',
        title: 'Latihan Soal Aljabar Linear',
        type: 'exercise',
        description: 'Kumpulan soal-soal latihan untuk aljabar linear',
        fileUrl: '/materials/latihan-aljabar-linear.pdf',
        uploadDate: '2025-07-12',
        size: '850 KB',
        downloadCount: 35
      }
    ],
    assignments: [
      {
        id: 'a1',
        title: 'Tugas Aljabar Linear Pertemuan 1',
        description: 'Kerjakan soal-soal berikut terkait materi matriks dan determinan. Buatlah penyelesaian step-by-step yang jelas untuk setiap soal.',
        dueDate: '2025-07-18',
        points: 100,
        status: 'not-submitted'
      },
      {
        id: 'a2',
        title: 'Tugas Aplikasi Aljabar Linear dalam Kehidupan',
        description: 'Buatlah sebuah esai singkat tentang penerapan aljabar linear dalam bidang yang Anda minati (teknologi, ekonomi, sains, dll). Minimal 500 kata dengan referensi.',
        dueDate: '2025-07-15',
        points: 100,
        status: 'submitted',
        submittedDate: '2025-07-14T15:30:00',
        attachments: [
          {
            id: 'att-1',
            name: 'Esai_Aplikasi_Aljabar_Linear.pdf',
            url: '#',
            size: '1.2 MB'
          }
        ]
      },
      {
        id: 'a3',
        title: 'Quiz Matriks dan Operasinya',
        description: 'Kerjakan soal-soal quiz tentang matriks dan operasinya dalam waktu 60 menit.',
        dueDate: '2025-07-10',
        points: 50,
        status: 'graded',
        submittedDate: '2025-07-10T09:45:00',
        grade: 45,
        feedback: 'Jawaban sangat baik, terutama pada soal operasi invers matriks. Untuk soal nomor 5, masih perlu sedikit perbaikan dalam langkah-langkah penyelesaian.',
        attachments: [
          {
            id: 'att-2',
            name: 'Quiz_Matriks_Jawaban.pdf',
            url: '#',
            size: '850 KB'
          }
        ]
      }
    ],
    instructor: {
      id: 'ins1',
      name: 'Budi Santoso',
      subject: 'Matematika',
      bio: 'Budi Santoso adalah guru matematika dengan pengalaman mengajar selama 10 tahun. Beliau memiliki gelar S2 di bidang Pendidikan Matematika dari Universitas Indonesia.'
    },
    attendees: [
      {
        id: 'att1',
        name: 'Ahmad Rizal',
        attendanceStatus: 'present'
      },
      {
        id: 'att2',
        name: 'Siti Nurhaliza',
        attendanceStatus: 'present'
      },
      {
        id: 'att3',
        name: 'Budi Prakoso',
        attendanceStatus: 'absent'
      },
      {
        id: 'att4',
        name: 'Diana Putri',
        attendanceStatus: 'late'
      }
    ],
    discussion: [
      {
        id: 'd1',
        userId: 'att1',
        userName: 'Ahmad Rizal',
        content: 'Pak, apakah ada rekomendasi buku atau sumber belajar tambahan untuk materi determinan?',
        timestamp: '2025-07-14T10:30:00',
        replies: [
          {
            id: 'dr1',
            userId: 'ins1',
            userName: 'Budi Santoso',
            content: 'Ada, silakan cek di perpustakaan buku "Aljabar Linear untuk Pemula" karya Prof. Widodo.',
            timestamp: '2025-07-14T11:15:00'
          }
        ]
      }
    ],
    announcements: [
      {
        id: 'ann1',
        title: 'Persiapan Kelas Aljabar Linear',
        content: 'Mohon semua siswa membaca materi tentang matriks dan determinan sebelum kelas dimulai. Siapkan juga kalkulator dan alat tulis yang diperlukan.',
        date: '2025-07-13',
        isImportant: true
      }
    ]
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
    meetingLink: 'https://meet.example.com/english-grammar',
    recordingUrl: 'https://shineeducation.com/recordings/c2-grammar',
    status: 'upcoming',
    description: 'Belajar tenses dan struktur kalimat dalam bahasa Inggris. Kelas ini akan membantu siswa memahami dasar-dasar tata bahasa Inggris untuk komunikasi sehari-hari.',
    syllabus: 'Kelas Grammar Dasar ini akan membahas struktur tenses dalam bahasa Inggris, mulai dari present tense, past tense, hingga future tense. Siswa akan mempelajari cara membuat kalimat dengan struktur yang benar.',
    attendanceSessions: [
      { sessionId: 's1', sessionNumber: 1, date: '2025-07-01', topic: 'Introduction to English Grammar' },
      { sessionId: 's2', sessionNumber: 2, date: '2025-07-08', topic: 'Present Tense' },
      { sessionId: 's3', sessionNumber: 3, date: '2025-07-15', topic: 'Past Tense' },
      { sessionId: 's4', sessionNumber: 4, date: '2025-07-22', topic: 'Future Tense' }
    ],
    studentAttendance: {
      studentId: 'std1',
      studentName: 'John Doe',
      sessions: [
        { sessionId: 's1', sessionNumber: 1, date: '2025-07-01', attendanceStatus: 'present', notes: '' },
        { sessionId: 's2', sessionNumber: 2, date: '2025-07-08', attendanceStatus: 'absent', notes: 'Sakit' }
      ]
    },
    materials: [
      {
        id: 'm1',
        title: 'Modul Grammar',
        type: 'document',
        description: 'Buku pegangan tata bahasa bahasa Inggris',
        fileUrl: '/materials/english-grammar.pdf',
        uploadDate: '2025-07-10',
        size: '3.2 MB',
        downloadCount: 45
      },
      {
        id: 'm2',
        title: 'Audio Percakapan',
        type: 'video',
        description: 'Rekaman audio percakapan bahasa Inggris',
        fileUrl: '/materials/english-conversations.mp3',
        uploadDate: '2025-07-12',
        size: '15.4 MB',
        downloadCount: 38
      },
      {
        id: 'm3',
        title: 'Worksheet Grammar',
        type: 'exercise',
        description: 'Lembar kerja latihan tata bahasa',
        fileUrl: '/materials/grammar-worksheet.pdf',
        uploadDate: '2025-07-13',
        size: '750 KB',
        downloadCount: 41
      }
    ],
    assignments: [
      {
        id: 'a2',
        title: 'Grammar Exercise',
        description: 'Kerjakan latihan tenses pada lembar kerja yang telah disediakan',
        dueDate: '2025-07-17',
        points: 100,
        status: 'not-submitted'
      }
    ],
    instructor: {
      id: 'ins2',
      name: 'Sarah Johnson',
      subject: 'Bahasa Inggris',
      bio: 'Sarah Johnson adalah pengajar bahasa Inggris native speaker dari Amerika. Beliau memiliki sertifikasi TEFL dan pengalaman mengajar di berbagai negara.'
    },
    attendees: [
      {
        id: 'att1',
        name: 'Ahmad Rizal',
        attendanceStatus: 'present'
      },
      {
        id: 'att2',
        name: 'Siti Nurhaliza',
        attendanceStatus: 'present'
      },
      {
        id: 'att3',
        name: 'Budi Prakoso',
        attendanceStatus: 'present'
      },
      {
        id: 'att4',
        name: 'Diana Putri',
        attendanceStatus: 'present'
      }
    ],
    discussion: [
      {
        id: 'd1',
        userId: 'att2',
        userName: 'Siti Nurhaliza',
        content: 'Miss Sarah, apakah ada tips untuk mengingat berbagai bentuk tenses dengan lebih mudah?',
        timestamp: '2025-07-13T14:20:00',
        replies: [
          {
            id: 'dr1',
            userId: 'ins2',
            userName: 'Sarah Johnson',
            content: 'Tentu! Cobalah membuat tabel perbandingan dan berlatih dengan kalimat yang sering digunakan sehari-hari.',
            timestamp: '2025-07-13T15:05:00'
          }
        ]
      }
    ],
    announcements: [
      {
        id: 'ann1',
        title: 'Persiapan Kelas Grammar',
        content: 'Please bring your dictionary to class. We will have a conversation practice session in the second half of the class.',
        date: '2025-07-14',
        isImportant: false
      }
    ]
  },
  {
    id: 'pc1',
    title: 'Persamaan Kuadrat',
    subject: 'Matematika',
    date: '2025-07-08',
    timeStart: '08:00',
    timeEnd: '09:30',
    teacher: 'Budi Santoso',
    location: 'Ruang Belajar 101',
    description: 'Pembahasan tentang cara menyelesaikan persamaan kuadrat. Kelas ini mencakup berbagai metode untuk mencari solusi persamaan kuadrat seperti faktorisasi, rumus kuadrat, dan melengkapkan kuadrat sempurna.',
    syllabus: 'Kelas Persamaan Kuadrat ini akan membahas metode-metode penyelesaian persamaan kuadrat seperti faktorisasi, rumus kuadrat (rumus abc), dan melengkapkan kuadrat sempurna. Siswa akan belajar menerapkan metode yang tepat untuk berbagai jenis soal.',
    attendanceSessions: [
      { sessionId: 'ps1', sessionNumber: 1, date: '2025-07-01', topic: 'Pengenalan Persamaan Kuadrat' },
      { sessionId: 'ps2', sessionNumber: 2, date: '2025-07-08', topic: 'Metode Faktorisasi' }
    ],
    studentAttendance: {
      studentId: 'std1',
      studentName: 'John Doe',
      sessions: [
        { sessionId: 'ps1', sessionNumber: 1, date: '2025-07-01', attendanceStatus: 'present', notes: 'Tepat waktu' },
        { sessionId: 'ps2', sessionNumber: 2, date: '2025-07-08', attendanceStatus: 'present', notes: 'Aktif bertanya' }
      ]
    },
    materials: [
      {
        id: 'm1',
        title: 'Modul Persamaan Kuadrat',
        type: 'document',
        description: 'Buku pegangan untuk materi persamaan kuadrat',
        fileUrl: '/materials/persamaan-kuadrat.pdf',
        uploadDate: '2025-07-01',
        size: '2.1 MB',
        downloadCount: 48
      },
      {
        id: 'm2',
        title: 'Video Tutorial Persamaan Kuadrat',
        type: 'video',
        description: 'Video penjelasan tentang cara menyelesaikan persamaan kuadrat',
        fileUrl: '/materials/video-persamaan-kuadrat.mp4',
        thumbnailUrl: '/materials/thumbnails/video-persamaan-kuadrat.jpg',
        uploadDate: '2025-07-02',
        size: '45.6 MB',
        downloadCount: 39
      },
      {
        id: 'm3',
        title: 'Latihan Soal',
        type: 'exercise',
        description: 'Kumpulan soal latihan persamaan kuadrat',
        fileUrl: '/materials/latihan-persamaan-kuadrat.pdf',
        uploadDate: '2025-07-03',
        size: '780 KB',
        downloadCount: 46
      }
    ],
    assignments: [
      {
        id: 'pa1',
        title: 'Tugas Persamaan Kuadrat',
        description: 'Kerjakan 10 soal persamaan kuadrat dengan metode yang berbeda',
        dueDate: '2025-07-10',
        points: 100,
        status: 'graded',
        submittedDate: '2025-07-09',
        grade: 85,
        feedback: 'Jawaban baik dan terstruktur. Ada beberapa kesalahan kecil dalam soal nomor 7 dan 9.',
        attachments: [
          {
            id: 'att1',
            name: 'Jawaban_PersamaanKuadrat.pdf',
            url: '/submissions/jawaban-persamaan-kuadrat.pdf',
            size: '1.2 MB'
          }
        ]
      }
    ],
    instructor: {
      id: 'ins1',
      name: 'Budi Santoso',
      subject: 'Matematika',
      bio: 'Budi Santoso adalah guru matematika dengan pengalaman mengajar selama 10 tahun. Beliau memiliki gelar S2 di bidang Pendidikan Matematika dari Universitas Indonesia.'
    },
    attendees: [
      {
        id: 'att1',
        name: 'Ahmad Rizal',
        attendanceStatus: 'present'
      },
      {
        id: 'att2',
        name: 'Siti Nurhaliza',
        attendanceStatus: 'present'
      },
      {
        id: 'att3',
        name: 'Budi Prakoso',
        attendanceStatus: 'present'
      },
      {
        id: 'att4',
        name: 'Diana Putri',
        attendanceStatus: 'present'
      }
    ],
    discussion: [
      {
        id: 'd1',
        userId: 'att3',
        userName: 'Budi Prakoso',
        content: 'Pak, saya masih bingung tentang cara melengkapkan kuadrat sempurna. Bisakah dijelaskan sekali lagi?',
        timestamp: '2025-07-08T09:15:00',
        replies: [
          {
            id: 'dr1',
            userId: 'ins1',
            userName: 'Budi Santoso',
            content: 'Tentu, Budi. Mari kita bahas setelah kelas. Saya akan memberikan contoh-contoh tambahan.',
            timestamp: '2025-07-08T09:20:00'
          }
        ]
      },
      {
        id: 'd2',
        userId: 'att1',
        userName: 'Ahmad Rizal',
        content: 'Terima kasih untuk materinya, Pak. Sangat membantu untuk memahami persamaan kuadrat.',
        timestamp: '2025-07-08T09:25:00'
      }
    ],
    recordingUrl: 'https://recordings.example.com/persamaan-kuadrat',
    status: 'completed',
    announcements: [
      {
        id: 'ann1',
        title: 'Hasil Tugas Persamaan Kuadrat',
        content: 'Nilai tugas persamaan kuadrat sudah diupload di sistem. Silakan cek dan jika ada pertanyaan bisa menghubungi saya.',
        date: '2025-07-10',
        isImportant: true
      }
    ]
  }
];

// Function to get class detail by ID
export const getClassDetail = (id: string): ClassDetailData | undefined => {
  const classData = classDetailData.find(classData => classData.id === id);
  
  // In a real application, you would filter the attendance data here
  // to show only the currently logged in student's attendance
  // This is a placeholder to simulate that functionality
  
  // Current user ID (in a real app, this would come from authentication)
  const currentUserId = 'stu1'; // Example student ID
  
  if (classData) {
    // Create a copy of the class data with filtered attendance
    return {
      ...classData,
      // In a real app, you would get the current student's attendance from the backend
      // For now, we'll use a hardcoded example
      studentAttendance: {
        studentId: currentUserId,
        studentName: 'John Doe', // Current logged in student
        sessions: [
          {
            sessionId: 's1',
            sessionNumber: 1,
            date: '2025-07-08',
            attendanceStatus: 'present',
            notes: 'Hadir tepat waktu'
          },
          {
            sessionId: 's2',
            sessionNumber: 2,
            date: '2025-07-15',
            attendanceStatus: 'late',
            notes: 'Terlambat 10 menit'
          },
          {
            sessionId: 's3',
            sessionNumber: 3,
            date: '2025-07-22',
            attendanceStatus: 'absent',
            notes: 'Tidak hadir tanpa keterangan'
          },
          {
            sessionId: 's4',
            sessionNumber: 4,
            date: '2025-07-29',
            attendanceStatus: 'present',
            notes: 'Hadir dan aktif dalam diskusi'
          }
        ]
      }
    };
  }
  
  return classData;
};
