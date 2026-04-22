import prisma from "../lib/prisma";

export async function getTimeOffRequests(employeeId: string) {
    return await prisma.timeOffRequest.findMany({
        where: { employeeId },
        orderBy: { startDate: "desc" },
    });
}

export async function createTimeOffRequest(data: {
    employeeId: string;
    type: string;
    startDate: Date;
    endDate: Date;
    days: number;
    reason?: string;
}) {
    return await prisma.timeOffRequest.create({
        data: {
            ...data,
            status: "Pending",
        },
    });
}

export async function getAllTimeOffRequestsByOrg(organizationId: string) {
    return await prisma.timeOffRequest.findMany({
        where: {
            employee: {
                organizationId: organizationId
            }
        },
        include: {
            employee: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export async function updateRequestStatus(id: string, status: "Approved" | "Rejected") {
    return await prisma.timeOffRequest.update({
        where: { id },
        data: { status },
    });
}
