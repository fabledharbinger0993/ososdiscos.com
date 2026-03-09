import {useEffect,useState} from "react"
import axios from "axios"

import Header from "../components/Header"
import Hero from "../components/HeroCarousel"
import SoundSection from "../components/SoundSection"
import Bio from "../components/BioPanel"
import EventCalendar from "../components/EventCalendar"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function Home(){

 const [layout,setLayout]=useState([])

 useEffect(()=>{

  axios.get(`${API_URL}/api/layout/home`)
  .then(res=>{
   setLayout(res.data.sections)
  })

 },[])

 const renderSection=(type)=>{

  switch(type){

   case "hero":
    return <Hero/>

   case "sound":
    return <SoundSection/>

   case "bio":
    return <Bio/>

   case "calendar":
    return <EventCalendar/>

   default:
    return null

  }

 }

 return(

 <div>

 <Header/>

 {layout.map(section=>(
  <div key={section.type}>
   {renderSection(section.type)}
  </div>
 ))}

 </div>

 )

}
