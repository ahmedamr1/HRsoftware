"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { employees as initialEmployees, Employee } from "@/app/employees/data";

interface EmployeeContextType {
    employees: Employee[];
    updateEmployee: (id: string, updates: Partial<Employee>) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

    // Persistence layer for demo
    useEffect(() => {
        const saved = localStorage.getItem("super-hr-employees");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with initial data to ensure new fields/employees are included if structure changes
                // but prioritize saved values for existing employees
                const merged = initialEmployees.map(initialEmp => {
                    const savedEmp = parsed.find((p: any) => p.id === initialEmp.id);
                    return savedEmp ? { ...initialEmp, ...savedEmp } : initialEmp;
                });
                setEmployees(merged);
            } catch (e) {
                console.error("Failed to load employees from local storage", e);
            }
        }
    }, []);

    const updateEmployee = (id: string, updates: Partial<Employee>) => {
        setEmployees(prev => {
            const updated = prev.map(emp => emp.id === id ? { ...emp, ...updates } : emp);
            localStorage.setItem("super-hr-employees", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <EmployeeContext.Provider value={{ employees, updateEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployees() {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error("useEmployees must be used within an EmployeeProvider");
    }
    return context;
}
