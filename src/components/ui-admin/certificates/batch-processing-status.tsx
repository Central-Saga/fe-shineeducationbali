"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProcessingStatus {
  total: number;
  processed: number;
  failed: number;
  status: "idle" | "processing" | "completed" | "failed";
  logs: Array<{
    id: number;
    type: "info" | "error" | "success";
    message: string;
    timestamp: Date;
  }>;
}

export function BatchProcessingStatus() {
  const [status, setStatus] = useState<ProcessingStatus>({
    total: 100,
    processed: 0,
    failed: 0,
    status: "processing",
    logs: [],
  });

  useEffect(() => {
    // TODO: Replace with real status updates
    const timer = setInterval(() => {
      setStatus((prev) => {
        if (prev.processed >= prev.total) {
          clearInterval(timer);
          return { ...prev, status: "completed" };
        }
        return {
          ...prev,
          processed: Math.min(prev.processed + 10, prev.total),
          logs: [
            ...prev.logs,
            {
              id: prev.logs.length + 1,
              type: "info",
              message: `Processing batch ${prev.processed + 10}/100...`,
              timestamp: new Date(),
            },
          ],
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progress = Math.round((status.processed / status.total) * 100);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {status.status === "processing" && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {status.status === "completed" && (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
            {status.status === "failed" && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="font-medium">
              {status.status === "processing" && "Processing..."}
              {status.status === "completed" && "Processing Complete"}
              {status.status === "failed" && "Processing Failed"}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {status.processed}/{status.total} certificates
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Processing Logs</h4>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="space-y-2">
            {status.logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground whitespace-nowrap">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                <span
                  className={`flex-1 ${
                    log.type === "error" ? "text-red-500" : ""
                  }`}
                >
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
