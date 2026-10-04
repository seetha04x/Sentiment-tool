const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const { default: passportLocalMongoose }=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ["student", "faculty", "admin"],
        default: "student",
        required: true
    },
    department: {
        type: String,
        default: "General"
    }
})
userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema);
module.exports=User;