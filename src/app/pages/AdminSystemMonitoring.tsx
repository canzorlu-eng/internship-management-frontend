// /admin/system-monitoring

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Download,
  FileWarning,
  Info,
  MonitorCog,
  Search,
  ShieldAlert,
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
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { cn } from "../components/ui/utils";

type LogLevel = "Error" | "Warning" | "Info";

type LogRecord = {
  id: number;
  level: LogLevel;
  timestamp: string;
  userId: string;
  source: string;
  message: string;
  stackTrace: string[];
};

const logRecords: LogRecord[] = [
  {
    id: 1,
    level: "Error",
    timestamp: "2026-03-17 14:08:11",
    userId: "student_2041",
    source: "ReportUploadService",
    message: "File validation failed because MIME type did not match the accepted format list.",
    stackTrace: [
      "ValidationError: Unsupported file format",
      "at validateUpload (src/services/report-upload.ts:84:15)",
      "at handleReportSubmit (src/app/pages/MySubmissions.tsx:128:11)",
    ],
  },
  {
    id: 2,
    level: "Warning",
    timestamp: "2026-03-17 14:05:47",
    userId: "guest_883",
    source: "AuthGateway",
    message: "Multiple failed login attempts detected from the same IP block.",
    stackTrace: [
      "AuthWarning: Repeated authentication failure",
      "at evaluateLoginRisk (src/services/auth.ts:203:9)",
    ],
  },
  {
    id: 3,
    level: "Info",
    timestamp: "2026-03-17 14:03:29",
    userId: "admin_001",
    source: "HelpCenter",
    message: "Help documentation page rendered successfully for admin session.",
    stackTrace: [
      "RenderInfo: Page mounted successfully",
      "at renderHelpCenter (src/app/pages/HelpCenter.tsx:72:5)",
    ],
  },
  {
    id: 4,
    level: "Error",
    timestamp: "2026-03-17 13:58:03",
    userId: "student_1167",
    source: "InternshipChatbot",
    message: "RAG retrieval timeout occurred while preparing official source results.",
    stackTrace: [
      "TimeoutError: Retrieval request exceeded configured threshold",
      "at fetchRelevantPolicyDocs (src/services/chatbot.ts:142:19)",
      "at buildGroundedReply (src/services/chatbot.ts:188:7)",
    ],
  },
  {
    id: 5,
    level: "Info",
    timestamp: "2026-03-17 13:54:41",
    userId: "student_5310",
    source: "WorkingDaysCalculator",
    message: "Working-day calculation completed with weekends and holidays excluded.",
    stackTrace: [
      "CalculationInfo: Date range processed successfully",
      "at calculateWorkingDays (src/app/pages/WorkingDaysCalculator.tsx:49:3)",
    ],
  },
  {
    id: 6,
    level: "Warning",
    timestamp: "2026-03-17 13:49:18",
    userId: "system",
    source: "MonitoringAgent",
    message: "CPU usage spike exceeded the soft threshold for 90 seconds.",
    stackTrace: [
      "MonitoringWarning: CPU soft threshold exceeded",
      "at capturePerformanceMetrics (src/services/monitoring.ts:53:14)",
    ],
  },
];

const levelOptions: Array<LogLevel | "All"> = ["All", "Error", "Warning", "Info"];

const levelStyles: Record<
  LogLevel,
  {
    icon: typeof AlertTriangle;
    className: string;
  }
> = {
  Error: {
    icon: ShieldAlert,
    className: "border-rose-200 bg-rose-100 text-rose-800",
  },
  Warning: {
    icon: AlertTriangle,
    className: "border-amber-200 bg-amber-100 text-amber-800",
  },
  Info: {
    icon: Info,
    className: "border-cyan-200 bg-cyan-100 text-cyan-800",
  },
};

