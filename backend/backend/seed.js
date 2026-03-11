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
  sections:["hero","sound","bio","calendar"]
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