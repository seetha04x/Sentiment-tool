const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const feedbackSchema= new Schema({
    category:{
        type:String,
        required:true,
        enum:["faculty","facilities","subject"],
    },
    targetName:{
        type:String,
        required:true,
    },
    student:{
        type:Schema.Types.ObjectId,
        ref:"Student",
    },
    department: {
        type: String,
        required: true,
        default: "General",
    },
    feedback:{
        type:String,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    status:{
        type:String,
        enum:["neutral","positive","negative","unprocessed"],
        default:"unprocessed"
    },
    sentimentScore:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})
const feedback=mongoose.model("feedback",feedbackSchema,"feedbacks")
module.exports=feedback