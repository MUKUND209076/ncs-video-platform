const prisma = require('../../config/db');

exports.getStream = async (videoId, token) => {
  const record = await prisma.playbackToken.findUnique({
    where: { token },
    include: { video: true }
  });

  if (!record) throw new Error('Invalid token');
  if (record.videoId !== videoId) throw new Error('Token mismatch');
  if (record.expires < new Date()) throw new Error('Token expired');

  // ✅ Mobile-safe masked stream URL (stable for WebView)
  return `https://m.youtube.com/watch?v=${record.video.youtubeId}`;
};
