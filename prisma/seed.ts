import { prisma } from "../src/database";


export async function main() {
    await prisma.posts.createMany({
        data: []
    })

}


main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})