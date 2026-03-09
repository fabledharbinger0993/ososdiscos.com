import express from "express"
import Layout from "../models/Layout.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get("/:page", async (req,res)=>{

 let layout = await Layout.findOne({page:req.params.page})

 if(!layout){

  layout = await Layout.create({
   page:req.params.page,
   sections:[
    {type:"hero",order:1},
    {type:"sound",order:2},
    {type:"bio",order:3},
    {type:"calendar",order:4}
   ]
  })

 }

 res.json(layout)

})

router.put("/:page", auth, async (req,res)=>{

 const layout = await Layout.findOneAndUpdate(
  {page:req.params.page},
  {sections:req.body.sections},
  {new:true,upsert:true}
 )

 res.json(layout)

})

export default router