import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const assets = await prisma.asset.findMany({
    where: {
      employeeId: { not: null }
    },
    include: {
      employee: true
    }
  });
  
  const assignedUsers = assets.map(a => `${a.employee?.firstName} ${a.employee?.lastName} - ${a.name} (${a.category})`);
  console.log(JSON.stringify(assignedUsers, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
