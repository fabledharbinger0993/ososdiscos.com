import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"

import layoutRoutes from "./routes/layout.js"
import authRoutes from "./routes/auth.js"
import bioRoutes from "./routes/bio.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

mongoose.connect(process.env.MONGO_URL)

app.use("/api/layout", layoutRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/bio", bioRoutes)

app.get("/", (req,res)=>{
 res.send("DJ Platform API running")
})

app.listen(5000,()=>console.log("Server running on port 5000"))