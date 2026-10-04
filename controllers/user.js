const User=require("../models/user");
const passport=require("passport");
const {saveRedirectUrl}=require("../middlewares.js");


module.exports.signupForm=(req,res)=>{
    res.render("./users/signup.ejs");
}
module.exports.signup=async(req,res)=>{
    try{
        const {username,email,role,password}=req.body;
        const user=new User({username,email,role});
        const registeredUser=await User.register(user,password);
        passport.authenticate("local")(req,res,()=>{
            req.flash("success",`Welcome ${req.user.username} to Sentiment Tool!`);
            res.redirect(`/dashboard/${req.user.role}`);
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm=(req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.login=(req,res)=>{
    req.flash("success",`Welcome ${req.user.username} to Sentiment Tool!`);
    const redirectUrl=req.session.redirectUrl || `/dashboard/${req.user.role}`;
    res.redirect(redirectUrl);
}               
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){     
            return next(err);
        }   
        req.flash("success","Goodbye!");
        res.redirect("/welcome");
    });
}       