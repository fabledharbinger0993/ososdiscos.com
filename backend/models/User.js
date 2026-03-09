import mongoose from "mongoose"

export default mongoose.model("User",{
 username:String,
 password:String,
 role:String
})