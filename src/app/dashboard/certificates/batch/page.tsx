import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui-admin/shared/Heading";
import { BatchUploader } from "@/components/ui-admin/certificates/batch-uploader";
import { BatchProcessingStatus } from "@/components/ui-admin/certificates/batch-processing-status";

export default function CertificateBatchPage() {
  return (
    <div className="p-6">
      <Heading
        title="Batch Certificate Processing"
        description="Generate multiple certificates from CSV or Excel files"
      />
      <div className="grid gap-6 mt-6">
        <Card className="p-6">
          <BatchUploader />
        </Card>
        <Card className="p-6">
          <BatchProcessingStatus />
        </Card>
      </div>
    </div>
  );
}
