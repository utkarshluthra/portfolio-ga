
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const videos = await prisma.video.findMany();
    console.log('Videos found:', videos);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
