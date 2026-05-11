const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Manually defining some employees since we can't easily import from the TS file in a raw JS script without transpilation
const employeesToSeed = [
    { id: "1", firstName: "Abdulmosen", lastName: "AlQaud", email: "abdulmosen.alqaud@superhr.com", role: "CEO", department: "Executive", status: "Active" },
    { id: "2", firstName: "Ahmed", lastName: "Kammorah", email: "ahmed.kammorah@superhr.com", role: "CTO", department: "Engineering", status: "Active" },
    { id: "3", firstName: "Rania", lastName: "Mohamed", email: "rania.mohamed@superhr.com", role: "VP of People", department: "HR", status: "Active" },
    { id: "4", firstName: "Ahmed", lastName: "Amr", email: "ahmed.amr@superhr.com", role: "Senior Software Engineer", department: "Engineering", status: "Active" },
    { id: "25", firstName: "Azza", lastName: "Salah", email: "azza.salah@superhr.com", role: "Senior HR Business Partner", department: "HR", status: "Active" },
];

async function main() {
    console.log("Seeding core employees...");
    for (const emp of employeesToSeed) {
        await prisma.employee.upsert({
            where: { id: emp.id },
            update: emp,
            create: {
                ...emp,
                organizationId: "org_default",
                joinedDate: new Date(),
            },
        });
        console.log(`Upserted: ${emp.firstName} ${emp.lastName}`);
    }
    
    // Also seed a default workflow if none exists
    const existingWorkflow = await prisma.workflow.findFirst({ where: { type: 'OFFBOARDING' } });
    if (!existingWorkflow) {
        await prisma.workflow.create({
            data: {
                name: "Standard Offboarding",
                type: "OFFBOARDING",
                description: "Standard procedure for departing employees",
                tasks: {
                    create: [
                        { title: "IT Asset Recovery", description: "Collect laptop and badges", role: "IT" },
                        { title: "Exit Interview", description: "HR feedback session", role: "HR" },
                        { title: "Legal Finalization", description: "Experience letter and resignation", role: "Legal" }
                    ]
                }
            }
        });
        console.log("Created default Offboarding workflow.");
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
