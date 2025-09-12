"use client";

import { useParams } from "next/navigation";
import StudentForm from "./StudentForm";

export default function EditStudent() {
  const params = useParams();
  const studentId = params.studentId as string;

  return <StudentForm studentId={studentId} isEdit={true} />;
}
