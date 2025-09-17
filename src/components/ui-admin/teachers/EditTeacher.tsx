"use client";

import { useParams } from "next/navigation";
import TeacherForm from "./TeacherForm";

export default function EditTeacher() {
  const params = useParams();
  const teacherId = params.teacherId as string;

  return <TeacherForm teacherId={teacherId} isEdit={true} />;
}
