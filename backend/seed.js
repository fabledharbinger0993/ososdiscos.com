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


const desiredUsername = "FabledHarbinger"
const desiredPassword = "@MasterChief0993"
const hash = await bcrypt.hash(desiredPassword, 10)
let admin = await User.findOne({ username: desiredUsername })
if (!admin) {
    await User.create({
        username: desiredUsername,
        password: hash,
        role: "admin"
    })
} else {
    admin.password = hash
    admin.role = "admin"
    await admin.save()
}

console.log("Seed completed")

process.exit()