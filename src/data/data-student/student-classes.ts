// Data types for student academy
export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'document' | 'image' | 'audio' | 'task';
  fileUrl: string;
  uploadedBy?: string;
  uploadDate?: string;
  isCompleted?: boolean;
  deadline?: string; // For task type
  description?: string; // For task type
}

export interface Session {
  id: string;
  title: string; // e.g., "Pertemuan 1"
  materials: Material[];
  isCompleted: boolean;
}

export interface Subject {
  id: string;
  name: string;
  level: 'TK' | 'SD' | 'SMP' | 'SMA/SMK' | 'UMUM';
  teacher: string;
  sessions: Session[];
  description?: string;
  progress: number;
  status: 'active' | 'completed';
}

export interface StudentClass {
  activeSubjects: Subject[];
  completedSubjects: Subject[];
  studentLevel: 'TK' | 'SD' | 'SMP' | 'SMA/SMK' | 'UMUM';
}

// Sample data
const matematikaSessions: Session[] = [
  {
    id: 'session-1',
    title: 'Pertemuan 1',
    isCompleted: true,
    materials: [
      { 
        id: 'mat-001', 
        title: 'Aljabar Linear', 
        type: 'pdf',
        fileUrl: '/materials/matematika/aljabar-linear.pdf',
        isCompleted: true
      },
      { 
        id: 'mat-002', 
        title: 'Persamaan', 
        type: 'pdf',
        fileUrl: '/materials/matematika/persamaan.pdf',
        isCompleted: true
      },
      {
        id: 'task-001',
        title: 'Tugas Pertemuan 1',
        type: 'task',
        fileUrl: '/materials/matematika/tugas-pertemuan-1.pdf',
        description: 'Silakan kerjakan tugas ini dengan cermat. Perhatikan batas waktu pengumpulan.',
        deadline: '2025-07-20T23:59:00',
        isCompleted: false
      }
    ]
  },
  {
    id: 'session-2',
    title: 'Pertemuan 2',
    isCompleted: true,
    materials: [
      { 
        id: 'mat-003', 
        title: 'Aljabar Linear', 
        type: 'pdf',
        fileUrl: '/materials/matematika/aljabar-linear-lanjutan.pdf'
      },
      { 
        id: 'mat-004', 
        title: 'Persamaan', 
        type: 'pdf',
        fileUrl: '/materials/matematika/persamaan-lanjutan.pdf'
      }
    ]
  },
  {
    id: 'session-3',
    title: 'Pertemuan 3',
    isCompleted: false,
    materials: [
      { 
        id: 'mat-005', 
        title: 'Aljabar Linear', 
        type: 'pdf',
        fileUrl: '/materials/matematika/aljabar-linear-advanced.pdf'
      },
      { 
        id: 'mat-006', 
        title: 'Persamaan', 
        type: 'pdf',
        fileUrl: '/materials/matematika/persamaan-advanced.pdf'
      }
    ]
  },
  {
    id: 'session-4',
    title: 'Pertemuan 4',
    isCompleted: false,
    materials: [
      { 
        id: 'mat-007', 
        title: 'Aljabar Linear', 
        type: 'pdf',
        fileUrl: '/materials/matematika/aljabar-linear-final.pdf'
      },
      { 
        id: 'mat-008', 
        title: 'Persamaan', 
        type: 'pdf',
        fileUrl: '/materials/matematika/persamaan-final.pdf'
      }
    ]
  },
  {
    id: 'session-5',
    title: 'Pertemuan 5',
    isCompleted: false,
    materials: [
      { 
        id: 'mat-009', 
        title: 'Aljabar Linear', 
        type: 'pdf',
        fileUrl: '/materials/matematika/aljabar-linear-review.pdf'
      },
      { 
        id: 'mat-010', 
        title: 'Persamaan', 
        type: 'pdf',
        fileUrl: '/materials/matematika/persamaan-review.pdf'
      }
    ]
  }
];

const englishSessions: Session[] = [
  {
    id: 'session-eng-1',
    title: 'Pertemuan 1',
    isCompleted: true,
    materials: [
      { 
        id: 'eng-001', 
        title: 'Basic Grammar', 
        type: 'pdf',
        fileUrl: '/materials/english/basic-grammar.pdf'
      }
    ]
  },
  {
    id: 'session-eng-2',
    title: 'Pertemuan 2',
    isCompleted: false,
    materials: [
      { 
        id: 'eng-002', 
        title: 'Conversation Practice', 
        type: 'pdf',
        fileUrl: '/materials/english/conversation.pdf'
      }
    ]
  }
];

const ipaSessions: Session[] = [
  {
    id: 'session-ipa-1',
    title: 'Pertemuan 1',
    isCompleted: true,
    materials: [
      { 
        id: 'ipa-001', 
        title: 'Pengantar IPA', 
        type: 'pdf',
        fileUrl: '/materials/ipa/pengantar.pdf'
      }
    ]
  },
  {
    id: 'session-ipa-2',
    title: 'Pertemuan 2',
    isCompleted: false,
    materials: [
      { 
        id: 'ipa-002', 
        title: 'Ekosistem', 
        type: 'pdf',
        fileUrl: '/materials/ipa/ekosistem.pdf'
      }
    ]
  }
];

export const studentClasses: StudentClass = {
  studentLevel: 'SMP',
  activeSubjects: [
    {
      id: 'mat-001',
      name: 'Matematika',
      level: 'SMP',
      teacher: 'Budi Santoso, S.Pd',
      description: 'Kelas matematika untuk tingkat SMP',
      progress: 40,
      status: 'active',
      sessions: matematikaSessions
    },
    {
      id: 'eng-001',
      name: 'Bahasa Inggris',
      level: 'SMP',
      teacher: 'Sarah Johnson, M.Ed',
      description: 'Kelas bahasa inggris untuk tingkat SMP',
      progress: 30,
      status: 'active',
      sessions: englishSessions
    },
    {
      id: 'ipa-001',
      name: 'Ilmu Pengetahuan Alam',
      level: 'SMP',
      teacher: 'Dr. Ahmad Fauzi',
      description: 'Kelas IPA untuk tingkat SMP',
      progress: 20,
      status: 'active',
      sessions: ipaSessions
    }
  ],
  completedSubjects: [
    {
      id: 'mat-002',
      name: 'Dasar Matematika',
      level: 'SMP',
      teacher: 'Budi Santoso, S.Pd',
      description: 'Kelas dasar matematika untuk tingkat SMP',
      progress: 100,
      status: 'completed',
      sessions: []
    }
  ]
};

export default studentClasses;
