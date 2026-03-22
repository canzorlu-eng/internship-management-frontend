import { cn } from "./ui/utils";
import { LucideIcon } from "lucide-react";

export interface MetricCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    highlight?: boolean;
    tone?: "neutral" | "success";
    className?: string;
}

export function MetricCard({
    icon: Icon,
    label,
    value,
    highlight = false,
    tone = "neutral",
    className,
}: MetricCardProps) {
    // Support both Coordinator (highlight amber vs white) and Admin (success emerald vs dark cyan) styles

    const isDarkCyan = tone === "neutral" && !highlight;
    const isDarkEmerald = tone === "success";

    return (
        <div
            className={cn(
                "rounded-2xl border px-4 py-4 shadow-sm backdrop-blur transition-all",
                highlight && "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20",
                isDarkEmerald && "border-emerald-400/20 bg-emerald-500/10",
                isDarkCyan && !highlight && "border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/5",
                className
            )}
        >
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "rounded-xl p-2.5",
                        highlight && "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
                        isDarkEmerald && "bg-emerald-400/15 text-emerald-300",
                        isDarkCyan && !highlight && "bg-slate-100 text-slate-600 dark:bg-cyan-400/15 dark:text-cyan-200"
                    )}
                >
                    <Icon className="h-4 w-4" />
                </div>
                <div>
                    <p className={cn(
                        "text-xs uppercase tracking-[0.18em]",
                        (isDarkEmerald || isDarkCyan) ? "text-slate-500 dark:text-slate-300" : "text-muted-foreground"
                    )}>
                        {label}
                    </p>
                    <p className={cn(
                        "text-xl font-semibold",
                        (isDarkEmerald || isDarkCyan) ? "text-slate-900 dark:text-white" : ""
                    )}>{value}</p>
                </div>
            </div>
        </div>
    );
}
