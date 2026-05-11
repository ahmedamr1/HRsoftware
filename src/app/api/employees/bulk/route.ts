import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!Array.isArray(data)) {
            return NextResponse.json({ error: "Invalid data format. Expected an array." }, { status: 400 });
        }

        // Map data to match Prisma schema
        const employeesToInsert = data.map((emp: any) => ({
            organizationId: emp.organizationId || "org_default", // provide a default since it's required
            firstName: emp.firstName || "Unknown",
            lastName: emp.lastName || "Employee",
            email: emp.email,
            role: emp.role || "Employee",
            department: emp.department || "General",
            status: emp.status || "Active",
            joinedDate: emp.joinedDate ? new Date(emp.joinedDate) : new Date(),
        })).filter((emp: any) => emp.email); // Ensure email exists since it's unique and required

        if (employeesToInsert.length === 0) {
            return NextResponse.json({ error: "No valid employee data found (email is required)." }, { status: 400 });
        }

        const result = await prisma.employee.createMany({
            data: employeesToInsert,
            skipDuplicates: true, // Skip if email already exists
        });

        return NextResponse.json({ success: true, count: result.count });
    } catch (error: any) {
        console.error("Bulk upload error:", error);
        return NextResponse.json({ error: "Failed to process bulk upload.", details: error.message }, { status: 500 });
    }
}
