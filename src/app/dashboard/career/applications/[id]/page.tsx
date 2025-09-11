"use client";

import ApplicationDetail from "@/components/ui-admin/career/ApplicationDetail";
import { use } from "react";

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <ApplicationDetail applicationId={id} />;
}