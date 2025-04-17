"use strict";
const { PrismaClient } = require('@prisma/client');
const prisma1 = new PrismaClient();
async function main() {
    await prisma1.event.createMany({
        data: [
            { title: 'B&M GBM', code: '00', date: new Date('2024-01-01T00:00:00Z') },
            { title: 'Earth Che Night', code: '01', date: new Date('2024-01-15T00:00:00Z') },
            { title: 'Viet Field Day', code: '02', date: new Date('2024-02-01T00:00:00Z') },
            { title: 'Water Pokémon Go Event', code: '03', date: new Date('2024-02-15T00:00:00Z') },
            { title: 'Fire Gingerbread House Competition', code: '04', date: new Date('2024-03-01T00:00:00Z') },
        ],
    });
    console.log('Seeding complete.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma1.$disconnect();
});
