// Data assignment untuk siswa
export const assignmentData = {
  kuis: {
    title: "Kuis + Tugas",
    description: "Kerjakan soal kuis dan tugas yang diberikan pada pertemuan ini.",
    fileName: "Soal Kuis & Tugas.pdf",
    fileUrl: "#",
    fileDate: "7 July 2025, 14:43",
    status: "Belum dikirimkan",
    deadline: "Tuesday, 8 July 2025, 13:00",
    lastChanged: "-",
    submittedFile: null,
  },
  uts: {
    title: "UTS",
    description: "Ujian Tengah Semester, kerjakan sesuai instruksi guru.",
    fileName: "Soal UTS.pdf",
    fileUrl: "#",
    fileDate: "7 July 2025, 14:43",
    status: "Belum dikirimkan",
    deadline: "Tuesday, 8 July 2025, 13:00",
    lastChanged: "-",
    submittedFile: null,
  },
};

// Data assignment yang lebih lengkap untuk berbagai jenis tugas
export const studentAssignments = [
  {
    id: 'a1',
    title: 'Tugas Aljabar Linear Pertemuan 1',
    description: 'Kerjakan soal-soal berikut terkait materi matriks dan determinan. Buatlah penyelesaian step-by-step yang jelas untuk setiap soal.',
    dueDate: '2025-07-18',
    points: 100,
    status: 'not-submitted',
    type: 'assignment',
    fileName: 'Soal Kuis & Tugas.pdf',
    fileUrl: '#',
    fileDate: '7 July 2025, 14:43',
    deadline: 'Tuesday, 8 July 2025, 13:00',
    lastChanged: '-',
    submittedFile: null,
  },
  {
    id: 'a2',
    title: 'Tugas Aplikasi Aljabar Linear dalam Kehidupan',
    description: 'Buatlah sebuah esai singkat tentang penerapan aljabar linear dalam bidang yang Anda minati (teknologi, ekonomi, sains, dll). Minimal 500 kata dengan referensi.',
    dueDate: '2025-07-15',
    points: 100,
    status: 'submitted',
    type: 'assignment',
    fileName: 'Soal UTS.pdf',
    fileUrl: '#',
    fileDate: '7 July 2025, 14:43',
    deadline: 'Tuesday, 8 July 2025, 13:00',
    lastChanged: '2025-07-14T15:30:00',
    submittedFile: {
      name: 'Esai_Aplikasi_Aljabar_Linear.pdf',
      url: '#',
      size: '1.2 MB'
    },
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
    type: 'quiz',
    fileName: 'Soal Quiz Matriks.pdf',
    fileUrl: '#',
    fileDate: '7 July 2025, 14:43',
    deadline: 'Tuesday, 8 July 2025, 13:00',
    lastChanged: '2025-07-10T09:45:00',
    submittedFile: {
      name: 'Quiz_Matriks_Jawaban.pdf',
      url: '#',
      size: '850 KB'
    },
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
];

// Helper function untuk mendapatkan assignment berdasarkan ID atau type
export const getAssignmentById = (id: string) => {
  return studentAssignments.find(assignment => assignment.id === id);
};

export const getAssignmentByType = (type: string) => {
  const baseAssignment = assignmentData[type as keyof typeof assignmentData] || assignmentData.kuis;
  
  // Cek apakah ada data submission yang tersimpan di localStorage
  if (typeof window !== 'undefined') {
    const savedSubmission = localStorage.getItem(`assignment_submission_${type}`);
    if (savedSubmission) {
      const submissionData = JSON.parse(savedSubmission);
      return {
        ...baseAssignment,
        status: "Sudah dikirimkan",
        submittedFile: submissionData.files[0] || null,
        lastChanged: submissionData.submittedDate,
        submissionData: submissionData
      };
    }
  }
  
  return baseAssignment;
};

// Helper function untuk menyimpan submission data
export const saveSubmissionData = (type: string, files: any[], comment: string) => {
  if (typeof window !== 'undefined') {
    const submissionData = {
      files: files,
      comment: comment,
      submittedDate: new Date().toISOString()
    };
    localStorage.setItem(`assignment_submission_${type}`, JSON.stringify(submissionData));
  }
};

// Helper function untuk menghapus submission data
export const clearSubmissionData = (type: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`assignment_submission_${type}`);
  }
};
