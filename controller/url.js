const shortid = require('shortid');
const URL = require('../model/url');

async function createShortURL(req, res) {
    const body = req.body;
    if(!body.originalURL){
        return res.status(400).json({ error: 'Original URL is required' });
    }
    const shortId = shortid.generate();
    await URL.create({ 
        shortId, 
        redirectURL: body.originalURL,
        visitHistory: [],
        createdBy: req.user.id,
    });
    const allurls = await URL.find({createdBy: req.user.id});
    return res.render("home", { id: shortId, urls: allurls });
}

async function redirectURL(req, res) {
    const { shortId } = req.params;
    const entry = await URL.findOne({ shortId });
    if (!entry) return res.status(404).json({ error: 'URL not found' });
    await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timestamp: new Date() } } });
    return res.redirect(entry.redirectURL);
}

async function handleAnalytics(req, res) {
    const { shortId } = req.params;
    const result = await URL.findOne({ shortId });
    if (!result) return res.status(404).json({ error: 'URL not found' });
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = { createShortURL, redirectURL, handleAnalytics };
