const Feedback=require("../models/feedback");


module.exports.new=(req,res)=>{
    res.render("./feedback/new.ejs");
}
module.exports.postNew=async (req,res)=>{
    let {category,targetName,feedback, rating,department}=req.body;
    console.log({})
    const feed= new Feedback({category,targetName,feedback, rating,department})
    await feed.save();
    res.redirect("/dashboard/student");
}

module.exports.all=async (req,res) => {
    const all=await Feedback.find({});
    res.render("./feedback/index.ejs",{all});
}