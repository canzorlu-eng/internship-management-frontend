import { ReactNode } from "react";
import { Badge } from "./ui/badge";

interface PageHeaderProps {
    badgeLabel?: string;
    title: string;
    description: string;
    action?: ReactNode;
}

export function PageHeader({
    badgeLabel,
    title,
    description,
    action,
}: PageHeaderProps) {
    return (
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="space-y-2">
                {badgeLabel && (
                    <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
                        {badgeLabel}
                    </Badge>
                )}
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="max-w-2xl text-muted-foreground">{description}</p>
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
