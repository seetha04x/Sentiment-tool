const express=require("express");
const router=express.Router();
const adminController=require("../controllers/admin")
const { isLoggedin, authoriseRole } = require("../middlewares.js");

router.get("/dashboard",isLoggedin, authoriseRole("admin"),adminController.index);

module.exports=router;