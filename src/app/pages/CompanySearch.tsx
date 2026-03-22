// /student/company-search

import { useMemo, useState } from "react";
import {
  Building2,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
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

type CompanyRecord = {
  id: number;
  name: string;
  location: string;
  sector: string;
  mode: "On-site" | "Hybrid" | "Remote";
  satisfaction: number;
  interns: number;
};

const companyRecords: CompanyRecord[] = [
  {
    id: 1,
    name: "Aselsan",
    location: "Ankara",
    sector: "Defense Technologies",
    mode: "On-site",
    satisfaction: 4.8,
    interns: 26,
  },
  {
    id: 2,
    name: "Tubitak Bilgem",
    location: "Kocaeli",
    sector: "Research & Development",
    mode: "On-site",
    satisfaction: 4.6,
    interns: 14,
  },
  {
    id: 3,
    name: "Trendyol",
    location: "Istanbul",
    sector: "E-commerce",
    mode: "Hybrid",
    satisfaction: 4.5,
    interns: 31,
  },
  {
    id: 4,
    name: "Havelsan",
    location: "Ankara",
    sector: "Defense Software",
    mode: "Hybrid",
    satisfaction: 4.7,
    interns: 22,
  },
  {
    id: 5,
    name: "Arcelik",
    location: "Istanbul",
    sector: "Consumer Electronics",
    mode: "On-site",
    satisfaction: 4.2,
    interns: 18,
  },
  {
    id: 6,
    name: "Peak Games",
    location: "Istanbul",
    sector: "Gaming",
    mode: "Hybrid",
    satisfaction: 4.9,
    interns: 9,
  },
  {
    id: 7,
    name: "SoftTech",
    location: "Ankara",
    sector: "Banking Software",
    mode: "Remote",
    satisfaction: 4.1,
    interns: 12,
  },
  {
    id: 8,
    name: "Getir",
    location: "Istanbul",
    sector: "Logistics Tech",
    mode: "Hybrid",
    satisfaction: 4.0,
    interns: 15,
  },
];

const locations = ["All Locations", "Ankara", "Istanbul", "Kocaeli"];
const sectors = [
  "All Sectors",
  "Defense Technologies",
  "Research & Development",
  "E-commerce",
  "Defense Software",
  "Consumer Electronics",
  "Gaming",
  "Banking Software",
  "Logistics Tech",
];
const workModes = ["All Modes", "On-site", "Hybrid", "Remote"] as const;

export function CompanySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedMode, setSelectedMode] =
    useState<(typeof workModes)[number]>("All Modes");

  const filteredCompanies = useMemo(() => {
    return companyRecords.filter((company) => {
      const normalizedSearch = searchTerm.toLowerCase().trim();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        company.name.toLowerCase().includes(normalizedSearch) ||
        company.location.toLowerCase().includes(normalizedSearch) ||
        company.sector.toLowerCase().includes(normalizedSearch);

      const matchesLocation =
        selectedLocation === "All Locations" ||
        company.location === selectedLocation;

      const matchesSector =
        selectedSector === "All Sectors" || company.sector === selectedSector;

      const matchesMode =
        selectedMode === "All Modes" || company.mode === selectedMode;

      return matchesSearch && matchesLocation && matchesSector && matchesMode;
    });
  }, [searchTerm, selectedLocation, selectedSector, selectedMode]);

  const averageSatisfaction = useMemo(() => {
    if (filteredCompanies.length === 0) {
      return "0.0";
    }

    const total = filteredCompanies.reduce(
      (sum, company) => sum + company.satisfaction,
      0,
    );

    return (total / filteredCompanies.length).toFixed(1);
  }, [filteredCompanies]);

  return (
    <div className="min-h-screen min-h-dvh bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_44%,#ecfeff_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
              Internship Discovery
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">
              Previous Internship Companies
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Search and filter historical internship placements to discover
              companies where other students have interned before.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <InfoPill label="Results" value={String(filteredCompanies.length)} />
            <InfoPill label="Avg Score" value={averageSatisfaction} />
            <InfoPill label="Locations" value={String(locations.length - 1)} />
            <InfoPill label="Sectors" value={String(sectors.length - 1)} />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <Card className="border-white/70 bg-white/80 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Search & Filters
              </CardTitle>
              <CardDescription>
                Enter keywords and apply filters to narrow matching internship companies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="company-search" className="text-sm font-medium">
                  Search Keywords
                </label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="company-search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by company, city, or sector"
                    className="pl-10"
                  />
                </div>
              </div>

              <FilterSelect
                label="Location"
                value={selectedLocation}
                options={locations}
                onChange={setSelectedLocation}
              />

              <FilterSelect
                label="Sector"
                value={selectedSector}
                options={sectors}
                onChange={setSelectedSector}
              />

              <FilterSelect
                label="Work Mode"
                value={selectedMode}
                options={[...workModes]}
                onChange={(value) =>
                  setSelectedMode(value as (typeof workModes)[number])
                }
              />

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-900">Use Case Flow</p>
                <div className="mt-3 space-y-3 text-sm text-slate-600">
                  <p>1. Student enters search keywords.</p>
                  <p>2. Student applies location, sector, and mode filters.</p>
                  <p>3. The system queries historical internship records.</p>
                  <p>4. Matching companies and satisfaction scores are displayed.</p>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLocation("All Locations");
                  setSelectedSector("All Sectors");
                  setSelectedMode("All Modes");
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Matching Companies
              </CardTitle>
              <CardDescription>
                Historical internship companies filtered by the selected criteria.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredCompanies.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <Building2 className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="mt-4 text-lg font-medium">No companies found</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try changing your search keywords or clearing one of the filters.
                  </p>
                </div>
              ) : (
                filteredCompanies.map((company, index) => (
                  <div key={company.id}>
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                              Historical placement
                            </p>
                            <h2 className="mt-1 text-2xl font-semibold">
                              {company.name}
                            </h2>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="rounded-full px-3 py-1">
                              {company.sector}
                            </Badge>
                            <Badge variant="outline" className="rounded-full px-3 py-1">
                              {company.mode}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{company.location}</span>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[230px]">
                          <ScoreBox
                            icon={Star}
                            label="Avg Satisfaction"
                            value={`${company.satisfaction.toFixed(1)} / 5`}
                          />
                          <ScoreBox
                            icon={Building2}
                            label="Past Interns"
                            value={String(company.interns)}
                          />
                        </div>
                      </div>
                    </div>
                    {index < filteredCompanies.length - 1 ? (
                      <Separator className="my-2" />
                    ) : null}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
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

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function ScoreBox({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Star;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="mb-2 flex items-center gap-2 text-slate-600">
        <Icon className="h-4 w-4" />
        <span className="text-xs uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
