# Table Layout Components

Komponen-komponen tabel yang dapat digunakan kembali untuk menampilkan data dengan format yang rapi dan konsisten.

## Komponen Utama

### 1. TableLayout

Komponen dasar untuk membuat tabel dengan fitur:

- No List (nomor urut)
- Action dropdown dengan Edit dan Delete
- Search functionality
- Export functionality
- Responsive design
- Customizable columns

### 2. ClassDetailTable

Tabel khusus untuk menampilkan detail kelas dengan kolom:

- ID
- Judul (dengan icon berdasarkan jenis)
- Mata Pelajaran
- Jenis (Tugas/Materi/Ujian)
- Tenggat Waktu
- Status (dengan badge berwarna)
- Progress (untuk tugas)

## Penggunaan

### TableLayout Dasar

```tsx
import { TableLayout, TableColumn } from "@/components/ui-teacher/layout";

const columns: TableColumn[] = [
  {
    key: "name",
    label: "Nama",
    render: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: "email",
    label: "Email",
  },
];

const data = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

const actions = [
  commonActions.edit((row) => console.log("Edit", row)),
  commonActions.delete((row) => console.log("Delete", row)),
];

<TableLayout
  title="Daftar Pengguna"
  description="Kelola data pengguna sistem"
  columns={columns}
  data={data}
  actions={actions}
  onExport={() => console.log("Export")}
  onSearch={(query) => console.log("Search", query)}
/>;
```

### ClassDetailTable

```tsx
import {
  ClassDetailTable,
  ClassDetailData,
} from "@/components/ui-teacher/layout";

const classData: ClassDetailData[] = [
  {
    id: "A001",
    title: "Tugas Aljabar 1",
    subject: "Matematika",
    dueDate: "2023-09-15",
    status: "completed",
    type: "assignment",
    totalStudents: 28,
    submittedCount: 28,
    progress: 100,
  },
];

<ClassDetailTable
  data={classData}
  onEdit={(item) => console.log("Edit", item)}
  onDelete={(item) => console.log("Delete", item)}
  onView={(item) => console.log("View", item)}
  onExport={() => console.log("Export")}
  title="Detail Kelas - Kelas X-A"
  description="Kelola tugas, materi, dan aktivitas kelas"
/>;
```

## Fitur

### Action Dropdown

- **Edit**: Icon pensil, untuk mengedit data
- **Delete**: Icon trash, untuk menghapus data (warna merah)
- **View**: Icon mata, untuk melihat detail

### Status Badges

- **Selesai**: Hijau
- **Sedang Berlangsung**: Kuning
- **Akan Datang**: Biru

### Progress Bar

Untuk tugas, menampilkan progress pengumpulan dengan:

- Jumlah siswa yang sudah submit
- Persentase progress
- Bar visual

### Search

Fitur pencarian yang dapat mencari di semua kolom data.

### Export

Tombol untuk mengekspor data ke format yang diinginkan.

## Styling

Menggunakan Shadcn UI components dengan:

- Konsisten dengan design system
- Responsive design
- Hover effects
- Color coding untuk status
- Icon dari Lucide React
