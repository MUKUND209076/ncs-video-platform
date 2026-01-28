const prisma = require('../../config/db');
const crypto = require('crypto');

exports.getDashboard = async () => {
  const videos = await prisma.video.findMany({
    where: { isActive: true },
    take: 2
  });

  const enriched = await Promise.all(
    videos.map(async (v) => {
      const token = crypto.randomBytes(32).toString('hex');

      await prisma.playbackToken.create({
        data: {
          videoId: v.id,
          token,
          expires: new Date(Date.now() + 1000 * 60 * 10) // 10 minutes
        }
      });

      return {
        id: v.id,
        title: v.title,
        description: v.description,
        thumbnail: v.thumbnailUrl,
        playback_token: token
      };
    })
  );

  return enriched;
};
