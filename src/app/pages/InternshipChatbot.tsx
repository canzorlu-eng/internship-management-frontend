// /student/chatbot

import { useMemo, useState } from "react";
import {
  ArrowUp,
  BadgeCheck,
  Bot,
  CalendarClock,
  CheckCircle2,
  FileSearch,
  Files,
  MessageSquareQuote,
  Search,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
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
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { cn } from "../components/ui/utils";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: number;
  role: ChatRole;
  content: string;
};

type FeedbackState = "up" | "down" | null;

const starterPrompts = [
  "What is the minimum work day count?",
  "Which documents are required before submission?",
  "Can I submit my report after the deadline?",
];

const ruleSources = [
  "Internship Directive Article 5 - Minimum work day requirement",
  "Faculty Calendar Spring 2026 - Submission deadlines",
  "Department Submission Checklist - Report and approval forms",
];

const sampleAnswers: Record<string, string> = {
  "what is the minimum work day count?":
    "According to the official internship directive, students are expected to complete the minimum internship duration defined by the department before the report can be accepted. In this mock screen, the chatbot cites the relevant rule and presents the answer in plain language so the student can act immediately.",
  "which documents are required before submission?":
    "Before submitting, students generally need the internship report, signed evaluation or approval forms, and any department-specific annexes listed in the submission checklist. The final product can surface these as official source-backed requirements.",
  "can i submit my report after the deadline?":
    "Late submissions are usually evaluated according to the academic calendar and department exceptions. The chatbot should guide the user toward the official deadline rule and clearly state whether late submission needs an additional petition.",
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello, I am the internship assistant. Ask me about internship rules, deadlines, work day requirements, or required documents.",
  },
  {
    id: 2,
    role: "user",
    content: "What is the minimum work day count?",
  },
  {
    id: 3,
    role: "assistant",
    content:
      "The system checks the official internship regulation first, then generates a grounded answer. For this frontend prototype, the answer area shows how a verified response would appear with supporting sources and a helpfulness prompt.",
  },
];

const ragSteps = [
  {
    title: "Retrieve official rule",
    description: "Searches directive articles and department documents.",
    icon: Search,
  },
  {
    title: "Rank relevant passages",
    description: "Selects the most relevant clauses for the question.",
    icon: FileSearch,
  },
  {
    title: "Generate grounded answer",
    description: "Builds a response using only the retrieved content.",
    icon: Sparkles,
  },
];

export function InternshipChatbot() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const lastAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant"),
    [messages],
  );

  const submitPrompt = (prompt: string) => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    const normalizedPrompt = trimmedPrompt.toLowerCase();
    const answer =
      sampleAnswers[normalizedPrompt] ??
      "The AI assistant would use retrieval-augmented generation to search official internship rules, identify the most relevant passages, and present a concise answer grounded in those sources. This screen is frontend-only for now, so the response is simulated.";

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "user",
        content: trimmedPrompt,
      },
      {
        id: Date.now() + 1,
        role: "assistant",
        content: answer,
      },
    ]);
    setDraft("");
    setFeedback(null);
  };

  return (
    <div className="min-h-screen min-h-dvh bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(140deg,#f8fafc_0%,#eef7ff_45%,#fff8ef_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <Badge className="rounded-full bg-slate-950 px-3 py-1 text-xs text-white">
              AI Assistant Preview
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">
              Internship Q&amp;A Chatbot
            </h1>
            <p className="max-w-3xl text-muted-foreground">
              Students can ask instant questions about internship regulations,
              deadlines, and documentation rules. This is a frontend prototype
              with simulated RAG responses and feedback interactions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricCard icon={MessageSquareQuote} label="Replies" value="Real-time" />
            <MetricCard icon={Files} label="Sources" value="Official docs" />
            <MetricCard icon={CalendarClock} label="Deadlines" value="Tracked" />
            <MetricCard icon={BadgeCheck} label="Answer style" value="Grounded" />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card className="overflow-hidden border-white/70 bg-white/80 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader className="border-b border-slate-200/80">
              <CardTitle>Chat Interface</CardTitle>
              <CardDescription>
                Open the assistant, type your question, and receive a source-based
                answer from internship rules.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 pt-6">
              <div className="flex flex-wrap gap-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => submitPrompt(prompt)}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm transition hover:border-slate-900 hover:bg-slate-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(241,245,249,0.9)_100%)] p-3">
                <ScrollArea className="h-[460px] pr-3">
                  <div className="space-y-4 p-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.role === "user" ? "justify-end" : "justify-start",
                        )}
                      >
                        {message.role === "assistant" ? (
                          <Avatar className="mt-1 border border-cyan-200 bg-cyan-100">
                            <AvatarFallback className="bg-cyan-100 text-cyan-900">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        ) : null}

                        <div
                          className={cn(
                            "max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-7 shadow-sm",
                            message.role === "assistant"
                              ? "rounded-tl-md bg-white text-slate-800"
                              : "rounded-tr-md bg-slate-950 text-white",
                          )}
                        >
                          {message.content}
                        </div>

                        {message.role === "user" ? (
                          <Avatar className="mt-1 border border-slate-800 bg-slate-950">
                            <AvatarFallback className="bg-slate-950 text-white">
                              ST
                            </AvatarFallback>
                          </Avatar>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-4">
                  <Textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Ask a question about internship rules, deadlines, or required documents..."
                    className="min-h-28 rounded-2xl border-0 bg-slate-50 text-sm shadow-none focus-visible:ring-2"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      Example: "Can I submit my internship report after the deadline?"
                    </p>
                    <Button
                      size="lg"
                      className="gap-2 rounded-full px-6"
                      onClick={() => submitPrompt(draft)}
                    >
                      Send Question
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Card className="border-slate-200 bg-slate-950 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Answer Feedback</CardTitle>
                  <CardDescription className="text-slate-300">
                    After each response, the user can mark whether the answer was helpful.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    {lastAssistantMessage?.content}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      type="button"
                      variant={feedback === "up" ? "default" : "outline"}
                      className={cn(
                        "gap-2 sm:flex-1",
                        feedback !== "up" && "border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white",
                      )}
                      onClick={() => setFeedback("up")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Helpful
                    </Button>
                    <Button
                      type="button"
                      variant={feedback === "down" ? "destructive" : "outline"}
                      className={cn(
                        "gap-2 sm:flex-1",
                        feedback !== "down" && "border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white",
                      )}
                      onClick={() => setFeedback("down")}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Not Helpful
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/70 bg-white/80 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
              <CardHeader>
                <CardTitle>RAG Flow Preview</CardTitle>
                <CardDescription>
                  The backend will later retrieve official rules before generating answers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ragSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title}>
                      <div className="flex gap-3">
                        <div className="rounded-2xl bg-slate-950 p-3 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{step.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      {index < ragSteps.length - 1 ? <Separator className="mt-4" /> : null}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-white/70 bg-[linear-gradient(180deg,#082f49_0%,#0f172a_100%)] text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.75)]">
              <CardHeader>
                <CardTitle className="text-white">Official Sources</CardTitle>
                <CardDescription className="text-slate-300">
                  Example source references that can support a generated answer.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {ruleSources.map((source) => (
                  <div
                    key={source}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-cyan-400/15 p-2 text-cyan-200">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{source}</p>
                        <p className="mt-1 text-sm text-slate-300">
                          Retrieved from policy and calendar records during answer generation.
                        </p>
                      </div>
                    </div>
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

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MessageSquareQuote;
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
