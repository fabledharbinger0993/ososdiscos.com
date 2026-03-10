import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"

const router = express.Router()

router.post("/login", async(req,res)=>{

 const {username,password} = req.body

 const user = await User.findOne({username})

 if(!user) return res.status(404).send("User not found")

 const match = await bcrypt.compare(password,user.password)

 if(!match) return res.status(401).send("Invalid password")

 const token = jwt.sign(
  {id:user._id,role:user.role},
  process.env.JWT_SECRET,
  {expiresIn:"12h"}
 )

 res.json({token})

})

export default router