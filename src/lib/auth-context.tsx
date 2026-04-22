"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Role = "admin" | "employee" | null;

interface AuthContextType {
    userRole: Role;
    login: (role: Role) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userRole, setUserRole] = useState<Role>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const savedRole = localStorage.getItem("super_hr_role") as Role;
        if (savedRole) {
            setUserRole(savedRole);
        }
        setIsLoading(false);
    }, []);

    const login = (role: Role) => {
        setUserRole(role);
        if (role) {
            localStorage.setItem("super_hr_role", role);
        }
    };

    const logout = () => {
        setUserRole(null);
        localStorage.removeItem("super_hr_role");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ userRole, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
