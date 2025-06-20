import { CertificateType } from "@/data/data-admin/certificates-data/certificate-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileText, Plus } from "lucide-react";

interface CertificateTypeCardProps {
  type: CertificateType;
  onCreateClick: () => void;
}

export function CertificateTypeCard({
  type,
  onCreateClick,
}: CertificateTypeCardProps) {
  const courseTypeBadgeVariant =
    type.courseType === "ENGLISH"
      ? "default"
      : type.courseType === "COMPUTER"
      ? "outline"
      : "secondary";

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">
          {type.name}
          <Badge variant="secondary" className="ml-2">
            {type.levels.join(", ")}
          </Badge>
        </CardTitle>
        <Badge variant={courseTypeBadgeVariant}>{type.courseType}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Masa Berlaku:</span>{" "}
            {type.validityPeriod ? `${type.validityPeriod} bulan` : "Permanen"}
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Template:</span>{" "}
            {type.templateId}
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Untuk Tingkat:</span>{" "}
            {type.levels.join(", ")}
          </div>
        </div>{" "}
        <div className="flex items-center justify-end mt-4">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
