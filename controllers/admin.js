const Feedback = require("../models/feedback");
const { isLoggedin, authoriseRole } = require("../middlewares.js");

module.exports.index = async (req, res) => {
    const allFeedbacks = await Feedback.find({});

    // Calculate overall counts
    const total = allFeedbacks.length;
    const positive = allFeedbacks.filter(f => f.status === "positive").length;
    const negative = allFeedbacks.filter(f => f.status === "negative").length;
    const neutral = allFeedbacks.filter(f => f.status === "neutral").length;
    const unprocessed = allFeedbacks.filter(f => f.status === "unprocessed").length;

    // Pass aggregated data to the view
    res.render("admin/index.ejs", {
        allFeedbacks,
        stats: { total, positive, negative, neutral, unprocessed }
    });
};