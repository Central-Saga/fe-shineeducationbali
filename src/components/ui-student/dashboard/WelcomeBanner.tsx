"use client";

interface WelcomeBannerProps {
  studentName: string;
}

export function WelcomeBanner({ studentName }: WelcomeBannerProps) {
  return (
    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
      Selamat Datang, {studentName}
    </h1>
  );
}
