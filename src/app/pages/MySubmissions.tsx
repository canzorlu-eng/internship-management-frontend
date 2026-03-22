// /student/submissions

import { useMemo, useState } from "react";
import {
  AlertCircle,
  BellRing,
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquareText,
  Upload,
  XCircle,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { cn } from "../components/ui/utils";

type SubmissionStatus = "Pending" | "Approved" | "Rejected";

type SubmissionRecord = {
  id: number;
  fileName: string;
  submittedAt: string;
  sizeLabel: string;
  status: SubmissionStatus;
};

type CoordinatorMessage = {
  id: number;
  title: string;
  body: string;
  sentAt: string;
  type: "Feedback" | "Announcement";
};

const acceptedFormats = [".pdf", ".doc", ".docx"];
const maxFileSize = 10 * 1024 * 1024;

const initialRecords: SubmissionRecord[] = [
  {
    id: 1,
    fileName: "internship-report-v1.pdf",
    submittedAt: "12 Mar 2026, 14:20",
    sizeLabel: "2.4 MB",
    status: "Approved",
  },
  {
    id: 2,
    fileName: "internship-report-revision.docx",
    submittedAt: "09 Mar 2026, 10:05",
    sizeLabel: "1.1 MB",
    status: "Rejected",
  },
];

const coordinatorMessages: CoordinatorMessage[] = [
  {
    id: 1,
    title: "Coordinator Feedback on Your Latest Report",
    body:
      "Your submission structure is strong. Please make the testing and deployment sections a little more specific before the final archive deadline.",
    sentAt: "17 Mar 2026, 09:30",
    type: "Feedback",
  },
  {
    id: 2,
    title: "Announcement: Approved Reports Archive Window",
    body:
      "Students with approved internship reports should complete the final archive upload before 22 Mar 2026.",
    sentAt: "16 Mar 2026, 15:10",
    type: "Announcement",
  },
];

const statusOrder: SubmissionStatus[] = ["Pending", "Approved", "Rejected"];

const statusConfig: Record<
  SubmissionStatus,
  {
    icon: typeof Clock3;
    badgeClassName: string;
    progress: number;
    description: string;
  }
> = {
  Pending: {
    icon: Clock3,
    badgeClassName: "border-amber-200 bg-amber-100 text-amber-800",
    progress: 34,
    description: "Your report was received and is waiting for reviewer action.",
  },
  Approved: {
    icon: CheckCircle2,
    badgeClassName: "border-emerald-200 bg-emerald-100 text-emerald-800",
    progress: 67,
    description: "Your report passed the academic review and has been approved.",
  },
  Rejected: {
    icon: XCircle,
    badgeClassName: "border-rose-200 bg-rose-100 text-rose-800",
    progress: 100,
    description: "Your report needs revision before it can move forward.",
  },
};

export function MySubmissions() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [records, setRecords] = useState<SubmissionRecord[]>(initialRecords);

  const latestSubmission = records[0] ?? null;
  const latestStatus = latestSubmission?.status ?? "Pending";

  const summary = useMemo(
    () => ({
      total: records.length,
      approved: records.filter((record) => record.status === "Approved").length,
      pending: records.filter((record) => record.status === "Pending").length,
      rejected: records.filter((record) => record.status === "Rejected").length,
    }),
    [records],
  );

  const validateFile = (file: File) => {
    const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;

    if (!acceptedFormats.includes(extension)) {
      return "Only PDF, DOC, and DOCX files are allowed.";
    }

    if (file.size > maxFileSize) {
      return "File size must be 10 MB or smaller.";
    }

    return "";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setSelectedFile(null);
      setValidationMessage("");
      return;
    }

    const error = validateFile(file);
    setSelectedFile(file);
    setValidationMessage(error);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setValidationMessage("Please choose a report file before submitting.");
      return;
    }

    const error = validateFile(selectedFile);
    if (error) {
      setValidationMessage(error);
      return;
    }

    const confirmed = window.confirm(
      `Submit "${selectedFile.name}" for internship report review?`,
    );

    if (!confirmed) {
      return;
    }

    const submittedRecord: SubmissionRecord = {
      id: Date.now(),
      fileName: selectedFile.name,
      submittedAt: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      sizeLabel: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
      status: "Pending",
    };

    setRecords((current) => [submittedRecord, ...current]);
    setSelectedFile(null);
    setValidationMessage("");
  };

  return (
    <div className="min-h-screen min-h-dvh bg-[linear-gradient(135deg,#f7f9fc_0%,#eef4ff_46%,#fdfefe_100%)]">
      <div className="mx-auto flex min-h-screen min-h-dvh max-w-7xl flex-col px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
              Student Workspace
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
            <p className="max-w-2xl text-muted-foreground">
              Upload your internship report, confirm the submission, and track
              each approval stage from one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryCard label="Total" value={summary.total} />
            <SummaryCard label="Pending" value={summary.pending} />
            <SummaryCard label="Approved" value={summary.approved} />
            <SummaryCard label="Rejected" value={summary.rejected} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader>
              <CardTitle>Upload Internship Report</CardTitle>
              <CardDescription>
                Supported formats: PDF, DOC, DOCX. Maximum file size: 10 MB.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <label
                htmlFor="report-upload"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 px-6 py-10 text-center transition hover:border-slate-400 hover:bg-slate-100/80"
              >
                <div className="mb-4 rounded-full bg-slate-900 p-3 text-white">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="text-base font-medium">Choose your report file</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop is optional; click to browse your device.
                </p>
                <Input
                  id="report-upload"
                  type="file"
                  accept={acceptedFormats.join(",")}
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>

              {selectedFile ? (
                <div className="rounded-2xl border bg-white p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Badge variant="outline">Ready</Badge>
                  </div>
                </div>
              ) : null}

              {validationMessage ? (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertTitle>Submission check failed</AlertTitle>
                  <AlertDescription>{validationMessage}</AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
                  <CheckCircle2 />
                  <AlertTitle>Validation checklist</AlertTitle>
                  <AlertDescription>
                    Select a valid report file, review the details, and confirm
                    the submission to start the approval flow.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="sm:flex-1" onClick={handleSubmit}>
                  Confirm Submission
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="sm:flex-1"
                  onClick={() => {
                    setSelectedFile(null);
                    setValidationMessage("");
                  }}
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-slate-950 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
            <CardHeader>
              <CardTitle className="text-white">Approval Tracking</CardTitle>
              <CardDescription className="text-slate-300">
                Follow the latest submission from upload to final decision.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {latestSubmission ? (
                <>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-300">Latest submission</p>
                    <p className="mt-1 text-lg font-semibold">
                      {latestSubmission.fileName}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Submitted on {latestSubmission.submittedAt}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Current status</span>
                      <StatusBadge status={latestStatus} />
                    </div>
                    <Progress
                      value={statusConfig[latestStatus].progress}
                      className="h-3 bg-white/10"
                    />
                    <p className="text-sm text-slate-300">
                      {statusConfig[latestStatus].description}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {statusOrder.map((status, index) => {
                      const StatusIcon = statusConfig[status].icon;
                      const active = latestStatus === status;
                      const passed =
                        latestStatus === "Approved" && index <= 1
                          ? true
                          : latestStatus === "Rejected" && index !== 1
                            ? true
                            : latestStatus === "Pending" && index === 0;

                      return (
                        <div
                          key={status}
                          className={cn(
                            "flex items-center gap-3 rounded-2xl border px-4 py-3 transition",
                            active
                              ? "border-cyan-400/60 bg-cyan-400/10"
                              : "border-white/10 bg-white/5",
                          )}
                        >
                          <div
                            className={cn(
                              "rounded-full p-2",
                              passed
                                ? "bg-white text-slate-950"
                                : "bg-white/10 text-slate-300",
                            )}
                          >
                            <StatusIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{status}</p>
                            <p className="text-sm text-slate-300">
                              {statusConfig[status].description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-300">
                  No submissions yet. Upload your first report to begin tracking.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader>
              <CardTitle>Submission History</CardTitle>
              <CardDescription>
                Review previously uploaded reports and their decisions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {records.map((record, index) => (
                <div key={record.id}>
                  <div className="flex flex-col gap-4 rounded-2xl p-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{record.fileName}</p>
                        <p className="text-sm text-muted-foreground">
                          Submitted on {record.submittedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {record.sizeLabel}
                      </span>
                      <StatusBadge status={record.status} />
                    </div>
                  </div>
                  {index < records.length - 1 ? <Separator className="mt-4" /> : null}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageSquareText className="h-5 w-5" />
                Coordinator Updates
              </CardTitle>
              <CardDescription className="text-slate-300">
                Feedback and announcements sent from the coordinator analytics panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {coordinatorMessages.map((message, index) => (
                <div key={message.id}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-cyan-400/15 p-3 text-cyan-200">
                          {message.type === "Feedback" ? (
                            <MessageSquareText className="h-4 w-4" />
                          ) : (
                            <BellRing className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-white">{message.title}</p>
                            <Badge
                              variant="outline"
                              className="rounded-full border-white/10 bg-white/10 px-3 py-1 text-white"
                            >
                              {message.type}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {message.body}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                      Sent {message.sentAt}
                    </p>
                  </div>
                  {index < coordinatorMessages.length - 1 ? (
                    <Separator className="mt-4 bg-white/10" />
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: SubmissionStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-3 py-1", statusConfig[status].badgeClassName)}
    >
      {status}
    </Badge>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-center shadow-sm backdrop-blur">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
