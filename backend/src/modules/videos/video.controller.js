const service = require('./video.service');
const playback = require('./playback.service');

exports.dashboard = async (req, res) => {
  try {
    const data = await service.getDashboard();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.stream = async (req, res) => {
  try {
    const url = await playback.getStream(req.params.id, req.query.token);
    res.json({ stream_url: url });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
