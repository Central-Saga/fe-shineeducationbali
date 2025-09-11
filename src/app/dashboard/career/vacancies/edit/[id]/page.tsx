"use client";

import VacancyForm from "@/components/ui-admin/career/VacancyForm";
import { use } from "react";

export default function EditVacancyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <VacancyForm jobId={id} isEdit={true} />;
}
