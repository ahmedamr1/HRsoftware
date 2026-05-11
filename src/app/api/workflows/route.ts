import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const workflows = await prisma.workflow.findMany({
            include: { tasks: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(workflows);
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch workflows." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, type, tasks } = body;

        const workflow = await prisma.workflow.create({
            data: {
                name,
                description,
                type,
                organizationId: "org_default", // Placeholder for now
                tasks: {
                    create: tasks.map((task: any, index: number) => ({
                        title: task.title,
                        description: task.description,
                        role: task.role || "Employee",
                        order: index,
                    })),
                },
            },
            include: { tasks: true },
        });

        return NextResponse.json(workflow);
    } catch (error: any) {
        console.error("Workflow creation error:", error);
        return NextResponse.json({ error: "Failed to create workflow." }, { status: 500 });
    }
}
