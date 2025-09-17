"use client";

import ApplicationForm from "@/components/ui-admin/career/ApplicationForm";
import { use } from "react";

export default function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <ApplicationForm applicationId={id} isEdit={true} />;
}
