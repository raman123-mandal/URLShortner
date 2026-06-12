const express = require('express');
const router = express.Router();
const URL = require('../model/url');

const { createShortURL, redirectURL, handleAnalytics } = require('../controller/url');

router.post("/", createShortURL);
router.get("/analytics/:shortId", handleAnalytics);
router.get("/:shortId", redirectURL);
module.exports = router;