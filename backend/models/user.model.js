import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    profilePic :{
        type: String,
        default : "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    }

},{timestamps:true});


const User = mongoose.model("user",userSchema);

export default User;