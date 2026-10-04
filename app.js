const express=require("express");
const app=express();

const mongoose=require("mongoose");
const feedback=require("./models/feedback.js");
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride=require("method-override");

//router
const feedbackRouter=require("./routes/feedback.js");
const processRouter=require("./routes/process.js");
const userRouter=require("./routes/user.js")
const indexRouter=require("./routes/index.js")

const passport=require("passport");
const LocalStrategy=require("passport-local");
const user=require("./models/user.js");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
const MongoStore=require("connect-mongo").default;

app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'ejs');
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))

mongoose.set("strictQuery", false);


async function main(){
    await mongoose.connect("mongodb://localhost:27017/sentimenttool");
}
main() 
.then(()=>{
    console.log("Connected to database Sentiment Tool.");
    app.listen(3000,()=>{
    console.log("Listening to port 3000...");
})
})
.catch((err)=>{
    console.log("Error: ",err);
})

//session store
const store = MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/sentimenttool",
    touchAfter: 24 * 3600,
});

store.on("error",(err)=>{
    console.log("Error in Mongo Session store", err);
});

const sessionConfig = {
    store,
    secret:"thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success") || [];
    res.locals.error=req.flash("error") || [];
    res.locals.currUser=req.user || null;
    next();
})

//routes
app.get("/welcome",(req,res)=>{
    res.render("welcome.ejs");
});
app.use("/dashboard", indexRouter)
app.use("/feedback",feedbackRouter);
app.use("/process",processRouter)
app.use("/",userRouter);

app.all(/.*/,(req,res,next)=>{
    next(new ExpressError("Page Not Found", 404));
})

app.use((err,req,res,next)=>{
    if(res.headersSent){
        return next(err);
    }

    const statusCode = Number.isInteger(err?.statusCode) ? err.statusCode : 500;
    const message = err?.message || "Something went wrong";

    res.status(statusCode).render("error.ejs", { err, statusCode, message });
})