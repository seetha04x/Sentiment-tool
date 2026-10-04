const express=require("express");
const router=express.Router();
const feedbackController=require("../controllers/feedback");

router.get("/new",feedbackController.new);

router.post("/", feedbackController.postNew);

router.get("/all", feedbackController.all)
module.exports=router;