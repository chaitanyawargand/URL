const crypto = require('crypto');
const Url = require('./../modals/urlschema');

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
exports.shortenUrl = async (req, res) => {
  const { originalUrl} = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }
  const hash = crypto.createHash('sha256').update(originalUrl + Date.now()).digest('base64url');
  const shortId = hash.slice(0, 6);
  const shortUrl = `${BASE_URL}/${shortId}`;
  await Url.create({ originalUrl, shortId });
  res.status(201).json({
    status: 'success',
    shortUrl,
  });
};
exports.redirectUrl=async (req, res) => {
  const {shortId} =req.params;
  try {
    const record = await Url.findOne({ shortId });
    if (!record) {
      return res.status(404).send('Short URL not found.');
    }
    res.redirect(record.originalUrl);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

