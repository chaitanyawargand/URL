const express = require('express');
const router = express.Router();
const { shortenUrl,redirectUrl } = require('./../controllers/urlcontroller');

router.post('/shorten', shortenUrl);
router.get('/:shortId', redirectUrl);
module.exports = router;
