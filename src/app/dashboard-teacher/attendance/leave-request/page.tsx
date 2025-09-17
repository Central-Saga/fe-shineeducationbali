"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, differenceInCalendarDays } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar as CalendarIcon, Plus, FileText, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for leave balances
const leaveBalances = {
  annual: {
    total: 12,
    used: 5,
    remaining: 7
  },
  sick: {
    total: 14,
    used: 3,
    remaining: 11
  },
  personal: {
    total: 3,
    used: 1,
    remaining: 2
  },
  study: {
    total: 5,
    used: 0,
    remaining: 5
  }
};

// Mock data for leave requests
const leaveRequests = [
  {
    id: 'LR001',
    type: 'annual',
    status: 'approved',
    startDate: new Date(2025, 5, 10),
    endDate: new Date(2025, 5, 14),
    duration: 5,
    reason: 'Liburan keluarga',
    approvedBy: 'Ahmad Supriadi',
    approvedDate: new Date(2025, 5, 2)
  },
  {
    id: 'LR002',
    type: 'sick',
    status: 'approved',
    startDate: new Date(2025, 6, 1),
    endDate: new Date(2025, 6, 2),
    duration: 2,
    reason: 'Demam dan flu',
    approvedBy: 'Ahmad Supriadi',
    approvedDate: new Date(2025, 5, 30)
  },
  {
    id: 'LR003',
    type: 'personal',
    status: 'pending',
    startDate: new Date(2025, 7, 20),
    endDate: new Date(2025, 7, 20),
    duration: 1,
    reason: 'Urusan keluarga'
  },
  {
    id: 'LR004',
    type: 'sick',
    status: 'rejected',
    startDate: new Date(2025, 4, 5),
    endDate: new Date(2025, 4, 7),
    duration: 3,
    reason: 'Sakit',
    rejectedReason: 'Pengajuan terlalu mendadak dan bertepatan dengan jadwal ujian',
    rejectedBy: 'Ahmad Supriadi',
    rejectedDate: new Date(2025, 4, 3)
  }
];

