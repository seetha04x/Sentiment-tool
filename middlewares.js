const Cafe=require("./models/feedback.js");
const ExpressError=require("./utils/ExpressError.js");
const {feedbackSchema}=require("./schema.js");
function isLoggedin(req,res,next){
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    } 
    next();
}   
function saveRedirectUrl(req,res,next){
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next(); 
}

function authoriseRole(...allowedRoles){
     return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).send("Access Denied: Unauthorized Role");
        }
        next();
    }; 
}


const validateSchema=(req,res,next)=>{
    let result=feedbackSchema.validate(req.body);
    if(result.error){
        let msg=result.error.details.map((el)=>el.message).join(",");
        throw next(new ExpressError(msg, 400));
    }else{
        next();
    }
}
module.exports={ isLoggedin,saveRedirectUrl, authoriseRole,validateSchema};