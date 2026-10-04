const express=require("express");
const router=express.Router();
const passport=require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const {saveRedirectUrl}=require("../middlewares.js");
const userController=require("../controllers/user.js");

router.route("/login")
.get(userController.loginForm)
.post(passport.authenticate("local", {failureFlash:true, failureRedirect:"/login"}), userController.login)

router.route("/signup")
.get(userController.signupForm)
.post(wrapAsync(userController.signup));  

router.get("/logout", userController.logout);

module.exports=router;