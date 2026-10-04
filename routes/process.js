const express=require("express");
const router=express.Router();
const processController=require("../controllers/process")
router.get("/",processController.triggerPySparkPipeline);

module.exports=router;