import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Manajemen Guru | Shine Education",
  description: "Kelola data guru dan penugasan mengajar",
};

export default function TeachersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
