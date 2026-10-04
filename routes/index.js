// routes/index.js
const express = require("express");
const router = express.Router();
const { isLoggedin, authoriseRole } = require("../middlewares.js");
const Feedback=require("../models/feedback");
const adminController=require("../controllers/admin")

// Student View: Submit feedback
router.get("/student", isLoggedin, authoriseRole("student"), (req, res) => {

    res.render("./student/dashboard");
});

// Faculty View: View subject/faculty-specific reports
router.get("/faculty", isLoggedin, authoriseRole("faculty"), async (req, res) => {
    const facultyFeedbacks=await Feedback.find({targetName:req.user.username});

    const stats = {
        total: facultyFeedbacks.length,
        positive: facultyFeedbacks.filter(f => f.status === 'positive').length,
        negative: facultyFeedbacks.filter(f => f.status === 'negative').length,
        neutral: facultyFeedbacks.filter(f => f.status === 'neutral').length
    };
    res.render("./faculty/dashboard",{facultyFeedbacks, stats});
});

// Admin View: System analytics and running PySpark pipeline

router.get("/admin",isLoggedin, authoriseRole("admin"),adminController.index);

module.exports = router;