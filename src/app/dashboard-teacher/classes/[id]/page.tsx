"use client";

import { ClassDetails } from "@/components/ui-teacher/classes/ClassesDetails";
import { useParams } from "next/navigation";
import { teacherClasses } from "@/data/data-teacher/classes-data";

export default function ClassDetailsPage() {
  const params = useParams();
  const classId = params.id as string;
  
  // Find the class data from teacherClasses based on the ID
  const allSessions = teacherClasses.flatMap(schedule => schedule.sessions);
  const classData = allSessions.find(session => session.id === classId);
  
  // If class not found, show error or redirect
  if (!classData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Kelas Tidak Ditemukan</h1>
          <p className="text-gray-600">Kelas dengan ID {classId} tidak ditemukan.</p>
        </div>
      </div>
    );
  }
  
  // Transform the session data to match ClassDetails interface
  const transformedClassData = {
    id: classData.id,
    name: classData.title,
    subject: classData.subject,
    level: classData.level,
    programId: classData.programId,
    schedule: `${classData.timeStart} - ${classData.timeEnd}`,
    time: `${classData.timeStart} - ${classData.timeEnd}`,
    room: classData.location,
    teacher: "Guru Mata Pelajaran", // Default value
    studentCount: classData.studentCount,
    capacity: classData.capacity,
    progress: classData.completionProgress,
    status: classData.status === 'upcoming' ? 'active' : 
            classData.status === 'ongoing' ? 'active' : 'inactive',
    description: classData.description,
    syllabus: classData.materials.map(material => 
      typeof material === 'string' ? material : material.title
    ),
    students: [
      { id: "S001", name: "Ahmad Fadli", attendance: "90%", grade: "A" },
      { id: "S002", name: "Budi Pratama", attendance: "85%", grade: "A-" },
      { id: "S003", name: "Citra Dewi", attendance: "95%", grade: "A+" },
      { id: "S004", name: "Dian Purnama", attendance: "80%", grade: "B+" },
      { id: "S005", name: "Eko Wijaya", attendance: "75%", grade: "B" },
      { id: "S006", name: "Fitri Handayani", attendance: "88%", grade: "A-" },
      { id: "S007", name: "Gunawan", attendance: "92%", grade: "A" },
      { id: "S008", name: "Hana Putri", attendance: "87%", grade: "B+" }
    ].slice(0, classData.studentCount), // Limit to actual student count
    assignments: classData.assignments?.map(assignment => ({
      id: assignment.id,
      title: assignment.title,
      dueDate: assignment.dueDate,
      status: assignment.status
    })) || [],
    materials: classData.materials.map((material, index) => ({
      id: typeof material === 'string' ? `M${index + 1}` : material.id || `M${index + 1}`,
      title: typeof material === 'string' ? material : material.title,
      type: typeof material === 'string' ? 'PDF' : material.type || 'PDF',
      uploadedDate: new Date().toISOString().split('T')[0] // Current date as placeholder
    }))
  };
  
  return <ClassDetails classData={transformedClassData} />;
}
