const express = require("express");
const router = express.Router();
const URL = require("../model/url");
const {restrictToLoggedinUserOnly, restrictTo} = require("../middleware/auth");

// ADMIN only route
router.get("/admin/urls", restrictToLoggedinUserOnly, restrictTo(["Admin"]), async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", { urls: allurls });
});

// NORMAL user route
router.get("/", restrictToLoggedinUserOnly, restrictTo(["NORMAL", "Admin"]), async (req, res) => {
    const allurls = await URL.find({createdBy: req.user.id});
    return res.render("home", { urls: allurls });
});

router.get("/signup", (req, res) => res.render("signup"));
router.get("/login", (req, res) => res.render("login"));

module.exports = router;
