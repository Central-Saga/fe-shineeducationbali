"use client";

import { ClassDetails } from "@/components/ui-teacher/classes/class-details";
import { useParams } from "next/navigation";
import { classDetailsData } from "@/data/data-teacher/classes/class-details-data";

export default function ClassDetailsPage() {
  const params = useParams();
  const classId = params.id as string;
  
  // In a real app, you would fetch the class data based on the ID
  // const classData = await getClassById(classId);
  
  // For now, using the existing data structure
  return <ClassDetails classData={classDetailsData} />;
}
