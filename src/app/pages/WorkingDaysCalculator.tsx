// /student/working-days

import { useMemo, useState } from "react";
import {
  Calculator,
  CalendarDays,
  CircleOff,
  Landmark,
  BriefcaseBusiness,
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
import { Separator } from "../components/ui/separator";
import { cn } from "../components/ui/utils";

type DayEntry = {
  date: string;
  label: string;
  type: "workday" | "weekend" | "holiday";
};

const holidaysTable = [
  { date: "2026-01-01", name: "New Year's Day" },
  { date: "2026-04-23", name: "National Sovereignty and Children's Day" },
  { date: "2026-05-01", name: "Labour and Solidarity Day" },
  { date: "2026-05-19", name: "Commemoration of Ataturk, Youth and Sports Day" },
  { date: "2026-07-15", name: "Democracy and National Unity Day" },
  { date: "2026-08-30", name: "Victory Day" },
  { date: "2026-10-29", name: "Republic Day" },
];

const holidayMap = new Map(holidaysTable.map((holiday) => [holiday.date, holiday.name]));

export function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState("2026-07-01");
  const [endDate, setEndDate] = useState("2026-07-31");

  const calculation = useMemo(() => {
    if (!startDate || !endDate) {
      return {
        totalRangeDays: 0,
        validWorkdays: 0,
        weekends: [] as DayEntry[],
        holidays: [] as DayEntry[],
        workdays: [] as DayEntry[],
        error: "Please select both start and end dates.",
      };
    }

    if (startDate > endDate) {
      return {
        totalRangeDays: 0,
        validWorkdays: 0,
        weekends: [] as DayEntry[],
        holidays: [] as DayEntry[],
        workdays: [] as DayEntry[],
        error: "Start date cannot be later than end date.",
      };
    }

    const currentDate = new Date(`${startDate}T00:00:00`);
    const lastDate = new Date(`${endDate}T00:00:00`);
    const weekends: DayEntry[] = [];
    const holidays: DayEntry[] = [];
    const workdays: DayEntry[] = [];

    while (currentDate <= lastDate) {
      const isoDate = currentDate.toISOString().slice(0, 10);
      const dayName = currentDate.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const dayOfWeek = currentDate.getDay();
      const holidayName = holidayMap.get(isoDate);

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends.push({
          date: isoDate,
          label: dayName,
          type: "weekend",
        });
      } else if (holidayName) {
        holidays.push({
          date: isoDate,
          label: `${dayName} - ${holidayName}`,
          type: "holiday",
        });
      } else {
        workdays.push({
          date: isoDate,
          label: dayName,
          type: "workday",
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      totalRangeDays: weekends.length + holidays.length + workdays.length,
      validWorkdays: workdays.length,
      weekends,
      holidays,
      workdays,
      error: "",
    };
  }, [startDate, endDate]);

  return (
    <div className="min-h-screen min-h-dvh bg-[linear-gradient(135deg,#f8fafc_0%,#ecfeff_42%,#fff7ed_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
              Internship Utility
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">
              Working Days Calculator
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Calculate the total valid internship days between two dates by
              excluding weekends and official public holidays from the holidays table.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard icon={CalendarDays} label="Range Days" value={String(calculation.totalRangeDays)} />
            <StatCard icon={BriefcaseBusiness} label="Valid Days" value={String(calculation.validWorkdays)} />
            <StatCard icon={CircleOff} label="Weekends" value={String(calculation.weekends.length)} />
            <StatCard icon={Landmark} label="Holidays" value={String(calculation.holidays.length)} />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <Card className="border-white/70 bg-white/80 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Date Selection
              </CardTitle>
              <CardDescription>
                Enter the internship start and end dates to calculate eligible working days.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label htmlFor="start-date" className="text-sm font-medium">
                    Start Date
                  </label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="end-date" className="text-sm font-medium">
                    End Date
                  </label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-900">Calculation Logic</p>
                <div className="mt-3 space-y-3 text-sm text-slate-600">
                  <p>1. The system reads the selected start and end dates.</p>
                  <p>2. It iterates through every date in the range.</p>
                  <p>3. Saturdays and Sundays are excluded.</p>
                  <p>4. Dates found in the holidays table are excluded.</p>
                  <p>5. The remaining dates are counted as valid internship days.</p>
                </div>
              </div>

              <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={() => {
                  setStartDate("2026-07-01");
                  setEndDate("2026-07-31");
                }}
              >
                Reset Example Dates
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/70 bg-slate-950 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
              <CardHeader>
                <CardTitle className="text-white">Calculation Result</CardTitle>
                <CardDescription className="text-slate-300">
                  Final count after excluding weekends and official holidays.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {calculation.error ? (
                  <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 text-rose-100">
                    {calculation.error}
                  </div>
                ) : (
                  <>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                        Total Valid Internship Days
                      </p>
                      <p className="mt-3 text-5xl font-bold text-white">
                        {calculation.validWorkdays}
                      </p>
                      <p className="mt-3 text-sm text-slate-300">
                        From {formatDate(startDate)} to {formatDate(endDate)}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <ResultPill
                        label="In Range"
                        value={calculation.totalRangeDays}
                        tone="slate"
                      />
                      <ResultPill
                        label="Excluded Weekends"
                        value={calculation.weekends.length}
                        tone="amber"
                      />
                      <ResultPill
                        label="Excluded Holidays"
                        value={calculation.holidays.length}
                        tone="cyan"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
              <CardHeader>
                <CardTitle>Excluded Dates</CardTitle>
                <CardDescription>
                  Weekend days and holidays removed from the internship count.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ListSection
                  title="Weekend Dates"
                  items={calculation.weekends}
                  emptyMessage="No weekend dates were excluded in this range."
                  tone="amber"
                />
                <Separator />
                <ListSection
                  title="Public Holidays"
                  items={calculation.holidays}
                  emptyMessage="No public holidays were found in this range."
                  tone="cyan"
                />
              </CardContent>
            </Card>

            <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
              <CardHeader>
                <CardTitle>Holidays Table</CardTitle>
                <CardDescription>
                  Official holidays currently referenced by the calculation demo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {holidaysTable.map((holiday, index) => (
                  <div key={holiday.date}>
                    <div className="flex items-center justify-between gap-4 rounded-2xl p-1">
                      <div>
                        <p className="font-medium">{holiday.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(holiday.date)}
                        </p>
                      </div>
                      <Badge variant="outline" className="rounded-full px-3 py-1">
                        {holiday.date}
                      </Badge>
                    </div>
                    {index < holidaysTable.length - 1 ? <Separator className="mt-3" /> : null}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListSection({
  title,
  items,
  emptyMessage,
  tone,
}: {
  title: string;
  items: DayEntry[];
  emptyMessage: string;
  tone: "amber" | "cyan";
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{title}</p>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <div
              key={item.date}
              className={cn(
                "rounded-2xl border px-4 py-3",
                tone === "amber"
                  ? "border-amber-200 bg-amber-50"
                  : "border-cyan-200 bg-cyan-50",
              )}
            >
              <p className="font-medium">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "slate" | "amber" | "cyan";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3",
        tone === "slate" && "border-white/10 bg-white/5",
        tone === "amber" && "border-amber-300/20 bg-amber-400/10",
        tone === "cyan" && "border-cyan-300/20 bg-cyan-400/10",
      )}
    >
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <div className="mb-2 flex items-center gap-2 text-slate-600">
        <Icon className="h-4 w-4" />
        <span className="text-xs uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
