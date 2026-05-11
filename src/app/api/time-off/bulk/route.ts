import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!Array.isArray(data)) {
            return NextResponse.json({ error: "Invalid data format. Expected an array." }, { status: 400 });
        }

        const validRequests = [];

        // We process them one by one to fetch the employeeId if only email is provided
        for (const req of data) {
            let employeeId = req.employeeId;

            // If no employeeId but we have an email, try to look up the employee
            if (!employeeId && req.email) {
                const employee = await prisma.employee.findUnique({
                    where: { email: req.email }
                });
                if (employee) {
                    employeeId = employee.id;
                }
            }

            if (employeeId && req.startDate && req.endDate && req.type && req.days) {
                validRequests.push({
                    employeeId: employeeId,
                    type: req.type,
                    startDate: new Date(req.startDate),
                    endDate: new Date(req.endDate),
                    days: Number(req.days),
                    status: req.status || "Approved", // Past leaves are usually approved
                    reason: req.reason || "Historical Leave Record",
                });
            }
        }

        if (validRequests.length === 0) {
            return NextResponse.json({ error: "No valid leave records found (missing employee reference or dates)." }, { status: 400 });
        }

        const result = await prisma.timeOffRequest.createMany({
            data: validRequests,
        });

        return NextResponse.json({ success: true, count: result.count });
    } catch (error: any) {
        console.error("Bulk time-off upload error:", error);
        return NextResponse.json({ error: "Failed to process bulk upload.", details: error.message }, { status: 500 });
    }
}
