// /student

import { Link } from "react-router";
import {
    Building2,
    Clock3,
    CheckCircle2,
    TrendingUp,
    Sparkles,
    ArrowRight,
    CalendarDays,
    FileText,
    Bot,
    Calculator,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { PageHeader } from "../components/PageHeader";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";

/* ── Mock data (will move to services in Phase 6) ── */

const submissionSummary = {
    total: 2,
    pending: 0,
    approved: 1,
    rejected: 1,
    latestFile: "internship-report-v1.pdf",
    latestStatus: "Approved" as const,
    latestDate: "12 Mar 2026",
};

const upcomingDeadlines = [
    {
        id: 1,
        title: "Final report submission",
        date: "28 Mar 2026",
        daysLeft: 6,
    },
    {
        id: 2,
        title: "Company evaluation form",
        date: "02 Apr 2026",
        daysLeft: 11,
    },
    {
        id: 3,
        title: "Internship logbook upload",
        date: "10 Apr 2026",
        daysLeft: 19,
    },
];

const recentChatbotTopics = [
    "What is the minimum work day count?",
    "Which documents are required before submission?",
    "Can I submit my report after the deadline?",
];

const quickLinks: {
    title: string;
    description: string;
    icon: typeof FileText;
    href: string;
    color: string;
}[] = [
        {
            title: "My Submissions",
            description: "Upload & track reports",
            icon: FileText,
            href: "/student/submissions",
            color: "bg-blue-500/10 text-blue-600",
        },
        {
            title: "AI Chatbot",
            description: "Ask about internship rules",
            icon: Bot,
            href: "/student/chatbot",
            color: "bg-violet-500/10 text-violet-600",
        },
        {
            title: "Working Days",
            description: "Calculate business days",
            icon: Calculator,
            href: "/student/working-days",
            color: "bg-amber-500/10 text-amber-600",
        },
        {
            title: "Company Search",
            description: "Browse approved companies",
            icon: Building2,
            href: "/student/company-search",
            color: "bg-emerald-500/10 text-emerald-600",
        },
    ];

const workingDaysSummary = {
    startDate: "01 Jul 2026",
    endDate: "30 Aug 2026",
    totalWorkDays: 44,
    holidays: 2,
};

/* ── Component ── */
import { useAuth } from "../contexts/AuthContext";

export function StudentDashboard() {
    const { user } = useAuth();
    const firstName = user?.name.split(" ")[0] || "Student";

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
                {/* ── Header ── */}
                <PageHeader
                    badgeLabel="Student Workspace"
                    title={`Welcome back, ${firstName} 👋`}
                    description="Here's your internship overview. Stay on top of deadlines, track your submissions, and explore helpful tools."
                />

                {/* ── Quick-link cards ── */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {quickLinks.map((link) => (
                        <Link key={link.href} to={link.href} className="group">
                            <Card className="h-full border-white/70 bg-white/85 shadow-sm backdrop-blur transition hover:shadow-md hover:-translate-y-0.5">
                                <CardContent className="flex items-start gap-4 p-5">
                                    <div className={`rounded-xl p-3 ${link.color}`}>
                                        <link.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold group-hover:text-primary transition-colors">
                                            {link.title}
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {link.description}
                                        </p>
                                    </div>
                                    <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* ── Main grid ── */}
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Left column */}
                    <div className="grid gap-6">
                        {/* Submission progress */}
                        <Card className="border-white/70 bg-slate-950 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <TrendingUp className="h-5 w-5" />
                                    Submission Progress
                                </CardTitle>
                                <CardDescription className="text-slate-300">
                                    Your latest report status at a glance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-sm text-slate-300">Latest submission</p>
                                    <p className="mt-1 text-lg font-semibold">
                                        {submissionSummary.latestFile}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Submitted on {submissionSummary.latestDate}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-300">Current status</span>
                                        <Badge
                                            variant="outline"
                                            className="rounded-full border-emerald-200 bg-emerald-100 px-3 py-1 text-emerald-800"
                                        >
                                            {submissionSummary.latestStatus}
                                        </Badge>
                                    </div>
                                    <Progress value={67} className="h-3 bg-white/10" />
                                </div>

                                <div className="grid grid-cols-4 gap-3">
                                    {Object.entries({
                                        Total: submissionSummary.total,
                                        Pending: submissionSummary.pending,
                                        Approved: submissionSummary.approved,
                                        Rejected: submissionSummary.rejected,
                                    }).map(([label, value]) => (
                                        <div
                                            key={label}
                                            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center"
                                        >
                                            <p className="text-xs text-slate-400">{label}</p>
                                            <p className="mt-0.5 text-lg font-semibold">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    asChild
                                    className="w-full gap-2 rounded-full bg-white text-slate-950 hover:bg-slate-100"
                                >
                                    <Link to="/student/submissions">
                                        <FileText className="h-4 w-4" />
                                        View All Submissions
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Working days summary */}
                        <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarDays className="h-5 w-5" />
                                    Internship Period
                                </CardTitle>
                                <CardDescription>
                                    Your planned working days overview.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    <PeriodStat label="Start" value={workingDaysSummary.startDate} />
                                    <PeriodStat label="End" value={workingDaysSummary.endDate} />
                                    <PeriodStat
                                        label="Work Days"
                                        value={String(workingDaysSummary.totalWorkDays)}
                                    />
                                    <PeriodStat
                                        label="Holidays"
                                        value={String(workingDaysSummary.holidays)}
                                    />
                                </div>
                                <Button variant="outline" asChild className="mt-4 w-full gap-2">
                                    <Link to="/student/working-days">
                                        <Calculator className="h-4 w-4" />
                                        Open Calculator
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column */}
                    <div className="grid gap-6">
                        {/* Upcoming deadlines */}
                        <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock3 className="h-5 w-5" />
                                    Upcoming Deadlines
                                </CardTitle>
                                <CardDescription>
                                    Key dates you should keep in mind.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {upcomingDeadlines.map((deadline, index) => (
                                    <div key={deadline.id}>
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                                                <CalendarDays className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{deadline.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {deadline.date}
                                                </p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="rounded-full border-amber-200 bg-amber-50 px-3 py-1 text-amber-700"
                                            >
                                                {deadline.daysLeft}d left
                                            </Badge>
                                        </div>
                                        {index < upcomingDeadlines.length - 1 && (
                                            <Separator className="mt-4" />
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Recent chatbot topics */}
                        <Card className="border-white/70 bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Sparkles className="h-5 w-5" />
                                    AI Chatbot
                                </CardTitle>
                                <CardDescription className="text-slate-300">
                                    Quick questions to get you started.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentChatbotTopics.map((topic) => (
                                    <Link
                                        key={topic}
                                        to="/student/chatbot"
                                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm transition hover:border-white/20 hover:bg-white/10"
                                    >
                                        <Bot className="h-4 w-4 shrink-0 text-cyan-300" />
                                        <span>{topic}</span>
                                    </Link>
                                ))}
                                <Button
                                    asChild
                                    className="mt-2 w-full gap-2 rounded-full bg-white text-slate-950 hover:bg-slate-100"
                                >
                                    <Link to="/student/chatbot">
                                        <Bot className="h-4 w-4" />
                                        Open Chatbot
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick overall status */}
                        <Card className="border-white/70 bg-white/85 shadow-sm backdrop-blur">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">You're on track!</p>
                                    <p className="text-sm text-muted-foreground">
                                        Your latest report has been approved. Keep an eye on
                                        upcoming deadlines.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PeriodStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {label}
            </p>
            <p className="mt-0.5 text-sm font-semibold">{value}</p>
        </div>
    );
}
