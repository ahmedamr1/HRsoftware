import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        console.log("Seeding agreed offboarding tasks...");
        
        // 1. Ensure the default workflow exists with the full list of agreed tasks
        const workflow = await prisma.workflow.upsert({
            where: { name: "Standard Offboarding" },
            update: {},
            create: {
                name: "Standard Offboarding",
                type: "OFFBOARDING",
                description: "Complete checklist for employee departure as per HR policy.",
                organizationId: "org_default",
                tasks: {
                    create: [
                        { title: "Revoke System Access", description: "Disable Email, Slack, and VPN access.", role: "IT", order: 1 },
                        { title: "Asset Collection", description: "Collect laptop, badges, and company keys.", role: "IT", order: 2 },
                        { title: "Exit Interview", description: "Conduct formal feedback session with HR.", role: "HR", order: 3 },
                        { title: "Experience Letter", description: "Draft and issue the final experience certificate.", role: "HR", order: 4 },
                        { title: "Resignation Letter", description: "Obtain and file the signed formal resignation.", role: "Legal", order: 5 },
                        { title: "Financial Settlement", description: "Calculate final salary, deductions, and annual payouts.", role: "Finance", order: 6 },
                        { title: "Handover Completion", description: "Verify documentation and knowledge transfer is finished.", role: "Operations", order: 7 },
                        { title: "Backfill Request", description: "Initiate recruitment process for the vacant position.", role: "HR", order: 8 },
                    ]
                }
            },
            include: { tasks: true }
        });

        // 2. Ensure Azza Salah exists in the DB for testing
        await prisma.employee.upsert({
            where: { id: "25" },
            update: {},
            create: {
                id: "25",
                firstName: "Azza",
                lastName: "Salah",
                email: "azza.salah@superhr.com",
                role: "Senior HR Business Partner",
                department: "HR",
                status: "Active",
                organizationId: "org_default",
                joinedDate: new Date(),
            }
        });

        return NextResponse.json({ success: true, workflow, message: "Agreed tasks added to Standard Offboarding workflow." });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Failed to seed tasks.", details: error.message }, { status: 500 });
    }
}
