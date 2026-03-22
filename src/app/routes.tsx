import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { DashboardLayout } from "./components/DashboardLayout";
import { StudentDashboard } from "./pages/StudentDashboard";
import { MySubmissions } from "./pages/MySubmissions";
import { InternshipChatbot } from "./pages/InternshipChatbot";
import { HelpCenter } from "./pages/HelpCenter";
import { WorkingDaysCalculator } from "./pages/WorkingDaysCalculator";
import { CompanySearch } from "./pages/CompanySearch";
import { CoordinatorDashboard } from "./pages/CoordinatorDashboard";
import { CoordinatorAnalytics } from "./pages/CoordinatorAnalytics";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminSystemMonitoring } from "./pages/AdminSystemMonitoring";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StudentProfile } from "./pages/StudentProfile";
import { NotificationCenter } from "./pages/NotificationCenter";
import { NotFound } from "./pages/NotFound";
import { CoordinatorStudentDetail } from "./pages/CoordinatorStudentDetail";

export const router = createBrowserRouter([
  // ── Auth pages (full-screen, no sidebar) ──
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },

  // ── Dashboard pages (with sidebar layout) ──
  {
    Component: DashboardLayout,
    children: [
      // Student routes
      {
        path: "/student",
        element: <ProtectedRoute allowedRoles={["student"]} />,
        children: [
          { index: true, Component: StudentDashboard },
          { path: "submissions", Component: MySubmissions },
          { path: "chatbot", Component: InternshipChatbot },
          { path: "working-days", Component: WorkingDaysCalculator },
          { path: "company-search", Component: CompanySearch },
        ],
      },

      // Coordinator routes
      {
        path: "/coordinator",
        element: <ProtectedRoute allowedRoles={["coordinator"]} />,
        children: [
          { index: true, Component: CoordinatorDashboard },
          { path: "analytics", Component: CoordinatorAnalytics },
          { path: "student/:id", Component: CoordinatorStudentDetail },
        ],
      },

      // Admin routes
      {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "system-monitoring", Component: AdminSystemMonitoring },
        ],
      },

      // Shared routes (any authenticated user)
      {
        path: "/help",
        element: <ProtectedRoute />,
        children: [
          { index: true, Component: HelpCenter },
        ],
      },
      {
        path: "/profile",
        element: <ProtectedRoute />,
        Component: StudentProfile,
      },
      {
        path: "/notifications",
        element: <ProtectedRoute />,
        Component: NotificationCenter,
      },
    ],
  },

  // ── 404 Catch-all ──
  {
    path: "*",
    Component: NotFound,
  },
]);

