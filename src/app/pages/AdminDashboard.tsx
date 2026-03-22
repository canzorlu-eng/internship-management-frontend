// /admin

import { Link } from "react-router";
import {
    Activity,
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    Cpu,
    Database,
    HardDrive,
    LifeBuoy,
    MonitorCog,
    Server,
    Shield,
    ShieldAlert,
    Users,
    Wifi,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { PageHeader } from "../components/PageHeader";
import { MetricCard } from "../components/MetricCard";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { cn } from "../components/ui/utils";

/* ── Mock data ── */

const systemHealth = {
    status: "Healthy" as const,
    uptime: "99.97%",
    activeUsers: 128,
    requestsPerMin: 342,
};

const resourceMetrics = [
    { label: "CPU Usage", value: 38, icon: Cpu, unit: "%" },
    { label: "Memory", value: 62, icon: HardDrive, unit: "%" },
    { label: "Disk I/O", value: 24, icon: Database, unit: "MB/s" },
    { label: "Network", value: 156, icon: Wifi, unit: "Mbps" },
];

const recentLogs = [
    {
        id: 1,
        level: "Error" as const,
        source: "ReportUploadService",
        message: "File validation failed — unsupported MIME type",
        time: "14:08",
        user: "student_2041",
    },
    {
        id: 2,
        level: "Warning" as const,
        source: "AuthGateway",
        message: "Multiple failed login attempts from same IP block",
        time: "14:05",
        user: "guest_883",
    },
    {
        id: 3,
        level: "Info" as const,
        source: "HelpCenter",
        message: "Help page rendered for admin session",
        time: "14:03",
        user: "admin_001",
    },
    {
        id: 4,
        level: "Error" as const,
        source: "InternshipChatbot",
        message: "RAG retrieval timeout during policy lookup",
        time: "13:58",
        user: "student_1167",
    },
];

const serviceStatuses = [
    { name: "API Gateway", status: "Operational" as const },
    { name: "Auth Service", status: "Operational" as const },
    { name: "File Storage", status: "Operational" as const },
    { name: "Chatbot Engine", status: "Degraded" as const },
    { name: "Notification Service", status: "Operational" as const },
];

const levelConfig = {
    Error: {
        icon: ShieldAlert,
        badge: "border-rose-200 bg-rose-100 text-rose-800",
        dot: "bg-rose-500",
    },
    Warning: {
        icon: AlertTriangle,
        badge: "border-amber-200 bg-amber-100 text-amber-800",
        dot: "bg-amber-500",
    },
    Info: {
        icon: CheckCircle2,
        badge: "border-cyan-200 bg-cyan-100 text-cyan-800",
        dot: "bg-cyan-500",
    },
};

/* ── Component ── */

export function AdminDashboard() {
    const errorCount = recentLogs.filter((l) => l.level === "Error").length;
    const warningCount = recentLogs.filter((l) => l.level === "Warning").length;

    return (
        <div className="min-h-screen min-h-dvh bg-background transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
                {/* ── Header ── */}
                <PageHeader
                    badgeLabel="Admin Dashboard"
                    title="System Overview"
                    description="Real-time health metrics, service status, and recent event log snapshot for the internship management platform."
                />

                {/* ── Top metrics ── */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <MetricCard
                        icon={Shield}
                        label="System Status"
                        value={systemHealth.status}
                        tone="success"
                    />
                    <MetricCard
                        icon={Activity}
                        label="Uptime"
                        value={systemHealth.uptime}
                    />
                    <MetricCard
                        icon={Users}
                        label="Active Users"
                        value={String(systemHealth.activeUsers)}
                    />
                    <MetricCard
                        icon={Server}
                        label="Req / min"
                        value={String(systemHealth.requestsPerMin)}
                    />
                </div>

                {/* ── Main grid ── */}
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Left column */}
                    <div className="grid gap-6">
                        {/* Resource usage */}
                        <Card className="border-white/10 bg-white/5 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Cpu className="h-5 w-5" />
                                    Resource Usage
                                </CardTitle>
                                <CardDescription className="text-slate-300">
                                    Current infrastructure load at a glance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 sm:grid-cols-2">
                                {resourceMetrics.map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-cyan-400/15 p-2.5 text-cyan-200">
                                                <metric.icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">{metric.label}</p>
                                                <p className="text-lg font-semibold">
                                                    {metric.value}
                                                    <span className="ml-0.5 text-sm text-slate-400">
                                                        {metric.unit}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        {metric.unit === "%" && (
                                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        metric.value > 80
                                                            ? "bg-rose-400"
                                                            : metric.value > 50
                                                                ? "bg-amber-400"
                                                                : "bg-cyan-400",
                                                    )}
                                                    style={{ width: `${metric.value}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Service status */}
                        <Card className="border-white/10 bg-white text-slate-900 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Server className="h-5 w-5" />
                                    Service Status
                                </CardTitle>
                                <CardDescription>
                                    Health of key platform services.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {serviceStatuses.map((service, index) => (
                                    <div key={service.name}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={cn(
                                                        "h-2.5 w-2.5 rounded-full",
                                                        service.status === "Operational"
                                                            ? "bg-emerald-500"
                                                            : "bg-amber-500",
                                                    )}
                                                />
                                                <span className="font-medium">{service.name}</span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "rounded-full px-3 py-1",
                                                    service.status === "Operational"
                                                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                        : "border-amber-200 bg-amber-50 text-amber-700",
                                                )}
                                            >
                                                {service.status}
                                            </Badge>
                                        </div>
                                        {index < serviceStatuses.length - 1 && (
                                            <Separator className="mt-4" />
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column */}
                    <div className="grid gap-6">
                        {/* Recent logs */}
                        <Card className="border-white/10 bg-white/5 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 text-white">
                                            <Activity className="h-5 w-5" />
                                            Recent Logs
                                        </CardTitle>
                                        <CardDescription className="text-slate-300">
                                            Last 4 events from the system monitor.
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Badge
                                            variant="outline"
                                            className="rounded-full border-rose-400/30 bg-rose-500/10 px-3 py-1 text-rose-300"
                                        >
                                            {errorCount} errors
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className="rounded-full border-amber-400/30 bg-amber-500/10 px-3 py-1 text-amber-300"
                                        >
                                            {warningCount} warnings
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentLogs.map((log) => {
                                    const config = levelConfig[log.level];
                                    return (
                                        <div
                                            key={log.id}
                                            className="rounded-2xl border border-white/10 bg-white/5 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className={cn(
                                                            "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                                                            config.dot,
                                                        )}
                                                    />
                                                    <div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <Badge
                                                                variant="outline"
                                                                className={cn(
                                                                    "rounded-full px-2 py-0.5 text-xs",
                                                                    config.badge,
                                                                )}
                                                            >
                                                                {log.level}
                                                            </Badge>
                                                            <span className="text-xs text-slate-400">
                                                                {log.source}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1 text-sm text-slate-200">
                                                            {log.message}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="shrink-0 text-xs text-slate-400">
                                                    {log.time}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}

                                <Button
                                    asChild
                                    className="mt-2 w-full gap-2 rounded-full bg-white text-slate-950 hover:bg-slate-100"
                                >
                                    <Link to="/admin/system-monitoring">
                                        <MonitorCog className="h-4 w-4" />
                                        View All Logs
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick actions */}
                        <Card className="border-white/10 bg-white/5 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                            <CardHeader>
                                <CardTitle className="text-white">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link
                                    to="/admin/system-monitoring"
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
                                >
                                    <MonitorCog className="h-5 w-5 shrink-0 text-cyan-300" />
                                    <div className="flex-1">
                                        <p className="font-medium">System Monitoring</p>
                                        <p className="text-sm text-slate-300">
                                            Filter logs, inspect traces, export reports
                                        </p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-400" />
                                </Link>
                                <Link
                                    to="/help"
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
                                >
                                    <LifeBuoy className="h-5 w-5 shrink-0 text-cyan-300" />
                                    <div className="flex-1">
                                        <p className="font-medium">Help Center</p>
                                        <p className="text-sm text-slate-300">
                                            Documentation and support
                                        </p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-400" />
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

