import { Navigate, Outlet } from "react-router";
import { useAuth, getDashboardPath } from "../contexts/AuthContext";
import type { UserRole } from "../contexts/AuthContext";

interface ProtectedRouteProps {
    /** Roles allowed to access this route group. If omitted, any authenticated user can access. */
    allowedRoles?: UserRole[];
}

/**
 * Wraps route children with auth + role checks.
 * - Not logged in → redirect to login (`/`)
 * - Wrong role → redirect to the user's own dashboard
 */
export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={getDashboardPath(user.role)} replace />;
    }

    return <Outlet />;
}
