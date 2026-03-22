import { Skeleton } from "./ui/skeleton";
import { PageHeader } from "./PageHeader";

export function PageLoadingFallback() {
    return (
        <div className="w-full space-y-8 animate-in fade-in duration-500">
            {/* Skeleton for PageHeader */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div className="space-y-4 w-full max-w-2xl">
                    <Skeleton className="h-6 w-32 rounded-full" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </div>

            {/* Skeletons for Top Metrics area */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                ))}
            </div>

            {/* Skeletons for Main Grid content */}
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <Skeleton className="h-96 w-full rounded-2xl" />
                <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
        </div>
    );
}
