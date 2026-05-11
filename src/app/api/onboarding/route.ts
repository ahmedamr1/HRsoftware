import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const instances = await prisma.workflowInstance.findMany({
            where: { workflow: { type: "ONBOARDING" } },
            include: {
                employee: true,
                workflow: true,
                tasks: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(instances);
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to fetch onboarding instances." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { employeeId, workflowId } = await req.json();

        // Get the workflow and its tasks
        const workflow = await prisma.workflow.findUnique({
            where: { id: workflowId },
            include: { tasks: true },
        });

        if (!workflow) {
            return NextResponse.json({ error: "Workflow not found." }, { status: 404 });
        }

        // Create the instance
        const instance = await prisma.workflowInstance.create({
            data: {
                employeeId,
                workflowId,
                status: "In Progress",
                tasks: {
                    create: workflow.tasks.map(task => ({
                        title: task.title,
                        description: task.description,
                        role: task.role,
                        isCompleted: false,
                    })),
                },
            },
            include: { tasks: true },
        });

        // Update employee status
        await prisma.employee.update({
            where: { id: employeeId },
            data: { status: "Onboarding" },
        });

        return NextResponse.json(instance);
    } catch (error: any) {
        console.error("Onboarding initiation error:", error);
        return NextResponse.json({ error: "Failed to initiate onboarding." }, { status: 500 });
    }
}
