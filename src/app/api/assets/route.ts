import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const assets = await prisma.asset.findMany({
            include: { employee: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(assets);
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch assets." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, serialNumber, category, employeeId, status } = body;

        const asset = await prisma.asset.create({
            data: {
                name,
                serialNumber,
                category,
                employeeId: employeeId || null,
                status: status || "In Inventory",
                organizationId: "org_default",
                assignedAt: employeeId ? new Date() : null,
            },
            include: { employee: true },
        });

        return NextResponse.json(asset);
    } catch (error: any) {
        console.error("Asset creation error:", error);
        return NextResponse.json({ error: "Failed to create asset." }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, employeeId, status, returnedAt } = body;

        const asset = await prisma.asset.update({
            where: { id },
            data: {
                employeeId: employeeId === null ? null : employeeId,
                status,
                assignedAt: employeeId ? new Date() : undefined,
                returnedAt: returnedAt ? new Date() : null,
            },
            include: { employee: true },
        });

        return NextResponse.json(asset);
    } catch (error: any) {
        console.error("Asset update error:", error);
        return NextResponse.json({ error: "Failed to update asset." }, { status: 500 });
    }
}
