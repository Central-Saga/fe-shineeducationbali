// Mock data for teacher attendance

export const mockTeacherAttendance = [
  { date: new Date(2025, 6, 1), status: 'present', checkIn: '07:45', checkOut: '16:05' },
  { date: new Date(2025, 6, 2), status: 'present', checkIn: '07:50', checkOut: '16:10' },
  { date: new Date(2025, 6, 3), status: 'late', checkIn: '08:15', checkOut: '16:00', note: 'Terjebak macet' },
  { date: new Date(2025, 6, 4), status: 'present', checkIn: '07:40', checkOut: '16:00' },
  { date: new Date(2025, 6, 5), status: 'absent', note: 'Sakit' },
  { date: new Date(2025, 6, 8), status: 'present', checkIn: '07:30', checkOut: '16:00' },
  { date: new Date(2025, 6, 9), status: 'present', checkIn: '07:45', checkOut: '16:15' },
  { date: new Date(2025, 6, 10), status: 'present', checkIn: '07:55', checkOut: '16:05' },
  { date: new Date(2025, 6, 11), status: 'present', checkIn: '07:40', checkOut: '16:10' },
  { date: new Date(2025, 6, 12), status: 'leave', note: 'Cuti tahunan' },
];

export const teacherAttendanceSummary = {
  present: 18,
  late: 3,
  absent: 2,
  leave: 1,
  total: 24,
  streak: 5,
  workHours: 142.5,
  monthlyTarget: 160
};

export const scheduleInfo = {
  checkInTime: '08:00',
  checkOutTime: '16:00'
};

// Helper functions
export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'present': return 'Hadir';
    case 'late': return 'Terlambat';
    case 'absent': return 'Tidak Hadir';
    case 'leave': return 'Cuti';
    default: return status;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'present': return 'bg-green-100 text-green-700 border-green-200';
    case 'late': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'absent': return 'bg-red-100 text-red-700 border-red-200';
    case 'leave': return 'bg-blue-100 text-blue-700 border-blue-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};
