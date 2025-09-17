export interface CertificateHistory {
  id: string;
  certificateId: string;
  action: "issued" | "revoked" | "expired" | "updated";
  timestamp: string;
  performedBy: string;
  reason?: string;
  metadata: {
    previousState?: any;
    newState?: any;
    ipAddress?: string;
  };
}

export const certificateHistory: CertificateHistory[] = [
  {
    id: "HIST001",
    certificateId: "CERT001",
    action: "issued",
    timestamp: "2025-05-15T10:30:00Z",
    performedBy: "Sarah Johnson",
    metadata: {
      ipAddress: "192.168.1.100",
    },
  },
  {
    id: "HIST002",
    certificateId: "CERT002",
    action: "issued",
    timestamp: "2025-06-01T14:15:00Z",
    performedBy: "John Smith",
    metadata: {
      ipAddress: "192.168.1.101",
    },
  },
  {
    id: "HIST003",
    certificateId: "CERT003",
    action: "issued",
    timestamp: "2025-04-20T09:45:00Z",
    performedBy: "David Wilson",
    metadata: {
      ipAddress: "192.168.1.102",
    },
  },
];
