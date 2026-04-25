const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.project.count();
  if (count === 0) {
    console.log('Seeding initial projects...');
    await prisma.project.createMany({
      data: [
        { title: 'Horror FS', imageUrl: 'https://images.unsplash.com/photo-1542382257-80da9fb9f5abc?q=80&w=800&auto=format&fit=crop', orderIndex: 0 },
        { title: 'Snow Fall Senpai', imageUrl: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?q=80&w=800&auto=format&fit=crop', orderIndex: 1 },
        { title: 'Bedwars Pro', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop', orderIndex: 2 },
        { title: 'Skyblock Survival', imageUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=800&auto=format&fit=crop', orderIndex: 3 },
        { title: 'UHC Highlights', imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop', orderIndex: 4 },
        { title: 'SMP Finale', imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop', orderIndex: 5 },
      ]
    });
    console.log('Database seeded.');
  } else {
    console.log('Database already has projects.');
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
