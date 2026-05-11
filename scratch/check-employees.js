const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const employees = await prisma.employee.findMany();
  console.log(`Total Employees: ${employees.length}`);
  employees.forEach(e => {
    console.log(`- ${e.firstName} ${e.lastName}: Status="${e.status}"`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
