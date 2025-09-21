"use client";


interface PerformanceCardProps {
  monthData: { 
    present: number; 
    absent: number; 
    late: number; 
    total: number; 
    percentage: number;
    leave?: number;
  };
}

export function PerformanceCard({ monthData }: PerformanceCardProps) {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="font-semibold text-lg mb-4">Performa Bulanan</h3>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{monthData.present}</div>
          <div className="text-xs text-gray-500 mt-1">Hari Hadir</div>
        </div>
        <div className="h-12 border-r border-gray-200"></div>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-600">{monthData.absent}</div>
          <div className="text-xs text-gray-500 mt-1">Absen</div>
        </div>
        <div className="h-12 border-r border-gray-200"></div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{monthData.leave || 0}</div>
          <div className="text-xs text-gray-500 mt-1">Cuti</div>
        </div>
      </div>
    </div>
  );
}
