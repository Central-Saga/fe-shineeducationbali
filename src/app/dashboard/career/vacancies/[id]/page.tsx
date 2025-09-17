"use client";

import VacancyDetail from "@/components/ui-admin/career/VacancyDetail";
import { use } from "react";

export default function JobVacancyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <VacancyDetail jobId={id} />;
}