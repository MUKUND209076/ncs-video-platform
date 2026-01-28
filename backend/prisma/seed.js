const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear old data
  await prisma.playbackToken.deleteMany();
  await prisma.video.deleteMany();

  await prisma.video.createMany({
    data: [
      {
        title: "Janji - Heroes Tonight (feat. Johnning)",
        description: "Classic NCS release - highly stable for embedding.",
        youtubeId: "3nQNiWdeH2Q",
        thumbnailUrl: "https://img.youtube.com/vi/3nQNiWdeH2Q/hqdefault.jpg",
        isActive: true,
      },
      {
        title: "DEAF KEV - Invincible",
        description: "NCS electronic release with broad playback permissions.",
        youtubeId: "J2X5mJ3HDYE",
        thumbnailUrl: "https://img.youtube.com/vi/J2X5mJ3HDYE/hqdefault.jpg",
        isActive: true,
      }
    ]
  });

  console.log("DB seeded with stable embedding videos ✅");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());