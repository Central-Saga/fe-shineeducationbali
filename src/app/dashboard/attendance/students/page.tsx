import { StudentAttendanceManagement } from "@/components/ui-admin/attendance";

export default function StudentAttendancePage() {
  return(
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <StudentAttendanceManagement />;
    </div>
  );
}
