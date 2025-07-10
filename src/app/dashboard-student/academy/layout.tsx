import React from "react";

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="w-11/12 mx-auto px-4 md:px-6">
        {children}
      </div>
    </div>
  );
}
