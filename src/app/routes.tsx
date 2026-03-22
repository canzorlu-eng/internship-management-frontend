import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { MySubmissions } from "./pages/MySubmissions";
import { InternshipChatbot } from "./pages/InternshipChatbot";
import { HelpCenter } from "./pages/HelpCenter";
import { WorkingDaysCalculator } from "./pages/WorkingDaysCalculator";
import { CompanySearch } from "./pages/CompanySearch";
import { AdminSystemMonitoring } from "./pages/AdminSystemMonitoring";
import { CoordinatorAnalytics } from "./pages/CoordinatorAnalytics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/student/submissions",
    Component: MySubmissions,
  },
  {
    path: "/student/chatbot",
    Component: InternshipChatbot,
  },
  {
    path: "/help",
    Component: HelpCenter,
  },
  {
    path: "/student/working-days",
    Component: WorkingDaysCalculator,
  },
  {
    path: "/student/company-search",
    Component: CompanySearch,
  },
  {
    path: "/admin/system-monitoring",
    Component: AdminSystemMonitoring,
  },
  {
    path: "/coordinator/analytics",
    Component: CoordinatorAnalytics,
  },
]);
