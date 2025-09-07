"use client";

interface WelcomeBannerProps {
  studentName: string;
}

export function WelcomeBanner({ studentName }: WelcomeBannerProps) {
  return (
    <h1 className="text-3xl font-bold text-[#C40001]">
      Selamat Datang, {studentName}
    </h1>
  );
}
