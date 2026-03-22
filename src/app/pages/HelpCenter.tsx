// /help

import { useMemo, useState } from "react";
import {
  BookOpen,
  CircleHelp,
  FileText,
  LifeBuoy,
  Mail,
  MessageCircleQuestion,
  Phone,
  ShieldCheck,
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
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { cn } from "../components/ui/utils";

type HelpTopic = {
  id: string;
  category: string;
  title: string;
  format: "PDF" | "Text";
  description: string;
  content: string[];
};

const helpTopics: HelpTopic[] = [
  {
    id: "report-upload-guide",
    category: "Submission",
    title: "Report Upload Guide",
    format: "PDF",
    description:
      "Step-by-step instructions for preparing, validating, and uploading the internship report.",
    content: [
      "Prepare your report in the required format and verify that the department template is used.",
      "Check file size and naming rules before opening the My Submissions page.",
      "Upload the report, confirm the submission, and monitor approval status from the tracking panel.",
    ],
  },
  {
    id: "approval-tracking",
    category: "Tracking",
    title: "Understanding Approval Statuses",
    format: "Text",
    description:
      "Explains what Pending, Approved, and Rejected mean in the internship workflow.",
    content: [
      "Pending means the report has been received but has not yet been evaluated.",
      "Approved indicates the report satisfied the review requirements and moved to the next step.",
      "Rejected means revision is required; the student should review comments and resubmit if requested.",
    ],
  },
  {
    id: "chatbot-faq",
    category: "Assistant",
    title: "AI Chatbot FAQ",
    format: "Text",
    description:
      "Shows how to ask effective questions about deadlines, rules, and documentation.",
    content: [
      "Ask direct questions such as minimum work day requirements or report submission deadlines.",
      "The assistant is designed to answer using official rules and departmental guidance.",
      "If the answer is insufficient, users can leave feedback and contact support for manual help.",
    ],
  },
  {
    id: "account-access",
    category: "Access",
    title: "Login and Account Access Help",
    format: "PDF",
    description:
      "Covers sign in issues, account eligibility, and password recovery guidance.",
    content: [
      "Use your official department email address to access the platform.",
      "If sign in fails, verify your credentials and department email format first.",
      "For repeated access issues, contact technical support with your student number and error details.",
    ],
  },
];

export function HelpCenter() {
  const [selectedTopicId, setSelectedTopicId] = useState(helpTopics[0].id);

  const selectedTopic = useMemo(
    () => helpTopics.find((topic) => topic.id === selectedTopicId) ?? helpTopics[0],
    [selectedTopicId],
  );

  return (
    <div className="min-h-screen min-h-dvh bg-[linear-gradient(135deg,#f8fafc_0%,#eff6ff_48%,#fefce8_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
              Help & Support
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
            <p className="max-w-3xl text-muted-foreground">
              Browse tutorials, documentation, and support details for report
              upload, chatbot usage, and general platform access.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <QuickStat icon={BookOpen} label="Guides" value="4 topics" />
            <QuickStat icon={FileText} label="Formats" value="PDF + Text" />
            <QuickStat icon={LifeBuoy} label="Support" value="Available" />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <Card className="border-white/70 bg-white/80 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircleHelp className="h-5 w-5" />
                Help Topics
              </CardTitle>
              <CardDescription>
                Click a category to open the tutorial or documentation content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {helpTopics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={cn(
                    "w-full rounded-2xl border p-4 text-left transition",
                    selectedTopic.id === topic.id
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg"
                      : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] opacity-70">
                        {topic.category}
                      </p>
                      <p className="mt-1 font-medium">{topic.title}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-1",
                        selectedTopic.id === topic.id
                          ? "border-white/20 bg-white/10 text-white"
                          : "border-slate-200 bg-slate-100 text-slate-700",
                      )}
                    >
                      {topic.format}
                    </Badge>
                  </div>
                  <p
                    className={cn(
                      "mt-3 text-sm",
                      selectedTopic.id === topic.id
                        ? "text-slate-300"
                        : "text-muted-foreground",
                    )}
                  >
                    {topic.description}
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/70 bg-white/85 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
              <CardHeader className="border-b border-slate-200/80">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>{selectedTopic.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedTopic.description}
                    </CardDescription>
                  </div>
                  <Badge className="rounded-full bg-slate-950 px-3 py-1 text-white">
                    {selectedTopic.format} Preview
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4">
                  <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-950 p-2 text-white">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedTopic.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedTopic.format === "PDF"
                            ? "Embedded PDF-style tutorial preview"
                            : "Text knowledge article view"}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Open Full Guide
                    </Button>
                  </div>

                  <ScrollArea className="h-[420px] pr-3">
                    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Tutorial Content
                        </p>
                        <h2 className="text-2xl font-semibold">
                          {selectedTopic.title}
                        </h2>
                      </div>

                      <Separator />

                      {selectedTopic.content.map((paragraph, index) => (
                        <div key={`${selectedTopic.id}-${index}`} className="space-y-2">
                          <p className="text-sm font-medium text-slate-500">
                            Step {index + 1}
                          </p>
                          <p className="leading-7 text-slate-700">{paragraph}</p>
                        </div>
                      ))}

                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-amber-100 p-2 text-amber-700">
                            <MessageCircleQuestion className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-amber-900">
                              Still need help?
                            </p>
                            <p className="mt-1 text-sm text-amber-800">
                              If this guide does not solve the issue, use the
                              contact details below for technical assistance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/70 bg-[linear-gradient(180deg,#0f172a_0%,#1e293b_100%)] text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ShieldCheck className="h-5 w-5" />
                  Technical Support
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Contact the support team if the issue is system-related or blocks submission.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <SupportCard
                  icon={Mail}
                  label="Email"
                  value="internship-support@cs.hacettepe.edu.tr"
                />
                <SupportCard
                  icon={Phone}
                  label="Phone"
                  value="+90 (312) 297 70 00"
                />
                <SupportCard
                  icon={LifeBuoy}
                  label="Office Hours"
                  value="Weekdays 09:00 - 17:00"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
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

function SupportCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 inline-flex rounded-xl bg-white/10 p-3 text-cyan-200">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-1 font-medium text-white">{value}</p>
    </div>
  );
}
