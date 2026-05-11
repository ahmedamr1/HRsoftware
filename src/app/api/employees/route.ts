import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const employees = await prisma.employee.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(employees);
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch employees." }, { status: 500 });
    }
}
