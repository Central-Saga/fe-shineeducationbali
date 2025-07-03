"use client";

import { ClassDetails } from "@/components/ui-teacher/classes/class-details";
import { classDetailsData } from "@/data/data-teacher/classes/class-details-data";

export default function ClassDetailsPage() {
  return <ClassDetails classData={classDetailsData} />;
}
