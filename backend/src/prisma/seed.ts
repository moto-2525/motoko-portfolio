import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.homeContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Motoko Yoshikawa',
      subtitle: 'Web Developer / Portfolio ✨',
      imageUrl: null,
    },
  });

  // --- Skill 初期データ ---
  await prisma.skill.createMany({
    data: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'HTML/CSS' },
      { name: 'React.js' },
      { name: 'Next.js' },
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Prisma' },
      { name: 'REST API' },
      { name: 'MySQL' },
      { name: 'Tailwind CSS' },
      { name: 'GitHub' },
    ],
  });

  // --- Work 初期データ ---
  await prisma.work.createMany({
    data: [
      {
        title: 'section3-4',
        url: 'https://github.com/ms-engineer-bc25-10/Motoko-Yoshikawa_section3-4/tree/dev',
      },
      {
        title: 'section4-1',
        url: 'https://github.com/ms-engineer-bc25-10/Motoko-Yoshikawa_section4-1/tree/dev',
      },
    ],
  });

  console.log('🌱 HomeContent Seed 完了');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
