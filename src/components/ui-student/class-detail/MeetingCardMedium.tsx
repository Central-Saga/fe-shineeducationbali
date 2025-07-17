import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MeetingCardMedium({ meeting, classId }: { meeting: any, classId: string }) {
  const formatDate = (dateString: string) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.toLocaleDateString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-700">Akan Datang</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-700">Sedang Berlangsung</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700">Selesai</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>;
    }
  };
  return (
    <div className="border-2 border-[#C40503]/30 rounded-2xl p-6 flex flex-col gap-4 bg-gradient-to-br from-white via-[#f8fafc] to-[#f3f4f6] shadow-lg hover:shadow-xl transition-shadow duration-200 relative overflow-hidden group">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold text-xl text-[#C40503] group-hover:text-[#a30402] transition-colors duration-200">{meeting.title}</span>
        {getStatusBadge(meeting.status)}
      </div>
      <div className="text-sm text-gray-600 mb-1 line-clamp-2">{meeting.description}</div>
      <div className="flex items-center gap-4 mb-2 text-sm">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-[#DAA625]" />
          <span>{formatDate(meeting.date)}, {meeting.timeStart} - {meeting.timeEnd}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-[#C40503]" />
          <span>{meeting.location}</span>
        </div>
      </div>
      <Link href={`/dashboard-student/classes/${classId}/meetings/${meeting.id}`} className="inline-block mt-auto px-5 py-2 bg-[#C40503] text-white rounded-xl hover:bg-[#a30402] text-base font-bold shadow-lg transition-colors duration-200">Detail Pertemuan</Link>
      <div className="absolute right-0 top-0 w-24 h-24 bg-[#C40503]/10 rounded-bl-full pointer-events-none" />
    </div>
  );
}
