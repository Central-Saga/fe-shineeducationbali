import { studentsData } from './students-data';

// Struktur data untuk memetakan kelas dengan siswa
export interface ClassStudentMapping {
  classId: string;
  sessionId: string;
  students: {
    id: string;
    name: string;
    attendance?: 'present' | 'absent' | 'late' | 'unrecorded';
  }[];
}

// Membuat mapping untuk kelas dan siswa
export const classStudentMap: ClassStudentMapping[] = [
  {
    classId: 'c1',
    sessionId: 'c1',
    students: [
      { id: 'STD001', name: 'Ahmad Rizal', attendance: 'unrecorded' },
      { id: 'STD002', name: 'Siti Nurhaliza', attendance: 'unrecorded' },
      { id: 'STD003', name: 'Budi Prakoso', attendance: 'unrecorded' },
      { id: 'STD004', name: 'Diana Putri', attendance: 'unrecorded' },
      { id: 'STD005', name: 'Eko Prasetyo', attendance: 'unrecorded' },
      { id: 'STD006', name: 'Fina Maharani', attendance: 'unrecorded' },
      { id: 'STD007', name: 'Gilang Ramadhan', attendance: 'unrecorded' },
      { id: 'STD008', name: 'Hana Wijaya', attendance: 'unrecorded' },
      { id: 'STD009', name: 'Irfan Maulana', attendance: 'unrecorded' },
      { id: 'STD010', name: 'Jasmine Putri', attendance: 'unrecorded' },
      { id: 'STD011', name: 'Kevin Sanjaya', attendance: 'unrecorded' },
      { id: 'STD012', name: 'Linda Wati', attendance: 'unrecorded' },
      { id: 'STD013', name: 'Muhammad Fadli', attendance: 'unrecorded' },
      { id: 'STD014', name: 'Nadia Saputri', attendance: 'unrecorded' },
      { id: 'STD015', name: 'Oki Setiawan', attendance: 'unrecorded' },
      { id: 'STD016', name: 'Putri Amelia', attendance: 'unrecorded' },
      { id: 'STD017', name: 'Rizki Ananda', attendance: 'unrecorded' },
      { id: 'STD018', name: 'Sarah Maulida', attendance: 'unrecorded' },
      { id: 'STD019', name: 'Tegar Firmansyah', attendance: 'unrecorded' },
      { id: 'STD020', name: 'Umi Kalsum', attendance: 'unrecorded' },
      { id: 'STD021', name: 'Vino Bastian', attendance: 'unrecorded' },
      { id: 'STD022', name: 'Winda Aprilia', attendance: 'unrecorded' },
      { id: 'STD023', name: 'Xaverius Daniel', attendance: 'unrecorded' },
      { id: 'STD024', name: 'Yuni Shara', attendance: 'unrecorded' },
      { id: 'STD025', name: 'Zaki Firmansyah', attendance: 'unrecorded' },
    ]
  },
  {
    classId: 'c2',
    sessionId: 'c2',
    students: [
      { id: 'STD001', name: 'Ahmad Rizal', attendance: 'unrecorded' },
      { id: 'STD002', name: 'Siti Nurhaliza', attendance: 'unrecorded' },
      { id: 'STD003', name: 'Michael Brown', attendance: 'unrecorded' },
      { id: 'STD004', name: 'Dewi Lestari', attendance: 'unrecorded' },
      { id: 'STD005', name: 'Eko Prasetyo', attendance: 'unrecorded' },
      { id: 'STD006', name: 'Fitri Anggraini', attendance: 'unrecorded' },
      { id: 'STD007', name: 'Gilang Ramadhan', attendance: 'unrecorded' },
      { id: 'STD008', name: 'Hana Wijaya', attendance: 'unrecorded' },
      { id: 'STD009', name: 'Irfan Maulana', attendance: 'unrecorded' },
      { id: 'STD010', name: 'Jasmine Putri', attendance: 'unrecorded' },
      { id: 'STD011', name: 'Kevin Sanjaya', attendance: 'unrecorded' },
      { id: 'STD012', name: 'Linda Wati', attendance: 'unrecorded' },
      { id: 'STD013', name: 'Oscar Fernando', attendance: 'unrecorded' },
      { id: 'STD014', name: 'Putri Diana', attendance: 'unrecorded' },
      { id: 'STD015', name: 'Rudi Hermawan', attendance: 'unrecorded' },
      { id: 'STD016', name: 'Sinta Dewi', attendance: 'unrecorded' },
      { id: 'STD017', name: 'Tono Sudrajat', attendance: 'unrecorded' },
      { id: 'STD018', name: 'Umi Kalsum', attendance: 'unrecorded' },
      { id: 'STD019', name: 'Wanda Hamidah', attendance: 'unrecorded' },
      { id: 'STD020', name: 'Yanto Wibowo', attendance: 'unrecorded' },
      { id: 'STD021', name: 'Zahra Putri', attendance: 'unrecorded' },
      { id: 'STD022', name: 'Bima Arya', attendance: 'unrecorded' },
      { id: 'STD023', name: 'Cinta Laura', attendance: 'unrecorded' },
      { id: 'STD024', name: 'Dimas Anggara', attendance: 'unrecorded' },
      { id: 'STD025', name: 'Elsa Safira', attendance: 'unrecorded' },
    ]
  },
  {
    classId: 'c3',
    sessionId: 'c3',
    students: [
      { id: 'STD001', name: 'Ahmad Rizal', attendance: 'unrecorded' },
      { id: 'STD002', name: 'Emily Wilson', attendance: 'unrecorded' },
      { id: 'STD003', name: 'Michael Brown', attendance: 'unrecorded' },
      { id: 'STD004', name: 'Dewi Lestari', attendance: 'unrecorded' },
      { id: 'STD005', name: 'Eko Prasetyo', attendance: 'unrecorded' },
      { id: 'STD006', name: 'Fitri Anggraini', attendance: 'unrecorded' },
      { id: 'STD007', name: 'Gilang Ramadhan', attendance: 'unrecorded' },
      { id: 'STD008', name: 'Hana Wijaya', attendance: 'unrecorded' },
      { id: 'STD009', name: 'Irfan Maulana', attendance: 'unrecorded' },
      { id: 'STD010', name: 'Jasmine Putri', attendance: 'unrecorded' },
      { id: 'STD011', name: 'Maya Sari', attendance: 'unrecorded' },
      { id: 'STD012', name: 'Nanda Arsyad', attendance: 'unrecorded' },
      { id: 'STD013', name: 'Oscar Fernando', attendance: 'unrecorded' },
      { id: 'STD014', name: 'Putri Diana', attendance: 'unrecorded' },
      { id: 'STD015', name: 'Qori Sandika', attendance: 'unrecorded' },
      { id: 'STD016', name: 'Sinta Dewi', attendance: 'unrecorded' },
      { id: 'STD017', name: 'Tegar Septian', attendance: 'unrecorded' },
      { id: 'STD018', name: 'Vina Muliani', attendance: 'unrecorded' },
      { id: 'STD019', name: 'Wanda Hamidah', attendance: 'unrecorded' },
      { id: 'STD020', name: 'Yanto Wibowo', attendance: 'unrecorded' },
      { id: 'STD021', name: 'Zulfa Karimah', attendance: 'unrecorded' },
      { id: 'STD022', name: 'Arya Permana', attendance: 'unrecorded' },
      { id: 'STD023', name: 'Bella Safira', attendance: 'unrecorded' },
      { id: 'STD024', name: 'Cakra Wangsa', attendance: 'unrecorded' },
      { id: 'STD025', name: 'Dita Maharani', attendance: 'unrecorded' },
    ]
  },
  {
    classId: 'c4',
    sessionId: 'c4',
    students: [
      { id: 'STD001', name: 'John Davis', attendance: 'present' },
      { id: 'STD002', name: 'Emily Wilson', attendance: 'present' },
      { id: 'STD003', name: 'Michael Brown', attendance: 'present' },
      { id: 'STD004', name: 'Dewi Lestari', attendance: 'absent' },
      { id: 'STD005', name: 'Eko Prasetyo', attendance: 'present' },
      { id: 'STD006', name: 'Fitri Anggraini', attendance: 'present' },
      { id: 'STD007', name: 'Gilang Ramadhan', attendance: 'present' },
      { id: 'STD008', name: 'Hana Wijaya', attendance: 'late' },
      { id: 'STD009', name: 'Irfan Maulana', attendance: 'present' },
      { id: 'STD010', name: 'Jasmine Putri', attendance: 'present' },
      { id: 'STD011', name: 'Kevin Sanjaya', attendance: 'present' },
      { id: 'STD012', name: 'Nia Rahayu', attendance: 'present' },
      { id: 'STD013', name: 'Oscar Fernando', attendance: 'present' },
      { id: 'STD014', name: 'Putri Diana', attendance: 'absent' },
      { id: 'STD015', name: 'Rudi Sugiarto', attendance: 'late' },
      { id: 'STD016', name: 'Sinta Dewi', attendance: 'present' },
      { id: 'STD017', name: 'Tegar Firmansyah', attendance: 'present' },
      { id: 'STD018', name: 'Vina Muliani', attendance: 'present' },
      { id: 'STD019', name: 'Wanda Hamidah', attendance: 'present' },
      { id: 'STD020', name: 'Yanto Wibowo', attendance: 'present' },
      { id: 'STD021', name: 'Zahra Putri', attendance: 'late' },
      { id: 'STD022', name: 'Bima Arya', attendance: 'present' },
      { id: 'STD023', name: 'Cinta Laura', attendance: 'absent' },
      { id: 'STD024', name: 'Dimas Anggara', attendance: 'present' },
      { id: 'STD025', name: 'Elsa Safira', attendance: 'present' },
    ]
  },
  {
    classId: 'c5',
    sessionId: 'c5',
    students: [
      { id: 'STD001', name: 'Ahmad Rizal', attendance: 'present' },
      { id: 'STD002', name: 'Emily Wilson', attendance: 'present' },
      { id: 'STD003', name: 'Michael Brown', attendance: 'present' },
      { id: 'STD004', name: 'Dewi Lestari', attendance: 'present' },
      { id: 'STD005', name: 'Eko Prasetyo', attendance: 'present' },
      { id: 'STD006', name: 'Fitri Anggraini', attendance: 'late' },
      { id: 'STD007', name: 'Gilang Ramadhan', attendance: 'present' },
      { id: 'STD008', name: 'Hana Wijaya', attendance: 'present' },
      { id: 'STD009', name: 'Irfan Maulana', attendance: 'absent' },
      { id: 'STD010', name: 'Jasmine Putri', attendance: 'present' },
      { id: 'STD011', name: 'Kevin Sanjaya', attendance: 'present' },
      { id: 'STD012', name: 'Linda Wati', attendance: 'present' },
      { id: 'STD013', name: 'Muhammad Fadli', attendance: 'present' },
      { id: 'STD014', name: 'Nadia Saputri', attendance: 'present' },
      { id: 'STD015', name: 'Oki Setiawan', attendance: 'absent' },
      { id: 'STD016', name: 'Putri Amelia', attendance: 'present' },
      { id: 'STD017', name: 'Rizki Ananda', attendance: 'present' },
      { id: 'STD018', name: 'Sarah Maulida', attendance: 'late' },
      { id: 'STD019', name: 'Tegar Firmansyah', attendance: 'present' },
      { id: 'STD020', name: 'Umi Kalsum', attendance: 'present' },
      { id: 'STD021', name: 'Vino Bastian', attendance: 'present' },
      { id: 'STD022', name: 'Winda Aprilia', attendance: 'absent' },
      { id: 'STD023', name: 'Xaverius Daniel', attendance: 'present' },
      { id: 'STD024', name: 'Yuni Shara', attendance: 'present' },
      { id: 'STD025', name: 'Zaki Firmansyah', attendance: 'present' },
      { id: 'STD012', name: 'Nia Rahayu', attendance: 'absent' },
      { id: 'STD015', name: 'Rizal Fakhri', attendance: 'present' },
      { id: 'STD017', name: 'Tono Sutarjo', attendance: 'present' },
      { id: 'STD019', name: 'Wanda Hamidah', attendance: 'present' },
      { id: 'STD020', name: 'Yanto Wibowo', attendance: 'present' },
    ]
  }
];

// Fungsi untuk mendapatkan data siswa berdasarkan id kelas
export const getStudentsByClassId = (classId: string): ClassStudentMapping | undefined => {
  return classStudentMap.find(mapping => mapping.classId === classId);
};
