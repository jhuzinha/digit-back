
import { prisma } from "../database";
/* istanbul ignore next */
export async function truncate() {
  /* istanbul ignore next */
  await prisma.$executeRaw`
    TRUNCATE TABLE recommendations
    `;
}