export default function LeaveRequestPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('annual');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleSubmit = () => {
    if (!dateRange.from || !dateRange.to || !leaveType || !reason) {
      return;
    }
    
    // In a real app, you would send this data to your backend
    const newLeave = {
      type: leaveType,
      startDate: dateRange.from,
      endDate: dateRange.to,
      duration: differenceInCalendarDays(dateRange.to, dateRange.from) + 1,
      reason,
      attachment: attachment ? attachment.name : null,
      status: 'pending'
    };
    
    // Reset form
    setLeaveType('annual');
    setDateRange({ from: undefined, to: undefined });
    setReason('');
    setAttachment(null);
    setIsDialogOpen(false);
    
    // Show success message (toast in a real app)
    alert('Pengajuan cuti berhasil dikirim!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const viewRequestDetails = (request: any) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  const getLeaveTypeLabel = (type: string) => {
    switch (type) {
      case 'annual': return 'Cuti Tahunan';
      case 'sick': return 'Cuti Sakit';
      case 'personal': return 'Cuti Personal';
      case 'study': return 'Cuti Belajar';
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Disetujui</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Menunggu</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Ditolak</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Pengajuan Cuti</h1>
          <p className="text-gray-500">Kelola pengajuan cuti dan lihat sisa jatah cuti Anda</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajukan Cuti
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(leaveBalances).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{getLeaveTypeLabel(key)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">
                    {value.remaining}
                  </div>
                  <div className="text-sm text-gray-500">
                    dari {value.total} hari
                  </div>
                </div>
                <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(value.remaining / value.total) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Telah digunakan: {value.used} hari
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Pengajuan Cuti</CardTitle>
            <CardDescription>
              Daftar pengajuan cuti yang telah Anda ajukan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="pending">Menunggu</TabsTrigger>
                <TabsTrigger value="approved">Disetujui</TabsTrigger>
                <TabsTrigger value="rejected">Ditolak</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Jenis Cuti</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{getLeaveTypeLabel(request.type)}</TableCell>
                        <TableCell>
                          {format(request.startDate, 'dd MMM yyyy', { locale: id })}
                          {request.duration > 1 && ` - ${format(request.endDate, 'dd MMM yyyy', { locale: id })}`}
                        </TableCell>
                        <TableCell>{request.duration} hari</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewRequestDetails(request)}
                          >
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="pending">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Jenis Cuti</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter(request => request.status === 'pending')
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{getLeaveTypeLabel(request.type)}</TableCell>
                          <TableCell>
                            {format(request.startDate, 'dd MMM yyyy', { locale: id })}
                            {request.duration > 1 && ` - ${format(request.endDate, 'dd MMM yyyy', { locale: id })}`}
                          </TableCell>
                          <TableCell>{request.duration} hari</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewRequestDetails(request)}
                            >
                              Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="approved">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Jenis Cuti</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter(request => request.status === 'approved')
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{getLeaveTypeLabel(request.type)}</TableCell>
                          <TableCell>
                            {format(request.startDate, 'dd MMM yyyy', { locale: id })}
                            {request.duration > 1 && ` - ${format(request.endDate, 'dd MMM yyyy', { locale: id })}`}
                          </TableCell>
                          <TableCell>{request.duration} hari</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewRequestDetails(request)}
                            >
                              Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="rejected">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Jenis Cuti</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests
                      .filter(request => request.status === 'rejected')
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{getLeaveTypeLabel(request.type)}</TableCell>
                          <TableCell>
                            {format(request.startDate, 'dd MMM yyyy', { locale: id })}
                            {request.duration > 1 && ` - ${format(request.endDate, 'dd MMM yyyy', { locale: id })}`}
                          </TableCell>
                          <TableCell>{request.duration} hari</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewRequestDetails(request)}
                            >
                              Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* New Leave Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajukan Cuti Baru</DialogTitle>
            <DialogDescription>
              Lengkapi formulir di bawah ini untuk mengajukan cuti. Pengajuan akan diteruskan ke kepala sekolah untuk disetujui.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="leave-type">Jenis Cuti</Label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis cuti" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Cuti Tahunan</SelectItem>
                  <SelectItem value="sick">Cuti Sakit</SelectItem>
                  <SelectItem value="personal">Cuti Personal</SelectItem>
                  <SelectItem value="study">Cuti Belajar</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-blue-600">
                Sisa cuti {getLeaveTypeLabel(leaveType).toLowerCase()}: {leaveBalances[leaveType as keyof typeof leaveBalances]?.remaining || 0} hari
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Tanggal Cuti</Label>
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd MMM yyyy", { locale: id })} - {format(dateRange.to, "dd MMM yyyy", { locale: id })}
                          </>
                        ) : (
                          format(dateRange.from, "dd MMM yyyy", { locale: id })
                        )
                      ) : (
                        "Pilih Tanggal"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => {
                        if (range) {
                          setDateRange({
                            from: range.from,
                            to: range.to || range.from // Handle single day selection
                          });
                        }
                      }}
                      disabled={(date) => 
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {dateRange.from && dateRange.to && (
                <p className="text-sm text-gray-500">
                  Durasi: {differenceInCalendarDays(dateRange.to, dateRange.from) + 1} hari
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Alasan Cuti</Label>
              <Textarea
                id="reason"
                placeholder="Berikan alasan untuk pengajuan cuti ini"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attachment">Lampiran (opsional)</Label>
              <Input
                id="attachment"
                type="file"
                onChange={handleFileChange}
              />
              {attachment && (
                <p className="text-sm text-gray-500">
                  File terlampir: {attachment.name}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Untuk cuti sakit, mohon lampirkan surat keterangan dokter jika tersedia
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!dateRange.from || !dateRange.to || !leaveType || !reason}
            >
              Ajukan Cuti
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Leave Request Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detail Pengajuan Cuti</DialogTitle>
            <DialogDescription>
              {selectedRequest && (
                <>ID: {selectedRequest.id} • {getStatusBadge(selectedRequest.status)}</>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Jenis Cuti</Label>
                  <p>{getLeaveTypeLabel(selectedRequest.type)}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Durasi</Label>
                  <p>{selectedRequest.duration} hari</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Tanggal Mulai</Label>
                  <p>{format(selectedRequest.startDate, 'dd MMMM yyyy', { locale: id })}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Tanggal Selesai</Label>
                  <p>{format(selectedRequest.endDate, 'dd MMMM yyyy', { locale: id })}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">Alasan</Label>
                <p className="p-3 bg-gray-50 rounded-md">{selectedRequest.reason}</p>
              </div>
              
              {selectedRequest.status === 'approved' && (
                <div className="p-3 bg-green-50 rounded-md space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2 h-5 w-5" />
                    <p className="font-medium text-green-800">Disetujui</p>
                  </div>
                  <div className="space-y-1 pl-7">
                    <p className="text-sm text-green-700">
                      Disetujui oleh: {selectedRequest.approvedBy}
                    </p>
                    <p className="text-sm text-green-700">
                      Tanggal: {format(selectedRequest.approvedDate, 'dd MMMM yyyy', { locale: id })}
                    </p>
                  </div>
                </div>
              )}
              
              {selectedRequest.status === 'rejected' && (
                <div className="p-3 bg-red-50 rounded-md space-y-2">
                  <div className="flex items-center">
                    <XCircle className="text-red-600 mr-2 h-5 w-5" />
                    <p className="font-medium text-red-800">Ditolak</p>
                  </div>
                  <div className="space-y-1 pl-7">
                    <p className="text-sm text-red-700">
                      Alasan: {selectedRequest.rejectedReason}
                    </p>
                    <p className="text-sm text-red-700">
                      Ditolak oleh: {selectedRequest.rejectedBy}
                    </p>
                    <p className="text-sm text-red-700">
                      Tanggal: {format(selectedRequest.rejectedDate, 'dd MMMM yyyy', { locale: id })}
                    </p>
                  </div>
                </div>
              )}
              
              {selectedRequest.status === 'pending' && (
                <div className="p-3 bg-yellow-50 rounded-md flex items-center">
                  <AlertTriangle className="text-yellow-600 mr-2 h-5 w-5" />
                  <p className="text-yellow-800">
                    Pengajuan sedang dalam proses peninjauan
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
