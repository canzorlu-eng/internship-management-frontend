// /coordinator

import { Link } from "react-router";
import {
    ArrowRight,
    BarChart3,
    Building2,
    CheckCircle2,
    Clock3,
    FileSearch,
    Megaphone,
    TrendingUp,
    Users,
    XCircle,
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

const overviewMetrics = {
    totalStudents: 42,
    approvalRate: 76,
    pendingReviews: 8,
    companiesEngaged: 14,
};

const statusBreakdown: {
    status: string;
    count: number;
    percentage: number;
    color: string;
}[] = [
        { status: "Approved", count: 32, percentage: 76, color: "bg-emerald-400" },
        { status: "Pending", count: 8, percentage: 19, color: "bg-amber-400" },
        { status: "Rejected", count: 2, percentage: 5, color: "bg-rose-400" },
    ];

const recentStudentActivity = [
    {
        id: 1,
        name: "Elif Yılmaz",
        action: "Submitted report revision",
        time: "2 hours ago",
        status: "Pending" as const,
    },
    {
        id: 2,
        name: "Berk Ersoy",
        action: "Uploaded initial report",
        time: "5 hours ago",
        status: "Pending" as const,
    },
    {
        id: 3,
        name: "Ayşe Demir",
        action: "Report approved",
        time: "1 day ago",
        status: "Approved" as const,
    },
    {
        id: 4,
        name: "Can Aydın",
        action: "Report requires revision",
        time: "2 days ago",
        status: "Rejected" as const,
    },
];

const topCompanies = [
    { name: "Aselsan", students: 8 },
    { name: "Havelsan", students: 6 },
    { name: "Trendyol", students: 5 },
    { name: "Tubitak Bilgem", students: 4 },
];

const statusIcon: Record<string, typeof CheckCircle2> = {
    Approved: CheckCircle2,
    Pending: Clock3,
    Rejected: XCircle,
};

const statusBadgeClass: Record<string, string> = {
    Approved: "border-emerald-200 bg-emerald-100 text-emerald-800",
    Pending: "border-amber-200 bg-amber-100 text-amber-800",
    Rejected: "border-rose-200 bg-rose-100 text-rose-800",
};

/* ── Component ── */

export function CoordinatorDashboard() {
    return (
        <div className="min-h-screen min-h-dvh bg-background transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
                {/* ── Header ── */}
                <PageHeader
                    badgeLabel="Coordinator Panel"
                    title="Coordinator Dashboard"
                    description="Overview of student internship progress, pending reviews, and key metrics for the current period."
                />

                {/* ── Top metrics ── */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <MetricCard
                        icon={Users}
                        label="Total Students"
                        value={String(overviewMetrics.totalStudents)}
                    />
                    <MetricCard
                        icon={TrendingUp}
                        label="Approval Rate"
                        value={`${overviewMetrics.approvalRate}%`}
                    />
                    <MetricCard
                        icon={FileSearch}
                        label="Pending Reviews"
                        value={String(overviewMetrics.pendingReviews)}
                        highlight
                    />
                    <MetricCard
                        icon={Building2}
                        label="Companies"
                        value={String(overviewMetrics.companiesEngaged)}
                    />
                </div>

                {/* ── Main grid ── */}
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Left column */}
                    <div className="grid gap-6">
                        {/* Status breakdown */}
                        <Card className="border-white/70 bg-slate-950 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <BarChart3 className="h-5 w-5" />
                                    Status Overview
                                </CardTitle>
                                <CardDescription className="text-slate-300">
                                    Approval distribution across all students.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {statusBreakdown.map((item) => (
                                    <div key={item.status} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>{item.status}</span>
                                            <span>
                                                {item.count} ({item.percentage}%)
                                            </span>
                                        </div>
                                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                                            <div
                                                className={cn("h-full rounded-full", item.color)}
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    asChild
                                    className="mt-2 w-full gap-2 rounded-full bg-white text-slate-950 hover:bg-slate-100"
                                >
                                    <Link to="/coordinator/analytics">
                                        <BarChart3 className="h-4 w-4" />
                                        View Full Analytics
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Top companies */}
                        <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    Top Companies
                                </CardTitle>
                                <CardDescription>
                                    Most popular internship destinations this period.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {topCompanies.map((company) => {
                                    const width =
                                        topCompanies[0]?.students && topCompanies[0].students > 0
                                            ? (company.students / topCompanies[0].students) * 100
                                            : 0;
                                    return (
                                        <div key={company.name} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{company.name}</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {company.students} students
                                                </span>
                                            </div>
                                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className="h-full rounded-full bg-slate-950"
                                                    style={{ width: `${width}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column */}
                    <div className="grid gap-6">
                        {/* Recent activity */}
                        <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock3 className="h-5 w-5" />
                                    Recent Activity
                                </CardTitle>
                                <CardDescription>
                                    Latest student submissions and status changes.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentStudentActivity.map((activity, index) => {
                                    const Icon = statusIcon[activity.status] ?? Clock3;
                                    return (
                                        <div key={activity.id}>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={cn(
                                                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                                                        activity.status === "Approved" &&
                                                        "bg-emerald-100 text-emerald-700",
                                                        activity.status === "Pending" &&
                                                        "bg-amber-100 text-amber-700",
                                                        activity.status === "Rejected" &&
                                                        "bg-rose-100 text-rose-700",
                                                    )}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium">{activity.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {activity.action}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            "rounded-full px-3 py-1",
                                                            statusBadgeClass[activity.status],
                                                        )}
                                                    >
                                                        {activity.status}
                                                    </Badge>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                            {index < recentStudentActivity.length - 1 && (
                                                <Separator className="mt-4" />
                                            )}
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>

                        {/* Quick actions card */}
                        <Card className="border-white/70 bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Megaphone className="h-5 w-5" />
                                    Quick Actions
                                </CardTitle>
                                <CardDescription className="text-slate-300">
                                    Common tasks you can jump into.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link
                                    to="/coordinator/analytics"
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
                                >
                                    <BarChart3 className="h-5 w-5 shrink-0 text-cyan-300" />
                                    <div className="flex-1">
                                        <p className="font-medium">Analytics Dashboard</p>
                                        <p className="text-sm text-slate-300">
                                            Filter, analyze, and send feedback
                                        </p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-400" />
                                </Link>
                                <Link
                                    to="/help"
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/10"
                                >
                                    <FileSearch className="h-5 w-5 shrink-0 text-cyan-300" />
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