export function AdminSystemMonitoring() {
  const [selectedLevel, setSelectedLevel] = useState<(typeof levelOptions)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLogId, setSelectedLogId] = useState<number>(logRecords[0].id);

  const filteredLogs = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return logRecords.filter((log) => {
      const matchesLevel = selectedLevel === "All" || log.level === selectedLevel;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        log.userId.toLowerCase().includes(normalizedSearch) ||
        log.source.toLowerCase().includes(normalizedSearch) ||
        log.message.toLowerCase().includes(normalizedSearch);

      return matchesLevel && matchesSearch;
    });
  }, [selectedLevel, searchTerm]);

  const selectedLog =
    filteredLogs.find((log) => log.id === selectedLogId) ?? filteredLogs[0] ?? null;

  const stats = useMemo(
    () => ({
      total: filteredLogs.length,
      errors: filteredLogs.filter((log) => log.level === "Error").length,
      warnings: filteredLogs.filter((log) => log.level === "Warning").length,
      info: filteredLogs.filter((log) => log.level === "Info").length,
    }),
    [filteredLogs],
  );

  return (
    <div className="min-h-screen min-h-dvh bg-[linear-gradient(135deg,#020617_0%,#0f172a_42%,#111827_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs text-cyan-200">
              Admin Dashboard
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">System Monitoring</h1>
            <p className="max-w-3xl text-slate-300">
              Monitor live technical logs, filter activity by severity, inspect
              user events, and export records for further analysis.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard label="Logs" value={String(stats.total)} />
            <MetricCard label="Errors" value={String(stats.errors)} tone="error" />
            <MetricCard label="Warnings" value={String(stats.warnings)} tone="warning" />
            <MetricCard label="Info" value={String(stats.info)} tone="info" />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <Card className="border-white/10 bg-white/5 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MonitorCog className="h-5 w-5" />
                Filters
              </CardTitle>
              <CardDescription className="text-slate-300">
                Narrow the live stream by severity or search specific events.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="log-search" className="text-sm font-medium text-slate-200">
                  Search Logs
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="log-search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by user ID, source, or message"
                    className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-200">Log Type</p>
                <div className="grid grid-cols-2 gap-3">
                  {levelOptions.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedLevel(level)}
                      className={cn(
                        "rounded-2xl border px-4 py-3 text-sm transition",
                        selectedLevel === level
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-100"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20",
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Monitoring Flow</p>
                <div className="mt-3 space-y-3 text-sm text-slate-300">
                  <p>1. Admin opens the System Monitoring dashboard.</p>
                  <p>2. Logs are filtered by Error, Warning, or Info.</p>
                  <p>3. Timestamps, user IDs, and stack traces are inspected.</p>
                  <p>4. Matching records are exported when deeper analysis is needed.</p>
                </div>
              </div>

              <Button className="w-full gap-2 rounded-full">
                <Download className="h-4 w-4" />
                Export Logs
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border-white/10 bg-white/5 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="h-5 w-5" />
                  Live Log Stream
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Review recent events and select a record to inspect stack trace details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[360px] pr-3">
                  <div className="space-y-4">
                    {filteredLogs.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center text-slate-300">
                        No logs match the current filters.
                      </div>
                    ) : (
                      filteredLogs.map((log) => (
                        <button
                          key={log.id}
                          type="button"
                          onClick={() => setSelectedLogId(log.id)}
                          className={cn(
                            "w-full rounded-3xl border p-4 text-left transition",
                            selectedLog?.id === log.id
                              ? "border-cyan-400/70 bg-cyan-400/10"
                              : "border-white/10 bg-white/5 hover:border-white/20",
                          )}
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <LevelBadge level={log.level} />
                                <Badge
                                  variant="outline"
                                  className="rounded-full border-white/10 bg-transparent px-3 py-1 text-slate-300"
                                >
                                  {log.source}
                                </Badge>
                              </div>
                              <p className="font-medium text-white">{log.message}</p>
                            </div>

                            <div className="space-y-1 text-sm text-slate-300 lg:text-right">
                              <p>{log.timestamp}</p>
                              <p>User ID: {log.userId}</p>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white text-slate-900 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileWarning className="h-5 w-5" />
                  Event Details
                </CardTitle>
                <CardDescription>
                  View timestamps, user IDs, and stack traces for the selected log entry.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {selectedLog ? (
                  <>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <DetailPill label="Level" value={selectedLog.level} />
                      <DetailPill label="Timestamp" value={selectedLog.timestamp} />
                      <DetailPill label="User ID" value={selectedLog.userId} />
                    </div>

                    <div className="rounded-2xl border bg-slate-50 p-4">
                      <p className="text-sm font-medium text-slate-500">Message</p>
                      <p className="mt-2 leading-7 text-slate-800">
                        {selectedLog.message}
                      </p>
                    </div>

                    <div className="rounded-2xl border bg-slate-950 p-4 text-slate-100">
                      <p className="text-sm font-medium text-slate-300">Stack Trace</p>
                      <div className="mt-3 space-y-2 font-mono text-sm">
                        {selectedLog.stackTrace.map((line, index) => (
                          <p key={`${selectedLog.id}-${index}`}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    Select a log entry to inspect its details.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function LevelBadge({ level }: { level: LogLevel }) {
  const Icon = levelStyles[level].icon;

  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-3 py-1", levelStyles[level].className)}
    >
      <Icon className="h-3.5 w-3.5" />
      {level}
    </Badge>
  );
}

function MetricCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "error" | "warning" | "info";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 shadow-sm backdrop-blur",
        tone === "neutral" && "border-white/10 bg-white/5",
        tone === "error" && "border-rose-400/20 bg-rose-500/10",
        tone === "warning" && "border-amber-400/20 bg-amber-500/10",
        tone === "info" && "border-cyan-400/20 bg-cyan-500/10",
      )}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-300">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
