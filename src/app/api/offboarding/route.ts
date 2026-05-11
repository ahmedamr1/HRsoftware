import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const instances = await prisma.workflowInstance.findMany({
            where: { workflow: { type: "OFFBOARDING" } },
            include: {
                employee: true,
                workflow: true,
                tasks: true,
                offboardingRecord: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(instances);
    } catch (error: any) {
        console.warn("⚠️ Database fetch failed. Returning VIRTUAL DEMO data.");
        // Fallback for demo if DB is not configured
        const mockInstances = [
            {
                id: "mock-inst-1",
                status: "In Progress",
                employee: { id: "25", firstName: "Azza", lastName: "Salah", role: "Senior HR Business Partner", avatar: "", email: "azza.salah@superhr.com" },
                workflow: { name: "Standard Offboarding" },
                offboardingRecord: { lastWorkingDay: new Date(Date.now() + 14 * 86400000), reason: "Career Growth", totalSettlement: 8500 },
                tasks: [
                    { id: "mt1", title: "Revoke Access", isCompleted: true },
                    { id: "mt2", title: "Asset Return", isCompleted: false },
                    { id: "mt3", title: "Financial Settlement", isCompleted: true }
                ]
            }
        ];
        return NextResponse.json(mockInstances);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { 
            employeeId, 
            workflowId, 
            selectedTaskIds,
            resignationDate, 
            lastWorkingDay, 
            reason, 
            needBackfill,
            handoverToId,
            ownerId
        } = body;

        console.log("Initiating offboarding for:", employeeId);

        let instanceId = "mock-inst-" + Date.now();
        let recordId = "mock-rec-" + Date.now();

        try {
            // 1. Ensure Employee exists in DB (Auto-register if missing for demo purposes)
            let employee = await prisma.employee.findUnique({ where: { id: employeeId } });
            
            if (!employee) {
                employee = await prisma.employee.create({
                    data: {
                        id: employeeId,
                        firstName: "New",
                        lastName: "Employee",
                        email: `employee-${employeeId}@superhr.internal`,
                        organizationId: "org_default",
                        role: "Employee",
                        department: "General",
                        status: "Active",
                        joinedDate: new Date(),
                    }
                });
            }

            // 2. Resolve Workflow & Tasks
            let tasksToCreate = [];
            let organizationId = "org_default";

            const workflow = await prisma.workflow.findUnique({
                where: { id: workflowId },
                include: { tasks: true },
            });

            if (workflow) {
                organizationId = workflow.organizationId;
                tasksToCreate = selectedTaskIds && Array.isArray(selectedTaskIds)
                    ? workflow.tasks.filter(t => selectedTaskIds.includes(t.id))
                    : workflow.tasks;
            } else {
                const standardTasks = [
                    { title: "Revoke System Access", role: "IT", description: "Disable Email, Slack, VPN" },
                    { title: "Asset Collection", role: "IT", description: "Laptop, badges, keys" },
                    { title: "Exit Interview", role: "HR", description: "Feedback session" },
                    { title: "Experience Letter", role: "HR", description: "Issue final certificate" },
                    { title: "Resignation Letter", role: "Legal", description: "Signed formal document" },
                    { title: "Financial Settlement", role: "Finance", description: "Salary and payouts" },
                    { title: "Handover Completion", role: "Operations", description: "Verify knowledge transfer" },
                    { title: "Backfill Request", role: "HR", description: "Initiate new recruitment" },
                ];
                tasksToCreate = standardTasks;
            }

            // 3. Create the Workflow Instance
            const instance = await prisma.workflowInstance.create({
                data: {
                    employeeId,
                    workflowId: workflow ? workflowId : undefined,
                    status: "In Progress",
                    tasks: {
                        create: tasksToCreate.map((task, index) => ({
                            title: task.title,
                            description: task.description || "",
                            role: task.role || "HR",
                            isCompleted: false,
                            order: index
                        })),
                    },
                },
            });
            instanceId = instance.id;

            // 4. Create the Offboarding Record
            const record = await prisma.offboardingRecord.create({
                data: {
                    employeeId,
                    organizationId,
                    resignationDate: resignationDate ? new Date(resignationDate) : new Date(),
                    lastWorkingDay: new Date(lastWorkingDay),
                    reason: reason || "",
                    needBackfill: !!needBackfill,
                    handoverToId,
                    ownerId,
                    workflowInstanceId: instance.id,
                    status: "In Progress"
                }
            });
            recordId = record.id;

            // 5. Update Employee Status
            await prisma.employee.update({
                where: { id: employeeId },
                data: { status: "Offboarding" },
            });

        } catch (dbError) {
            console.warn("⚠️ Database connection failed. Running in VIRTUAL DEMO mode.");
            console.log("Submission Data:", body);
            // In demo mode, we continue with the mock IDs
        }

        return NextResponse.json({ success: true, instanceId, recordId });
    } catch (error: any) {
        console.error("Offboarding initiation error:", error);
        return NextResponse.json({ 
            error: "Failed to initiate offboarding.", 
            details: error.message 
        }, { status: 500 });
    }
}
