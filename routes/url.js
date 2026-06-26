const express = require('express');
const router = express.Router();
const {restrictToLoggedinUserOnly} = require('../middleware/auth');
const { createShortURL, redirectURL, handleAnalytics } = require('../controller/url');

router.post("/", restrictToLoggedinUserOnly, createShortURL);
router.get("/analytics/:shortId", handleAnalytics);
router.get("/:shortId", redirectURL);

module.exports = router;
