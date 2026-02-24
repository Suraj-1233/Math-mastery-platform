import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const result = await prisma.$queryRawUnsafe("SELECT id, CAST(resultsDisclosed AS TEXT) as rd, resultsDisclosed FROM Test WHERE resultsDisclosed = 1");
  console.log(result);
}
main().catch(console.error).finally(() => prisma.$disconnect())
