import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Separator } from "./ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useLocation, Link } from "react-router";
import { Suspense } from "react";
import { Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { PageLoadingFallback } from "./PageLoadingFallback";
import { useAuth } from "../contexts/AuthContext";

/** Maps route paths to human-readable page titles */
const pageTitles: Record<string, string> = {
    "/student": "Student Dashboard",
    "/student/submissions": "My Submissions",
    "/student/chatbot": "AI Chatbot",
    "/student/working-days": "Working Days Calculator",
    "/student/company-search": "Company Search",
    "/coordinator": "Coordinator Dashboard",
    "/coordinator/analytics": "Coordinator Analytics",
    "/admin": "Admin Dashboard",
    "/admin/system-monitoring": "System Monitoring",
    "/help": "Help Center",
    "/profile": "Profile Settings",
    "/notifications": "Notification Center",
};

export function DashboardLayout() {
    const location = useLocation();
    const { user } = useAuth();
    const pageTitle = pageTitles[location.pathname] ?? "Dashboard";

    // Shared routes should link back to the user's role dashboard, not /profile or /notifications
    const firstPathSegment = location.pathname.split("/")[1];
    const dashboardRoute = ["profile", "notifications"].includes(firstPathSegment)
        ? `/${user?.role || "student"}`
        : `/${firstPathSegment}`;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* ── Top Header Bar ── */}
                <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4!" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <Link to={dashboardRoute}>
                                        Dashboard
                                    </Link>
                                </BreadcrumbItem>
                                {location.pathname.split("/").length > 2 && (
                                    <>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                            <Link to="/profile">
                                <User className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">Profile</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="relative">
                            <Link to="/notifications">
                                <Bell className="h-[1.2rem] w-[1.2rem]" />
                                <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-primary" />
                                <span className="sr-only">Notifications</span>
                            </Link>
                        </Button>
                        <ModeToggle />
                    </div>
                </header>

                {/* ── Page Content ── */}
                <div className="flex-1 overflow-auto p-6">
                    <Suspense fallback={<PageLoadingFallback />}>
                        <Outlet />
                    </Suspense>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
