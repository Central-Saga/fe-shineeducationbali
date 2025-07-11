// Mengupdate data schedule dengan menambahkan relasi ke class session
import { scheduleData as originalScheduleData } from './schedule-data';
import { teacherClasses } from '../classes-data';

// Menambahkan relasi antara schedule dan class session
export const scheduleSessions = originalScheduleData.map(schedule => {
  // Mencari apakah ada class session yang memiliki subject yang sama dengan schedule
  const matchingSession = teacherClasses.flatMap(cs => cs.sessions)
    .find(session => 
      session.subject.toLowerCase().includes(schedule.subject.toLowerCase()) &&
      session.timeStart === schedule.startTime
    );

  return {
    ...schedule,
    sessionId: matchingSession?.id || null,
    sessionDetails: matchingSession || null
  };
});

// Menggunakan data yang sama dengan schedule-data.ts
export const scheduleData = originalScheduleData;
