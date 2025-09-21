// Mock data for teacher attendance summary

import { format, subMonths } from 'date-fns';
import { id } from 'date-fns/locale';

// Function to generate attendance data for a specific month
export const generateMockData = (month: Date) => {
  // const year = month.getFullYear();
  // const monthNumber = month.getMonth();
  
  // Generate a consistent set of random data for the month
  const workDays = 20; // Assume 20 work days per month
  const present = Math.floor(workDays * 0.85); // 85% present
  const late = Math.floor(workDays * 0.1); // 10% late
  const absent = Math.floor(workDays * 0.02); // 2% absent
  const leave = workDays - present - late - absent; // Remaining are leave days
  
  // Generate work hours - between 7.5 and 8.5 hours per day
  const totalWorkHours = present * 8 + late * 7.5;
  
  return {
    month: format(month, 'MMMM yyyy', { locale: id }),
    workDays,
    present,
    late,
    absent,
    leave,
    total: workDays,
    percentage: parseFloat((((present + late) / workDays) * 100).toFixed(1)),
    totalWorkHours: parseFloat(totalWorkHours.toFixed(1)),
    averageHoursPerDay: parseFloat((totalWorkHours / (present + late)).toFixed(2)),
    attendanceRate: parseFloat((((present + late) / workDays) * 100).toFixed(1)),
  };
};

// Generate 12 months of data
export const generateMonthlyData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < 12; i++) {
    const month = subMonths(now, i);
    data.push(generateMockData(month));
  }
  
  return data;
};

// Generate the full history
export const monthlyData = generateMonthlyData();
