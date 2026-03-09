import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

import Layout from "./models/Layout.js"
import User from "./models/User.js"

dotenv.config()

await mongoose.connect(process.env.MONGO_URL)

const existingLayout = await Layout.findOne({page:"home"})

if(!existingLayout){

 await Layout.create({
  page:"home",
  sections:[
   {type:"hero",order:1},
   {type:"sound",order:2},
   {type:"bio",order:3},
   {type:"calendar",order:4}
  ]
 })

}

const admin = await User.findOne({username:"admin"})

if(!admin){

 const hash = await bcrypt.hash("admin123",10)

 await User.create({
  username:"admin",
  password:hash,
  role:"admin"
 })

}

console.log("Seed completed")

process.exit()