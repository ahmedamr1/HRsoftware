import prisma from "../lib/prisma";
import type { Employee } from "@prisma/client";

export async function getEmployees(organizationId: string) {
    return await prisma.employee.findMany({
        where: { organizationId },
        orderBy: { createdAt: "desc" },
    });
}

export async function createEmployee(data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    department: string;
    organizationId: string;
}) {
    return await prisma.employee.create({
        data: {
            ...data,
            status: "Active",
        },
    });
}

export async function getEmployeeById(id: string) {
    return await prisma.employee.findUnique({
        where: { id },
        include: { timeOffRequests: true },
    });
}
