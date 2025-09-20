"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { Certificate } from "@/types/certificate";
import { FileText, Mail, Printer, Share2 } from "lucide-react";

interface CertificateActionsProps {
  certificateId: string;
}

export function CertificateActions({ certificateId }: CertificateActionsProps) {
  // TODO: Replace with real data
  const certificate = {
    id: certificateId,
    recipientName: "John Doe",
    recipientEmail: "john.doe@example.com",
    issueDate: "2025-06-10",
    expiryDate: "2026-06-10",
    status: "issued",
    templateName: "Professional Certificate",
    issuedBy: "Administrator",
    verificationUrl: `https://example.com/verify/${certificateId}`,
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Certificate Information</h3>
          <Badge
            variant={certificate.status === "issued" ? "default" : "secondary"}
          >
            {certificate.status}
          </Badge>
        </div>

        <div className="grid gap-4">
          <div>
            <Label className="text-muted-foreground">Recipient</Label>
            <p className="mt-1">{certificate.recipientName}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Email</Label>
            <p className="mt-1">{certificate.recipientEmail}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Issue Date</Label>
              <p className="mt-1">
                {new Date(certificate.issueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Label className="text-muted-foreground">Expiry Date</Label>
              <p className="mt-1">
                {new Date(certificate.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Template</Label>
            <p className="mt-1">{certificate.templateName}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Issued By</Label>
            <p className="mt-1">{certificate.issuedBy}</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email Certificate
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share Link
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print Certificate
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Audit Log
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Verification</h3>
        <div className="rounded-lg border p-4 bg-muted/50">
          <p className="text-sm">Verification URL:</p>
          <code className="text-xs block mt-1 break-all">
            {certificate.verificationUrl}
          </code>
        </div>
      </div>
    </div>
  );
}
