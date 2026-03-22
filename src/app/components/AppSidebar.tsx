import { Link, useLocation, useNavigate } from "react-router";
import {
  GraduationCap,
  FileText,
  Bot,
  Calculator,
  Building2,
  LifeBuoy,
  BarChart3,
  MonitorCog,
  LogOut,
  ChevronUp,
  User2,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuth, getDashboardPath } from "../contexts/AuthContext";
import type { UserRole } from "../contexts/AuthContext";

interface NavItem {
  title: string;
  url: string;
  icon: typeof FileText;
}

const studentNav: NavItem[] = [
  { title: "Dashboard", url: "/student", icon: LayoutDashboard },
  { title: "My Submissions", url: "/student/submissions", icon: FileText },
  { title: "AI Chatbot", url: "/student/chatbot", icon: Bot },
  {
    title: "Working Days",
    url: "/student/working-days",
    icon: Calculator,
  },
  {
    title: "Company Search",
    url: "/student/company-search",
    icon: Building2,
  },
];

const coordinatorNav: NavItem[] = [
  { title: "Dashboard", url: "/coordinator", icon: LayoutDashboard },
  {
    title: "Analytics",
    url: "/coordinator/analytics",
    icon: BarChart3,
  },
];

const adminNav: NavItem[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  {
    title: "System Monitoring",
    url: "/admin/system-monitoring",
    icon: MonitorCog,
  },
];

const commonNav: NavItem[] = [
  { title: "Help Center", url: "/help", icon: LifeBuoy },
];

function getNavForRole(role: UserRole): { label: string; items: NavItem[] }[] {
  switch (role) {
    case "student":
      return [
        { label: "Internship", items: studentNav },
        { label: "Support", items: commonNav },
      ];
    case "coordinator":
      return [
        { label: "Management", items: coordinatorNav },
        { label: "Support", items: commonNav },
      ];
    case "admin":
      return [
        { label: "Administration", items: adminNav },
        { label: "Support", items: commonNav },
      ];
  }
}

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Shouldn't render if no user, but guard just in case
  if (!user) return null;

  const navGroups = getNavForRole(user.role);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon">
      {/* ── Header / Logo ── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={getDashboardPath(user.role)}>
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">IMS</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Internship Management
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* ── Navigation Groups ── */}
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ── Footer / User menu ── */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-muted-foreground w-full justify-start hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg text-xs">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer block">
                    <div className="flex items-center">
                      <User2 className="mr-2 size-4" />
                      Profile
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
