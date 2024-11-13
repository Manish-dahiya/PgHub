import mongoose from "mongoose"

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:String
    },
    avatar:{
        data:{
            type:Buffer,   //<<<data type is buffer
            
        },
        contentType:{ //will include the file type
            type:String
        }
    },
    bio:{
        type:String
        
    },
    role:{
        type:String
    },
    points:{
        type:Number,
        default:10
    },
    properties:[]


})
const users=  mongoose.models.users || mongoose.model("users",userSchema);
export default users;