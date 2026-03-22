import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

/* ── Types ── */

export type UserRole = "student" | "coordinator" | "admin";

export interface AuthUser {
    name: string;
    email: string;
    role: UserRole;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => AuthUser | null;
    logout: () => void;
}

/* ── Mock user database (replaced by real API in Phase 6) ── */

const MOCK_USERS: { email: string; password: string; user: AuthUser }[] = [
    {
        email: "ayse@cs.hacettepe.edu.tr",
        password: "123456",
        user: {
            name: "Ayşe Demir",
            email: "ayse@cs.hacettepe.edu.tr",
            role: "student",
        },
    },
    {
        email: "coordinator@cs.hacettepe.edu.tr",
        password: "123456",
        user: {
            name: "Prof. Mehmet Kaya",
            email: "coordinator@cs.hacettepe.edu.tr",
            role: "coordinator",
        },
    },
    {
        email: "admin@cs.hacettepe.edu.tr",
        password: "123456",
        user: {
            name: "System Admin",
            email: "admin@cs.hacettepe.edu.tr",
            role: "admin",
        },
    },
];

/* ── Context ── */

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}

/* ── Provider ── */

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(() => {
        // Restore session from sessionStorage if available
        const stored = sessionStorage.getItem("ims_user");
        return stored ? (JSON.parse(stored) as AuthUser) : null;
    });

    const login = useCallback((email: string, _password: string): AuthUser | null => {
        // Match any mock user by email (password check is simulated)
        const match = MOCK_USERS.find(
            (u) => u.email.toLowerCase() === email.toLowerCase(),
        );

        if (match) {
            setUser(match.user);
            sessionStorage.setItem("ims_user", JSON.stringify(match.user));
            return match.user;
        }

        return null;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        sessionStorage.removeItem("ims_user");
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/* ── Helpers ── */

/** Returns the dashboard path for a given role */
export function getDashboardPath(role: UserRole): string {
    const paths: Record<UserRole, string> = {
        student: "/student",
        coordinator: "/coordinator",
        admin: "/admin",
    };
    return paths[role];
}
