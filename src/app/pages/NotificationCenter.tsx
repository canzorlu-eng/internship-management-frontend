import { Bell } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

const mockNotifications = [
    {
        id: "1",
        title: "Submission Approved",
        message: "Your 'internship-report-v1.pdf' has been approved by the coordinator.",
        date: "Today, 10:42 AM",
        read: false,
    },
    {
        id: "2",
        title: "Company Evaluation Form Reminder",
        message: "Don't forget to submit your company evaluation form by next week.",
        date: "Yesterday, 3:15 PM",
        read: false,
    },
    {
        id: "3",
        title: "System Update",
        message: "The system will undergo scheduled maintenance tonight at 12:00 AM.",
        date: "2 days ago",
        read: true,
    },
];

export function NotificationCenter() {
    return (
        <div className="mx-auto max-w-4xl px-6 py-8 lg:px-10">
            <div className="flex items-center justify-between">
                <PageHeader
                    title="Notification Center"
                    description="Stay updated with your internship progress and system alerts."
                />
                <Button variant="outline" size="sm">
                    Mark all as read
                </Button>
            </div>

            <div className="mt-8 space-y-4">
                {mockNotifications.map((notif) => (
                    <Card key={notif.id} className={`transition-colors hover:bg-muted/50 ${!notif.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                        <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
                            <div className="flex items-center gap-2">
                                {!notif.read && <span className="flex h-2 w-2 rounded-full bg-primary" />}
                                <CardTitle className="text-base font-medium">
                                    {notif.title}
                                </CardTitle>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                                {notif.date}
                            </span>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{notif.message}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {mockNotifications.length === 0 && (
                <div className="mt-16 flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-muted p-6 mb-4">
                        <Bell className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-medium">No new notifications</p>
                    <p className="text-sm text-muted-foreground mt-1">
                        You're all caught up! Check back later.
                    </p>
                </div>
            )}
        </div>
    );
}
