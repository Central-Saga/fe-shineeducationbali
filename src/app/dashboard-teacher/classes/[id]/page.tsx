"use client";

import { ClassDetails } from "@/components/ui-admin/classes/class-details";
import { classDetailsData } from "@/data/data-teacher/classes-data";

export default function ClassDetailsPage() {
  return <ClassDetails classData={classDetailsData} />;
}
