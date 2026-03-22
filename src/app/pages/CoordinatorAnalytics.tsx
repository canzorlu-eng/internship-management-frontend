// /coordinator/analytics

import { useMemo, useState } from "react";
import {
  BarChart3,
  Building2,
  Filter,
  Megaphone,
  Send,
  TrendingUp,
  Users,
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
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { cn } from "../components/ui/utils";

type InternshipStatus = "Approved" | "Pending" | "Rejected";

type StudentAnalyticsRecord = {
  id: number;
  name: string;
  company: string;
  year: number;
  status: InternshipStatus;
  satisfaction: number;
  group: "Approved Students" | "Pending Students" | "Revision Needed";
};

const analyticsRecords: StudentAnalyticsRecord[] = [
  {
    id: 1,
    name: "Ayse Demir",
    company: "Aselsan",
    year: 2026,
    status: "Approved",
    satisfaction: 4.8,
    group: "Approved Students",
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    company: "Havelsan",
    year: 2026,
    status: "Approved",
    satisfaction: 4.6,
    group: "Approved Students",
  },
  {
    id: 3,
    name: "Elif Yilmaz",
    company: "Trendyol",
    year: 2026,
    status: "Pending",
    satisfaction: 4.4,
    group: "Pending Students",
  },
  {
    id: 4,
    name: "Can Aydin",
    company: "Tubitak Bilgem",
    year: 2026,
    status: "Rejected",
    satisfaction: 3.9,
    group: "Revision Needed",
  },
  {
    id: 5,
    name: "Zeynep Koc",
    company: "Peak Games",
    year: 2025,
    status: "Approved",
    satisfaction: 4.9,
    group: "Approved Students",
  },
  {
    id: 6,
    name: "Berk Ersoy",
    company: "SoftTech",
    year: 2026,
    status: "Pending",
    satisfaction: 4.0,
    group: "Pending Students",
  },
];

const yearOptions = ["All Years", "2026", "2025"];
const statusOptions: Array<InternshipStatus | "All Statuses"> = [
  "All Statuses",
  "Approved",
  "Pending",
  "Rejected",
];
const groupOptions = [
  "Approved Students",
  "Pending Students",
  "Revision Needed",
] as const;

export function CoordinatorAnalytics() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedStatus, setSelectedStatus] =
    useState<(typeof statusOptions)[number]>("Approved");
  const [selectedGroup, setSelectedGroup] =
    useState<(typeof groupOptions)[number]>("Approved Students");
  const [messageSubject, setMessageSubject] = useState(
    "Archive deadline reminder",
  );
  const [messageBody, setMessageBody] = useState(
    "Please review the latest coordinator notes and complete the final archive process before the stated deadline.",
  );

  const filteredRecords = useMemo(() => {
    return analyticsRecords.filter((record) => {
      const matchesYear =
        selectedYear === "All Years" || String(record.year) === selectedYear;
      const matchesStatus =
        selectedStatus === "All Statuses" || record.status === selectedStatus;

      return matchesYear && matchesStatus;
    });
  }, [selectedYear, selectedStatus]);

  const selectedGroupStudents = useMemo(
    () => filteredRecords.filter((record) => record.group === selectedGroup),
    [filteredRecords, selectedGroup],
  );

  const companyStats = useMemo(() => {
    const counts = new Map<string, number>();

    filteredRecords.forEach((record) => {
      counts.set(record.company, (counts.get(record.company) ?? 0) + 1);
    });

    return [...counts.entries()]
      .map(([company, count]) => ({ company, count }))
      .sort((left, right) => right.count - left.count)
      .slice(0, 4);
  }, [filteredRecords]);

  const successRate = useMemo(() => {
    if (filteredRecords.length === 0) {
      return 0;
    }

    const approvedCount = filteredRecords.filter(
      (record) => record.status === "Approved",
    ).length;

    return Math.round((approvedCount / filteredRecords.length) * 100);
  }, [filteredRecords]);

  return (
    <div className="min-h-screen min-h-dvh bg-[linear-gradient(135deg,#fffaf0_0%,#eff6ff_38%,#f8fafc_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge className="rounded-full bg-slate-950 px-3 py-1 text-xs text-white">
              Coordinator Panel
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">
              Internship Analytics
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Review internship trends, filter by year and status, inspect popular
              companies, and send announcements or feedback to student groups.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <TopMetric label="Records" value={String(filteredRecords.length)} />
            <TopMetric label="Success Rate" value={`${successRate}%`} />
            <TopMetric label="Groups" value={String(groupOptions.length)} />
            <TopMetric label="Companies" value={String(companyStats.length)} />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
              <CardDescription>
                Apply year and status filters before generating coordinator insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <FilterSelect
                label="Year"
                value={selectedYear}
                options={yearOptions}
                onChange={setSelectedYear}
              />
              <FilterSelect
                label="Status"
                value={selectedStatus}
                options={[...statusOptions]}
                onChange={(value) =>
                  setSelectedStatus(value as (typeof statusOptions)[number])
                }
              />

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-900">Use Case Flow</p>
                <div className="mt-3 space-y-3 text-sm text-slate-600">
                  <p>1. Coordinator opens the Analytics dashboard.</p>
                  <p>2. Filters such as year and status are applied.</p>
                  <p>3. The system generates charts and company insights.</p>
                  <p>4. A student group is selected.</p>
                  <p>5. Bulk or individual feedback is drafted and sent.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Card className="border-white/70 bg-slate-950 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5" />
                    Success Snapshot
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Visual breakdown of approval outcomes in the selected segment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(["Approved", "Pending", "Rejected"] as InternshipStatus[]).map(
                    (status) => {
                      const count = filteredRecords.filter(
                        (record) => record.status === status,
                      ).length;
                      const percentage =
                        filteredRecords.length === 0
                          ? 0
                          : Math.round((count / filteredRecords.length) * 100);

                      return (
                        <div key={status} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{status}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="h-3 overflow-hidden rounded-full bg-white/10">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                status === "Approved" && "bg-emerald-400",
                                status === "Pending" && "bg-amber-400",
                                status === "Rejected" && "bg-rose-400",
                              )}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    },
                  )}
                </CardContent>
              </Card>

              <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Popular Companies
                  </CardTitle>
                  <CardDescription>
                    Historical company frequency for the selected filters.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {companyStats.map((item) => {
                    const width =
                      companyStats[0]?.count && companyStats[0].count > 0
                        ? (item.count / companyStats[0].count) * 100
                        : 0;

                    return (
                      <div key={item.company} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.company}</span>
                          <span className="text-sm text-muted-foreground">
                            {item.count} students
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

            <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
              <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Student Groups
                  </CardTitle>
                  <CardDescription>
                    Choose a target segment for feedback or announcements.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groupOptions.map((group, index) => {
                    const count = filteredRecords.filter(
                      (record) => record.group === group,
                    ).length;

                    return (
                      <div key={group}>
                        <button
                          type="button"
                          onClick={() => setSelectedGroup(group)}
                          className={cn(
                            "w-full rounded-2xl border p-4 text-left transition",
                            selectedGroup === group
                              ? "border-slate-950 bg-slate-950 text-white"
                              : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50",
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-medium">{group}</p>
                              <p
                                className={cn(
                                  "mt-1 text-sm",
                                  selectedGroup === group
                                    ? "text-slate-300"
                                    : "text-muted-foreground",
                                )}
                              >
                                {count} matching students
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "rounded-full px-3 py-1",
                                selectedGroup === group
                                  ? "border-white/10 bg-white/10 text-white"
                                  : "bg-slate-100",
                              )}
                            >
                              {count}
                            </Badge>
                          </div>
                        </button>
                        {index < groupOptions.length - 1 ? <Separator className="mt-3" /> : null}
                      </div>
                    );
                  })}

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-900">
                      Selected Group Members
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      {selectedGroupStudents.length === 0 ? (
                        <p>No students match the current filter set.</p>
                      ) : (
                        selectedGroupStudents.map((student) => (
                          <p key={student.id}>
                            {student.name} - {student.company}
                          </p>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/70 bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Megaphone className="h-5 w-5" />
                    Feedback & Announcements
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Draft a message for the selected student group or targeted set.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="message-subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="message-subject"
                      value={messageSubject}
                      onChange={(event) => setMessageSubject(event.target.value)}
                      className="border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message-body" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message-body"
                      value={messageBody}
                      onChange={(event) => setMessageBody(event.target.value)}
                      className="min-h-36 border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                    Sending to: <span className="font-medium text-white">{selectedGroup}</span>
                    {" · "}
                    {selectedGroupStudents.length} students
                  </div>

                  <Button className="w-full gap-2 rounded-full bg-white text-slate-950 hover:bg-slate-100">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-input bg-input-background focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-[3px]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TopMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
